enchant();

window.onload = function() {

	// ゲーム本体（横幅,高さ)を設定する
    var game = new Game(320, 320);
	
	// 画像を読み込む
    game.preload('chara1.png','icon0.png','gameover.png');

	// ゲームのメイン処理 
    game.onload = function() {

    	 // Spriteの作成（クマ）
    	var bear = new Sprite(32, 32);
        bear.image = game.assets['chara1.png'];
        // 使いたい画像の番号を設定
        bear.frame = 10;
        // 画面に表示する場所を設定
        bear.x = 0;
        bear.y = 0;

    	 // Spriteの作成（アイテム）
    	var item = new Sprite(16, 16);
        item.image = game.assets['icon0.png'];
        // 使いたい画像の番号を設定
        item.frame = 15;
        // 画面に表示する場所を設定
        item.x = 100;
        item.y = 150;

        // Spriteの作成（文字）
    	var label = new Label();
        // 画面に表示する場所を設定
        label.x = 0;
        label.y = 150;
        label.color = 'red';

    	 // Spriteの作成（敵）
    	var enemy = new Sprite(16, 16);
        enemy.image = game.assets['icon0.png'];
        // 使いたい画像の番号を設定
        enemy.frame = 11;
        // 画面に表示する場所を設定
        enemy.x = 200;
        enemy.y = 200;

        // ゲームオーバーした時のシーンを作成する
        var gameOverScene = new Scene();
        gameOverScene.backgroundColor = 'black';

        // ゲームオーバーの画像を作る
        var gameoverImage = new Sprite(189, 97);
        gameoverImage.image = game.assets['gameover.png'];
        // 画像の配置
        gameoverImage.x = 65;
        gameoverImage.y = 112;
        // ゲームオーバーシーンに表示させるようにする
        gameOverScene.addChild(gameoverImage);


        // 毎フレームで実行される処理
        bear.addEventListener('enterframe', function() {
        	// クマを右に移動させる
            this.x += 5;
            this.frame = this.age % 3 + 5;
            // 画面右端に到達したら、x座標を0にする
            if (this.x > 320) {
                this.x = 0;
            }

        	// 十字キーを動かすと上下左右に座標が５ずつ動く
            if (game.input.left) this.x -= 5;
            if (game.input.right) this.x += 5;
            if (game.input.up) this.y -= 5;
            if (game.input.down) this.y += 5;

            // アイテムに衝突したら（短形判定）
            // 文字を表示して、rootSceneから削除する
            if (this.intersect(item)) {
            	label.text = 'げっと〜〜〜〜〜';
            	game.rootScene.removeChild(item);
            }

            // 敵に衝突したら（中心からの距離判定）
            // ゲームオーバーシーンをかぶせる
            // ゲームを終了する
            if (this.within(enemy,20)) {
            	game.pushScene(gameOverScene);
            	game.stop();
            }

        });

        // rootSceneにSpriteをそれぞれ追加して表示されるようにする
        game.rootScene.addChild(bear);
        game.rootScene.addChild(item);
        game.rootScene.addChild(label);
        game.rootScene.addChild(enemy);

     }
    // ゲームのスタート！！
    game.start();

};