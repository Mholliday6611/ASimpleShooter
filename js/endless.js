var Ass = Ass || {};

var player;
var greenEnemies;
var blueEnemies;
var enemyBullets;
var starfield;
var cursors;
var bank;
var shipTrail;
var explosions;
var playerDeath;
var bullets;
var fireButton;
var bulletTimer = 0;
var shields;
var score = 0;
var scoreText
var greenEnemyLaunchTimer;
var greenEnemySpacing =1000;
var powerUpSpacing = 1000;
var blueEnemyLaunchTimer;
var blueEnemyLaunched = false;
var blueEnemySpacing = 2500;
var bossLaunchTimer;
var bossLaunched = false;
var bossSpacing = 20000;
var bossBulletTimer = 0;
var bossYdirection = -1;
var gameOver;
var collectables;
var gun = [];
var collectable;

var ACCLERATION = 2500;
var DRAG = 10;
var MAXSPEED = 2500;

Ass.endless = function(){};

Ass.endless.prototype = {
	create: function() {
	    

		starfield = this.add.tileSprite(0,0,window.innerWidth, window.innerHeight, 'starfield');


		player = this.add.sprite(this.world.centerX - this.world.centerX + 100, this.world.centerY, 'ship');
		player.health = 100;
		player.scale.setTo(1.5,1.5)
		player.angle = 90;
		player.anchor.setTo(0.5,0.5);
		this.physics.enable(player, Phaser.Physics.ARCADE);
		player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
		player.body.drag.setTo(DRAG, DRAG);
        player.body.collideWorldBounds = true;

        greenEnemies = this.add.group();
        greenEnemies.enableBody = true;
        greenEnemies.physicsBodyType = Phaser.Physics.ARCADE;
        greenEnemies.createMultiple(5, 'enemy-green');
        greenEnemies.setAll('anchor.x', 0.5);
        greenEnemies.setAll('anchor.y', 0.5);
        greenEnemies.setAll('scale.x', 1.2);
        greenEnemies.setAll('scale.y', 1.2);
        greenEnemies.setAll('angle', -90);


		bullets = this.add.group();
	    bullets.enableBody = true;
	    bullets.physicsBodyType = Phaser.Physics.ARCADE;
	    bullets.createMultiple(30, 'bullet');
	    bullets.setAll('anchor.x', 0.5);
	    bullets.setAll('anchor.y', 1);
	    bullets.setAll('outOfBoundsKill', true);
	    bullets.setAll('checkWorldBounds', true);

        bulletsTYPE2 = this.add.group();
        bulletsTYPE2.enableBody = true;
        bulletsTYPE2.physicsBodyType = Phaser.Physics.ARCADE;
        bulletsTYPE2.createMultiple(30, 'bullet');
        bulletsTYPE2.setAll('tint', 0Xbc1836)
        bulletsTYPE2.setAll('scale.x', 3)
        bulletsTYPE2.setAll('scale.y', 3)
        bulletsTYPE2.setAll('anchor.x', 0.5);
        bulletsTYPE2.setAll('anchor.y', 1);
        bulletsTYPE2.setAll('outOfBoundsKill', true);
        bulletsTYPE2.setAll('checkWorldBounds', true);
        // this.launchGreenEnemy();
        //POWERUP LAME 
        collectables = this.add.group();
        collectables.enableBody = true;
        collectables.physicsBodyType = Phaser.Physics.ARCADE;
        

        powerUpTimer = this.time.create(false);
        powerUpTimer.loop(this.rnd.integerInRange(10000, 60000), this.launchPowerUp, this);
        powerUpTimer.start();

        //POWERUP SPEAR
        collectablesTYPE2 = this.add.group();
        collectablesTYPE2.enableBody = true;
        collectablesTYPE2.physicsBodyType = Phaser.Physics.ARCADE;
        

        powerUpTimerSpear = this.time.create(false);
        powerUpTimerSpear.loop(this.rnd.integerInRange(10000, 60000), this.launchPowerUpSpear, this);
        powerUpTimerSpear.start();

        //score
        scoreText = this.add.bitmapText(10,10, 'spacefont', '', 50);
        scoreText.render = function(){
        scoreText.text = 'Score: ' + score;
                };
        scoreText.render();
        
        
	},

	update: function(){
    	starfield.tilePosition.x -=6;
        player.body.acceleration.y = 0;

        

        if(this.input.pointer1.isDown){
            if(this.input.pointer1.x>this.world.centerX){
                if(gun[0] == "Spear"){
                        if (this.time.now > bulletTimer){
                        var BULLET_SPEED = 300;
                        var BULLET_SPACING = 760;
                        for (var i = 0; i < 3; i++) {
                    var bullet = bulletsTYPE2.getFirstExists(false);
                    player.rotation = 1.5708+this.physics.arcade.angleBetween(player, this.input.pointer1)
                    if(bullet) {
                         var bulletOffset = 20 * Math.sin(this.math.degToRad(player.angle));
                            bullet.reset(player.x + bulletOffset, player.y);
                            bullet.angle = player.angle;
                            this.physics.arcade.velocityFromAngle(bullet.angle - 90, BULLET_SPEED, bullet.body.velocity);
                            bullet.body.velocity.x += player.body.velocity.x;

                            bulletTimer = this.time.now + BULLET_SPACING;
                    }
                    bulletTimer = this.time.now + BULLET_SPACING;
                }
            }
        }    
                        if(gun[0] == "Lame"){
                        if (this.time.now > bulletTimer){
                        var BULLET_SPEED = 700;
                        var BULLET_SPACING = 500;
                        for (var i = 0; i < 3; i++) {
                    var bullet = bullets.getFirstExists(false);
                    player.rotation = 1.5708+this.physics.arcade.angleBetween(player, this.input.pointer1)
                    if(bullet) {
                        var bulletOffset = 20 * Math.sin(this.math.degToRad(player.angle));
                        bullet.reset(player.x + bulletOffset, player.y);

                        var spreadAngle;
                        if (i === 0) spreadAngle = -20;
                        if (i === 1) spreadAngle = 0;
                        if (i === 2) spreadAngle = 20;
                        bullet.angle = player.angle + spreadAngle;
                        this.physics.arcade.velocityFromAngle(spreadAngle, BULLET_SPEED, bullet.body.velocity);
                        bullet.body.velocity.x += player.body.velocity.x;
                    }
                    bulletTimer = this.time.now + BULLET_SPACING;
                }
            }
        }else {
                        if (this.time.now > bulletTimer){
                        var BULLET_SPEED = 400;
                        var BULLET_SPACING = 400;
                        var bullet = bullets.getFirstExists(false);
                        player.rotation = 1.5708+this.physics.arcade.angleBetween(player, this.input.pointer1)
                        if (bullet)
                        {//  And fire it
                             var bulletOffset = 20 * Math.sin(this.math.degToRad(player.angle));
                            bullet.reset(player.x + bulletOffset, player.y);
                            bullet.angle = player.angle;
                            this.physics.arcade.velocityFromAngle(bullet.angle - 90, BULLET_SPEED, bullet.body.velocity);
                            bullet.body.velocity.x += player.body.velocity.x;

                            bulletTimer = this.time.now + BULLET_SPACING;
                        }
                    }
                }
            }            
            else{
                var minDist = 200;
                var dist = this.input.pointer1.y - player.y;
                player.body.velocity.y = MAXSPEED * this.math.clamp(dist/ minDist, -1,1 );
            }
    }
    if(this.input.pointer2.isDown){
            if(this.input.pointer2.x>this.world.centerX){
                if(gun[0] == "Spear"){
                            if (this.time.now > bulletTimer){
                            var BULLET_SPEED = 300;
                            var BULLET_SPACING = 760;
                            for (var i = 0; i < 3; i++) {
                        var bullet = bulletsTYPE2.getFirstExists(false);
                        player.rotation = 1.5708+this.physics.arcade.angleBetween(player, this.input.pointer1)
                        if(bullet) {
                             var bulletOffset = 20 * Math.sin(this.math.degToRad(player.angle));
                                bullet.reset(player.x + bulletOffset, player.y);
                                bullet.angle = player.angle;
                                this.physics.arcade.velocityFromAngle(bullet.angle - 90, BULLET_SPEED, bullet.body.velocity);
                                bullet.body.velocity.x += player.body.velocity.x;

                                bulletTimer = this.time.now + BULLET_SPACING;
                        }
                        bulletTimer = this.time.now + BULLET_SPACING;
                    }
                }
            }    
                        if(gun[0] == "Lame"){
                             if (this.time.now > bulletTimer){
                        var BULLET_SPEED = 700;
                        var BULLET_SPACING = 500;
                        for (var i = 0; i < 3; i++) {
                    var bullet = bullets.getFirstExists(false);
                    player.rotation = 1.5708+this.physics.arcade.angleBetween(player, this.input.pointer2)
                    if(bullet) {
                        var bulletOffset = 20 * Math.sin(this.math.degToRad(player.angle));
                        bullet.reset(player.x + bulletOffset, player.y);

                        var spreadAngle;
                        if (i === 0) spreadAngle = -20;
                        if (i === 1) spreadAngle = 0;
                        if (i === 2) spreadAngle = 20;
                        bullet.angle = player.angle + spreadAngle;
                        this.physics.arcade.velocityFromAngle(spreadAngle, BULLET_SPEED, bullet.body.velocity);
                        bullet.body.velocity.x += player.body.velocity.x;
                    }
                    bulletTimer = this.time.now + BULLET_SPACING;
                }
            }
        }else {
                        if (this.time.now > bulletTimer){
                        var BULLET_SPEED = 400;
                        var BULLET_SPACING = 375;
                        var bullet = bullets.getFirstExists(false);
                        player.rotation = 1.5708+this.physics.arcade.angleBetween(player, this.input.pointer2)
                        if (bullet)
                        {//  And fire it
                             var bulletOffset = 20 * Math.sin(this.math.degToRad(player.angle));
                            bullet.reset(player.x + bulletOffset, player.y);
                            bullet.angle = player.angle;
                            this.physics.arcade.velocityFromAngle(bullet.angle - 90, BULLET_SPEED, bullet.body.velocity);
                            bullet.body.velocity.x += player.body.velocity.x;

                            bulletTimer = this.time.now + BULLET_SPACING;
                        }
                    }
                }
            }            
            else{
                var minDist = 200;
                var dist = this.input.pointer2.y - player.y;
                player.body.velocity.y = MAXSPEED * this.math.clamp(dist/ minDist, -1,1 );
            }
    }
    //overlapping between player and collectables
    this.game.physics.arcade.overlap(player, collectables, this.collect, null, this);
    this.game.physics.arcade.overlap(player, collectablesTYPE2, this.collectTYPE2, null, this);
},
    launchPowerUp: function() {
        console.log("start")
        collectables.createMultiple(5, 'power');
        var powerz = collectables.getFirstExists(false);
        if (powerz) {
            powerz.reset(this.world.centerX + this.world.centerX, this.rnd.integerInRange(this.world.centerY-this.world.centerY, this.world.centerY +this.world.centerY));
            powerz.animations.add('fly', [0, 1, 2, 3], 5, true);
            powerz.animations.play('fly');
            powerz.body.velocity.x = -250;
            (console.log(powerz))
        

            powerz.update = function(){
                if (powerz.x < this.world.centerX - this.world.centerX) {
                    powerz.kill()
                }
      }
      // this.time.events.add(1000, this.launchPowerUp())


}

 },
 launchPowerUpSpear: function() {
        console.log("start")
        collectablesTYPE2.createMultiple(5, 'power');
        var powerz = collectablesTYPE2.getFirstExists(false);
        powerz.tint = 0Xbc1836 
        if (powerz) {
            powerz.reset(this.world.centerX + this.world.centerX, this.rnd.integerInRange(this.world.centerY-this.world.centerY, this.world.centerY +this.world.centerY));
            powerz.animations.add('fly', [0, 1, 2, 3], 5, true);
            powerz.animations.play('fly');
            powerz.body.velocity.x = -400;
            (console.log(powerz))
        

            powerz.update = function(){
                if (powerz.x < this.world.centerX - this.world.centerX) {
                    powerz.kill()
                }
      }
      // this.time.events.add(1000, this.launchPowerUp())


}

 },
    collect: function(player, collectable) {
        //play collect sound
        // this.collectSound.play();

        //update score
        score += 1;
        scoreText.render();
        gun.shift()
        gun.push("Lame")

        //remove sprite
        collectable.destroy();
      },
    collectTYPE2: function(player, collectable) {
        //play collect sound
        // this.collectSound.play();

        //update score
        score += 1;
        scoreText.render();
        gun.shift()
        gun.push("Spear")

        //remove sprite
        collectable.destroy();
      },


}
