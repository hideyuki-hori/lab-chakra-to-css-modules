---
name: create-todo
description: TODOファイルを作成する
argument-hint: "<issue-number> <worker|researcher|reviewer>"
user-invocable: true
---

# TODOファイル作成

## 引数

- $0: issue番号
- $1: agent種別（worker, researcher, reviewer）

## 保存先

.claude/todos/issue-$0-$1.md

## テンプレート

docs/migration-work.md のTODOテンプレートを参照して作成する。
