import Phaser from "phaser";

const collisionManager = (scene, ground, map, death) => {
  // set colliders
  ground.setCollisionByProperty({ collides: true }, true, false, "Ground");
  scene.physics.add.collider(scene.player, ground);

  // player collides with death
  death.setCollisionByProperty({ death: true }, true, false, "Death");
  scene.physics.add.collider(scene.player, death, () => {
    scene.player.body.reset(scene.playerPosition.x, scene.playerPosition.y);
  });

  // player collides with book
  scene.physics.add.overlap(
    scene.book,
    scene.player,
    () => (scene.timer.paused = true),
    null,
    scene
  );

  // player collides with launcher
  scene.physics.add.overlap(
    scene.launchers,
    scene.player,
    () => {
      scene.player.setMaxVelocity(500, 1500);
      scene.player.setVelocityY(-1500);
    },
    null,
    scene
  );

  // player collides with enemy no attack
  scene.physics.add.overlap(
    scene.player,
    scene.enemies,
    (player, enemy) => {
      // enemy death particles
      const starParticles = scene.make.particles({
        key: "candy_particle",
        add: true,
      });
      const emitter = starParticles.createEmitter({
        on: false,
        speed: 150,
        gravityY: 200,
        scale: { start: 1, end: 1 },
        follow: enemy,
        lifespan: 350,
        quantity: 5,
        bounce: 1,
        // frequency: -1
      });

      if (player.isAttacking) {
        emitter.explode(5);
        enemy.disableBody(true, true);
        player.jumpCount = 0;
      } else {
        scene.player.body.reset(scene.playerPosition.x, scene.playerPosition.y);
      }
    },
    null,
    scene
  );

  // enemy collides with ground
  scene.physics.add.collider(scene.enemies, ground);

  // set world bounds and collide with player
  scene.player.setCollideWorldBounds(true);
  scene.physics.world.bounds.setTo(0, 0, map.widthInPixels, map.heightInPixels);
};

export default collisionManager;
