import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);

    this.jumpCount = 0;
    this.isAttacking = false;
    this.speedCap = 400;
  }

  // movement functions
  // this.player.update(cursors)
  update(keys) {
    const { KEY_A, KEY_D, KEY_W, KEY_J, KEY_K } = keys;

    const xFloorSpeed = 2000;
    const xAirSpeed = 1500;
    const dashSpeed = 750;
    const ySpeed = 500;

    this.setAcceleration(0, 0);

    // idle animation
    if (!KEY_A.isDown && !KEY_D.isDown && !this.isAttacking) {
      this.anims.play("idle", true);
    }

    // left movement
    if (KEY_A.isDown && !this.isAttacking) {
      if (this.body.onFloor()) {
        this.body.setAccelerationX(-xFloorSpeed);
      } else {
        this.body.setAccelerationX(-xAirSpeed);
      }
      this.anims.play("run", true);
      this.flipX = true;
    }

    // right movement
    if (KEY_D.isDown && !this.isAttacking) {
      if (this.body.onFloor()) {
        this.body.setAccelerationX(xFloorSpeed);
      } else {
        this.body.setAccelerationX(xAirSpeed);
      }
      this.anims.play("run", true);
      this.flipX = false;
    }
    // jump
    if (Phaser.Input.Keyboard.JustDown(KEY_J) && !this.isAttacking) {
      if (this.jumpCount >= 1) {
        return;
      }
      this.jumpCount = this.jumpCount + 1;
      this.hovering = false;
      this.body.setVelocityY(-ySpeed);
    }

    // in-air movement

    // attack/dash
    if (Phaser.Input.Keyboard.JustDown(KEY_K) && !this.isAttacking) {
      this.isAttacking = true;
      this.body.setAllowGravity(false);
      this.body.setDragX(0);
      this.body.setMaxVelocityX(dashSpeed);
      this.body.setVelocity(this.flipX ? -dashSpeed : dashSpeed, 0);
      this.setSize(32, 32);
      this.setOffset(this.flipX ? 0 : 32, 0);
      setTimeout(() => {
        this.body.setAllowGravity(true);
        this.body.setDragX(0.001);
        this.body.setAccelerationY(0);
        this.body.setMaxVelocityX(500);
        this.isAttacking = false;
        this.setSize(20, 32);
        this.setOffset(10, 8);
      }, 300);
    }

    if (this.isAttacking) {
      this.anims.play("attack", true);
    }

    // reset max velocity at the top of jumps/launches
    if (this.body.deltaY() === 0) {
      this.body.setMaxVelocityY(500);
    }

    // jump animation
    if (this.body.deltaY() < 0 && !this.body.onFloor() && !this.isAttacking) {
      this.anims.play("jump");
    }

    // falling animation
    if (this.body.deltaY() > 0 && !this.body.onFloor() && !this.isAttacking) {
      this.anims.play("fall", true);
    }

    if (this.body.onFloor()) {
      this.jumpCount = 0;
    }
  }
}

// register player factory function
// this.add.player(x, y, texture)
Phaser.GameObjects.GameObjectFactory.register(
  "player",
  function (x, y, texture, frame) {
    const sprite = new Player(this.scene, x, y, texture, frame);

    this.displayList.add(sprite);
    this.updateList.add(sprite);

    this.scene.physics.world.enableBody(
      sprite,
      Phaser.Physics.Arcade.DYNAMIC_BODY
    );

    sprite.setMaxVelocity(500, 500);

    sprite.setSize(20, 32);
    sprite.setOffset(10, 8);

    sprite.body.setDamping(true);
    sprite.body.setDrag(0.001, 0);

    sprite.scale = 1.3;

    return sprite;
  }
);
