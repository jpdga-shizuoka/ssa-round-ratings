# JPDGA公式大会の募集要項を収集する。

日本で開催された公式戦が試合毎に記録された`./events.json`を参照して、
大会の募集要項(paper)を収集する。

## 入力

1. `EventInfo`の配列が記録された `./events.json`

## DL用URLの作成

1. `EventInfo.jpdga.eventId`を`eventId`とする
1. DL用URLは、大会が開催された年月(`EventInfo.period`)によって生成方法が異なる
    - 2018年3月以前
        - この大会は、収集対象から除外する
    - 2018年4月から2024年12月まで
        - `http://www.jpdga.jp/data/event/<年度>/` + `<eventId>.pdf`
    - 2025年1月以降
        - `https://membership.jpdga.jp/event/<年>/` + `<eventId>.pdf`
1. <年>は文字通り大会が開催された西暦とする
1. <年度>とは4月から翌年3月までを1年とする

## 収集手順

1. `events.json`に記録された全ての`EvetnInfo`要素が対象
1. 各要素から上記手順によりDL用URLを作成
1. DL用URLから募集要項を取得する
1. 全ての`EventInfo`要素に対して、これを繰り返す

## ファイルの保存先

1. 大会が開催された<年>のフォルダに保存する
    - e.g. 2025年に開催された大会なら`./papers/2025`以下に保存する
    - 開催年は、`period`キーから抽出すること
    - ファイル名は、`id`キーの値に変更すること
    - e.g. `./papers/<年>/<id>.pdf`

## プログラム

- nodejs 最新のLTS
- 1ダウンロード毎に一秒の休息をとること
- ダウンロード毎に経過をログとして出力すること

## 補足

`events.json`の詳細は、`./models.js`の`EventInfo`インタフェースを参照すること
