import Recolectables from "../Escenas/Recolectables.js";
import Enemigos from "../Escenas/Enemigos.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
   
    // Fondo centrado en pantalla (parallax )
    this.fondo = this.add.tileSprite(0, 0, this.physics.world.bounds.width, 600, "fondo")
  .setOrigin(0, 0)
  .setScrollFactor(0); // se mantiene fijo o se puede cambiar a 0.5 para parallax


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





 // Generar 30 árboles de fondo capa 2
const cantidadArboles2 = 10;
    const anchoNivel2 = 5000; // que coincida con el `setBounds`
    const espacioEntreArboles2 = anchoNivel2 / cantidadArboles2;

    for (let i = 0; i < cantidadArboles2; i++) {
      const x = i * espacioEntreArboles2 + Phaser.Math.Between(-50, 50); // le das un poco de variación
      const y = 400;

      this.add.image(x, y, "arbolcapa2").setScale(0.8).setScrollFactor(0.6); // Ajusta el scale y scrollFactor para el efecto de fondo
    }




    // Generar 30 árboles de fondo capa 1
    const cantidadArboles = 30;
    const anchoNivel = 5000; // que coincida con el `setBounds`
    const espacioEntreArboles = anchoNivel / cantidadArboles;

    for (let i = 0; i < cantidadArboles; i++) {
      const x = i * espacioEntreArboles + Phaser.Math.Between(-50, 50); // le das un poco de variación
      const y = 400;

      this.add.image(x, y, "arbolcapa1").setScale(1.2).setScrollFactor(0.7); // Ajusta el scale y scrollFactor para el efecto de fondo
    }


   

  // suelo
 // Suelo repetido como fondo (tileSprite)
this.suelo1 = this.add.tileSprite(0, 600, 5000, 32, "suelo1").setOrigin(0, 1);

// Crear colisión con suelo invisible
this.suelo1Collider = this.physics.add.staticImage(0, 600, null)
  .setOrigin(0, 1)
  .setDisplaySize(5000, 32) // Misma medida que el tileSprite
  .refreshBody();

this.suelo1Collider.setVisible(false);


 


//PLATAFORMAS
// GRUPO DE PLATAFORMAS
this.plataformas = this.physics.add.staticGroup();



// Plataformas normales
this.plataformas.create(550, 170, "plataforma").setScale(0.6).refreshBody();



// PLATAFORMA MÓVIL (1)
this.plataformasMoviles = //(trate de hacer un grupo pero no se la logica)
this.plataformaMovil1 = this.physics.add.image(1000, 400, "plataforma")
  .setImmovable(true)
  .setVelocity(0, 0)
  .setScale(0.6)
  .setDepth(1);
this.plataformaMovil1.body.allowGravity = false;
// Tweens para moverla verticalmente
this.tweens.add({
  targets: this.plataformaMovil1,
  y: 100, // hasta donde sube
  duration: 2500,
  yoyo: true,
  repeat: -1,
  ease: 'Sine.easeInOut'
});


// Otra plataforma móvil (ejemplo 2)
this.plataformaMovil2 = this.physics.add.image(1600, 400, "plataforma")
  .setImmovable(true)
  .setVelocity(0, 0)
  .setScale(0.6)
  .setDepth(1);
this.plataformaMovil2.body.allowGravity = false;

this.tweens.add({
  targets: this.plataformaMovil2,
  y: 100,
  duration: 2500,
  yoyo: true,
  repeat: -1,
  ease: 'Sine.easeInOut'
});

//plataforma movil 3
this.plataformaMovil3=this.physics.add.image(750, 400, "plataforma").setScale(0.6).refreshBody().setImmovable(true)
  .setVelocity(0, 0).setDepth(1);;
this.plataformaMovil3.body.allowGravity = false;
this.tweens.add({
  targets: this.plataformaMovil3,
  y: 100, // hasta donde sube
  duration: 2500,
  yoyo: true,
  repeat: -1,
  ease: 'Sine.easeInOut'
});



// BASES DONDE VA A SALTAR EL PERSONAJE
this.bases = this.physics.add.staticGroup();

// bases (coordenadas X, Y ajustables)
this.bases.create(290, 520, "base").setScale(1).refreshBody();
this.bases.create(1200, 520, "base").setScale(1).refreshBody();
this.bases.create(2000, 520, "base").setScale(1).refreshBody();
this.bases.create(2800, 520, "base").setScale(1).refreshBody();
this.bases.create(3600, 520, "base").setScale(1).refreshBody();

//ARBOLES PLATAFORMEROS QUE VAN ENCIMA DE LAS BASES
this.add.image(400, 204, "arbol1").setScale(0.6);
this.add.image(1200, 204, "arbol2").setScale(0.6);
this.add.image(2000, 204, "arbol1").setScale(0.6);
this.add.image (2800, 204, "arbol2").setScale(0.6);
this.add.image(3600, 204, "arbol1").setScale(0.6);


