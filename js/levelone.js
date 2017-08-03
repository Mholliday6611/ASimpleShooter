var Ass = Ass || {};

var player;
var greenEnemies;
var blueEnemies;
var enemyBullets;
var clouds;
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
var gameOver;
var collectables;
var gun = [];
var collectable;
var waveTime = 7000

var bat;
var skeleton;
var frog;
var ghost;
var slime;
var andro;

var ACCLERATION = 2500;
var DRAG = 10;
var MAXSPEED = 2500;

Ass.levelone = function(){};

Ass.levelone.prototype = {
	create: function() {
	    

		clouds = this.add.tileSprite(0,0,window.innerWidth, window.innerHeight, 'clouds');


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
	    bullets.createMultiple(30, 'bullet');
	    bullets.setAll('anchor.x', 0.5);
	    bullets.setAll('anchor.y', 1);
	    bullets.setAll('outOfBoundsKill', true);
	    bullets.setAll('checkWorldBounds', true);

        bulletsTYPE2 = this.add.group();
        bulletsTYPE2.enableBody = true;
        bulletsTYPE2.physicsBodyType = Phaser.Physics.ARCADE;
        bulletsTYPE2.createMultiple(30, 'bullet');
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
        bulletsTYPE3.createMultiple(30, 'redshot');
        bulletsTYPE3.setAll('scale.x', .70)
        bulletsTYPE3.setAll('scale.y', .70)
        bulletsTYPE3.setAll('anchor.x', 0.5);
        bulletsTYPE3.setAll('anchor.y', 1);
        bulletsTYPE3.setAll('outOfBoundsKill', true);
        bulletsTYPE3.setAll('checkWorldBounds', true);


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

        //ENEMIES BEGIN HERE

        //BAT 
        bat = this.add.group();
        bat.enableBody = true;
        bat.physicsBodyType = Phaser.Physics.ARCADE;
        bat.createMultiple(100, 'bat');
        bat.setAll('anchor.x', 0.5);
        bat.setAll('anchor.y', 0.5);
        bat.setAll('scale.x', 4);
        bat.setAll('scale.y', 4);
        // bat.setAll('angle', 360);
        bat.forEach(function(enemy){
            enemy.body.setSize(enemy.width * 3/4, enemy.height * 3/4);
            enemy.damageAmount =1;
        });

        //SKELETON
        skeleton = this.add.group();
        skeleton.enableBody = true;
        skeleton.physicsBodyType = Phaser.Physics.ARCADE;
        skeleton.createMultiple(15, 'skeleton');
        skeleton.setAll('anchor.x', 0.5);
        skeleton.setAll('anchor.y', 0.5);
        skeleton.setAll('scale.x', 1.5);
        skeleton.setAll('scale.y', 1.5);
        skeleton.setAll('angle', 180);
        skeleton.forEach(function(enemy){
            enemy.body.setSize(enemy.width * 3/4, enemy.height * 3/4);
            enemy.damageAmount =1;
        });

        //GHOST
        ghost = this.add.group();
        ghost.enableBody = true;
        ghost.physicsBodyType = Phaser.Physics.ARCADE;
        ghost.createMultiple(20, 'ghost');
        ghost.setAll('anchor.x', 0.5);
        ghost.setAll('anchor.y', 0.5);
        ghost.setAll('scale.x', 3);
        ghost.setAll('scale.y', 3);
        ghost.forEach(function(enemy){
            enemy.damageAmount =1;
        });

        //FROG
        frog = this.add.group();
        frog.enableBody = true;
        frog.physicsBodyType = Phaser.Physics.ARCADE;
        frog.createMultiple(10, 'frog');
        frog.setAll('anchor.x', 0.5);
        frog.setAll('anchor.y', 0.5);
        frog.setAll('scale.x', 0.5);
        frog.setAll('scale.y', 0.5);
        frog.setAll('angle', 90);
        frog.forEach(function(enemy){
            enemy.damageAmount =1;
        });

        //GUESSAN'S BOSS
        gboss = this.add.sprite(0,0, 'gboss');
        gboss.exists = false;
        gboss.alive = false;
        gboss.anchor.setTo(0.5, 0.5);
        gboss.damageAmount = 1;
        gboss.scale.x = .3;
        gboss.scale.y = .3;
        this.game.physics.enable(gboss, Phaser.Physics.ARCADE);
        gboss.body.maxVelocity.setTo(100, 80);
        gboss.dying = false;
        gboss.finishOff = function(){
            if(!gboss.dying) {
                gboss.dying = true;
                bossDeath.x = gboss.x;
                bossDeath.y = gboss.y;
                bossDeath.start(false, 1000, 50, 20);

                this.time.events.add(1000, function(){
                    var explosion = explosions.getFirstExists(false);
                    var beforeScaleX = explosions.scale.x;
                    var beforeScaleY =explosions.scale.y;
                    var beforeAlpha = explosions.alpha;
                    explosion.reset(gboss.body.x + gboss.body.halfWidth, gboss.body.y + gboss.body.halfHeight);
                    explosion.alpha = 0.4;
                    explosion.scale.x = 3;
                    explosion.scale.y = 3;
                    var animation = explosion.play('explosion', 30 , false, true);
                    animation.onComplete.addOnce(function(){
                        explosion.scale.x= beforeScaleX;
                        explosion.scale.y= beforeScaleY;
                        explosion.alpha = beforeAlpha;
                    });
                    gboss.kill();
                    gboss.dying = false;
                    bossDeath.on = false;
                    bossLaunchTimer = game.time.events.add(game.rnd.integerInRange(bossSpacing, bossSpacing + 5000),launchBoss);
                });
                blueEnemySpacing = 2500;
                greenEnemySpacing = 1000;

                player.health = Math.min(100, player.health + 40);
                shields.render();
            }
        };

        //ANDRO

        //INITIAL WAVE TIME 
        wave1Timer = this.time.events.add(Phaser.Timer.SECOND * 4, this.launchWave1, this);

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
        powerUpTimerSpear.loop(this.rnd.integerInRange(6000, 9000), this.launchPowerUpSpear, this);
        powerUpTimerSpear.start();

        //POWERUP RED
        collectablesTYPE3 = this.add.group();
        collectablesTYPE3.enableBody = true;
        collectablesTYPE3.physicsBodyType = Phaser.Physics.ARCADE;
        

        powerUpTimerRed = this.time.create(false);
        powerUpTimerRed.loop(this.rnd.integerInRange(6000, 10000), this.launchPowerUpRed, this);
        powerUpTimerRed.start();


        //score
        scoreText = this.add.bitmapText(10,10, 'spacefont', '', 50);
        scoreText.render = function(){
        scoreText.text = 'Score: ' + score;
                };
        scoreText.render();

        bossDeath = this.game.add.emitter(gboss.x, gboss.y);
        bossDeath.width = gboss.width /2;
        bossDeath.height =gboss.height /2;
        bossDeath.makeParticles('explosion', [0,1,2,3,4,5,6,7], 20);
        bossDeath.setAlpha(0.9, 0, 900);
        bossDeath.setScale(0.3, 1.0, 0.3, 1.0, 1000, Phaser.Easing.Quintic.Out);
        
        
	},

	update: function(){
    	clouds.tilePosition.x -=6;
        player.body.acceleration.y = 0;

        

        // if(score == 100){
        //     blueEnemyTimer.start();
        // }

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
                        var BULLET_SPEED = 300;
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
                        var BULLET_SPEED = 400;
                        var BULLET_SPACING = 900;
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
                    var bullet = bulletsTYPE2.getFirstExists(false);
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
                            var BULLET_SPEED = 300;
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
                        var BULLET_SPEED = 400;
                        var BULLET_SPACING = 900;
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

    if(score == 1000){
        waveTime = 5000
    }
    if(score == 500){
        this.launchWaveBoss()
    }

    shipTrail.y = player.y;
    //overlapping between player and collectables
    this.game.physics.arcade.overlap(player, collectables, this.collect, null, this);
    this.game.physics.arcade.overlap(player, collectablesTYPE2, this.collectTYPE2, null, this);
    this.game.physics.arcade.overlap(player, collectablesTYPE3, this.collectTYPE3, null, this);

    this.game.physics.arcade.overlap(player, bat, this.shipCollide, null, this);
    this.game.physics.arcade.overlap(bat, bullets, this.hitEnemy, null, this);
    this.game.physics.arcade.overlap(bat, bulletsTYPE2, this.hitEnemy, null, this);
    this.game.physics.arcade.overlap(bat, bulletsTYPE3, this.hitEnemy, null, this);

    this.game.physics.arcade.overlap(player, ghost, this.shipCollide, null, this);
    this.game.physics.arcade.overlap(ghost, bullets, this.hitEnemy, null, this);
    this.game.physics.arcade.overlap(ghost, bulletsTYPE2, this.hitEnemy, null, this);
    this.game.physics.arcade.overlap(ghost, bulletsTYPE3, this.hitEnemy, null, this);

    // this.game.physics.arcade.overlap(blueEnemyBullets, player, this.enemyHitsPlayer, null, this);
    // this.game.physics.arcade.overlap(player, blueEnemies, this.shipCollide, null, this);
    // this.game.physics.arcade.overlap(blueEnemies, bullets, this.hitEnemy, null, this);
    // this.game.physics.arcade.overlap(blueEnemies, bulletsTYPE2, this.hitEnemy, null, this);
    // this.game.physics.arcade.overlap(blueEnemies, bulletsTYPE3, this.hitEnemy, null, this);

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
launchWave1: function() {
    console.log("Wave One start")
        var ENEMY_SPEED = -250
        var numEnemiesInWaves= 10;


        for (var i =0; i < 5; i++) {
            var enemy = bat.getFirstExists(false);
           
        if (enemy) {
            enemy.reset(this.world.centerX + this.world.centerX, this.rnd.integerInRange(this.world.centerY-this.world.centerY +100, this.world.centerY + this.world.centerY -150));
            enemy.animations.add('fly', [0, 1, 2], 2, true)
            enemy.play('fly')
            enemy.body.velocity.y = this.rnd.integerInRange(-30, 30);
            enemy.body.velocity.x = ENEMY_SPEED;
            enemy.body.drag.y = 150;



            enemy.update = function(){


                if (enemy.x < this.world.centerX - this.world.centerX) {
                    enemy.kill()
                }

            }
        }
    }
    this.launchWave2()
    },
    launchWave2: function() {
    console.log("Wave Two start")
        var ENEMY_SPEED = -50
        var numEnemiesInWaves= 10;


        for (var i =0; i < 5; i++) {
            var enemy = ghost.getFirstExists(false);
           
        if (enemy) {
            enemy.reset(this.world.centerX + this.world.centerX, this.rnd.integerInRange(this.world.centerY-this.world.centerY +100, this.world.centerY + this.world.centerY -150));
            enemy.animations.add('fly', [0, 1, 2], 2, true)
            enemy.play('fly')
            enemy.body.velocity.y = this.rnd.integerInRange(-30, 30);
            enemy.body.velocity.x = ENEMY_SPEED;
            enemy.body.drag.y = 150;



            enemy.update = function(){


                if (enemy.x < this.world.centerX - this.world.centerX) {
                    enemy.kill()
                }

            }
        }
    }
    this.time.events.add(waveTime, this.launchWave1, this)
    },
    launchWaveBoss: function() {
        console.log("start boss")
        gboss.reset(this.world.centerX + this.world.centerX, this.world.centerY);
        // booster.start(false, 1000, 10);
        gboss.health = 500;
        // bossBulletTimer = game.time.now + 5000;
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
        collectablesTYPE2.createMultiple(5, 'cupcake');
        collectablesTYPE2.setAll('scale.x', .04);
        collectablesTYPE2.setAll('scale.y', .04);
        
        var powerz = collectablesTYPE2.getFirstExists(false);
        if (powerz) {
            powerz.reset(this.world.centerX + this.world.centerX, this.rnd.integerInRange(this.world.centerY-this.world.centerY, this.world.centerY +this.world.centerY));
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
        collectablesTYPE3.createMultiple(5, 'teddy');
        collectablesTYPE3.setAll('scale.x', .04);
        collectablesTYPE3.setAll('scale.y', .04);
        var powerz = collectablesTYPE3.getFirstExists(false);
        if (powerz) {
            powerz.reset(this.world.centerX + this.world.centerX, this.rnd.integerInRange(this.world.centerY-this.world.centerY, this.world.centerY +this.world.centerY));
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

       restart: function() {
        greenEnemies.callAll('kill');
        game.time.events.remove(greenEnemyLaunchTimer);
        game.time.events.add(1000, launchGreenEnemy);
        // blueEnemies.callAll('kill');
        // blueEnemyBullets.callAll('kill');
        // game.time.events.remove(blueEnemyLaunchTimer);

        // blueEnemies.callAll('kill');
        // game.time.events.remove(1000, blueEnemyLaunchTimer);
        // boss.kill();
        // booster.kill();
        // game.time.events.remove(bossLaunchTimer);

        //revive player
        gun.shift()
        player.revive();
        player.health = 5;
        // shields.render();
        score = 0
        scoreText.render();
        gameOver.visible = false;

        greenEnemySpacing = 1000;
        // blueEnemyLaunched = false;
        // bossLaunched = false;



}
}