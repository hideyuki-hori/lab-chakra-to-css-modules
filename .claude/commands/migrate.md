---
description: issueの移行作業を実行する
argument-hint: "<issue-number>"
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, Task
---

# Issue #$ARGUMENTS の移行作業

docs/migration-work.md の手順に従って作業を実行する。

## 手順

1. issue番号からPhaseを判定
   - #171-187: Phase 1（src/components/ui作成）
   - #188-193: Phase 2（src/components/*置き換え）
   - #194-205: Phase 3（src/pages/*置き換え）
   - #206: Phase 4（Chakra UI削除）

2. 作業ブランチを作成
   ```bash
   git checkout migration
   git pull
   git checkout -b issue-$ARGUMENTS
   ```

3. 該当Phaseの手順を実行

4. **スクリーンショット取得（必須）**
   - 作業完了後、比較ページのスクリーンショットを取得
   - スクリーンショットがない場合はPRを作成しない
   ```bash
   mkdir -p screenshots/issue-$ARGUMENTS
   agent-browser --cdp 9222 open "http://localhost:3000/compare/<Component>"
   agent-browser --cdp 9222 screenshot "/Users/h/lab-chakra-to-css-modules/screenshots/issue-$ARGUMENTS/compare-<component>.png" --full
   ```

5. 完了後、PRを作成

## 参照

- docs/migration-work.md
- docs/migration-plan.md
- .claude/rules/migration.md
