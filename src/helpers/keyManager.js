import Phaser from 'phaser';

const keyManager = (scene) => {
    let KEY_A;
    let KEY_S;
    let KEY_W;
    let KEY_D;
    let KEY_J;
    let KEY_R;
    let KEY_K;

    KEY_A = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    KEY_S = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    KEY_W = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    KEY_D = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    KEY_J = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
    KEY_R = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    KEY_K = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

    return {
        KEY_A,
        KEY_S,
        KEY_W,
        KEY_D,
        KEY_J,
        KEY_R,
        KEY_K
    }
}

export default keyManager;