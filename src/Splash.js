Splash = function(game){};

Splash.prototype = {
    preload: function(){
        this.load.image('logo', 'assets/images/menu/logo.png');
        this.load.image('loadingbar', 'assets/images/menu/loadingbar.png');
    },
    create: function(){
        this.logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
        this.logo.anchor.setTo(0.5);
        this.logo.alpha = 0.1;
        
        game.add.tween(this.logo).to( { alpha: 1 }, 2000, "Linear", true);
        
        setTimeout(function(){
            game.state.start('Preload');
        }, 3000);  
    }
};
