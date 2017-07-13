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

	},
	create: function(){
		this.state.start('MainMenu');
	}
}