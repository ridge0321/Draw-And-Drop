<!-- 壺積み上げ画面 -->
<script setup>
import { useRouter } from "vue-router";

import Matter from "matter-js";
import { onMounted, ref, watch, computed } from 'vue';

import { set_buildingjar_data, get_createjar_data } from '../../lib/localstorage'

const CLIENT_WIDTH = document.documentElement.clientWidth
const CLIENT_HEIGHT = document.documentElement.clientHeight

const MatterWidth = CLIENT_WIDTH > 1000 ? CLIENT_WIDTH / 2 : CLIENT_WIDTH
const MatterHeight = CLIENT_HEIGHT > 550 ? CLIENT_HEIGHT * 3 / 4 : CLIENT_HEIGHT

/** クリック可能範囲の末端 */
const CLICKABLE_HEIGHT = MatterHeight / 6

/** ボディの積み上げ可否 */
const isDrop = ref(true)

// DOM
const root = ref(null)
const descript = ref(null)
const gameOverDisp = ref(null)

// Matterから引っ張ってこないといけないものたち
const Engine = Matter.Engine
const Render = Matter.Render
const Runner = Matter.Runner
const Common = Matter.Common
const MouseConstraint = Matter.MouseConstraint
const Mouse = Matter.Mouse
const World = Matter.World
const Vertices = Matter.Vertices
const Bodies = Matter.Bodies
const Body = Matter.Body
const Composite = Matter.Composite

// create engine
const engine = Engine.create({ enableSleeping: true })
// create runner
const runner = Runner.create();

/** ワールド */
const world = engine.world;

