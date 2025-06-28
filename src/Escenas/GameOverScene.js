export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  create() {
    const vidas = this.registry.get("vida");

    // Fondo oscuro semi-transparente
    const overlay = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.5);

    // Ventana blanca con borde negro
    const ventana = this.add.rectangle(400, 300, 400, 250, 0xffffff)
      .setStrokeStyle(4, 0x000000);

    let mensaje = "";
    if (vidas > 0) {
      mensaje = "¡Perdiste un corazón!";
    } else {
      mensaje = "¡Game Over!";
    }

    this.add.text(400, 240, mensaje, {
      fontSize: "28px",
      color: "#000",
      fontFamily: "Arial",
    }).setOrigin(0.5);

    // Botón principal (Reintentar o Continuar)
    const botonPrincipal = this.add.text(400, 310, vidas > 0 ? "Continuar" : "Reiniciar", {
      fontSize: "24px",
      color: "#0077cc",
      fontFamily: "Arial",
    }).setOrigin(0.5).setInteractive();

    botonPrincipal.on("pointerdown", () => {
      this.scene.stop("GameOverScene");
      this.scene.stop("GameScene");
      this.scene.start("GameScene");
    });

    // Botón de menú
    const botonMenu = this.add.text(400, 360, "Volver al menú", {
      fontSize: "24px",
      color: "#0077cc",
      fontFamily: "Arial",
    }).setOrigin(0.5).setInteractive();

    botonMenu.on("pointerdown", () => {
      this.scene.stop("GameOverScene");
      this.scene.stop("GameScene");
      this.scene.start("MenuScene");
    });
  }
}
