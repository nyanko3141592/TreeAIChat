# TreeAIChat

## 概要

Gemini APIを利用した、会話がツリー状に分岐できる独自のUIを持つAIチャットアプリケーションです。

## 主な機能

- Gemini API (gemini-1.5-flash-latestモデル) を利用したAIとのチャット機能
- あらゆる会話ノードから複数の分岐（ツリー構造）を作成可能
- 各ノードをクリックして選択し、そのノードを起点として新たな会話シナリオを追加
- 会話ツリーの視覚的な表示（フローチャート風レイアウト）
- Gemini APIキーのブラウザローカルストレージへの保存と管理

## デプロイ先URL

[https://nyanko3141592.github.io/TreeAIChat/](https://nyanko3141592.github.io/TreeAIChat/)

## 使い方

1. 上記デプロイ先URLにアクセスします。
2. 初回アクセス時、またはAPIキーが未設定の場合、画面上部の入力欄に自身のGemini APIキーを入力し、「保存」ボタンをクリックします。
3. APIキーが設定されると、チャット入力が可能になります。
4. 画面下部のテキストエリアにメッセージを入力し、「送信」ボタンをクリックするか、Enterキーを押すと、選択中のノードの子としてユーザーメッセージが追加され、続けてAIの応答が生成されます。
5. 表示されている各メッセージ（ノード）をクリックすると、そのノードが選択状態になります。
6. 選択されたノードを親として、新たなメッセージを入力・送信することで、会話を分岐させることができます。

## ローカルでの実行方法

```bash
git clone https://github.com/nyanko3141592/TreeAIChat.git
cd TreeAIChat
npm install
npm run dev
```
ブラウザで表示されたローカルサーバーのURL（通常は `http://localhost:5173` など）にアクセスしてください。

## 技術スタック

- Vite
- Vanilla JavaScript (ES Modules)
- HTML5
- CSS3
- Google Generative AI SDK for JavaScript (`@google/generative-ai`)

## 今後の展望 (Tasks from `document/task.md`)

- 会話ツリー表示のさらなる高度化（接続線の改善、ノードの展開・折りたたみなど）
- レスポンシブデザインの強化
- 会話ツリーのローカルストレージへの自動保存・復元
- 会話ツリーのエクスポート/インポート機能
- 詳細なエラーハンドリング
- パフォーマンス最適化
- 多言語対応準備 