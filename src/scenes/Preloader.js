import Phaser from "phaser";

export default class Preload extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.image("tiles", "assets/maps/spritesheet.png");
    this.load.image("oranges", "assets/maps/oranges.png");
    this.load.tilemapTiledJSON("level1", "assets/maps/level1.json");
    this.load.tilemapTiledJSON("level2", "assets/maps/level2.json");
    this.load.atlas(
      "book",
      "assets/book/bl_book.png",
      "assets/book/bl_book.json"
    );
    this.load.atlas(
      "player",
      "assets/character/spritesheet.png",
      "assets/character/spritesheet.json"
    );
    this.load.atlas(
      "orange_enemy",
      "assets/orange/orange_enemy_spritesheet.png",
      "assets/orange/orange_enemy_spritesheet.json"
    );
    this.load.atlas(
      "orange_flyer",
      "assets/orange/orange_flyer.png",
      "assets/orange/orange_flyer.json"
    );
    this.load.atlas(
      "attack_sprite",
      "assets/character/attack_sprite.png",
      "assets/character/attack_sprite.json"
    );
    this.load.atlas(
      "star_launcher",
      "assets/launcher/star_launcher.png",
      "assets/launcher/star_launcher.json"
    );
    this.load.image("candy_particle", "assets/particles/candy_particle.png");
  }

  create() {
    // player animations
    // run
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNames("player", {
        prefix: "RUN",
        suffix: ".png",
        start: 0,
        end: 5,
      }),
      repeat: -1,
      frameRate: 15,
    });
    // idle
    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNames("player", {
        prefix: "IDLE",
        suffix: ".png",
        start: 0,
        end: 3,
      }),
      repeat: -1,
      frameRate: 10,
    });
    // jump
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNames("player", {
        prefix: "JUMP",
        suffix: ".png",
        start: 0,
        end: 2,
      }),
      frameRate: 10,
    });
    // fall
    this.anims.create({
      key: "fall",
      frames: this.anims.generateFrameNames("player", {
        prefix: "JUMP",
        suffix: ".png",
        start: 2,
        end: 2,
      }),
      frameRate: 10,
    });
    // enemy idle
    this.anims.create({
      key: "enemy_idle",
      frames: this.anims.generateFrameNames("orange_enemy", {
        prefix: "orange_enemy_idle",
        suffix: ".png",
        start: 1,
        end: 4,
      }),
      frameRate: 10,
      repeat: -1,
    });
    //enemy jump
    this.anims.create({
      key: "enemy_jump",
      frames: this.anims.generateFrameNames("orange_enemy", {
        prefix: "orange_enemy_jump",
        suffix: ".png",
        start: 1,
        end: 4,
      }),
      frameRate: 10,
    });
    //enemy fall
    this.anims.create({
      key: "enemy_fall",
      frames: this.anims.generateFrameNames("orange_enemy", {
        prefix: "orange_enemy_jump",
        suffix: ".png",
        start: 5,
        end: 5,
      }),
      frameRate: 10,
    });
    // orange flyer idle
    this.anims.create({
      key: "flyer_idle",
      frames: this.anims.generateFrameNames("orange_flyer", {
        prefix: "orange_flyer_",
        suffix: ".png",
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "attack",
      frames: this.anims.generateFrameNames("attack_sprite", {
        prefix: "attack_sprite_",
        suffix: ".png",
        start: 0,
        end: 2,
      }),
      frameRate: 20,
      repeat: -1,
    });

    this.anims.create({
      key: "book_float",
      frames: this.anims.generateFrameNames("book", {
        prefix: "bl_book_",
        suffix: ".png",
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "launcher_float",
      frames: this.anims.generateFrameNames("star_launcher", {
        prefix: "star_particle_",
        suffix: ".png",
        start: 0,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.start("level1");
  }
}
