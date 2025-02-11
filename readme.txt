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

SCSSを使っています。
Tailwind CSSのようなモダンな使い勝手を目指しています。
設定値はデフォルトの定義をユーザーが設定できるようにします。

Html属性の命名はCssプロパティの命名にgamism_slideInRight-のようなカスタム名称を付けるようにします。
gamism_slideInRight-animation-duration="1500ms" 

【依頼事項】

・