import SoundButton from "../Escenas/SoundButton.js";
export default class MenuScene extends Phaser.Scene {
  constructor() {
    super("MenuScene"); // nombre para llamar a la escena
  }


  create() {
    // Fondo centrado
    this.add.image(400, 300, "Menu").setDisplaySize(800, 600);

    // Botón para empezar el juego
    const boton = this.add.image(400, 350, "Boton").setInteractive();
    boton.setScale(0.8).setOrigin(0.5);

    // Al hacer clic, cambia de escena
    boton.on("pointerdown", () => {
      this.scene.start("GameScene"); 
    });

    // También se puede presionar ENTER para comenzar
    this.input.keyboard.once("keydown-ENTER", () => {
      this.scene.start("GameScene");
    });


    //SONIDO
    new SoundButton(this, 750, 50);

const musica = this.sound.get("Musica");

if (!musica) {
  // No existe: la creamos y la reproducimos
  this.musica = this.sound.add("Musica", {
    loop: true,
    volume: 3
  });
  this.musica.play();
} else if (!musica.isPlaying) {
  // Existe pero está detenida: la reproducimos de nuevo
  musica.play();
}





  }
}
