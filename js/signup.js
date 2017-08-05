var Ass = Ass || {};

var username;
var password;
var passwordField
var usernameField
var login;
var register;
Ass.signup = function(){};

Ass.signup.prototype = {
	create: function(){
		this.add.plugin(PhaserInput.Plugin);

		var text = "LOGIN HERE";
    	var style = { font: "30px Arial", fill: "#fff", align: "center" };
    	var t = this.game.add.text(this.game.width/2, this.game.height/10, text, style);
    	t.anchor.set(0.5);

    	//USERNAME FIELD FOR LOGIN
    	usernameField = this.add.sprite(this.game.width/2, this.game.height * .25, 'field');
    	usernameField.anchor.set(0.5)

    	username = this.add.inputField(this.game.width/2 -275, this.game.height * .25 - 17, {
                font: '16px Arial',
                fill: '#212121',
                fillAlpha: 0,
                fontWeight: 'bold',
                // forceCase: PhaserInput.ForceCase.upper,
                width: 500,
                max: 20,
                padding: 8,
                borderWidth: 1,
                borderColor: 'red',
                borderRadius: 6,
                placeHolder: 'Username',
                textAlign: 'center',
                // zoom: true
            });
    	username.anchor.set(0.5)
        username.blockInput = false;



    	//PASSWORD FIELD FOR LOGIN
    	passwordField = this.add.sprite(this.game.width/2, this.game.height * .5, 'field');
    	passwordField.anchor.set(0.5)

    	password = this.add.inputField(this.game.width/2 -275, this.game.height * .5 - 17, {
                font: '16px Arial',
                fill: '#212121',
                fillAlpha: 0,
                fontWeight: 'bold',
                // forceCase: PhaserInput.ForceCase.upper,
                width: 500,
                max: 20,
                padding: 8,
                borderWidth: 1,
                borderColor: 'red',
                borderRadius: 6,
                placeHolder: 'PASSWORD',
                type: PhaserInput.InputType.password,
                textAlign: 'center',
                // zoom: true
            });
    	password.anchor.set(0.5)
        // password.setText('Password');
        // password.blockInput = false;

    	//LOGIN BUTTON SEND POST HTTP REQUEST THEN REDIRECT TO MAIN MENU
    	login = this.add.sprite(this.game.width/2, this.game.height * .70, 'login');
    	login.anchor.set(0.5);
		login.inputEnabled = true
		login.events.onInputDown.add(loginFunc, this)
		login.scale.setTo(.75,.75)

		function loginFunc(login, pointer) {
			console.log("LOGIN START")
			axios.post('https://dreamchaserssite.herokuapp.com/user-login', {
				username: username.value,
				password: password.value
			})
			.then(function (response) {
				console.log(response);
				localStorage.setItem('user', JSON.stringify(response.data));
				USER = localStorage.getItem('user');
				Ass.game.state.start('MainMenu');
			})
			.catch(function (error) {
				console.log(error);
			});

		}	

    	// SEND USERS TO REGISTER PAGE
		register = this.add.sprite(this.game.width/2, this.game.height * .90, 'register');
		register.scale.setTo(.75,.75)
		register.anchor.set(0.5);
		register.inputEnabled = true
		register.events.onInputDown.add(signup, this)

		function signup(register, pointer) {
			window.open("https://dreamchaserssite.herokuapp.com/#!/", "_blank")
		}		
	},
	render: function() {
},
	update: function() {
	}
};