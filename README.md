# ritsumeikan-ai-seminar

立命館大学向け AI x GitHub 勉強会のハンズオン教材です。

このリポジトリでは、研究室・サークルの差し入れeギフト推薦ロジックを題材に、AIの出力をGitHub上でチームが判断できる形にする練習をします。

## 教材画面のデザイン原則

この教材の画面は、ギフティのデザイン原則に合わせて作っています。

- あたたかみ: 差し入れを受け取る相手や場面の温度感が伝わる表現にする
- ひかえめ: ギフトを贈る人と受け取る人を主役にし、UIは判断を支える程度に抑える
- かんたん: 条件、候補、レビューすべき点がすぐ分かるようにする

## 今日やること

1. Issueを読む
2. AIへの依頼文を書く
3. AIの修正方針をPlan Gateで判断する
4. 講師準備済みPRを読む
5. Conversation / Files changed / Checks を確認する
6. Reviewコメントを書く
7. 次回AIに渡す学びを残す

## 当日必須ではないこと

- ローカル環境の構築
- Branch作成
- Commit作成
- Pull Request作成

余裕がある人は発展課題として自分のPR作成まで進めてください。

## 任意: ローカル環境セットアップ

ローカルで実装やテストまで試したい人向けの手順です。当日のハンズオンでは必須ではありません。

### 前提

- Node.js 22 系
- npm
- Git

### 手順

```bash
git clone https://github.com/giftee/ritsumeikan-ai-seminar.git
cd ritsumeikan-ai-seminar
npm install
npm test
```

テストが通れば、ローカルで教材コードを動かせる状態です。

### 任意: 画面で確認する

```bash
npm run dev
```

ブラウザで `http://127.0.0.1:5173/` を開くと、研究室・サークル・勉強会の条件を切り替えながら推薦結果を確認できます。

`main` ブランチでは、あえて推薦ロジックに見落としが残っています。PRレビューでは、画面上の結果とテストの両方を手がかりにして、AIの修正をそのまま受け入れてよいかを判断します。

### 発展課題でブランチを作る場合

```bash
git switch -c your-name/lab-gift-recommendation
```

変更後は `npm test` で確認してから、CommitやPull Request作成に進んでください。

## テスト

```bash
npm test
```

## 画面の起動

```bash
npm run dev
```
