Menu = function(game){};

Menu.prototype = {
    create: function(){
        this.logo = game.add.sprite(game.world.centerX, 200, 'logo');
        this.logo.anchor.setTo(0.5);

        this.btnPlay = game.add.button(game.world.centerX, 500, 'btnplay', this.actionBtnPlay, this, 1, 0, 1);
        this.btnPlay.anchor.setTo(0.5);
        
        this.bgsound = game.add.audio('soundgame');
        this.bgsound.volume = .80;
        this.bgsound.play();
        this.bgsound.loop = true;

    },
    update: function(){
        
    },
    
    actionBtnPlay: function(){
        game.state.start('Play');
        this.bgsound.stop();
    },
  
};
