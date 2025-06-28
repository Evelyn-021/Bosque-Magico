export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
   
    // Fondo centrado en pantalla (parallax )
    this.fondo = this.add.tileSprite(0, 0, this.physics.world.bounds.width, 600, "fondo")
  .setOrigin(0, 0)
  .setScrollFactor(0); // se mantiene fijo o lo podés cambiar a 0.5 para parallax


    // Nubes (pueden ir un poco más arriba)
    this.add.image(400, 150, "nube").setScale(1.5);


    
    // Árboles lejanos del fondo
    const cantidadArbolesFondo = 12;
      const anchoNivel1 = 5000;
      const espacioEntreFondo = anchoNivel1 / cantidadArbolesFondo;

      for (let i = 0; i < cantidadArbolesFondo; i++) {
        const x = i * espacioEntreFondo + Phaser.Math.Between(-100, 100);
        const y = 400; // O podés variar también un poco la altura si querés
        this.add.image(x, y, "arbolesfondo").setScale(1.1).setScrollFactor(0.5);
      }


    // Generar 10 nubes en posiciones aleatorias
    for (let i = 0; i < 10; i++) {
      const x = Phaser.Math.Between(0, 6000); 
      const y = Phaser.Math.Between(50, 200); // Altura de las nubes

      this.add.image(x, y, "nube").setScale(1.2);
    }

    // Generar 8 árboles de fondo
    const cantidadArboles = 30;
    const anchoNivel = 5000; // que coincida con el `setBounds`
    const espacioEntreArboles = anchoNivel / cantidadArboles;

    for (let i = 0; i < cantidadArboles; i++) {
      const x = i * espacioEntreArboles + Phaser.Math.Between(-50, 50); // le das un poco de variación
      const y = 400;

      this.add.image(x, y, "arbolcapa1").setScale(1.2);
    }


   

  // suelo
 // Suelo repetido como fondo (tileSprite)
this.suelo = this.add.tileSprite(0, 600, 5000, 32, "suelo").setOrigin(0, 1);

// Crear colisión con suelo invisible
this.sueloCollider = this.physics.add.staticImage(0, 600, null)
  .setOrigin(0, 1)
  .setDisplaySize(5000, 32) // Misma medida que el tileSprite
  .refreshBody();

this.sueloCollider.setVisible(false);


  

//PLATAFORMAS
// GRUPO DE PLATAFORMAS
this.plataformas = this.physics.add.staticGroup();



// Plataformas normales
this.plataformas.create(300, 400, "plataforma").setScale(0.6).refreshBody();
this.plataformas.create(600, 500, "plataforma").setScale(0.6).refreshBody();


// PLATAFORMA MÓVIL (ejemplo 1)
this.plataformaMovil1 = this.physics.add.image(1000, 400, "plataforma")
  .setImmovable(true)
  .setVelocity(0, 0)
  .setScale(0.7)
  .setDepth(1);
this.plataformaMovil1.body.allowGravity = false;

// Tweens para moverla verticalmente
this.tweens.add({
  targets: this.plataformaMovil1,
  y: 300, // hasta donde sube
  duration: 2000,
  yoyo: true,
  repeat: -1,
  ease: 'Sine.easeInOut'
});

// Otra plataforma móvil (ejemplo 2)
this.plataformaMovil2 = this.physics.add.image(2000, 500, "plataforma")
  .setImmovable(true)
  .setVelocity(0, 0)
  .setScale(0.7)
  .setDepth(1);
this.plataformaMovil2.body.allowGravity = false;

this.tweens.add({
  targets: this.plataformaMovil2,
  y: 400,
  duration: 2500,
  yoyo: true,
  repeat: -1,
  ease: 'Sine.easeInOut'
});












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
  
    this.player.body.setSize(30, 55); // CORRECCION CAJA DE COLISION
    this.player.body.setOffset(10, 30);
     
// Agregar colisión entre jugador y suelo invisible
this.physics.add.collider(this.player, this.sueloCollider);
this.physics.add.collider(this.player, this.plataformas);
this.physics.add.collider(this.player, this.plataformaMovil1);
this.physics.add.collider(this.player, this.plataformaMovil2);



      // Animaciones derecha
      this.anims.create({
        key: "caminarDer",
        frames: this.anims.generateFrameNumbers("der", { start: 1, end: 3 }),
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
        frames: this.anims.generateFrameNumbers("izq", { start: 1, end: 3 }),
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



//no se revolvio como queria (se deja el cambio hasta arreglarlo)
// SALTO: solo cambia el sprite y sube
const enSuelo = this.player.body.blocked.down;
if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && enSuelo) {
  this.player.setVelocityY(-250);
  this.player.setTexture("saltop");
  this.player.setFrame(1); // Solo ese frame
}







// Si el personaje cae al vacío
if (this.player.y > this.mapHeight) {
  this.registry.set("vida", this.registry.get("vida") - 1); // 💔 restar 1 corazón
  this.scene.pause();  // pausa el juego
  this.scene.launch("GameOverScene"); // muestra ventana de Game Over
}


//FONDO 
this.fondo.tilePositionX = this.cameras.main.scrollX * 0.5;



}}

