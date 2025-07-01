export default class Enemigos {
  constructor(scene) {
    this.scene = scene;
    this.enemigos = this.scene.physics.add.group();
    this.player = this.scene.player; // Referencia al jugador
    
    // Configuración de IA
    this.distanciaDeteccion = 300; // Rango para perseguir al jugador
    this.velocidadPersecucion = 120; // Velocidad base al perseguir


    // FANTASMAS (flotan con movimiento sinusoidal)

// Configuración de respawn
    this.enemigosMuertos = []; // { x, y, minX, maxX, velocidad, amplitud, tipo }
    this.tiempoRespawn = 5000; // 5 segundos

     // Crear enemigos iniciales
    this.crearFantasma(600, 550, 400, 600); // (x, y, minX, maxX, velocidad, amplitudFlotacion)
    this.crearFantasma(690, 300, 800, 1200, 80, 30); // (x, y, minX, maxX, velocidad, amplitudFlotacion)
    this.crearFantasma(800, 300, 1800, 2200, 60, 50);
    this.crearFantasma(900, 200, 2800, 3200, 70, 40);
    this.crearFantasma(1000, 400, 3300, 3700, 50, 60);
    this.crearFantasma(2000, 500, 4300, 4700, 90, 20);
    this.crearFantasma(2500, 550, 4800, 5200, 80, 30);
    this.crearFantasma(3000, 300, 5800, 6200, 70, 40);
    this.crearFantasma(7000, 650, 6800, 7200, 60, 50);

    // COLISIONES con estructuras del juego
    this.scene.physics.add.collider(this.enemigos, this.scene.plataformas);
    this.scene.physics.add.collider(this.enemigos, this.scene.plataformaMovil1);
    this.scene.physics.add.collider(this.enemigos, this.scene.plataformaMovil2);
    this.scene.physics.add.collider(this.enemigos, this.scene.plataformaMovil3);
    this.scene.physics.add.collider(this.enemigos, this.scene.bases);
    this.scene.physics.add.collider(this.enemigos, this.scene.ramas);

    // DETECCIÓN DE DAÑO al jugador
    this.scene.physics.add.overlap(
      this.enemigos,
      this.scene.player,
      this.perderVida,
      null,
      this
    );
  }

  

  // ===== FANTASMAS PERSIGUIENDO =====
  crearFantasma(x, y, minX, maxX, velocidad = 100, amplitud = 40) {
    const enemigo = this.enemigos.create(x, y, "fantasma");
    enemigo.tipo = "fantasma";
    enemigo.vida = 1; // Vida del enemigo
    enemigo.customMinX = minX;
    enemigo.customMaxX = maxX;
    enemigo.velocidad = velocidad; // Más rápido
    enemigo.amplitud = amplitud;
    enemigo.contador = Phaser.Math.FloatBetween(0, 6.28);
    enemigo.posicionInicialY = y;
    enemigo.body.setAllowGravity(false);
    enemigo.setCollideWorldBounds(false);
    enemigo.body.setSize(50, 60);
    enemigo.body.setOffset(10, 5);
    enemigo.setAlpha(0.9);

    // IA: Modo "persecución"
    enemigo.estaPersiguiendo = false;
  
    // FIX: Hitbox 
    const anchoReal = 70;    // Ancho REAL del sprite (sin zonas transparentes)
    const altoReal = 70;      // Alto REAL del sprite
    const offsetX = (enemigo.width - anchoReal) / 2;  // Centrado horizontal
    const offsetY = enemigo.height - altoReal;        // Alineado en la base
    
    enemigo.body.setSize(anchoReal, altoReal);
    enemigo.body.setOffset(offsetX, offsetY);
    
    // DEBUG: Mostrar hitbox (eliminar en producción)
    enemigo.setDebug(true, true, 0x00ff00);  // Verde
    
    // Efecto visual de fantasma
    enemigo.setAlpha(0.85);
  }
recibirDano(enemigo, dano = 1) {
    enemigo.vida -= dano;
    
    if (enemigo.vida <= 0) {
      // Guardar datos para respawn
      this.enemigosMuertos.push({
        x: enemigo.x,
        y: enemigo.y,
        minX: enemigo.customMinX,
        maxX: enemigo.customMaxX,
        velocidad: enemigo.velocidad,
        amplitud: enemigo.amplitud,
        tipo: enemigo.tipo
      });
      
      // Efecto de muerte
      enemigo.destroy();
      
      // Programar respawn
      this.scene.time.delayedCall(this.tiempoRespawn, () => {
        if (this.enemigosMuertos.length > 0) {
          const datos = this.enemigosMuertos.shift();
          this[`crear${datos.tipo.charAt(0).toUpperCase() + datos.tipo.slice(1)}`](
            datos.x, datos.y, datos.minX, datos.maxX, datos.velocidad, datos.amplitud
          );
        }
      });
    }
  }
  // ===== UPDATE INTELIGENTE =====
  update() {
    this.enemigos.children.iterate((enemigo) => {
      if (!enemigo.active || !enemigo.body) return;

    
      // --- FANTASMAS ---
      if (enemigo.tipo === "fantasma") {
        const distanciaAlJugador = Phaser.Math.Distance.Between(
          enemigo.x, enemigo.y,
          this.player.x, this.player.y
        );

        // Perseguir si el jugador está cerca
        if (distanciaAlJugador < this.distanciaDeteccion) {
          enemigo.estaPersiguiendo = true;
          
          // Movimiento DIRECTO hacia el jugador (más agresivo)
          const direccionX = this.player.x - enemigo.x;
          const direccionY = this.player.y - enemigo.y;
          const angulo = Math.atan2(direccionY, direccionX);
          
          enemigo.setVelocityX(Math.cos(angulo) * enemigo.velocidad);
          enemigo.setVelocityY(Math.sin(angulo) * enemigo.velocidad * 0.5);
          enemigo.setFlipX(direccionX < 0);
        } 
        // Si no, vuelve a su movimiento sinusoidal
        else {
          enemigo.estaPersiguiendo = false;
          enemigo.contador += 0.01;
          const progresoX = (Math.sin(enemigo.contador) * 0.5 + 0.5);
          enemigo.x = Phaser.Math.Linear(enemigo.customMinX, enemigo.customMaxX, progresoX);
          enemigo.y = enemigo.posicionInicialY + Math.sin(enemigo.contador * 1.5) * enemigo.amplitud;
        }
      }
    });
  }

  // ===== DAÑO AL JUGADOR =====
perderVida(jugador, enemigo) {
  if (this.scene.inmune || !jugador.body) return;

  // Efecto de retroceso
  const direccion = (jugador.x < enemigo.x) ? -1 : 1;
  jugador.setVelocityX(200 * direccion);
  jugador.setVelocityY(-150);

  // Sonido + sacudida de cámara
  this.scene.sonidoDaño.play();
  this.scene.cameras.main.shake(200, 0.01);

  // Reducción de vida
  let vidaActual = this.scene.registry.get("vida") - 1;
  this.scene.registry.set("vida", vidaActual);

  // Verificar si la vida llegó a 0 → GAME OVER
  if (vidaActual <= 0) {
    this.scene.scene.pause();
    this.scene.scene.launch("GameOverScene");
    return; // Salir para evitar más efectos
  }

  // Estado de invulnerabilidad temporal
  this.scene.inmune = true;
  jugador.setTint(0xff0000); // Tinte rojo

  this.scene.time.delayedCall(1000, () => {
    if (jugador.body) {
      jugador.clearTint();
      this.scene.inmune = false;
    }
  });
  }
}