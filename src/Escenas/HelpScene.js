export default class HelpScene extends Phaser.Scene {
  constructor() {
    super("HelpScene");
  }

  
  create() {
    // Fondo con imagen
    const ventana = this.add.rectangle(400, 300, 500, 350, 0x591F8C)
      .setStrokeStyle(4, 0x3C015E);

    // Texto de ayuda
    this.add.text(400, 160,
      "Controles:",
      {
        fontSize: "32px",
        color: "#ffffff",
        fontFamily: "Arial",
        align: "center"
      })
      .setOrigin(0.5)
      .setShadow(2, 2, "#000", 2, true, true);

  
this.add.text(400, 270,
  "← → para moverse\n↑ para saltar\nP para usar poción\nE para activar inmunidad\n(si tenés 10 luciérnagas)", 
  {
    fontSize: "20px",
    color: "#ffffff",
    fontFamily: "Arial",
    align: "center",
    lineSpacing: 10
  })
  .setOrigin(0.5)
  .setShadow(1, 1, "#000", 1, true, true);

this.add.text(400, 400,
  "Pulsa ESC para cerrar esta ventana\n y volver al juego",
  {
    fontSize: "20px",
    //color rojo
    color: "#ff0000",
    fontFamily: "Arial",
    align: "center"
  })
  .setOrigin(0.5)
  .setShadow(1, 1, "#000", 1, true, true);

    // Cierra la ayuda con ESC
    this.input.keyboard.once("keydown-ESC", () => {
      this.scene.stop("HelpScene");
      this.scene.resume("ConfigScene");
    });
  }
}
