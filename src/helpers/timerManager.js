import Phaser from 'phaser';

const timerManager = (scene) => {
    const timeText = scene.add.text(20, 20, "00:00:00");
    timeText.setAlign("center");
    timeText.setColor("white");
    timeText.setStroke("black", 2);
    timeText.setScrollFactor(0);
    timeText.setFontSize(32);

    let timeCount = 0;

    const formattedTime = () => {
      const milliseconds = timeCount % 100;
      const seconds = Math.floor((timeCount / 100) % 60);
      const minutes = Math.floor((timeCount / (60 * 100)) % 60);

      const paddedMilliseconds =
        milliseconds.toString().length < 2
          ? `0${milliseconds}`
          : `${milliseconds}`;
      const paddedMinutes =
        minutes.toString().length < 2 ? `0${minutes}` : `${minutes}`;
      const paddedSeconds =
        seconds.toString().length < 2 ? `0${seconds}` : `${seconds}`;

      return `${minutes ? paddedMinutes : "00"}:${
        seconds ? paddedSeconds : "00"
      }.${paddedMilliseconds}`;
    };

    scene.timer = scene.time.addEvent({
      loop: true,
      callbackScope: scene,
      timeScale: 1,
      delay: 1,
      callback: () => {
        timeCount = +timeCount + 1;
        timeText.setText(formattedTime());
        formattedTime();
      },
    });
}

export default timerManager;