// マウント直後にフィールドの初期状態を作成
onMounted(() => {
    // create renderer
    const render = Render.create({
        element: root.value,
        engine: engine,
        options: {
            width: MatterWidth,
            height: MatterHeight,
            background: '#282C34',
            pixelRatio: 'auto',
            wireframes: false,
            showDebug: false,
            showBroadphase: false,
            showBounds: false,
            showVelocity: false,
            showCollisions: false,
            showSeparations: false,
            showAxes: false,
            showPositions: false,
            showAngleIndicator: false,
            showIds: false,
            showShadows: false,
            showVertexNumbers: false,
            showConvexHulls: false,
            showInternalEdges: false,
            showMousePosition: false,
        },
    });
    // レンダラー、ランナーを実行
    Render.run(render);
    Runner.run(runner, engine);

    // 土台を追加
    World.add(world, [
        Bodies.rectangle(MatterWidth / 2, MatterHeight * 3 / 4, MatterWidth / 3, MatterHeight / 20, { isStatic: true, friction: 1, render: { fillStyle: '#1D2026' } },),
        Bodies.rectangle(0, MatterHeight, CLIENT_WIDTH, 5, { isStatic: true, friction: 0, label: 'base' }),
    ]);

    // マウスコントロールを追加
    const mouse = Mouse.create(render.canvas)
    // マウスをレンダラーに同期
    render.mouse = mouse;

    // クリック時の動作を定義
    root.value.onmousedown = async (event) => {
        // マウス操作範囲制限
        if (event.offsetY > CLICKABLE_HEIGHT || !isDrop.value) return

        // 積み上げた壺の数を更新
        jarCount.value++;

        // 衝突イベント
        Matter.Events.on(engine, 'collisionStart', (event) => {
            const pairs = event.pairs
            pairs.forEach(async (pair) => {
                if (pair.bodyA.label === 'base' || pair.bodyB.label === 'base') {
                    gameOver();
                    await new Promise(resolve => setTimeout(resolve, 3000));
                    router.push('/result')
                }
            })
        })
        // ドット絵の二次元配列から頂点座標を作成
        /** ドット幅 */
        const dotWidth = 10
        /** ドット絵配列 */
        const dotAry = get_createjar_data().grid_data
        /** 頂点座標配列 */
        const vertexCoords = [];

        // 座標が枠内かを判定
        const isValid = (x, y) => {
            return x >= 0 && y >= 0 && x < dotAry[0].length && y < dotAry.length;
        };

        // 座標のセルの情報を集約し返却
        const cellInfo = (x, y) => {
            if (!isValid(x, y)) return

            const tooSmallX = x => x <= 0
            const tooLargeX = x => x >= dotAry[0].length - 1
            const tooSmallY = y => y <= 0
            const tooLargeY = y => y >= dotAry.length - 1

            // たてよこ
            const blankAbove = tooSmallY(y)
                ? true
                : dotAry[y - 1][x] === 0
            const blankRight = tooLargeX(x)
                ? true
                : dotAry[y][x + 1] === 0
            const blankBelow = tooLargeY(y)
                ? true
                : dotAry[y + 1][x] === 0
            const blankLeft = tooSmallX(x)
                ? true
                : dotAry[y][x - 1] === 0

            // ななめ
            const blankAboveRight = tooLargeX(x) || tooSmallY(y)
                ? true
                : dotAry[y - 1][x + 1] === 0
            const blankBelowRight = tooLargeX(x) || tooLargeY(y)
                ? true
                : dotAry[y + 1][x + 1] === 0
            const blankBelowLeft = tooSmallX(x) || tooLargeY(y)
                ? true
                : dotAry[y + 1][x - 1] === 0
            const blankAboveLeft = tooSmallX(x) || tooSmallY(y)
                ? true
                : dotAry[y - 1][x - 1] === 0

            const rtnObj = {
                // 縦横斜めのどれかがブランクだったらEdgeとする
                isEdge: dotAry[y][x] === 1 && (blankLeft || blankRight || blankAbove || blankBelow || blankAboveRight || blankBelowRight || blankBelowLeft || blankAboveLeft),
                x,
                y,
                dotAry: dotAry[y][x],
                blankLeft,
                blankRight,
                blankAbove,
                blankBelow,
                blankAboveRight,
                blankBelowRight,
                blankBelowLeft,
                blankAboveLeft,
            }
            return rtnObj
        }

        // 必要な頂点座標を計算しpush
        const pushOutlineVertex = (x, y, pushArrows) => {
            if (!isValid(x, y)) return
            const { above, right, below, left } = pushArrows

            if (above) {
                vertexCoords.push({ x, y });
                vertexCoords.push({ x: x + 1, y });
            }
            // 

            if (right) {
                vertexCoords.push({ x: x + 1, y });
                vertexCoords.push({ x: x + 1, y: y + 1 });
            }

            if (below) {
                vertexCoords.push({ x: x + 1, y: y + 1 });
                vertexCoords.push({ x, y: y + 1 });
            }

            if (left) {
                vertexCoords.push({ x, y: y + 1 });
                vertexCoords.push({ x, y });
            }
        };

        // 塗られているマスを探し、そこから輪郭に沿って探索、必要な頂点座標を配列に格納する
        /** 塗られているマスを見つけるまで探査するためのフラグ */
        let isEarly = true
        /** outline探査開始地点 */
        let startDot = { x: null, y: null };
        // 探査関数
        const findVertex = (x, y) => {
            if (!isValid(x, y)) return
            console.log(x, y)
            const currentInfo = cellInfo(x, y);
            const aboveInfo = cellInfo(x, y - 1);
            const rightInfo = cellInfo(x + 1, y);
            const belowInfo = cellInfo(x, y + 1);
            const leftInfo = cellInfo(x - 1, y);

            let arrow = ''
            if ((currentInfo.isEdge || dotAry[y][x] !== 0 || isEarly) && !(startDot.x === x && startDot.y === y)) {
                if (isEarly && dotAry[y][x] === 1) {
                    startDot = { x, y }
                    isEarly = false
                }
                if (aboveInfo?.isEdge) {
                    // 上のセルがEdgeなら上に移動
                    arrow = 'above'
                } else if (rightInfo?.isEdge) {
                    // 右のセルが...
                    arrow = 'right'
                } else if (belowInfo?.isEdge) {
                    // 下のセルが...
                    arrow = 'below'
                } else if (leftInfo?.isEdge) {
                    // 左のセルが...
                    arrow = 'left'
                }
                else if (aboveInfo?.dotAry === 2) {
                    // !isEdge && 2のセルに移動
                    arrow = 'above'
                } else if (rightInfo?.dotAry === 2) {
                    // !isEdge && 2のセルに移動
                    arrow = 'right'
                } else if (belowInfo?.dotAry === 2) {
                    // !isEdge && 2のセルに移動
                    arrow = 'below'
                } else if (leftInfo?.dotAry === 2) {
                    // !isEdge && 2のセルに移動
                    arrow = 'left'
                }
                else if (aboveInfo?.dotAry === 1) {
                    // !isEdge && 1のセルに移動
                    arrow = 'above'
                } else if (rightInfo?.dotAry === 1) {
                    // !isEdge && 1のセルに移動
                    arrow = 'right'
                } else if (belowInfo?.dotAry === 1) {
                    // !isEdge && 1のセルに移動
                    arrow = 'below'
                } else if (leftInfo?.dotAry === 1) {
                    // !isEdge && 1のセルに移動
                    arrow = 'left'
                }

                // プロットする頂点の座標情報を定義
                const vertexArrows = { above: null, right: null, below: null, left: null }
                // currentがfalseじゃなければ追加
                if (dotAry[y][x] !== 0) {
                    vertexArrows.above = currentInfo.blankAbove;
                    vertexArrows.right = currentInfo.blankRight;
                }

                // 上、右に行かないなら下の頂点をプロットしてOK
                if (dotAry[y][x] !== 0 && !(arrow === 'above') && !(arrow === 'right')) {
                    vertexArrows.below = currentInfo.blankBelow
                }
                // 上、右、下に行かないなら左の頂点をプロットしてOK
                if (dotAry[y][x] !== 0 && !(arrow === 'right') && !(arrow === 'below')) {
                    vertexArrows.left = currentInfo.blankLeft
                }

                // console.log(vertexArrows)
                // 頂点のプロットを実行
                pushOutlineVertex(x, y, vertexArrows)

                // 足跡
                if (dotAry[y][x] !== 0) {
                    dotAry[y][x] = 2
                }

                if (arrow === 'above') {
                    console.log('上へ移動')
                    findVertex(x, y - 1);
                } else if (arrow === 'right') {
                    console.log('右へ移動')
                    findVertex(x + 1, y);
                } else if (arrow === 'below') {
                    console.log('下へ移動')
                    findVertex(x, y + 1);
                } else if (arrow === 'left') {
                    console.log('左へ移動')
                    findVertex(x - 1, y);
                } else {
                    console.log('右へ移動(else)')
                    if (x + 1 === dotAry[0].length) {
                        x = 0;
                        y++;
                        console.log(y)
                    }
                    findVertex(x + 1, y);
                }
            }
            // 判断に使う値をもとに戻して終了
            isEarly = true;
            startDot = { x: null, y: null };
        }

        // (0, 0)の地点から開始
        findVertex(0, 0)

        /** 右回りの頂点座標配列 */
        const alignedVertex = []
        /** 現在検索値の一時退避用 */
        let hold = { x: null, y: null };
        vertexCoords.forEach((v) => {
            if (v.x !== hold.x || v.y !== hold.y) {
                // 現在の検索値と違う場合、aryにpushしてhold
                alignedVertex.push({ x: v.x * dotWidth, y: v.y * dotWidth });
                hold = v
            } else return
        })

        // bodyを作成しワールドに追加
        const body = Body.create({
            position: { x: event.offsetX, y: event.offsetY },
            vertices: alignedVertex,
            friction: 0.8,
            frictionAir: 0.21,
            functionStatic: 10
        })
        World.add(
            world,
            body
        );

        // 追加後3秒は落とせない
        isDrop.value = false
        await new Promise(resolve => setTimeout(resolve, 3000));
        isDrop.value = true
    };

})

