# .claudeフォルダ 削除可否リスト

## 今すぐ削除可能

```bash
rm .claude/skills/init-project.md
```

理由: プロジェクト初期化は完了済み

## CSS Modules移行完了後に削除可能

```bash
rm .claude/skills/check-chakra.md
rm .claude/rules
```

理由: Chakra UI専用のため、移行後は不要

## 残すべきファイル

- `.claude/settings.local.json` - ビルドコマンド許可設定
- `.claude/skills/dev.md` - 開発サーバー起動用
- `.claude/skills/worktree-setup/` - 汎用的なworktree作成スキル
- `.claude/skills/README.md` - スキルの説明

## 更新を検討すべきファイル

以下はCSS Modules用に内容を書き換えれば再利用可能:

- `.claude/skills/create-component.md`
- `.claude/skills/create-page.md`
- `.claude/skills/add-mock-data.md`
- `.claude/rules` (削除ではなく更新推奨)
