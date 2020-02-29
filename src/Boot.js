Boot = function(game) {};

Boot.prototype = {
    init: function() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.updateLayout(true);
        this.scale.refresh();
    },
    create: function() {
        game.state.add('Splash', Splash);
        game.state.add('Preload', Preload);
        game.state.add('Menu', Menu);
        game.state.add('Play', UniverseWar.Play);
        game.state.add('Game', UniverseWar.Game);
        //game.state.add('Score', Score);
        //game.state.add('GameOver', GameOver);

        game.state.start('Splash');
    }
};