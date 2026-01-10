# JPDGA公開のコースマップを収集する。

日本で開催された公式戦が試合毎に`./events.json`に保存されている。
試合の際に使用されたコースレイアウトは`layout`キーに記録されている。
その`layout`キーで指定されるリソースをダウンロードする。

## 入力

`./events.json`

## 出力

ダウンロードされたリソースは、以下の仕様に基づいて分類する:

1. `./layouts`フォルダ以下に保存
1. 大会が開催された年のフォルダに保存する
    - e.g. 2025年に開催された大会なら`./layouts/2025`以下に保存する
    - 開催年は、`period`キーから抽出すること
    - ファイル名は、`id`キーの値に変更すること
    - 一つの大会に二つ以上のリソースが指定されている場合
        - 'Layouts'インタフェースのキー名を、ファイル名の後ろに'-'に続いて追加し、ファイル名の重複を避けること
1. `layout`キーが指定されていない時
    - デフォルトのURLを作成しDLを試みること
        - `jpdga.eventId`キーの値を`eventId`とするとデフォルトURLは
            - `http://www.jpdga.jp/data/event/<年度>/<eventId>_map.pdf`
        - なお<年度>はいわゆる日本の年度形式で、`period`キーから<年度>を算出すること
            - 4月から翌年の3月までを年度の範囲とする
            - e.g. 2020年3月に開催された<年度>は2020年ではなく2019年になる
1. 例外:
    - `jpdga-shizuoka.github.io`ドメインはDL対象から除外すること
    - ファイル名が指定されていないurl
        - e.g. `https://drive.google.com/file/d/1qDP2wxKV_QE06sMwEbXTooeDD3C4dTiH/view`
        - e.g. `https://udisc.com/courses/michinoku-park-NI0L/layouts?selectedLayoutId=111230`
    

## プログラム

- nodejs 最新のLTS
- 1ダウンロード毎に一秒の休息をとること
- ダウンロード毎に経過をログとして出力すること

## 補足

`events.json`の詳細は、`./models.js`の`EventInfo`インタフェースを参照すること
