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
var blueEnemyLaunchTimer;
var blueEnemyLaunched = false;
var blueEnemySpacing = 2500;
var bossLaunchTimer;
var bossLaunched = false;
var bossSpacing = 20000;
var bossBulletTimer = 0;
var bossYdirection = -1;
var gameOver;

var ACCLERATION = 2500;
var DRAG = 0;
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


		bullets = this.add.group();
	    bullets.enableBody = true;
	    bullets.physicsBodyType = Phaser.Physics.ARCADE;
	    bullets.createMultiple(30, 'bullet');
	    bullets.setAll('anchor.x', 0.5);
	    bullets.setAll('anchor.y', 1);
	    bullets.setAll('outOfBoundsKill', true);
	    bullets.setAll('checkWorldBounds', true);
	},


	update: function(){
	starfield.tilePosition.x -=6;
    player.body.acceleration.y = 0;

        if(this.input.pointer1.isDown){
        // Fire Bulet
            if(this.input.pointer1.x>this.world.centerX){      
                if (this.time.now > bulletTimer){
                    var BULLET_SPEED = 400;
                    var BULLET_SPACING = 250;
                    var bullet = bullets.getFirstExists(false);
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
            else{
                var minDist = 200;
                var dist = this.input.pointer1.y - player.y;
                player.body.velocity.y = MAXSPEED * this.math.clamp(dist/ minDist, -1,1 );
            }
    }
    if(this.input.pointer2.isDown){
        // Fire Bulet
            if(this.input.pointer2.x>this.world.centerX){      
                if (this.time.now > bulletTimer){
                    var BULLET_SPEED = 400;
                    var BULLET_SPACING = 250;
                    var bullet = bullets.getFirstExists(false);
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
            else{
                var minDist = 200;
                var dist = this.input.pointer2.y - player.y;
                player.body.velocity.y = MAXSPEED * this.math.clamp(dist/ minDist, -1,1 );
            }
    }
}
}
