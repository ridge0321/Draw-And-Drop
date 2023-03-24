# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

# フロント部分用サブディレクトリ
## ルールメモ
- CSSで使う画像等は/publicに、それ以外のものはsrc/assetsに配置
- src/components直下に各ページのコンポーネントを作成。  
より小さな単位のコンポーネントが必要な場合、分類ごとにフォルダを作ってその中にコンポーネントを作成
- 共通CSSはsrc/style.cssに、専用のCSSは各コンポーネントのstyleタグ内に記述
- コンポーネントのstyleタグにはscoped、scriptタグにはsetupを設定する
