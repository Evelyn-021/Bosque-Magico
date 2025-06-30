
import SoundButton from "./SoundButton.js";
export default class ConfigScene extends Phaser.Scene {
  constructor() {
    super("ConfigScene");
  }

  create() {
    // Fondo semitransparente para oscurecer el juego
    const overlay = this.add.rectangle(400, 300, 1600, 600, 0x591F8C, 0.5);

    // Ventana de configuración (puede reemplazarse con imagen si querés)
    const ventana = this.add.image(400, 300, "Ventanaconfig").setOrigin(0.5);

    // Botón de cerrar arriba a la derecha de la ventana
      const cerrarBtn = this.add.image(ventana.x + ventana.width / 2 - 25, ventana.y - ventana.height / 2 + 25, "Cerrar")
        .setInteractive()
        .setScale(0.5);

      // Al hacer clic, cierra la escena de config y vuelve al juego
      cerrarBtn.on("pointerdown", () => {
        this.scene.stop(); // Cierra la escena de menú
        this.scene.resume("GameScene"); // Vuelve al juego
      });

  

    // Opciones
    //PLACEHOLDER SONIDO
    //  SLIDER de volumen
    const sliderX = 420;
    const sliderY = 290;
    const sliderWidth = 170;

    const linea = this.add.rectangle(sliderX, sliderY, sliderWidth, 5, 0x130030);
    const thumb = this.add.circle(sliderX, sliderY, 8, 0x4FF0D9).setInteractive({ draggable: true });

    // Obtener o inicializar volumen global
    if (this.registry.get("volume") === undefined) {
      this.registry.set("volume", 1);
    }
    let volume = this.registry.get("volume");
    this.sound.volume = volume;

    // Posicionar el círculo según el volumen guardado
    thumb.x = sliderX - sliderWidth / 2 + volume * sliderWidth;

    const updateVolume = (x) => {
      const min = sliderX - sliderWidth / 2;
      const max = sliderX + sliderWidth / 2;
      x = Phaser.Math.Clamp(x, min, max);

      thumb.x = x;
      volume = (x - min) / sliderWidth;
      this.sound.volume = volume;
      this.registry.set("volume", volume);
    };

    thumb.on("drag", (pointer, dragX) => {
      updateVolume(dragX);
    });
    
    //BOTON VOLVER AL MENU
        const botonInicio = this.add.image(300, 390, "BotonInicio")
      
      .setInteractive();

    botonInicio.on("pointerdown", () => {
    this.sound.stopAll(); // 🔇 Detiene toda la música/sonido que esté activa
    this.scene.stop("GameScene");
    this.scene.stop(); // ConfigScene
    this.scene.start("MenuScene");

    });

    // BOTON REINICIAR NIVEL
    const botonReiniciar = this.add.image(390, 390, "Restart").setInteractive();
    botonReiniciar.on("pointerdown", () => {
      this.scene.stop("ConfigScene");     // Cerramos la ventana de config
      this.scene.stop("GameScene");       // Paramos el juego actual
      this.scene.start("GameScene");      // Volvemos a iniciar el nivel
    });

// BOTON DE AYUDA (COMO JUGAR)
const botonComoJugar = this.add.image(490, 390, "ComoJugar").setInteractive();
botonComoJugar.on("pointerdown", () => {
  // Abrir una escena de ayuda o mostrar un cartel
  this.scene.pause(); // Pausa la escena actual
  this.scene.launch("HelpScene"); 
});


    //BOTON DE ACTIVAR SONIDO/DESACTIVAR
      new SoundButton(this, 300, 290);
   

    // ESC para cerrar el menú
    this.input.keyboard.once("keydown-ESC", () => {
      this.scene.stop(); // Cierra la escena de menú
      this.scene.resume("GameScene"); // Vuelve al juego
    });

     
  } 



}
