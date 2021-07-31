import Phaser from "phaser";

import "../player/Player";
import "../book/Book";
import "../enemies/OrangeEnemy";
import "../enemies/OrangeFlyer";
import keyManager from "../helpers/keyManager";
import cameraManager from "../helpers/cameraManager";
import collisionManager from "../helpers/collisionManager";
import timerManager from "../helpers/timerManager";
import configureMap from "../helpers/configureMap";

export default class Game extends Phaser.Scene {
  constructor() {
    super("level1");
    this.player;
    this.book;
    this.playerPosition = { x: 32, y: 200 };
  }

  preload() {}

  create() {
    const { map, ground, death } = configureMap(this, "level1");
    this.book = this.add.book(3085, 1430, "book");
    this.player = this.add.player(
      this.playerPosition.x,
      this.playerPosition.y,
      "player"
    );
    this.launchers = this.physics.add.staticGroup();
    this.launchers.create(2525, 1344, "star_launcher");
    this.launchers.playAnimation("launcher_float");

    this.enemies = this.add.group();

    this.jumper1 = this.add.orange_enemy(128, 200, "orange_enemy");
    this.jumper1.create();

    this.enemies.add(this.jumper1);

    this.flyer1 = this.add.orange_flyer(200, 200, "orange_flyer");
    this.flyer1.create();

    this.enemies.add(this.flyer1);

    collisionManager(this, ground, map, death);
    cameraManager(this, map);
    // timerManager(this);
  }

  update() {
    const keys = keyManager(this);
    const { KEY_R } = keys;

    if (Phaser.Input.Keyboard.JustDown(KEY_R)) {
      this.scene.restart();
    }

    if (this.player) {
      this.player.update(keys);
    }

    if (this.enemies) {
      this.jumper1.update();

      this.flyer1.update();
    }
  }
}
