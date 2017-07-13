var Ass = Ass || {}
Ass.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'phaser-demo',)

Ass.game.state.add('Boot', game.boot);
Ass.game.state.add('Preload', game.preload);
Ass.game.state.add('MainMenu', game.mainmenu);
Ass.game.state.add('endless'. game.endless);

Ass.game.state.start('boot');