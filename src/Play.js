var UniverseWar = {
    player: null,

};

UniverseWar.Play = function(game) {
    this.powerbar = 0;
};

UniverseWar.Play.prototype = {
    create: function() {
        this.soundlab = game.add.audio('soundlab');
        this.soundlab.volume = .20;
        //this.soundlab.play();

        this.bg = game.add.sprite(0, 0, 'bg0');
        this.centermenu = game.add.sprite(game.world.centerX, game.world.centerY, 'centermenu');
        this.centermenu.anchor.setTo(0.5);

        this.menu1 = game.add.sprite(150, 275, 'menu1');
        this.menu1.anchor.setTo(0.5);

        this.menu2 = game.add.sprite(150, 550, 'menu0');
        this.menu2.anchor.setTo(0.5);

        this.menu3 = game.add.sprite(game.world.centerX * 1.7, 275, 'menu0');
        this.menu3.anchor.setTo(0.5);

        var shipData = [
            { key: 'fighter', text: 'FIGHTER', life: 100, power: 40, armor: 10, speed: 60, price: 50000 },
            { key: 'cruiser', text: 'CRUISER', life: 10, power: 20, armor: 20, speed: 30, price: 35000 },
            { key: 'destroyer', text: 'DESTROYER', life: 100, power: 30, armor: 50, speed: 10, price: 60000 },
        ];

        this.ships = this.game.add.group();

        var self = this;
        var ship;
        shipData.forEach(function(element) {
            ship = self.ships.create(self.game.world.centerX, -1000, element.key);

            ship.customParams = { key: element.key, text: element.text, life: element.life, power: element.power, armor: element.armor, speed: element.speed, price: element.price };

            console.log(ship.customParams);

            ship.anchor.setTo(0.5);
            ship.inputEnabled = true;
            ship.input.pixelPerfectClick = true;
            ship.events.onInputDown.add(self.selectShip, self);
        });

        this.currentShip = this.ships.next();
        this.currentShip.position.set(this.game.world.centerX, this.game.world.centerY);

        //show text
        this.showText(this.currentShip);
        this.showInfo(this.currentShip);

        this.middlecircle1 = game.add.sprite(game.world.centerX * 1.7, game.world.centerY * 1.4, 'middlecircle1');
        this.middlecircle1.anchor.setTo(0.5);
        this.middlecircle2 = game.add.sprite(this.middlecircle1.centerX, this.middlecircle1.centerY, 'middlecircle2');
        this.middlecircle2.anchor.setTo(0.5);
        this.middlecircle3 = game.add.sprite(this.middlecircle1.centerX, this.middlecircle1.centerY, 'middlecircle3');
        this.middlecircle3.anchor.setTo(0.5);

        this.lineup = game.add.image(game.world.centerX, 95, 'line');
        this.lineup.anchor.setTo(0.5);
        this.lineup2 = game.add.image(game.world.centerX, 45, 'line2');
        this.lineup2.anchor.setTo(0.5);
        this.lineup2.scale.setTo(1, -1);

        this.linedown = game.add.image(0, game.world.centerY * 1.65, 'line');
        this.linedown2 = game.add.image(0, game.world.centerY * 1.7, 'line2');


        this.btnselectup = game.add.sprite(game.world.centerX, 55, 'btnselect');
        this.btnselectup.anchor.setTo(0.5);
        this.btnselectup.scale.y = -1;
        this.btnselectup.customParams = { direction: -1 };

        this.btnselectup.inputEnabled = true;
        //this.btnselectup.input.pixelPerfectClick = true;
        this.btnselectup.events.onInputDown.add(this.switchShip, this);

        this.btnselectdown = game.add.sprite(game.world.centerX, game.world.centerY * 1.85, 'btnselect');
        this.btnselectdown.anchor.setTo(0.5);
        this.btnselectdown.customParams = { direction: 1 };

        this.btnselectdown.inputEnabled = true;
        //this.btnselectdown.input.pixelPerfectClick = true;
        this.btnselectdown.events.onInputDown.add(this.switchShip, this);




    },
    update: function() {
        this.middlecircle1.angle += 1.9;
        this.middlecircle2.angle += 0.7;
        this.middlecircle3.angle -= 0.5;
    },

    createFighter: function() {},
    createCruiser: function() {},
    createDestroyer: function() {},

    selectShip: function(sprite, event) {

        //console.log(this.currentShip.customParams.key);

        UniverseWar.player = this.currentShip.customParams;

        //console.log(UniverseWar.player.key);
        console.log("AQUIIII")
        game.state.start('Game');

    },

    switchShip: function(sprite, event) {


        if (this.isMoving) { return false };

        this.isMoving = true;

        //hide text
        this.shipText.visible = false;
        this.shipValue.visible = false;


        this.shipInfoPower.visible = false;
        this.shipInfoArmor.visible = false;
        this.shipInfoSpeed.visible = false;

        var newShip, endY;

        if (sprite.customParams.direction > 0) {
            newShip = this.ships.next();
            newShip.y = -newShip.width / 2;
            endY = 800 + this.currentShip.width / 2;
        } else {
            newShip = this.ships.previous();
            newShip.y = 800 + newShip.width / 2;
            endY = -this.currentShip.width / 2;
        }

        var newShipMovement = game.add.tween(newShip);
        newShipMovement.to({ y: this.game.world.centerY }, 1000);
        newShipMovement.onComplete.add(function() {
            this.isMoving = false;
            this.showText(newShip);
            this.showInfo(newShip);
        }, this);
        newShipMovement.start();

        var currentShipMovement = this.game.add.tween(this.currentShip);
        currentShipMovement.to({ y: endY }, 1000);
        currentShipMovement.start();

        this.currentShip = newShip;

    },

    showText: function(ship) {
        if (!this.shipText || !this.shipValue) {
            var style = {
                font: 'bold 30pt Arial',
                fill: '#FFF',
                align: 'center'
            }

            var style2 = {
                font: 'bold 10pt Arial',
                fill: '#FFF',
                align: 'center'
            }
            this.shipText = this.game.add.text(this.game.width / 2, 200, '', style);
            this.shipText.anchor.setTo(0.5);

            this.shipValue = this.game.add.text(140, 380, '', style2);
            this.shipValue.anchor.setTo(0.5);


        }
        this.shipText.setText(ship.customParams.text);
        this.shipText.visible = true;

        this.shipValue.setText(ship.customParams.price);
        this.shipValue.visible = true;
    },

    showInfo: function(ship) {
        if (!this.shipInfoPower || !this.shipInfoArmor || !this.shipInfoSpeed) {
            this.shipInfoPower = game.add.sprite(140, 182, 'infobar');
            this.shipInfoArmor = game.add.sprite(140, 222, 'infobar');
            this.shipInfoSpeed = game.add.sprite(140, 262, 'infobar');

        }
        this.shipInfoPower.width = ship.customParams.power;
        this.shipInfoPower.visible = true;

        this.shipInfoArmor.width = ship.customParams.armor;
        this.shipInfoArmor.visible = true;

        this.shipInfoSpeed.width = ship.customParams.speed;
        this.shipInfoSpeed.visible = true;


    },
};