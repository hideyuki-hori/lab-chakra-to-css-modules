# このrepoについて

Next.js+ChakraUIプロジェクトのChakraを排し、CSS Modulesへ移行する実験をする。
主なstackは次の通り。

- next: 16.1.3 
- react: 19.2.3
- react-dom: 19.2.3
- react-hook-form: ^7.71.1
- react-icons: ^5.5.0
- typescript: 5.9.3 

なおpage routerを使用する。

# 削除したいライブラリ

- @chakra-ui/icons: ^2.2.4
- @chakra-ui/react: ^2.8.2
- @emotion/cache: ^11.13.1
- @emotion/react: ^11.14.0
- @emotion/styled: ^11.14.1
- framer-motion: ^12.27.1

# 実験の流れ

1. projectの仕様を決める
2. chakra-uiを使用して仕様通りのappを作成
3. chakra-uiからCSS Modulesへの移行計画を立てる
4. CSS Modulesを使用して既存のUIを置き換えしchakra-ui関連を削除する

scriptが必要になった場合はnodeもしくはshellで作成しscripts/フォルダに配置すること。
TypeScriptが望ましい。

# step1. projectの仕様を決める

mainブランチで作業する。
page数は10page。
テーマおよびページ仕様はclaude codeが決めること。
chakra-uiに依存した構成にすること。
以下のものを一回以上使うこと。
```
Box, Text, Flex, Input, Image, Modal*, FormControl, Link, VStack/HStack, Button, Alert, Tooltip, Table*, Tabs*, Textarea, Checkbox, Radio, Menu*, Avatar, Badge
```

framer-motionを使ったアニメーションも使用すること。
仕様を決めてstep1.mdというファイルを出力すること。

# step2. chakra-uiを使用して仕様通りのappを作成

mainブランチからchakra-baselineブランチを作成する。
chakra-uiを使用して(詳しいバージョンや使用するlibsは削除したいライブラリ項を参照すること)仕様通りのappを作成する。
作業後にmainにmergeする。
このブランチは移行前のスナップショットとして保持するので、削除しない。

# step3. chakra-uiからCSS Modulesへの移行計画を立てる

どの単位で移行するかを検討する。
検討内容はstep3.mdに書き出す。
タスクは1issueとし、各issueを作成する。
https://github.com/hideyuki-hori/lab-chakra-to-css-modules/issues

issueのtitleには日本語でわかりやすい作業名を書く。
descriptionに作業詳細を記入する。

# step4. CSS Modulesを使用して既存のUIを置き換えしchakra-ui関連を削除する

CSS Modulesを使用して既存のUIを置き換えしchakra-ui関連を削除する。
作業は次のように行う。

1. mainブランチからissue-<number>ブランチを作成
2. 影響範囲を確認する
3. globalにinstallしているagent-browserで影響範囲すべてのスクリーンショットを取得する
  - 保存先: screenshots/<issue-number>/
  - ファイル名: <page-name>-before.png
4. タスクのリストにある作業内容を元に作業する
5. 動作確認（インタラクション、レスポンシブ対応など）
6. globalにinstallしているagent-browserで影響範囲すべてのスクリーンショットを取得する
  - 保存先: screenshots/<issue-number>/
  - ファイル名: <page-name>-after.png
7. before/afterのスクリーンショットを横並びに合成する
8. issueに貼り付ける
9. PRを作成
10. merge
11. git checkout main && git pull

issueがなくなるまで続ける。

# 成果物

- step1.md - プロジェクト仕様
- step3.md - 移行計画とタスク分割
- screenshots/ - 移行前後の比較画像
- GitHub Issues - 各タスクの進捗管理
- chakra-baselineブランチ - Chakra UI版のスナップショット
- mainブランチ - CSS Modules移行完了版