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

var wavetime = 5000

var ACCLERATION = 2500;
var DRAG = 10;
var MAXSPEED = 2500;


Ass.endless = function(){};

Ass.endless.prototype = {

	create: function() {

		starfield = this.add.tileSprite(0,0,window.innerWidth, window.innerHeight, 'starfield');


        // music = this.add.audio('lit');

        music = new Phaser.Sound(this, 'lit',1, true);

        music.play();



		player = this.add.sprite(this.world.centerX - this.world.centerX + 100, this.world.centerY, 'ship');
		player.health = 5;
		player.scale.setTo(1.5,1.5)
		player.angle = 90;
		player.anchor.setTo(0.5,0.5);
		this.physics.enable(player, Phaser.Physics.ARCADE);
		player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
		player.body.drag.setTo(DRAG, DRAG);
        player.body.collideWorldBounds = true;

        playerDeath = this.add.emitter(player.x, player.y);
        playerDeath.width = 50;
        playerDeath.height = 50;
        playerDeath.makeParticles('explosion', [0,1,2,3,4,5,6,7], 10);
        playerDeath.setAlpha(0.9, 0, 800);
        playerDeath.setScale(0.1, 0.6, 0.1, 0.6, 1000, Phaser.Easing.Quintic.Out);

         gameOver = this.add.bitmapText(this.world.centerX,this.world.centerY, 'spacefont', 'GAME OVER!', 110);
        gameOver.x = gameOver.x - gameOver.textWidth /2;
        gameOver.y = gameOver.y - gameOver.textHeight / 3;
        gameOver.visible = false;

        shipTrail = this.add.emitter(player.x +10, player.y, 400);
        shipTrail.width = 10;
        shipTrail.makeParticles('bullet');
        shipTrail.setYSpeed(30, -30);
        shipTrail.setXSpeed(-400, -200);
        shipTrail.setRotation(-50, 50);
        shipTrail.setAlpha(1, 0.01, 10000);
        shipTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000,Phaser.Easing.Quintic.Out);
        shipTrail.start(false, 5000, 10);


		bullets = this.add.group();
	    bullets.enableBody = true;
	    bullets.physicsBodyType = Phaser.Physics.ARCADE;
	    bullets.createMultiple(500, 'bullet');
	    bullets.setAll('anchor.x', 0.5);
	    bullets.setAll('anchor.y', 1);
	    bullets.setAll('outOfBoundsKill', true);
	    bullets.setAll('checkWorldBounds', true);

        bulletsTYPE2 = this.add.group();
        bulletsTYPE2.enableBody = true;
        bulletsTYPE2.physicsBodyType = Phaser.Physics.ARCADE;
        bulletsTYPE2.createMultiple(500, 'bullet');
        bulletsTYPE2.setAll('tint', 0Xbc1836);
        bulletsTYPE2.setAll('scale.x', 3)
        bulletsTYPE2.setAll('scale.y', 3)
        bulletsTYPE2.setAll('anchor.x', 0.5);
        bulletsTYPE2.setAll('anchor.y', 1);
        bulletsTYPE2.setAll('outOfBoundsKill', true);
        bulletsTYPE2.setAll('checkWorldBounds', true);
        bulletsTYPE2.forEach(function(bullet){
            // bullet.body.setSize()
        });

        bulletsTYPE3 = this.add.group();
        bulletsTYPE3.enableBody = true;
        bulletsTYPE3.physicsBodyType = Phaser.Physics.ARCADE;
        bulletsTYPE3.createMultiple(500, 'redshot');
        bulletsTYPE3.setAll('anchor.x', 0.5);
        bulletsTYPE3.setAll('anchor.y', 1);
        bulletsTYPE3.setAll('outOfBoundsKill', true);
        bulletsTYPE3.setAll('checkWorldBounds', true);

        greenEnemies = this.add.group();
        greenEnemies.enableBody = true;
        greenEnemies.physicsBodyType = Phaser.Physics.ARCADE;
        greenEnemies.createMultiple(500, 'enemy-green');
        greenEnemies.setAll('anchor.x', 0.5);
        greenEnemies.setAll('anchor.y', 0.5);
        greenEnemies.setAll('scale.x', 0.8);
        greenEnemies.setAll('scale.y', 0.8);
        greenEnemies.setAll('angle', -90);
        greenEnemies.forEach(function(enemy){
            // addEnemyEmitterTrail(enemy);
            // enemy.body.setSize(enemy.width * 3/4, enemy.height * 3/4);
            enemy.damageAmount =1;
            // enemy.events.onKilled.add(function(){
            //     enemy.trail.kill();
            // });
        });

        blueEnemyBullets = this.add.group();
        blueEnemyBullets.enableBody = true;
        blueEnemyBullets.physicsBodyType = Phaser.Physics.ARCADE;
        blueEnemyBullets.createMultiple(500,'blueEnemyBullet');
        blueEnemyBullets.callAll('crop', null, {x:90, y: 0, width: 90, height:70});
        blueEnemyBullets.setAll('alpha', 0.9);
        blueEnemyBullets.setAll('anchor.x', 0.5);
        blueEnemyBullets.setAll('anchor.y', 0.5);
        blueEnemyBullets.setAll('outOfBoundsKill', true);
        blueEnemyBullets.setAll('checkWorldBounds', true);
        blueEnemyBullets.forEach(function(enemy){
            enemy.body.setSize(20,20);
        });

        blueEnemies = this.add.group();
        blueEnemies.enableBody = true;
        blueEnemies.physicsBodyType = Phaser.Physics.ARCADE;
        blueEnemies.createMultiple(500, 'enemy-blue');
        blueEnemies.setAll('anchor.x', 0.5);
        blueEnemies.setAll('anchor.y', 0.5);
        blueEnemies.setAll('scale.x',0.5);
        blueEnemies.setAll('scale.y', 0.5);
        blueEnemies.setAll('angle', -90);
        blueEnemies.forEach(function(enemy){
            enemy.damageAmount = 1;
        });


        //EXPLOSION
        explosions = this.add.group();
        explosions.enableBody = true;
        explosions.physicsBodyType = Phaser.Physics.ARCADE;
        explosions.createMultiple(30, 'explosion');
        explosions.setAll('anchor.x', 0.5);
        explosions.setAll('anchor.y', 0.5);
        explosions.forEach(function(explosion) {
            explosion.animations.add('explosion');
        });


        //GREEN ENEMY TIMER
        // greenEnemyTimer = this.time.create(false);
        // greenEnemyTimer.loop(this.rnd.integerInRange(100, 4500), this.launchGreenEnemy, this);
        // greenEnemyTimer.start();
        this.time.events.add(Phaser.Timer.SECOND * 4, this.launchGreenEnemy, this);

        //BlUE ENEMY TIMER

        // blueEnemyTimer = this.time.create(false);
        // blueEnemyTimer.loop(this.rnd.integerInRange(100, 5000), this.launchBlueEnemy, this);
        
        
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

        //POWERUP RED
        collectablesTYPE3 = this.add.group();
        collectablesTYPE3.enableBody = true;
        collectablesTYPE3.physicsBodyType = Phaser.Physics.ARCADE;

        powerUpTimerRed = this.time.create(false);
        powerUpTimerRed.loop(this.rnd.integerInRange(10000, 60000), this.launchPowerUpRed, this);
        powerUpTimerRed.start();


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
                if(gun[0] == "Red"){
                        if (this.time.now > bulletTimer){
                        var BULLET_SPEED = 600;
                        var BULLET_SPACING = 1000;
                        for (var i = 0; i < 5; i++) {
                    var bullet = bulletsTYPE3.getFirstExists(false);
                    player.rotation = 1.5708+this.physics.arcade.angleBetween(player, this.input.pointer1)
                    if(bullet) {
                         var bulletOffset = 20 * Math.sin(this.math.degToRad(player.angle));
                            bullet.reset(player.x + bulletOffset, player.y);
                            var spreadAngle;
                            if (i === 0) spreadAngle = -5;
                            if (i === 1) spreadAngle = -2;
                            if (i === 2) spreadAngle = 0;
                            if (i === 3) spreadAngle = 2;
                            if (i === 3) spreadAngle = -5;
                            bullet.angle = player.angle + spreadAngle;
                            this.physics.arcade.velocityFromAngle(bullet.angle - 90, BULLET_SPEED, bullet.body.velocity);
                            bullet.body.velocity.x += player.body.velocity.x;
                            bulletTimer = this.time.now + BULLET_SPACING;
                    }
                }
            }
        }    
                if(gun[0] == "Spear"){
                        if (this.time.now > bulletTimer){
                        var BULLET_SPEED = 400;
                        var BULLET_SPACING = 1000;
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
            }
        }    
                        if(gun[0] == "Lame"){
                        if (this.time.now > bulletTimer){
                        var BULLET_SPEED = 700;
                        var BULLET_SPACING = 1000;
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
                        bulletTimer = this.time.now + BULLET_SPACING;
                    }

                }
            }
        }else {
                        if (this.time.now > bulletTimer){
                        var BULLET_SPEED = 500;
                        var BULLET_SPACING = 800;
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
                if(gun[0] == "Red"){
                        if (this.time.now > bulletTimer){
                        var BULLET_SPEED = 600;
                        var BULLET_SPACING = 1000;
                        for (var i = 0; i < 5; i++) {
                    var bullet = bulletsTYPE3.getFirstExists(false);
                    player.rotation = 1.5708+this.physics.arcade.angleBetween(player, this.input.pointer2)
                    if(bullet) {
                         var bulletOffset = 20 * Math.sin(this.math.degToRad(player.angle));
                            bullet.reset(player.x + bulletOffset, player.y);
                            var spreadAngle;
                            if (i === 0) spreadAngle = -5;
                            if (i === 1) spreadAngle = -2;
                            if (i === 2) spreadAngle = 0;
                            if (i === 3) spreadAngle = 2;
                            if (i === 3) spreadAngle = -5;
                            bullet.angle = player.angle + spreadAngle;
                            this.physics.arcade.velocityFromAngle(bullet.angle - 90, BULLET_SPEED, bullet.body.velocity);
                            bullet.body.velocity.x += player.body.velocity.x;

                            bulletTimer = this.time.now + BULLET_SPACING;
                    }
                }
            }
        }    
                if(gun[0] == "Spear"){
                            if (this.time.now > bulletTimer){
                            var BULLET_SPEED = 400;
                            var BULLET_SPACING = 1000;
                            var bullet = bulletsTYPE2.getFirstExists(false);
                        player.rotation = 1.5708+this.physics.arcade.angleBetween(player, this.input.pointer2d)
                        if(bullet) {
                             var bulletOffset = 20 * Math.sin(this.math.degToRad(player.angle));
                                bullet.reset(player.x + bulletOffset, player.y);
                                bullet.angle = player.angle;
                                this.physics.arcade.velocityFromAngle(bullet.angle - 90, BULLET_SPEED, bullet.body.velocity);
                                bullet.body.velocity.x += player.body.velocity.x;

                                bulletTimer = this.time.now + BULLET_SPACING;
                        
                    }
                }
            }    
                        if(gun[0] == "Lame"){
                             if (this.time.now > bulletTimer){
                        var BULLET_SPEED = 700;
                        var BULLET_SPACING = 1000;
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
                        bulletTimer = this.time.now + BULLET_SPACING;
                    }

                }
            }
        }else {
                        if (this.time.now > bulletTimer){
                        var BULLET_SPEED = 500;
                        var BULLET_SPACING = 800;
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

    shipTrail.y = player.y;
    //overlapping between player and collectables
    this.game.physics.arcade.overlap(player, collectables, this.collect, null, this);
    this.game.physics.arcade.overlap(player, collectablesTYPE2, this.collectTYPE2, null, this);
    this.game.physics.arcade.overlap(player, collectablesTYPE3, this.collectTYPE3, null, this);

    this.game.physics.arcade.overlap(player, greenEnemies, this.shipCollide, null, this);
    this.game.physics.arcade.overlap(greenEnemies, bullets, this.hitEnemy, null, this);
    this.game.physics.arcade.overlap(greenEnemies, bulletsTYPE2, this.hitEnemy, null, this);
    this.game.physics.arcade.overlap(greenEnemies, bulletsTYPE3, this.hitEnemy, null, this);

    this.game.physics.arcade.overlap(blueEnemyBullets, player, this.enemyHitsPlayer, null, this);
    this.game.physics.arcade.overlap(player, blueEnemies, this.shipCollide, null, this);
    this.game.physics.arcade.overlap(blueEnemies, bullets, this.hitEnemy, null, this);
    this.game.physics.arcade.overlap(blueEnemies, bulletsTYPE2, this.hitEnemy, null, this);
    this.game.physics.arcade.overlap(blueEnemies, bulletsTYPE3, this.hitEnemy, null, this);

    if (! player.alive && gameOver.visible === false) {
        gameOver.visible = true;
        gameOver.alpha = 0;
        var fadeIngameOver = this.add.tween(gameOver);
        fadeIngameOver.to({alpha: 1}, 1000, Phaser.Easing.Quintic.Out);
        fadeIngameOver.onComplete.add(setResetHandlers);
        fadeIngameOver.start();
        function setResetHandlers(){
            tapRestart = Ass.game.input.onTap.addOnce(_restart,this);
            function _restart(){
            var newHighScore = JSON.parse(localStorage.getItem('user'));
            console.log(score)
            console.log(typeof newHighScore)
            if(score > newHighScore.highScore){
                console.log("NEW HIGHSCORE!")
                axios.put('https://dreamchaserssite.herokuapp.com/highscore/:id', {highScore: score}, {params :{id: newHighScore._id}})
                .then(function(response){
                }), function(response){
                    console.log("fail")
                }
            }
            else{

            }
             Ass.game.state.start('MainMenu');
            }            
        }

    }

},
render: function() {
    // for (var i = 0; i < greenEnemies.length; i++)
    // {
    //     this.game.debug.body(greenEnemies.children[i]);
    // }
    // for (var i = 0; i < bullets.length; i++)
    // {
    //     this.game.debug.body(bullets.children[i])
    // }
    // for (var i = 0; i < bulletsTYPE2.length; i++)
    // {
    //     this.game.debug.body(bulletsTYPE2.children[i]);
    // }
    // for (var i = 0; i < bulletsTYPE3.length; i++)
    // {
    //     this.game.debug.body(bulletsTYPE3.children[i]);
    // }
    // this.game.debug.body(player);
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
    launchPowerUpRed: function() {
        console.log("start")
        collectablesTYPE3.createMultiple(5, 'power');
        var powerz = collectablesTYPE3.getFirstExists(false);
        powerz.tint = 0Xa2d114
        if (powerz) {
            powerz.reset(this.world.centerX + this.world.centerX, this.rnd.integerInRange(this.world.centerY-this.world.centerY, this.world.centerY +this.world.centerY));
            powerz.animations.add('fly', [0, 1, 2, 3], 5, true);
            powerz.animations.play('fly');
            powerz.body.velocity.x = -350;
            (console.log(powerz))
        

            powerz.update = function(){
                if (powerz.x < this.world.centerX - this.world.centerX) {
                    powerz.kill()
                }
      }
      // this.time.events.add(1000, this.launchPowerUp())


}

 },
  launchBlueEnemy: function() {
        var startingY = this.rnd.integerInRange(this.world.centerY-this.world.centerY +100, this.world.centerY + this.world.centerY -150);
        var horizantalSpeed = -100;
        var spread = 120;
        var frequency = 50;
        var verticalSpacing = 200;
        var numEnemiesInWaves= 3;

        console.log("BLUE START")

        for (var i =0; i < numEnemiesInWaves; i++) {
            var enemy = blueEnemies.getFirstExists(false);
            if (enemy) {
                enemy.startingY = startingY * i;
                enemy.reset((this.world.centerX + this.world.centerX), -500 *i);
                enemy.body.velocity.x = horizantalSpeed;

                var bulletSpeed = 400;
                var firingDelay =2000;
                enemy.bullets = 1;
                enemy.lastShot = 0;

                enemy.update = function() {
                    this.body.y = this.startingY + Math.sin((this.x) / frequency) * spread;

                    // bank = Math.cos((this.y + 60)/ frequency)
                    // this.scale.x = 0.5 - Math.abs(bank / 8);
                    // this.angle = 180 - bank *2;

                    enemyBullet = blueEnemyBullets.getFirstExists(false);
                    if (enemyBullet &&
                        this.alive &&
                        this.bullets &&
                        this.y > this.width / 8 &&
                        this.game.time.now > firingDelay + this.lastShot) {
                        this.lastShot = this.game.time.now;
                        this.bullets--;
                        enemyBullet.reset(this.x, this.y +this.height / 2);
                        enemyBullet.damageAmount = this.damageAmount;
                        var angle = this.game.physics.arcade.moveToObject(enemyBullet, player, bulletSpeed);
                        enemyBullet.angle = this.game.math.radToDeg(angle);
                    }




                };
            }
        }
        this.time.events.add(wavetime + 5000, this.launchBlueEnemy, this)

    },
    launchGreenEnemy: function() {

       
        console.log("hey")

        var ENEMY_SPEED = this.rnd.integerInRange(-500, -1000);

        var enemy = greenEnemies.getFirstExists(false);
        var numEnemiesInWaves= 3;


        for (var i =0; i < numEnemiesInWaves; i++) {
            var enemy = greenEnemies.getFirstExists(false);
           
        if (enemy) {
            enemy.reset(this.world.centerX + this.world.centerX, this.rnd.integerInRange(this.world.centerY-this.world.centerY +100, this.world.centerY + this.world.centerY -150));
            // enemy.body.velocity.y = this.rnd.integerInRange(-300, 300);
            enemy.body.velocity.x = ENEMY_SPEED;
            enemy.body.velocity.y = this.rnd.integerInRange(-300, 300);
            enemy.body.drag.y = 150;

            // enemy.trail.start(false,800, 1);


            enemy.update = function(){

                if (enemy.x < this.world.centerX - this.world.centerX) {
                    enemy.kill()
                }
            }
        }
    }
    this.time.events.add(wavetime, this.launchGreenEnemy, this)
    },


    shipCollide: function(player, enemy) {
    enemy.kill();

    player.damage(enemy.damageAmount);
    // shields.render();
    if(player.alive) {
        var explosion = explosions.getFirstExists(false);
        explosion.reset(player.body.x + player.body.halfWidth, player.body.y + player.body.halfHeight);
        explosion.alpha = 0.7;
        explosion.play('explosion', 30, false, true);
    }else {
        playerDeath.x = player.x;
        playerDeath.y = player.y;
        playerDeath.start(false, 1000, 10, 10);
    }
},
enemyHitsPlayer: function( player, bullet) {
    bullet.kill();

    player.damage(bullet.damageAmount);
    // shields.render()

    if (player.alive){
        var explosion = explosions.getFirstExists(false);
        explosion.reset(player.body.x + player.body.halfWidth, player.body.y + player.body.halfHeight);
        explosion.alpha = 0.7;
        explosion.play('explosion', 30, false, true);
    } else {
        playerDeath.x = player.x;
        playerDeath.y = player.y;
        playerDeath.start(false, 1000, 10, 10);
    }
},
    hitEnemy: function(enemy, bullet){
    var explosion = explosions.getFirstExists(false);
    explosion.reset(bullet.body.x + bullet.body.halfWidth,bullet.body.y + bullet.body.halfHeight);
    explosion.body.velocity.y = enemy.body.velocity.y;
    explosion.alpha = 0.7;
    explosion.play('explosion', 30, false, true);
    if (enemy.finishOff && enemy.health < 5) {
        enemy.finishOff();
    } else {
        enemy.damage(enemy.damageAmount);
    }
    bullet.kill();

    score += enemy.damageAmount * 100;
    scoreText.render();

    greenEnemySpacing *= 0.9;


    if(!blueEnemyLaunched && score > 1000) {
        blueEnemyLaunched = true;
        this.launchBlueEnemy();
        wavetime = 3000
    }

        


    // if(!blueEnemyLaunched && score > 1000) {
    //     blueEnemyLaunched = true;
    //     launchBlueEnemy();
    //     greenEnemySpacing *= 2;
    // }

    // if (!bossLaunched && score > 15000){
    //     greenEnemySpacing =5000;
    //     blueEnemySpacing = 12000;
    //     //dramaic pause before boss
    //     game.time.events.add(2000, function(){
    //         bossLaunched = true;
    //         launchBoss();
    //     });
    // }
    // if (score > 3000 && player.weaponLevel < 2) {
    //     player.weaponLevel = 2;
    // }
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
      collectTYPE3: function(player, collectable) {
        //play collect sound
        // this.collectSound.play();

        //update score
        score += 1;
        scoreText.render();
        gun.shift()
        gun.push("Red")

        //remove sprite
        collectable.destroy();
      },
      shutdown: function(){
        score = 0;
        music.destroy();
        greenEnemies.callAll('kill');
        gun.pop()
        blueEnemyLaunched = false
      }

       
}