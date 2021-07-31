import Phaser from "phaser";

import "../player/Player";
import "../book/Book";
import keyManager from "../helpers/keyManager";
import cameraManager from "../helpers/cameraManager";
import collisionManager from "../helpers/collisionManager";
import timerManager from "../helpers/timerManager";
import configureMap from "../helpers/configureMap";

export default class Game extends Phaser.Scene {
  constructor() {
    super("level2");
    this.player;
    this.book;
    this.playerPosition = { x: 96, y: 4704 };
  }

  preload() {}

  create() {
    const { map, ground, death } = configureMap(this, "level2");
    this.book = this.add.book(32 * 10.5, 32 * 9.5, "book");
    this.player = this.add.player(
      this.playerPosition.x,
      this.playerPosition.y,
      "player"
    );
    this.launchers = this.physics.add.staticGroup();
    this.launchers.create(224, 4608, "star");
    this.launchers.create(704, 3648, "star");
    this.launchers.create(704, 32 * 97, "star");
    this.launchers.create(2304, 3712, "star");
    this.launchers.create(32 * 66, 32 * 91, "star");
    this.launchers.create(32 * 78, 32 * 64, "star");
    this.launchers.create(32 * 66, 32 * 38, "star");
    this.launchers.create(32 * 16, 32 * 38, "star");

    collisionManager(this, ground, map, death);
    cameraManager(this, map);
    timerManager(this);
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
  }
}
