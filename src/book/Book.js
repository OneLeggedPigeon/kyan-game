import Phaser from "phaser";

export default class Book extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    this.anims.play("book_float");
  }
}

// register book factory function
// this.add.book(x, y, texture)
Phaser.GameObjects.GameObjectFactory.register(
  "book",
  function (x, y, texture, frame) {
    const sprite = new Book(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(
      sprite,
      Phaser.Physics.Arcade.STATIC_BODY
    );

    sprite.scale = 2;
    sprite.setSize(64, 64);
    sprite.setOffset(-16, -16);

    return sprite;
  }
);
