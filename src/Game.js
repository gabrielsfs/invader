UniverseWar.Game = function(game){
	this.isCreateDestroyer = false;
	this.isCreateFighter = false;
	this.isCreateCruiser = false;
	
	this.level = 0;
	this.xp = 0;	
	/*
	 this.xpLevel100000000000 = 1000000000000;
	 * this.xpLevel1 = 1500;
	 * this.xpLevelRandom
	 * this.counter = 0
	 * while(this.xpLevel1 < this.xpLevel1000000000) {
	 * 	this.xpLevelRandom = this.xpLevel1 + math.random
	 
	 */
	//ex funcao para subir de level:
	/* xp = 0
	 * maxLevel = 100;
	 * xpNextLevel = 1500;
	 * this.level = xpNextLevel
	 * */
	this.xpLevel1 = 1500;
	this.xpLevel2 = 2200;
	this.xpLevel3 = 3500;
	this.xpLevel4 = 4800;
	this.xpLevel5 = 6000;
	this.xpLevel6 = 7800;
	this.xpLevel7 = 9200;
	this.xpLevel8 = 11200;
	this.xpLevel9 = 13900;
	this.xpLevel10 = 15000;
	
	this.level1 = true;
	this.level2 = true;
	this.level3 = true;
	this.level4 = true;
	this.level5 = true;
	this.level6 = true;
	this.level7 = true;
	this.level8 = true;
	this.level9 = true;
	this.level10 = true;
	
	this.xpEnemey = 0;
	this.scoreEnemey = 0;
	
	//score é propriedade de cada inimigo... entao mover essas propriedades para os determinados inimigos
	this.scoreEnemeyFighter = 10;
	this.scoreEnemeyDestroyer = 30;
	this.scoreEnemeyCruiser = 15;
	
	//xp é propriedade de cada inimigo... entao mover essas propriedades para os determinados inimigos
	this.enemeyFighterXp = 25;
	this.enemeyDestroyerXp = 50;
	this.enemeyCruiserXp = 35;

	this.counterEnemey = 0;
	
	//speed é propriedade de cada inimigo... entao mover essas propriedades para os determinados inimigos
	this.speedEnemeyFighter = 60;
	this.speedEnemeyCruiser = 30;
	this.speedEnemeyDestroyer = 20;

	this.isBoss1Active = false;

	this.fillWidthXp = 0;

	this.shieldActive = false;
	this.gunsActive = false;
	
	this.doubleShooter = false
	this.basicShooter = true;

	this.dropShield = false;
	this.dropGuns = false;
};

