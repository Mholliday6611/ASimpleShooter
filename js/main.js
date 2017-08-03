var Ass = Ass || {}
Ass.game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '')

Ass.game.state.add('Boot', Ass.Boot);
Ass.game.state.add('Preload', Ass.Preload);
Ass.game.state.add('MainMenu', Ass.mainmenu);
Ass.game.state.add('SignUp', Ass.signup);
Ass.game.state.add('Endless', Ass.endless);
Ass.game.state.add('LevelOne', Ass.levelone);

Ass.game.state.start('Boot');