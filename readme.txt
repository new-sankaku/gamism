【コードの説明】

これはアニメーションを担当するオープンソースライブラリの一部です。

アニメーションは複数設定が可能です。設定値もここで変更できます。

例

<div class="temp_box gamism_init gamism_slideInRight gamism_flipLeft" 

     gamism_slide-duration="800ms" 

     gamism_slide-timing="ease-in"

     gamism_flip-duration="1200ms"></div>

各css、変数、関数(クラス化された場合は別)の名称の前にgamism_を付ける必要があります。

gamism_は変更できません。

gamismはフェミフィケーションとイズムを組み合わせた造語です。

CSSは量が大きくなる時はSCSSで

cssはスペースで調整して上下で見やすく揃えています。

既存のコードの整形は勝手にやらないこと。

Tailwind CSSのようなモダンな使い勝手を目指しています。

設定値はデフォルトの定義をユーザーが設定できるようにします。

【依頼事項】

・TSのメンテナンス性が悪い。

設定より規約の考え方にしましょう。 

cssクラス名と設定値名が暗黙的に一致するならいちいち条件分岐を追加しなくても良いのでは？今後、アニメーションの処理が増えてもanimate関数は可能な限り変更を加えたくありません。

こんな決め打ちで書くのはおかしいですよね？

   const baseType: string = type.includes('slide') ? 'slide' : 
                    type.includes('flip') ? 'flip' : '';

これはdurationがどうとかtimingがどうとかいちいち取らないといけないの？パラメータが増えたらここも増やさないといけなくなる。

   const dataDuration: string | null = element.getAttribute(`gamism_${baseType}-duration`);
   const dataTiming: string | null = element.getAttribute(`gamism_${baseType}-timing`);

ここも同じく、パラメータが増えたら値が増えてしまう。

    if (dataDuration) {
     css += ` ${dataDuration}`;
    } else {
     css += ` var(--gamism_${baseType}_duration)`;
    }