UniverseWar.Game.prototype = {
    create: function(){
		//create background		
		this.bg = game.add.tileSprite(0, 0, 1024, 800, 'bg');
		this.nebula1 = game.add.tileSprite(0, 0, 1024, 800, 'nebula1');
		this.nebula1.alpha = 0.5;
		this.planet1 = game.add.sprite(500, 100, 'planet1');
		//create background
		
        this.createGroupBullet();            
        this.changePlayer();
        this.createFighterEnemey();
        this.createCruiserEnemey();
        this.createDestroyerEnemey();
        this.createGroupExplosion();
        this.createHud();
        this.createBoss();

                
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        this.leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        
        this.spaceBar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        this.time.events.loop(3000 - this.level * 5, this.fighterEnemey, this);
        this.time.events.loop(2000 - this.level * 5, this.cruiserEnemey, this);
        this.time.events.loop(2500 - this.level * 5, this.destroyerEnemey, this);
        
        this.soundlaser = this.add.audio('soundlaser');
		this.soundlaser.volume = 0.05;
		
		this.soundexplosion = this.add.audio('soundexplosion');

    },
    
    update: function(){
		this.bg.tilePosition.y += 0.1;
        this.moveShip();
        this.physics.arcade.overlap(this.bullets, this.enemeyFighter, this.killEnemeyRed, null, this);
        this.physics.arcade.overlap(this.bullets2, this.enemeyFighter, this.killEnemeyRed, null, this);
        this.physics.arcade.overlap(this.bullets, this.enemeyDestroyer, this.killEnemeyRed, null, this);
        this.physics.arcade.overlap(this.bullets2, this.enemeyDestroyer, this.killEnemeyRed, null, this);
        this.physics.arcade.overlap(this.bullets, this.enemeyCruiser, this.killEnemeyRed, null, this);
        this.physics.arcade.overlap(this.bullets2, this.enemeyCruiser, this.killEnemeyRed, null, this);
        //this.physics.arcade.overlap(this.playerDestroyer, this.enemeyRed, this.killShip, null, this);
        //this.physics.arcade.overlap(this.playerFighter, this.enemeyRed, this.killShip, null, this);
        //this.physics.arcade.overlap(this.playerCruiser, this.enemeyRed, this.killShip, null, this);
        
        //Collide drop Itens
        if(this.isCreateDestroyer){
			this.physics.arcade.overlap(this.playerDestroyer, this.shieldicon, this.collectedShield, null, this);
			this.physics.arcade.overlap(this.playerDestroyer, this.doubleshootericon, this.collectedGun, null, this);		
		}
        if(this.isCreateCruiser){
			this.physics.arcade.overlap(this.playerCruiser, this.shieldicon, this.collectedShield, null, this);
			this.physics.arcade.overlap(this.playerCruiser, this.doubleshootericon, this.collectedGun, null, this);
		}
        if(this.isCreateFighter){
			this.physics.arcade.overlap(this.playerFighter, this.shieldicon, this.collectedShield, null, this);
			this.physics.arcade.overlap(this.playerFighter, this.doubleshootericon, this.collectedGun, null, this);
		}
		//Collide drop Itens
		this.updateBoss();
		
		this.levelText.text = this.level;
		this.counterEnemeyText.text = this.counterEnemey;
		this.counterScoreText.text = this.scoreEnemey;
		this.counterXpText.text = this.xp;
    },

    createHud:function(){
		this.hudbottom = game.add.sprite(0, 685, 'hudbottom');
		this.barlife = game.add.sprite(130, 710, 'barlife');

		this.bararmor = game.add.sprite(130, 765, 'bararmor');

		var style = {
			font:'bold 30pt Arial',
			fill: '#FFF',
			align: 'center'
		}
		var style2 = {
			font:'bold 20pt Arial',
			fill: '#FFF',
			align: 'center'
		}
		//this.fillxp.width = this.xp;
		this.levelText = this.game.add.text(this.game.world.centerX - 10 ,755, '0', style);
		
		this.counterEnemeyText = this.game.add.text(760, 758, '0', style2);
		
		this.counterScoreText = this.game.add.text(760, 732, '0', style2);
		
		this.counterXpText = this.game.add.text(760, 707, '0', style2);
	},
    
    changePlayer: function(){
        if(UniverseWar.player.key == 'destroyer'){
            this.isCreateDestroyer = true;
            this.createDestroyer();
        }
        if(UniverseWar.player.key == 'fighter'){
            this.isCreateFighter = true;
            this.createFighter();
        }
        if(UniverseWar.player.key == 'cruiser'){
            this.isCreateCruiser = true;
            this.createCruiser();
        }
    },
    
    //criar uma classe pai nave e os determinados filhos(destroyer, fighter, cruiser);
    createDestroyer: function(){
        this.playerDestroyer = game.add.sprite(game.world.centerX, 600, UniverseWar.player.key);
        this.playerDestroyer.anchor.setTo(0.5);
        this.playerDestroyer.scale.setTo(0.6);
        game.physics.enable(this.playerDestroyer);
        this.playerDestroyer.body.collideWorldBounds = true;
        this.speedDestroyer = UniverseWar.player.speed; 
        this.powerDestroyer = UniverseWar.player.power;
        this.armorDestroyer = UniverseWar.player.armor;
    },
    
    createFighter: function(){
        this.playerFighter = game.add.sprite(game.world.centerX, 600, UniverseWar.player.key);
        this.playerFighter.anchor.setTo(0.5);
        this.playerFighter.scale.setTo(0.5);
        game.physics.enable(this.playerFighter);
        this.playerFighter.body.collideWorldBounds = true;
        this.speedFighter = UniverseWar.player.speed; 
        this.powerFighter = UniverseWar.player.power;
        this.armorFighter = UniverseWar.player.armor;
    },
    
    createCruiser: function(){
        this.playerCruiser = game.add.sprite(game.world.centerX, 600, UniverseWar.player.key);
        this.playerCruiser.anchor.setTo(0.5);
        this.playerCruiser.scale.setTo(0.5);
        game.physics.enable(this.playerCruiser);
        this.playerCruiser.body.collideWorldBounds = true;
        this.speedCruiser = UniverseWar.player.speed; 
        this.powerCruiser = UniverseWar.player.power;
        this.armorCruiser = UniverseWar.player.armor;
        
        		
		//Create Animations
		this.playerCruiser.animations.add('accelerater',[0,1,2,3,4,5,6,7,8,9,10,11],10,false);
		this.playerCruiser.animations.add('reverse',[11,10,9,8,7,6,5,4,3,2,1,0],10,false);
		//Create Animations
     },
    
    moveShip: function(){
        this.moveDestroyer();
        this.moveFighter();
        this.moveCruiser(); 
    },
    
    moveDestroyer: function(){
        if(this.isCreateDestroyer){
            this.playerDestroyer.body.velocity.x = 0;
            this.playerDestroyer.body.velocity.y = 0;
            
            			
			if(this.shieldActive){
				this.shield.x = this.playerDestroyer.x;
				this.shield.y = this.playerDestroyer.y;
			}
            
            if(this.leftKey.isDown){
				this.playerDestroyer.body.velocity.x = -10 * this.speedDestroyer;
			} if(this.rightKey.isDown){
				this.playerDestroyer.body.velocity.x = 10 * this.speedDestroyer;
			} if(this.upKey.isDown){
				this.playerDestroyer.body.velocity.y = -10 * this.speedDestroyer;
			} if(this.downKey.isDown && this.playerDestroyer.y < 600){
				this.playerDestroyer.body.velocity.y = 10 * this.speedDestroyer;
			} if(this.spaceBar.isDown){
				this.shootDestroyer(this.playerDestroyer);
			}
		};
	},
    
    moveFighter: function(){
        if(this.isCreateFighter){
            this.playerFighter.body.velocity.x = 0;
            this.playerFighter.body.velocity.y = 0;
           			
			if(this.shieldActive){
				this.shield.x = this.playerFighter.x;
				this.shield.y = this.playerFighter.y;
			}
			
            if(this.leftKey.isDown){
				this.playerFighter.body.velocity.x = -10 * this.speedFighter;
			} if(this.rightKey.isDown){
				this.playerFighter.body.velocity.x = 10 * this.speedFighter;
			} if(this.upKey.isDown){
				this.playerFighter.body.velocity.y = -10 * this.speedFighter;
			} if(this.downKey.isDown && this.playerFighter < 600){
				this.playerFighter.body.velocity.y = 10 * this.speedFighter;
			} if(this.spaceBar.isDown){
				this.shootFighter(this.playerFighter);
			}
		};
    },
    
    moveCruiser: function(){
        if(this.isCreateCruiser){
            this.playerCruiser.body.velocity.x = 0;
            this.playerCruiser.body.velocity.y = 0;
			
			if(this.shieldActive){
				this.shield.x = this.playerCruiser.x;
				this.shield.y = this.playerCruiser.y;
			}
			
            if(this.leftKey.isDown){
				this.playerCruiser.body.velocity.x = -10 * this.speedCruiser;
			} if(this.rightKey.isDown){
				this.playerCruiser.body.velocity.x = 10 * this.speedCruiser;
			} if(this.upKey.isDown){
				this.playerCruiser.animations.play('accelerater', true);
				this.playerCruiser.body.velocity.y = -10 * this.speedCruiser;
			} if(this.downKey.isDown && this.playerCruiser.y < 600){
				this.playerCruiser.animations.play('reverse', false);
				this.playerCruiser.body.velocity.y = 10 * this.speedCruiser;
			} if(this.spaceBar.isDown){
				this.shootCruiser(this.playerCruiser);
			}
		};
    },
	
	
	//criar uma classe pai Inimigo e seus determinados filhos(fighter, cruiser e destroyer)
    //Create enemeys
    createFighterEnemey: function(){
        this.enemeyFighter = this.add.group();
        this.enemeyFighter.createMultiple(10, 'fighterenemey');
        this.physics.enable(this.enemeyFighter);
        this.enemeyFighter.callAll('anchor.setTo', 'anchor', 0.5, 1);
        this.enemeyFighter.callAll('scale.setTo', 'scale', 0.5, 0.5);
        this.enemeyFighter.setAll('checkWorldBounds', true);
        this.enemeyFighter.setAll('outOfBoundsKill', true);

    },
    
    fighterEnemey: function(){
        var enemey = this.enemeyFighter.getFirstDead();
        if(!enemey){return;};
        enemey.reset(this.rnd.between(70, 900), 0);
        enemey.body.velocity.y = this.speedEnemeyFighter;
        
    },
    
    createCruiserEnemey: function(){
		this.enemeyCruiser = this.add.group();
		this.enemeyCruiser.createMultiple(10, 'cruiserenemey');
		this.physics.enable(this.enemeyCruiser);
		this.enemeyCruiser.callAll('anchor.setTo', 'anchor', 0.5, 1);
		this.enemeyCruiser.callAll('scale.setTo', 'scale', 0.5, 0.5);
		this.enemeyCruiser.setAll('checkWorldBounds', true);
		this.enemeyCruiser.setAll('outOfBoundsKill', true);

	},

    cruiserEnemey: function(){
		var enemeyC = this.enemeyCruiser.getFirstDead();
		if(!enemeyC){return;};
		enemeyC.reset(this.rnd.between(100, 800), 0);
		enemeyC.body.velocity.y = this.speedEnemeyCruiser;

	},
	
	createDestroyerEnemey: function(){
		this.enemeyDestroyer = this.add.group();
		this.enemeyDestroyer.createMultiple(10, 'destroyerenemey');
		this.physics.enable(this.enemeyDestroyer);
		this.enemeyDestroyer.callAll('anchor.setTo', 'anchor', 0.5, 0.5);
		this.enemeyDestroyer.callAll('scale.setTo', 'scale', 0.7, 0.7);
		this.enemeyDestroyer.setAll('checkWorldBounds', true);
		this.enemeyDestroyer.setAll('outOfBoundsKill', true);

	},
    
    destroyerEnemey:function(){
		var enemeyD = this.enemeyDestroyer.getFirstDead();
		if(!enemeyD){return;};
		enemeyD.reset(this.rnd.between(80, 850), -30);
		enemeyD.body.velocity.y = this.speedEnemeyDestroyer;
	},
    
    //Create enemeys
    
    createGroupBullet:function(){
		this.bullets = this.add.group();
		this.bullets.createMultiple(20, 'bluelaser', 0);
		this.physics.enable(this.bullets);
		this.bullets.callAll('anchor.setTo', 'anchor', 0.5, 0.5);
		this.bullets.setAll('checkWorldBounds', true);
		this.bullets.setAll('outOfBoundsKill', true);
		
		this.bullets.interval = 300;
		this.bullets.next = 0;
		
		this.bullets2 = this.add.group();
		this.bullets2.createMultiple(20, 'bluelaser', 0);
		this.physics.enable(this.bullets2);
		this.bullets2.callAll('anchor.setTo', 'anchor', 0.5, 0.5);
		this.bullets2.setAll('checkWorldBounds', true);
		this.bullets2.setAll('outOfBoundsKill', true);
		
		this.bullets2.interval = 300;
		this.bullets2.next = 0;
		
	},

	//propriedade da nave pai, usar herança, todas as naves atiram, porem o tiro de cada uma é diferente
	shootFighter:function(ship){
		if(this.basicShooter){
			if(this.time.now > this.bullets.next){
				var bullet = this.bullets.getFirstDead();
				if(!bullet){return;};
				bullet.reset(ship.x, ship.y - ship.height / 2);
				bullet.body.velocity.y = -400;
				this.bullets.next = this.time.now + this.bullets.interval;
				this.soundlaser.play();
			}
		}
		if(this.doubleShooter){
			this.basicShooter = false;
			if(this.time.now > this.bullets.next || this.time.now > this.bullets2.next){
				var bullet = this.bullets.getFirstDead();
				var bullet2 = this.bullets2.getFirstDead();
				if(!bullet){return;};
				if(!bullet2){return;};
				bullet.reset(ship.x - 10, ship.y - ship.height / 2);
				bullet2.reset(ship.x + 10, ship.y - ship.height / 2);
				bullet.body.velocity.y = -400;
				bullet2.body.velocity.y = -400;
				this.soundlaser.play();
				this.bullets.next = this.time.now + this.bullets.interval;
				this.bullets2.next = this.time.now + this.bullets2.interval;
			}
		}
		
	},
	
	shootDestroyer:function(ship){
		if(this.basicShooter){
			if(this.time.now > this.bullets.next){
				var bullet = this.bullets.getFirstDead();
				if(!bullet){return;};
				bullet.reset(ship.x, ship.y - ship.height / 2 + 15);
				bullet.body.velocity.y = -400;
				this.soundlaser.play();
				this.bullets.next = this.time.now + this.bullets.interval;
			}
		}
		
		if(this.doubleShooter){
			this.basicShooter = false;
			if(this.time.now > this.bullets.next || this.time.now > this.bullets2.next){
				
				var bullet = this.bullets.getFirstDead();
				var bullet2 = this.bullets2.getFirstDead();
				if(!bullet){return;};
				if(!bullet2){return;};
				bullet.reset(ship.x + 20, ship.y - ship.height / 2 + 15);
				bullet2.reset(ship.x - 20, ship.y - ship.height / 2 + 15);
				bullet.body.velocity.y = -400;
				bullet2.body.velocity.y = -400;
				
				this.soundlaser.play();
					
				this.bullets.next = this.time.now + this.bullets.interval;
				this.bullets2.next = this.time.now + this.bullets.interval;
			}
		}
	},
	
	shootCruiser:function(ship){
		if(this.basicShooter){
			if(this.time.now > this.bullets.next){
				var bullet = this.bullets.getFirstDead();
				if(!bullet){return;};
				bullet.reset(ship.x, ship.y - 60);
				bullet.body.velocity.y = -400;
				this.soundlaser.play();
				this.bullets.next = this.time.now + this.bullets.interval;
			}
		}
		
		if(this.doubleShooter){
			this.basicShooter = false;
			
			if(this.time.now > this.bullets.next || this.time.now > this.bullets2.next){
				
				var bullet = this.bullets.getFirstDead();
				var bullet2 = this.bullets2.getFirstDead();
				if(!bullet){return;};
				if(!bullet2){return;};
				bullet.reset(ship.x + 27, ship.y);
				bullet2.reset(ship.x - 25, ship.y);
				bullet.body.velocity.y = -400;
				bullet2.body.velocity.y = -400;
				
				this.soundlaser.play();
							
				this.bullets.next = this.time.now + this.bullets.interval;
				this.bullets2.next = this.time.now + this.bullets.interval;
			}
		}
	},
	
	killShip:function(player, object){
		this.soundexplosion.play();
		this.barlife.width -= 5;
		//player.kill();
		object.kill();
		var explosion = this.explosions2.getFirstDead();
		explosion.reset(object.x, object.y - (object.height / 2) + 100);
		explosion.play('explose', 30, false, true);
		//this.time.events.add(Phaser.Timer.SECOND * 2, this.initialize, this);
	},
	
	killEnemeyRed:function(bullet, object){
		//if(this.enemeyRed.children.indexOf(object > -1)){
		//	
		//}
		if(object.key == 'fighterenemey'){
			this.scoreEnemey += this.scoreEnemeyFighter;
			this.xp += this.enemeyFighterXp;
			this.counterEnemey++;
		}
		else if(object.key == 'destroyerenemey'){
			this.scoreEnemey += this.scoreEnemeyDestroyer;
			this.xp += this.enemeyDestroyerXp;
			this.counterEnemey++;
		}
		else if(object.key == 'cruiserenemey'){
			this.scoreEnemey += this.scoreEnemeyCruiser;
			this.xp += this.enemeyCruiserXp;
			this.counterEnemey++;
		}
		this.nextLevel();		
		this.createBoss();
		this.soundexplosion.play();
		bullet.kill();
		object.kill();
		
		var explosion = this.explosions.getFirstDead();
		explosion.reset(object.x , object.y - (object.height / 2));
		explosion.play('explose', 30, false, true);
		
		var x = object.x;
		var y = object.y;
		
		this.dropItens(x, y);
	},
	
	//propriedade de cada inimigo
	dropItens:function(x, y){
		var posX = x;
		var posY = y;
		
		randShield = this.rnd.between(1, 10);
		randGuns = this.rnd.between(1,10);
		
		//no lugar do 5 usar um numero randomico
		//usar exemplo do phaser de tempo diminuindo, ou pegar no livro do zendrael no segundo jogo de plataforma
		if(randShield == 5 && this.shieldActive == false){
			this.dropShield = true;
			this.shieldicon = game.add.sprite(posX, posY, 'shieldicon');
			this.shieldicon.scale.setTo(0.5, 0.5);
			this.physics.enable(this.shieldicon);
			this.shieldicon.body.velocity.y = 80;
		}
		
		if(randGuns == 1 && this.gunsActive == false){
			this.dropGuns = true;
			this.doubleshootericon = game.add.sprite(posX, posY, 'doubleshootericon');
			this.doubleshootericon.scale.setTo(0.5, 0.5);
			this.physics.enable(this.doubleshootericon);
			this.doubleshootericon.body.velocity.y = 80;
		}
	},

	collectItens:function(){
		this.collectedShield();
		this.collectedGun();
	},
	
	collectedShield:function(){
		if(this.dropShield){
			this.shieldicon.kill();
			this.shieldActive = true;
			
			var posX = UniverseWar.player.x ;
			var posY = UniverseWar.player.y ;
			
			this.shield = game.add.sprite(posX, posY, 'shield');
			this.shield.anchor.setTo(0.5, 0.5);
			this.shield.scale.setTo(0.5, 0.5);
			this.shield.alpha = 0.5;
		}
	},
	
	collectedGun:function(){
		if(this.dropGuns){
			this.doubleshootericon.kill();
			this.doubleShooter = true;
			this.gunsActive = true;
		}	
	},

	createGroupExplosion:function(){
		this.explosions = this.add.group();
		this.explosions.createMultiple(30, 'explosionred');
		this.explosions.callAll('anchor.setTo', 'anchor', 0.5, 0.5);
		this.explosions.callAll('scale.setTo', 'scale', 0.5, 0.5);
		this.explosions.callAll('animations.add', 'animations', 'explose');
		
		this.explosions2 = this.add.group();
		this.explosions2.createMultiple(30, 'explosionpurple');
		this.explosions2.callAll('anchor.setTo', 'anchor', 0.5, 0.5);
		this.explosions2.callAll('scale.setTo', 'scale', 2, 2);
		this.explosions2.callAll('animations.add', 'animations', 'explose');
	},
	
	initialize:function(){
		this.bullets.callAll('kill');
		this.enemeyRed.callAll('kill');	
		UniverseWar.player.reset(game.world.centerX, 650);
	},
	
	//usar um arquivo externo para leveis
	nextLevel:function(){
		if(this.level1){
			if(this.xp >= this.xpLevel1){
				this.levelUp();
				this.level1 = false;
			}
		}
		if(this.level2){
			if(this.xp >= this.xpLevel2){
				this.levelUp();	
				this.level2 = false;
			}
		}
		if(this.level3){
			if(this.xp >= this.xpLevel3){
				this.levelUp();	
				this.level3 = false;
			}
		}
		if(this.level4){
			if(this.xp >= this.xpLevel4){
				this.levelUp();	
				this.level4 = false;
			}
		}
		if(this.level5){
			if(this.xp >= this.xpLevel5){
				this.levelUp();	
				this.level5 = false;
			}
		}
		if(this.level6){
			if(this.xp >= this.xpLevel6){
				this.levelUp();	
				this.level6 = false;
			}
		}
		if(this.level7){
			if(this.xp >= this.xpLevel7){
				this.levelUp();	
				this.level7 = false;
			}
		}
		if(this.level8){
			if(this.xp >= this.xpLevel8){
				this.levelUp();	
				this.level8 = false;
			}
		}
		if(this.level9){
			if(this.xp >= this.xpLevel9){
				this.levelUp();	
				this.level9 = false;
			}
		}
		if(this.level10){
			if(this.xp >= this.xpLevel10){
				this.levelUp();	
				this.level10 = false;
			}
		}
	},
	
	levelUp:function(){
		this.level++;
		UniverseWar.player.speed += 10;
		this.bullets.interval -= 10;
		this.bullets2.interval -= 10;
		this.speedEnemeyFighter += 45;
		this.speedEnemeyCruiser += 10;
		this.speedEnemeyDestroyer += 20;

	},
		
	createBoss:function(){
		this.posBossX = this.game.world.centerX;
		this.posBossY = -200;

		if(this.counterEnemey == 390){
			this.boss = game.add.sprite(this.posBossX, this.posBossY, 'boss1');
			game.physics.enable(this.boss);

			this.boss.anchor.setTo(0.5, 0.5);
			this.isBoss1Active = true;
		}
	},

	updateBoss:function(){
		if(this.isBoss1Active){
			this.boss.body.velocity.y = 80;
			if(this.boss.y > 50){
				this.boss.body.velocity.y = 0;	
			}
		}
	},

};
