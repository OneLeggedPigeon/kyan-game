import Phaser from 'phaser';

const cameraManager = (scene, map) => {
    scene.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    scene.cameras.main.startFollow(scene.player, false, 0.18, 0.18, 0, 0);
    scene.cameras.main.setFollowOffset(0, 50);
    scene.cameras.main.setBackgroundColor("#529fde");
};

export default cameraManager;