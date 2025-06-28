import MenuScene from "../Escenas/MenuScene.js";
import Preload from "../Escenas/preload.js";
import GameScene from "../Escenas/GameScene.js";
import ConfigScene from "../Escenas/ConfigScene.js";
import HelpScene from "../Escenas/HelpScene.js";
import GameOverScene from "../Escenas/GameOverScene.js";
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: { width: 800, height: 600 },
    max: { width: 6000, height: 1200 },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true
    }
  },
  render: {
    pixelArt: false,       // ← importante: false si usás imágenes vectoriales o suaves
    antialias: true,       // ← suaviza líneas y bordes
    antialiasGL: true,     // ← suaviza en WebGL
    roundPixels: false     // ← evita redondeos bruscos que deforman sprites
  },
  scene: [Preload, MenuScene, GameScene, ConfigScene, HelpScene, GameOverScene] // Menú primero 
};

window.game = new Phaser.Game(config);
