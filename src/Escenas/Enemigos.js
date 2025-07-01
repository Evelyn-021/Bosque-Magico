export default class Enemigos {
  constructor(scene) {
    this.scene = scene;
    this.enemigos = this.scene.physics.add.group();

    // Configuración global de enemigos
    this.enemigos.defaultCollideWorldBounds = false;
    
    // CALABAZAS (patrullan horizontalmente entre dos puntos)
    this.crearCalabaza(600, 500, 500, 700);
    this.crearCalabaza(1500, 500, 1400, 1700);

    // FANTASMAS (flotan con movimiento sinusoidal horizontal + vertical)
    this.crearFantasma(1000, 400, 800, 1200, 80, 30); // x, y, minX, maxX, velX, amplitudY
    this.crearFantasma(2000, 300, 1800, 2200, 60, 50);

    // Colisiones con plataformas
    this.scene.physics.add.collider(this.enemigos, this.scene.plataformas);
    this.scene.physics.add.collider(this.enemigos, this.scene.plataformaMovil1);
    this.scene.physics.add.collider(this.enemigos, this.scene.plataformaMovil2);
    this.scene.physics.add.collider(this.enemigos, this.scene.plataformaMovil3);
    this.scene.physics.add.collider(this.enemigos, this.scene.bases);
    this.scene.physics.add.collider(this.enemigos, this.scene.ramas);

    // Detección de daño al jugador
    this.scene.physics.add.overlap(
      this.enemigos, 
      this.scene.player, 
      this.perderVida, 
      null, 
      this
    );
  }

  crearCalabaza(x, y, minX, maxX) {
    const enemigo = this.enemigos.create(x, y, "calabaza");
    enemigo.tipo = "calabaza";
    enemigo.customMinX = minX;
    enemigo.customMaxX = maxX;
    enemigo.setVelocityX(60);
    enemigo.setBounce(0.8); // Más rebote
    enemigo.setCollideWorldBounds(false); // Usamos nuestros propios límites
    enemigo.setFlipX(false);
    enemigo.body.setCollideWorldBounds(false);
    
    // Ajustar tamaño de colisión
    enemigo.body.setSize(30, 30);
    enemigo.body.setOffset(10, 10);
  }

  crearFantasma(x, y, minX, maxX, velocidad = 60, amplitud = 40) {
    const enemigo = this.enemigos.create(x, y, "fantasma");
    enemigo.tipo = "fantasma";
    enemigo.customMinX = minX;
    enemigo.customMaxX = maxX;
    enemigo.velocidad = velocidad;
    enemigo.amplitud = amplitud;
    enemigo.contador = Phaser.Math.FloatBetween(0, 6.28); // Valor inicial aleatorio
    enemigo.posicionInicialY = y;
    
    // Configuración física
    enemigo.body.setAllowGravity(false);
    enemigo.setCollideWorldBounds(false);
    
    // Ajustar colisión más precisa
    enemigo.body.setSize(25, 25, true);
    enemigo.body.setOffset(5, 5);
    
    // Transparencia para efecto fantasma
    enemigo.setAlpha(0.9);
  }

  update() {
    this.enemigos.children.iterate((enemigo) => {
      if (!enemigo.active || !enemigo.body) return;

      // Movimiento CALABAZA (horizontal con rebote)
      if (enemigo.tipo === "calabaza") {
        // Cambiar dirección al llegar a límites
        if (enemigo.x <= enemigo.customMinX) {
          enemigo.setVelocityX(60);
          enemigo.setFlipX(false);
        } else if (enemigo.x >= enemigo.customMaxX) {
          enemigo.setVelocityX(-60);
          enemigo.setFlipX(true);
        }
      }

      // Movimiento FANTASMA (sinusoidal + flotación)
      if (enemigo.tipo === "fantasma") {
        // Actualizar contador para movimiento sinusoidal
        enemigo.contador += 0.01;
        
        // Movimiento horizontal (entre minX y maxX)
        const progreso = Math.sin(enemigo.contador) * 0.5 + 0.5; // Normalizado 0-1
        enemigo.x = Phaser.Math.Linear(
          enemigo.customMinX, 
          enemigo.customMaxX, 
          progreso
        );
        
        // Flotación vertical (movimiento sinusoidal)
        enemigo.y = enemigo.posicionInicialY + Math.sin(enemigo.contador * 1.5) * enemigo.amplitud;
        
        // Orientación según dirección
        const velocidadX = Math.cos(enemigo.contador);
        enemigo.setFlipX(velocidadX < 0);
      }
    });
  }

  perderVida(jugador, enemigo) {
    if (this.scene.inmune || !jugador.body) return;

    // Efecto visual
    this.scene.cameras.main.shake(200, 0.01);
    
    // Reducir vida
    this.scene.registry.set("vida", this.scene.registry.get("vida") - 1);
    this.scene.sonidoDaño.play();

    // Estado de invencibilidad temporal
    this.scene.inmune = true;
    jugador.setTint(0xff0000);

    // Retroceso al ser golpeado
    const direccion = (jugador.x < enemigo.x) ? -1 : 1;
    jugador.setVelocityX(200 * direccion);
    jugador.setVelocityY(-150);

    // Restaurar normalidad después de 1 segundo
    this.scene.time.delayedCall(1000, () => {
      if (jugador.body) {
        jugador.clearTint();
        this.scene.inmune = false;
      }
    });
  }
}