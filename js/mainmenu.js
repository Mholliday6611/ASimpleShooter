var Ass = Ass || {};

var n;
var s;
var t;
var USER = localStorage.getItem('user');
console.log(USER)
Ass.mainmenu = function(){};

Ass.mainmenu.prototype = {
	create: function(){

		if(USER == null){
			s = this.add.sprite(this.game.width/2, this.game.height * .75, 'signin');
			s.scale.setTo(.75,.75)
			s.anchor.set(0.5);
			s.inputEnabled = true
			s.events.onInputDown.add(login, this)

			function login(s, pointer) {
				this.game.state.start('SignUp');
			}
		}else{
			o = this.add.sprite(this.game.width/2, this.game.height * .75, 'logout');
			o.scale.setTo(.75,.75)
			o.anchor.set(0.5);
			o.inputEnabled =true
			o.events.onInputDown.add(logout, this)

			function logout(o, pointer) {
				localStorage.removeItem('user')
				o.destroy()
				s = this.add.sprite(this.game.width/2, this.game.height * .75, 'signin');
				s.scale.setTo(.75,.75)
				s.anchor.set(0.5);
				s.inputEnabled = true
				s.events.onInputDown.add(login, this)

			function login(s, pointer) {
				this.game.state.start('SignUp');
			}
			}
		}


		t = this.add.sprite(this.game.width/2, this.game.height/4, 'story');
		t.scale.setTo(.75,.75);
		t.anchor.set(0.5);
		t.inputEnabled = true
		t.events.onInputDown.add(story, this)

		function story(t, pointer) {
			this.game.state.start('LevelOne');
		}

		n = this.add.sprite(this.game.width/2, this.game.height/2, 'endlessbutton');
		n.scale.setTo(.75,.75)
		n.anchor.set(0.5);
		n.inputEnabled = true
		n.events.onInputDown.add(end, this)

		function end(n, pointer) {
			this.game.state.start('Endless');
		}


	},
	render: function() {
},
	update: function() {
	}
};