// RAMAS DE LOS ÁRBOLES (como plataformas chicas)
this.ramas = this.physics.add.staticGroup();

// Agregar ramas en distintas posiciones
this.ramas.create(290, 150, "ramaplataforma").setScale(0.6).refreshBody();
this.ramas.create (500, 380, "rama2").setScale(0.6).refreshBody();
this.ramas.create(1250, 300, "rama2").setScale(0.6).refreshBody();
this.ramas.create(1270, 100, "rama2").setScale(0.6).refreshBody();
this.ramas.create(2000, 350, "ramaplataforma").setScale(0.6).refreshBody();
this.ramas.create(2800, 380, "ramaplataforma").setScale(0.6).refreshBody();
this.ramas.create(3600, 410, "ramaplataforma").setScale(0.6).refreshBody();

// Grupo de pinchos 
this.picos = this.physics.add.staticGroup();
// Picos de suelo
this.picos.create(250, 450, "picosuelo").setScale(0.6).refreshBody();
this.picos.create(800, 550, "picosuelo").setScale(0.6).refreshBody();
this.picos.create(1500, 550, "picosuelo").setScale(0.6).refreshBody();

// Picos en ramas
this.picos.create(1270, 120, "picoramas").setScale(0.6).refreshBody();




//OBJETOS RECOLECTABLES
// POCIONES

this.input.keyboard.on("keydown-P", () => {
  const usaste = this.recolectables.usarPocion();
  if (usaste) {
    this.sound.play("usarpocion");

    // Regenerar vida si tenés menos de 4
    let vida = this.registry.get("vida");
    if (vida < 4) {
      vida++;
      this.registry.set("vida", vida);
      this.actualizarCorazones();
    }
  }
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


        //SONIDOS
          //DAÑO AL PERSONAJE
          this.sonidoDaño = this.sound.add("sonidoDaño");



   
  

  //JUGADOR
   this.player = this.physics.add.sprite(100, 450, "Mirddin");

    
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true)
  
    this.player.body.setSize(30, 55); // CORRECCION CAJA DE COLISION
    this.player.body.setOffset(10, 30);
     
      // Agregar colisión entre jugador y suelo invisible

      //Colision con el suelo
      this.physics.add.collider(this.player, this.suelo1Collider);

      //colision con las bases
      this.physics.add.collider(this.player, this.bases);

      //colision con las ramas
        this.physics.add.collider(this.player, this.ramas);

        //MORIR POR PICOS, CON INMUNIDAD Y SONIDO
        this.physics.add.collider(this.player, this.picos, () => {
          if (!this.inmune) {
            this.sonidoDaño.play(); // Reproduce el sonido
            this.scene.pause();
            this.scene.launch("PerderVida", { origen: "GameScene" });
          }
        });


        // Recolectables
        this.sonidoJuntar = this.sound.add("juntar");
        this.recolectables = new Recolectables(this);
        this.recolectables.cargarObjetos();
        this.recolectables.crearColisiones(this.player, this.sonidoJuntar);

//ENEMIGOS
this.enemigos = new Enemigos(this);


        
                      //VIDA
          this.registry.set("vida", 4); // 4 corazones
          this.vidas = [];

          for (let i = 0; i < 4; i++) {
            const corazon = this.add.image(30 + i * 50, 30, "vida")
              .setScrollFactor(0)
              .setScale(0.9);
            this.vidas.push(corazon);
          }
         
          
          



      //COLISION CON PLATAFORMAS
      this.physics.add.collider(this.player, this.plataformas);
      this.physics.add.collider(this.player, this.plataformaMovil1);
      this.physics.add.collider(this.player, this.plataformaMovil2);
      this.physics.add.collider(this.player, this.plataformaMovil3);



      
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
    this.physics.world.setBounds(0, 0, 5000, 2000); 
    this.cameras.main.setBounds(0, 0, 5000, 600); 

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


// SALTO: solo cambia el sprite y sube
const enSuelo = this.player.body.blocked.down;
if (Phaser.Input.Keyboard.JustDown(this.cursors.up) && enSuelo) {
  this.player.setVelocityY(-300);
  this.player.setTexture("saltop");
  this.player.setFrame(1); // Solo ese frame
}



//FONDO PARALLAX
this.fondo.tilePositionX = this.cameras.main.scrollX * 0.5;



//VIDA 
const vidaActual = this.registry.get("vida");

this.vidas.forEach((corazon, index) => {
  corazon.setVisible(index < vidaActual);
});




if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('E'))) {
  this.recolectables.usarLuci((estadoInmunidad) => {
    this.inmune = estadoInmunidad;
  });
}

//enemigos
this.enemigos.update();


}}

