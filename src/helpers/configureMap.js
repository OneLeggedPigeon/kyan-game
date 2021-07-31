import Phaser from "phaser";

const configureMap = (scene, levelKey) => {
  const map = scene.make.tilemap({ key: levelKey });
  const tileset = map.addTilesetImage("mythical_tileset", "tiles");
  const orangeTile = map.addTilesetImage("oranges", "oranges");
  map.createLayer("Decorations", [tileset, orangeTile]);
  const death = map.createLayer("Death", orangeTile);
  const ground = map.createLayer("Ground", tileset);

  return {
    map,
    ground,
    death,
  };
};

export default configureMap;
