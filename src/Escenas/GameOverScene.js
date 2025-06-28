// GameOverScene.js
export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  create() {
    const overlay = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.5);

    const ventana = this.add.rectangle(400, 300, 400, 250, 0xffffff).setStrokeStyle(4, 0x000000);

    this.add.text(400, 240, "¡Perdiste un corazón!", {
      fontSize: "28px",
      color: "#000",
      fontFamily: "Arial"
    }).setOrigin(0.5);

    const botonReiniciar = this.add.text(400, 310, "Reintentar", {
      fontSize: "24px",
      color: "#0077cc",
      fontFamily: "Arial"
    }).setOrigin(0.5).setInteractive();

    botonReiniciar.on("pointerdown", () => {
      this.scene.stop("GameOverScene");
      this.scene.stop("GameScene");
      this.scene.start("GameScene");
    });

    const botonMenu = this.add.text(400, 360, "Volver al menú", {
      fontSize: "24px",
      color: "#0077cc",
      fontFamily: "Arial"
    }).setOrigin(0.5).setInteractive();

    botonMenu.on("pointerdown", () => {
      this.scene.stop("GameOverScene");
      this.scene.stop("GameScene");
      this.scene.start("MenuScene");
    });
  }
}
