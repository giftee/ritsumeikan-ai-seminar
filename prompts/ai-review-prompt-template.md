# AIレビュー補助依頼テンプレート

## 事前準備: PRの差分をAIに渡す

AIはGitHub上のPRを直接読めないことが多いため、先に差分を手元へ取得します（読み取り専用の操作です。pushはしません）。

エディタ・CLIのAIを使う人:

```bash
git fetch origin pull/2/head:pr-2
git diff main..pr-2
```

これでAIが `git diff main..pr-2` の結果を参照できます。

チャット型AIを使う人: PRのURL末尾に `.diff` を付けて開き（ https://github.com/giftee/ritsumeikan-ai-seminar/pull/2.diff ）、表示された内容を依頼文に貼ってください。

## 依頼文

GitHub Pull Request #2 をレビューしています。
いきなり修正案を書かず、次の観点で確認漏れの候補を出してください。

## 見てほしいもの

- Issue #1 の完了条件
- PR本文
- `src/giftRecommendation.js` の差分
- `test/giftRecommendation.test.js` の差分
- GitHub Actionsの結果

## 出してほしいもの

- 仕様と差分が対応しているか
- 制約違反を防ぐテストの不足候補
- Issue範囲外の変更がないか
- Reviewコメント案
- Approve / Request changes の判断材料
