export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
   
    // Fondo centrado en pantalla
    this.add.image(400, 300, "fondo").setDisplaySize(800, 600);
    

    // Nubes (pueden ir un poco más arriba)
    this.add.image(400, 150, "nube").setScale(1.5);


    
    // Árboles lejanos del fondo
    this.add.image(400, 400, "arbolesfondo");
    


    // Generar 10 nubes en posiciones aleatorias
    for (let i = 0; i < 10; i++) {
      const x = Phaser.Math.Between(0, 6000); 
      const y = Phaser.Math.Between(50, 200); // Altura de las nubes

      this.add.image(x, y, "nube").setScale(1.2);
    }

    // Generar 8 árboles de fondo
    for (let i = 0; i < 8; i++) {
      const x = Phaser.Math.Between(0, 2000);
      const y = 400; // Altura fija si los árboles están en el suelo

      this.add.image(x, y, "arbolcapa1").setScale(1.2);
    }



   

  // suelo
  const suelo = this.physics.add.staticImage(400, 590, "suelo");
  suelo.setScale(1).refreshBody();



  // Entrada teclado
  this.cursors = this.input.keyboard.createCursorKeys();
  this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

 //CONFIGURACIÓN
 
    this.configBtn = this.add.image(750, 50, "config").setInteractive().setScale(0.5).setScrollFactor(0);

    this.configBtn.on("pointerdown", () => {
      this.scene.launch("ConfigScene");  // Abre Config
      this.scene.pause();                // Pausa GameScene
    });




   
  

  //JUGADOR
   this.player = this.physics.add.sprite(100, 450, "Mirddin");

    
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true)
    this.physics.add.collider(this.player, suelo);
    this.player.body.setSize(30, 55); // CORRECCION CAJA DE COLISION
    this.player.body.setOffset(10, 30);
     
      // Animaciones derecha
      this.anims.create({
        key: "caminarDer",
        frames: this.anims.generateFrameNumbers("der", { start: 1, end: 4 }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "idleDer",
        frames: [{ key: "der", frame: 0 }],
        frameRate: 1,
        repeat: -1,
      });

      // Animaciones izquierda
      this.anims.create({
        key: "caminarIzq",
        frames: this.anims.generateFrameNumbers("izq", { start: 1, end: 4 }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "idleIzq",
        frames: [{ key: "izq", frame: 0 }],
        frameRate: 1,
        repeat: -1,
      });






// Hacer que la cámara siga al personaje
    this.cameras.main.startFollow(this.player);

      // Hacemos el mundo más alto para permitir la caída
    this.physics.world.setBounds(0, 0, 5000, 2000); // Cambiá el 5000 por el ancho de tu nivel
    this.cameras.main.setBounds(0, 0, 5000, 600); // o más si querés que la cámara baje también

    this.mapWidth = 50000;
    this.mapHeight = 600;




}

update() {




  //FUNCIONA
  if (this.cursors.left.isDown) {
  if (this.facing !== "izq") {
    this.player.setTexture("izq");
    this.facing = "izq";
  }
  this.player.setVelocityX(-160);
  this.player.anims.play("caminarIzq", true);

} else if (this.cursors.right.isDown) {
  if (this.facing !== "der") {
    this.player.setTexture("der");
    this.facing = "der";
  }
  this.player.setVelocityX(160);
  this.player.anims.play("caminarDer", true);

} else {
  this.player.setVelocityX(0);
  if (this.facing === "der") {
    this.player.anims.play("idleDer", true);
  } else {
    this.player.anims.play("idleIzq", true);
  }
}






// Si el personaje cae al vacío
if (this.player.y > this.mapHeight) {
  this.registry.set("vida", this.registry.get("vida") - 1); // 💔 restar 1 corazón
  this.scene.pause();  // pausa el juego
  this.scene.launch("GameOverScene"); // muestra ventana de Game Over
}









}}