// TODO: onMountedの処理をwatchに入れれば、windowサイズとかの変更毎に再レンダリングができる。
// watchでの再レンダリングの際は、全部のボディ情報を取得、再配置する必要があり、画面サイズによってドット幅を変更するため、それらのドット幅を修正してから再配置する必要がある。


/** マウスのX座標 */
const mouseX = ref(null)
/** マウスのY座標 */
const mouseY = ref(null)

window.addEventListener('mousemove', (event) => {
    // mousemoveで座標を更新
    mouseX.value = event.x;
    mouseY.value = event.y;
});

// userRouter定義
const router = useRouter()

const gameOver = async () => {
    gameOverDisp.value.style.display = 'block';
    // localStorageに保存
    set_buildingjar_data(jarCount.value - 1);
    await new Promise(resolve => setTimeout(resolve, 1500));
    router.push('/result')
}

/** 積み上げ個数 */
const jarCount = ref(0)
</script>

<template>
    <div class="explanatory_note">
        <div class="explanatory_note_text">カーソルを操作して、ツボを積み重ねよう</div>
    </div>
    <div id="building" ref="root"></div>
    <p id="gameover" ref="gameOverDisp">GAME OVER</p>
</template>


<style scoped>
p {
    color: white;
    margin: 0;
}

#building {
    text-align: center;
    position:absolute;
    top: 162px;
    left: 445px;
}

.content {
    /* opacity: 0.8; */
    text-align: center;
}

#description {
    display: inline-block;
    text-align: center;
    padding: 30px 120px;
    margin: 15px;
    border-radius: 10px;
    background-color: #282C34;
}

#gameover {
    display: none;
    font-size: 100px;
    position: absolute;
    top: 330px;
    left: 630px;
}

.explanatory_note {
    position: absolute;
    width: 956px;
    height: 80px;
    left: 443px;
    top: 35px;
    background: #282C34;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    border-radius: 30px;
}

.explanatory_note_text {
    position: absolute;
    width: 933px;
    height: 30px;
    left: 215px;
    top: 23px;
    font-family: 'RocknRoll One';
    font-style: normal;
    font-weight: 400;
    font-size: 30px;
    line-height: 43px;
    color: #FFFFFF;
}
</style>