export default class Preload extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    // Fondo del menú y botones
    this.load.image("Menu", "./public/assets/img/interfaz/Menu.png");
    this.load.image("Boton", "./public/assets/img/interfaz/Boton.png");
    this.load.image("config", "./public/assets/img/interfaz/Configuracion.png");
    this.load.image("Sonido", "./public/assets/img/interfaz/Sonido.png");
    this.load.image("SinSonido", "./public/assets/img/interfaz/sinSonido.png");
    this.load.image("BotonInicio", "./public/assets/img/interfaz/BotonInicio.png");
    this.load.image("Cerrar", "./public/assets/img/interfaz/Cerrar.png");
    this.load.image("Restart", "./public/assets/img/interfaz/Restart.png");
    this.load.image("Ventanaconfig", "./public/assets/img/interfaz/Ventanaconfig.png");
    this.load.image("ComoJugar", "./public/assets/img/interfaz/ComoJugar.png");
    this.load.image("vida", "./public/assets/img/interfaz/vida.png");

   


    //ESCENARIO
    
    this.load.image("fondo", "./public/assets/img/escenario/fondo.png");
    this.load.image("arbolcapa1", "./public/assets/img/escenario/arbolcapa1.png");
    this.load.image("arbolcapa2", "./public/assets/img/escenario/arbolcapa2.png");
    this.load.image("nube", "./public/assets/img/escenario/nube.png");
    this.load.image("arbolesfondo", "./public/assets/img/escenario/arbolesfondo.png");
    this.load.image("suelo1", "./public/assets/img/escenario/suelo1.png");
    this.load.image("plataforma", "./public/assets/img/escenario/Plataforma.png");
    this.load.image("arbol1", "./public/assets/img/escenario/arbol1.png");
    this.load.image("arbol2", "./public/assets/img/escenario/arbol2.png");
    this.load.image ("ramaplataforma", "./public/assets/img/escenario/ramaplataforma.png");
    this.load.image ("base", "./public/assets/img/escenario/base.png");
    this.load.image("rama2", "./public/assets/img/escenario/rama2.png");
    this.load.image ("picosuelo", "./public/assets/img/escenario/picosuelo.png");
    this.load.image("picoramas", "./public/assets/img/escenario/picoramas.png");
    
 // 🎵 música
    this.load.audio("Musica", "./public/assets/sonidos/Musica.mp3");
    //SONIDOS
    this.load.audio("sonidoDaño", "./public/assets/sonidos/dañopersonaje.mp3");

   
  

    //PERSONAJE
    // Mirddin
     this.load.spritesheet("der", "./public/assets/img/Personaje/der.png", {
    frameWidth: 128,
    frameHeight: 83,
  });

  this.load.spritesheet("izq", "./public/assets/img/Personaje/izq.png", {
    frameWidth: 128,
    frameHeight: 83,
  });

this.load.spritesheet("saltop", "./public/assets/img/Personaje/saltop.png", {
  frameWidth: 119, // ← ancho de cada frame
  frameHeight: 81  // ← alto de cada frame
});




      }

  create() {
   

    // Una vez que se carga todo, vamos al menú
    this.scene.start("MenuScene");
  }
}
