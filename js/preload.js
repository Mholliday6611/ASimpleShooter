var Ass = Ass || {};

Ass.Preload = function(){};

Ass.Preload.prototype = {
	preload: function(){
		this.splash = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
		this.splash.anchor.setTo(0.5);

		this.preloadBar= this.add.sprite(this.game.worldX, this.game.world.centerY+ 128, 'preloadbar');
		this.preloadBar.anchor.setTo(0.5);

		this.load.setPreloadSprite(this.preloadBar);

		//load in assets for game
		 this.load.image('1','assets/gif/cutegif.gif');
		 this.load.image('2','assets/gif/cute2.gif');
		 this.load.image('3','assets/gif/clown.gif');
		 this.load.image('4','assets/gif/darkestestgif.gif');
		 this.load.image('5','assets/gif/darkestgif.gif');
		 this.load.image('starfield', 'assets/images/starfield.png');
		 this.load.image('ship', 'assets/images/player.png');
		 this.load.image('bullet', 'assets/images/bullet.png');
		 this.load.image('enemy-green', 'assets/images/enemy-green.png');
		 this.load.image('enemy-blue', 'assets/images/enemy-blue.png');
		 this.load.image('blueEnemyBullet', 'assets/images/enemy-blue-bullet.png');
		 this.load.spritesheet('explosion', 'assets/images/explode.png', 128,128);
		 this.load.image('power1', 'assets/png/life.png');
		 this.load.spritesheet('power', 'assets/images/power.png', 12, 12);
		 this.load.bitmapFont('spacefont', 'assets/spacefont/spacefont.png', 'assets/spacefont/spacefont.xml');
		 this.load.image('boss', 'assets/images/boss.png');
		 this.load.image('deathRay', 'assets/images/death-ray.png');
		 this.load.image('redshot', 'assets/png/laserRedShot.png');
		 this.load.audio('lit', 'assets/music/1-26-16_brass_trap.mp3');
	},
	create: function(){
		this.state.start('MainMenu');
	}
}