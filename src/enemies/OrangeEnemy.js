import Phaser from "phaser";

export default class OrangeEnemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    this.jumping = false;
  }

  create(
    jumpVelocity = 600,
    fallDelay = 500,
    jumpDelay = 300,
    jumpFreq = 3000
  ) {
    const timer = this.scene.time.addEvent({
      delay: jumpFreq, // ms
      callback: () => {
        this.jumping = true;
        this.anims.play("enemy_jump", true);
        setTimeout(() => {
          this.body.setVelocityY(-jumpVelocity);
          setTimeout(() => {
            this.jumping = false;
          }, fallDelay);
        }, jumpDelay);
      },
      //args: [],
      callbackScope: this.scene,
      loop: true,
    });
  }

  update() {
    if (!this.jumping) {
      this.anims.play("enemy_idle", true);
    }
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  "orange_enemy",
  function (x, y, texture, frame) {
    const sprite = new OrangeEnemy(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(
      sprite,
      Phaser.Physics.Arcade.DYNAMIC_BODY
    );

    sprite.setAccelerationY(-400);

    sprite.scale = 1.2;

    return sprite;
  }
);
