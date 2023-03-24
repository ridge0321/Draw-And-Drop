<!-- トップ画面 -->
<script setup>
import { useRouter } from "vue-router";
const router = useRouter()
console.log("トップ画面");
const routerDemo = () => {
  router.push("/create-jar");
};

</script>

<template>
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=RocknRoll+One&display=swap"
        rel="stylesheet"
      />
    </head>
    <body>
      <div class="index_rogo">
        <img src="../img/rogo.png" />
      </div>
      <button @click="routerDemo">プレイ</button>
    </body>
  </html>
</template>

<style scoped>
body {
  background-color: #282c34;
  background-image: url("../img/back-ground.png");
  background-repeat: no-repeat;
  background-size: 90%;
  background-position: 40% 0;
  height: 937px;
  text-align: center;
}

.index_rogo {
  text-align: center;
}

.index_rogo > img {
  width: 50%;
  height: auto;
  position: absolute;
  width: 995px;
  height: 105px;
  left: 426px;
  top: 334px;
}

button {
  box-sizing: border-box;

  position: absolute;
  width: 400px;
  height: 150px;
  left: calc(50% - 400px/2 - 36px);
  top: calc(50% - 150px/2 + 171px);

  background: #479DE3;
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;

  
  font-family: 'RocknRoll One';
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 58px;

  color: #FFFFFF;
}
</style>
