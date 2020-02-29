(function(){
    game = new Phaser.Game(1024, 800, Phaser.CANVAS, null);
    game.state.add('Boot', Boot);
    game.state.start('Boot');
}());