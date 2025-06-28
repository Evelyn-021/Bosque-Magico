export default class HelpScene extends Phaser.Scene {
  constructor() {
    super("HelpScene");
  }

  create() {
    this.add.rectangle(400, 300, 600, 400, 0x000000, 0.6); // fondo
    this.add.text(400, 200, "Controles:\n← → para moverse\nESPACIO para saltar\n⚔ para atacar", {
      fontSize: "24px",
      color: "#fff",
      align: "center",
      fontFamily: "Arial",
    }).setOrigin(0.5);

    // Cierra la ayuda con ESC
    this.input.keyboard.once("keydown-ESC", () => {
      this.scene.stop("HelpScene");
      this.scene.resume("ConfigScene");
    });
  }
}
