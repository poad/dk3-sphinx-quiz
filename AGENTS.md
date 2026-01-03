# AGENTS.md

このファイルは、このリポジトリで作業するエージェントのためのガイドラインです。

## プロジェクト概要

大航海時代3のスフィンクスクイズ攻略ツール。SolidJS + TypeScript + Viteで構築されています。

## コマンド

### パッケージマネージャー

pnpmを使用しています。

### 開発サーバーの起動

```bash
pnpm dev
```

### ビルド

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

### Lintの自動修正

```bash
pnpm lint-fix
```

### プレビュー

```bash
pnpm preview
```

## コードスタイルガイドライン

### TypeScript設定

- strictモードが有効
- `moduleResolution: nodenext`を使用
- `allowImportingTsExtensions: true`により.tsx拡張子のインポートが必要
- `noUnusedLocals`と`noUnusedParameters`が有効（未使用のローカル変数/パラメータはエラー）
- `noFallthroughCasesInSwitch`が有効

### ESLint設定

- `@stylistic/semi`: セミコロン必須
- `@stylistic/indent`: 2スペースインデント
- `@stylistic/comma-dangle`: 複数行の場合は末尾カンマ必須
- `@stylistic/quotes`: シングルクォート
- `@typescript-eslint/no-non-null-assertion`: 非nullアサーション（`!`）禁止

### インポート

- SolidJSのフックを個別にインポート: `import { createSignal, Show } from 'solid-js'`
- 相対パスのインポートでは`.js`拡張子を明示: `import { Question1 } from './components/Question1.js'`
- 明示的なインポート順: 1) 外部ライブラリ, 2) 内部コンポーネント

### コンポーネント

- 関数型コンポーネントのみ使用（クラスコンポーネントは禁止）
- Propsはinterfaceで定義
- Propsはdestructuringではなく`props.propName`でアクセス
- コンポーネント名はPascalCase (例: `Question1`, `App`)
- ファイル名はPascalCase (例: `Question1.tsx`)

### SolidJS固有のルール

- `createSignal`で状態管理
- `createMemo`で計算結果のキャッシュ
- `Show`、`Switch`、`Match`で条件レンダリング
- Signalの呼び出しは`signalName()`で実行
- JSX属性は`class`（`className`ではない）

### 命名規則

- コンポーネント: PascalCase (`Question1`)
- インターフェース/型エイリアス: PascalCase (`Question1Props`)
- 変数/関数: camelCase (`handleNextQuestion`)
- 定数: camelCase (`quizData`)
- CSSクラス: kebab-case (`quiz-container`)

### 型システム

- 型アノテーションは必須
- `any`および`unknown`型の使用禁止
- Propsは明示的なinterface定義
- 可能な限りユニオン型より具体型を使用

### エラーハンドリング

- 非nullアサーション（`!`）禁止
- nullチェックには`??`または`||`演算子を使用
- 条件付きレンダリングには`Show`コンポーネントを使用

### コード構成

- コンポーネントは`src/components/`ディレクトリに配置
- 1コンポーネント1ファイル
- エクスポートされたコンポーネントのみをファイル名に使用

### フォーマット

- インデント: 2スペース
- セミコロン: 必須
- 末尾カンマ: 複数行の場合は必須
- クォート: シングルクォート

### コメント

- TSDoc形式のコメントを使用（日本語）
- インターフェースには説明を付与
- 複雑なロジックには説明コメントを追加

## 実装前の確認事項

1. コードを変更する前に必ず`pnpm run lint`を実行
2. 変更後は`pnpm run lint`と`pnpm run build`でエラーがないことを確認
3. 既存のコンポーネントのパターンに従う
4. 型定義は厳密に守る

## アーキテクチャの原則

- 各問題は独立したコンポーネント（Question1, Question2, ...）として実装
- 状態は各コンポーネント内で管理（Appコンポーネントで集中管理しない）
- ページ遷移のように各問題を切り替える設計
- 再利用可能な小さなコンポーネントを優先

## 注意事項

- pnpmを使用すること
- `.js`拡張子を忘れずに記述すること
- 非nullアサーションを使用しないこと
- lint設定ファイルは変更しないこと
