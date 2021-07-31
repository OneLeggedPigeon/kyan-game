import Phaser from "phaser";

import Preloader from './scenes/Preloader';
import Level1 from './scenes/Level1';
import Level2 from './scenes/Level2';

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 640,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1250 },
      debug: false,
    },
  },
  scene: [ Preloader, Level1, Level2 ],
  autoCenter: Phaser.Scale.CENTER_BOTH,
};

const game = new Phaser.Game(config);
