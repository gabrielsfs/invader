Preload = function(game){};


Preload.prototype = {
    preload: function(){
        this.logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        this.logo.anchor.setTo(0.5);
        
        this.loadingbar = game.add.sprite(game.world.centerX, game.world.centerY + 200, 'loadingbar');
        this.loadingbar.anchor.setTo(0.5);
        this.loadingbar.alpha = 1;
        
        game.load.setPreloadSprite(this.loadingbar);
                
        game.load.spritesheet('btnplay', 'assets/images/menu/btnplay.png', 194, 63);
        
		game.load.image('bg0', 'assets/images/menu/bg0.png');
		
		//Loading assets Play
		game.load.spritesheet('middlecircle1', 'assets/images/menu/middlecircle1.png');
		game.load.spritesheet('middlecircle2', 'assets/images/menu/middlecircle2.png');
		game.load.spritesheet('middlecircle3', 'assets/images/menu/middlecircle3.png');
		
		game.load.spritesheet('btnselect', 'assets/images/menu/btnselect.png');
		
		game.load.spritesheet('centermenu', 'assets/images/menu/centermenu.png');
		game.load.spritesheet('menu1', 'assets/images/menu/menu1.png');
		game.load.spritesheet('menu0', 'assets/images/menu/menu0.png');
		
		game.load.image('line', 'assets/images/menu/line.png');
		game.load.image('line2', 'assets/images/menu/line2.png');
		
		game.load.spritesheet('infobar', 'assets/images/menu/bardescription.png');
		
		//Loading assets Play
		
		//Loading background
		game.load.image('bg', 'assets/images/bg/stars.png');
		//Loading background
		
		//Loading ships
		game.load.spritesheet('fighter', 'assets/images/humans/fighter.png');
		game.load.spritesheet('cruiser', 'assets/images/humans/cruiserspritesheet.png', 166, 431, 11);
		game.load.spritesheet('destroyer', 'assets/images/humans/destroyer.png');
		//Loading ships
		
		//Loading Engine
		game.load.spritesheet('engine', 'assets/images/humans/engine_exhaust.png');
		//Loading Engine
		
		//Loading Shields
		game.load.spritesheet('shield', 'assets/images/humans/shield.png');
		game.load.spritesheet('shieldicon', 'assets/images/humans/shieldicon.png');
		//Loading Shields
		
		//Loading guns
		game.load.spritesheet('doubleshootericon', 'assets/images/humans/doubleshootericon.png');
		//Loading guns
		
		//Loading info bar
		
		game.load.spritesheet('hudinfo', 'assets/images/hudinfo.png');
		game.load.spritesheet('hudlevel', 'assets/images/hudlevel.png');
		game.load.spritesheet('hudmoney', 'assets/images/hudmoney.png');
		game.load.spritesheet('barlife', 'assets/images/barlife.png');
		game.load.spritesheet('bararmor', 'assets/images/bararmor.png');
		game.load.spritesheet('hudbottom', 'assets/images/hudbottom.png');
		game.load.spritesheet('strokexp', 'assets/images/strokexp.png');
		game.load.spritesheet('fillxp', 'assets/images/fillxp.png');
		//Loading info bar
		
		//Loading enemeys
		game.load.spritesheet('fighterenemey', 'assets/images/enemey/1.png');
		game.load.spritesheet('cruiserenemey', 'assets/images/enemey/4.png');
		game.load.spritesheet('destroyerenemey', 'assets/images/enemey/6.png');
		game.load.spritesheet('boss1', 'assets/images/enemey/9B.png');
		//Loading enemeys
		
		//Loading bullet
		game.load.spritesheet('bullet', 'assets/images/bullet.png');
		game.load.spritesheet('bullet_red', 'assets/images/bullet_red.png');
		game.load.spritesheet('greenlaser', 'assets/images/greenlaser.png');
		game.load.spritesheet('redlaser', 'assets/images/redlaser.png');
		game.load.spritesheet('purplelaser', 'assets/images/purplelaser.png');
		game.load.spritesheet('bluelaser', 'assets/images/bluelaser.png');
		//Loading bullet
		
		//Loading explosion
		game.load.spritesheet('explosionred', 'assets/images/explosionred.png', 340, 340);
		game.load.spritesheet('explosionblue', 'assets/images/exploseblue.png', 340, 340);
		game.load.spritesheet('explosionpurple', 'assets/images/explosepurple.png', 340, 340);
		//Loading explosion
		
		//Loading Planets
		game.load.spritesheet('planet1', 'assets/images/planets/planet1.png');
		//Loading Planets
		
		//Loading Nebula
		game.load.image('nebula1', 'assets/images/planets/nebula1.png');
		//Loading Nebula
		
		//Loading sounds
		game.load.audio('soundgame', ['assets/audio/space.mp3']);
		game.load.audio('soundgame2', ['assets/audio/e.ogg']);
		game.load.audio('soundlab', ['assets/audio/hightechlab.mp3', 'assets/audio/hightechlab.ogg']);	
		game.load.audio('soundlaser', ['assets/audio/laser.ogg', 'assets/audio/laser.mp3']);
		game.load.audio('soundexplosion', ['assets/audio/explosion_somewhere_far.mp3']);
		//Loading sounds
    },
    create: function(){
        game.state.start('Menu');
    }
};
