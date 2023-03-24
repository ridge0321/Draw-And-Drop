# 関数一覧
|関数名|概要|
|---|---|
|[SubmitScore](#submitscore)|プレイスコア登録・自順位表示|
|[LookRanking](#lookranking)|ランキングリストを表示する|
|[SetName](#setname)|初期名（匿名）を入力されたテキストで上書き|  

<br/>

## 返却値について
`retrun`でステータスを返却する
|status|状態|
|---|---|
|200|正常なレスポンス|
|400|異常なレスポンス|

<br/>

## SubmitScore
- プレイスコアの各情報を受け取り、ランキングに登録する
- 返却値としてスコアの順位を返却する
### props
```typescript
{
    totalScore: number,
    podRank: string,
    podCount: number,
}
```
### retrun
```typescript
{
    status: 200,
    rankNum: number
}
```

<br/>

## LookRanking
- `TOP10`までのランキングリストを返却する
### retrun
```typescript
[
    {
        status: 200,
        rankNum: number,
        userName: string,
        totalScore: number,
        podRank: string,
        podCount: number
    }
]
```

<br/>

## SetName
- 入力値で直前に登録したスコアの`userName`を上書きする
### props
```typescript
{
    userName: string
}
```
### return
```typescript
{
    status: 200
}
```