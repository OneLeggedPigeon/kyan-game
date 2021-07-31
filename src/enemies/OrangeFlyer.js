import Phaser from "phaser";

export default class OrangeFlyer extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    this.anims.play("flyer_idle");
  }

  create() {
    this.scene.tweens.add({
      targets: this,
      y: this.y - 20,
      duration: 1000,
      ease: "Linear",
      yoyo: true,
      repeat: -1,
    });
  }

  update() {
    this.body.updateFromGameObject();
  }
}

Phaser.GameObjects.GameObjectFactory.register(
  "orange_flyer",
  function (x, y, texture, frame) {
    const sprite = new OrangeFlyer(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(
      sprite,
      Phaser.Physics.Arcade.STATIC_BODY
    );

    sprite.scale = 1.2;

    return sprite;
  }
);
