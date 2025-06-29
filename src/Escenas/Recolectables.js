export default class Recolectables {
  constructor(scene) {
    this.scene = scene;

    this.luciernagas = this.scene.physics.add.group();
    this.pociones = this.scene.physics.add.group();
    this.monedas = this.scene.physics.add.group();

    this.pocionesMax = 3;
    this.pocionesActuales = 0;

    this.luciMax = 10;
    this.luciActuales = 0;

    this.puntajeMonedas = 0;
    this.recordMonedas = localStorage.getItem("recordMonedas") || 0;

    this.iconoPocion = null;
    this.contadorPocion = null;

    this.iconoLuci = null;
    this.contadorLuci = null;

    this.contadorPuntaje = null;
    this.contadorRecord = null;

    this.timerTexto = null;
    this.inmuneTimer = null;
  }

  cargarObjetos() {
    // Pociones
    const posicionesPociones = [
      [600, 400],
      [1600, 200],
      [2500, 300]
    ];
    posicionesPociones.forEach(([x, y]) => {
      const pocion = this.pociones.create(x, y, "Pocion").setScale(0.4);
      pocion.body.allowGravity = false;
    });

    // Luciérnagas
    const posicionesLuz = [
      [800, 300], [810, 350], [830, 350], [850, 350],
      [1400, 500], [1500, 550], [1600, 600], [1700, 650],
      [1800, 700], [2000, 750], [2200, 800], [2500, 850],
      [2800, 900], [1300, 180], [3000, 400], [4000, 450],
      [5000, 500], [6000, 550]
    ];
    posicionesLuz.forEach(([x, y]) => {
      const luz = this.luciernagas.create(x, y, "luciernagas").setScale(0.2);
      luz.body.allowGravity = false;
    });

    // Monedas
    const posicionesMonedas = [
      [1000, 350], [1700, 250], [2200, 300], [3000, 450],
      [3500, 400], [4000, 500], [4500, 550], [5000, 600],
      [5500, 650], [6000, 700]
    ];
    posicionesMonedas.forEach(([x, y]) => {
      const moneda = this.monedas.create(x, y, "monedas").setScale(0.6);
      moneda.body.allowGravity = false;
    });

    // UI
    this.iconoPocion = this.scene.add.image(30, 90, "Pocion")
      .setScrollFactor(0)
      .setScale(0.5)
      .setVisible(false);

        this.contadorPocion = this.scene.add.text(50, 80, "x0", {
      fontSize: "20px",
      fill: "#4FF0D9",
      fontFamily: "Arial Black",
      fontStyle: "bold",
      stroke: "#000",
      strokeThickness: 3,
    }).setScrollFactor(0).setVisible(false);

    this.iconoLuci = this.scene.add.image(30, 150, "luciernagas")
      .setScrollFactor(0)
      .setScale(1)
      .setVisible(false);

      this.contadorLuci = this.scene.add.text(50, 140, "x0", {
    fontSize: "20px",
    fill: "#EAAB1C",
    fontFamily: "Verdana",
    fontStyle: "bold",
    stroke: "#000",
    strokeThickness: 3,
  }).setScrollFactor(0).setVisible(false);

    this.contadorPuntaje = this.scene.add.text(550, 10, "Puntaje: 0", {
  fontSize: "22px",
  fill: "#ffffff",
  fontFamily: "Verdana",
  fontStyle: "bold",
  stroke: "#000",
  strokeThickness: 3,
}).setScrollFactor(0);

    this.contadorRecord = this.scene.add.text(550, 35, `Récord: ${this.recordMonedas}`, {
  fontSize: "20px",
  fill: "#FFD700",
  fontFamily: "Verdana",
  fontStyle: "bold",
  stroke: "#000",
  strokeThickness: 3,
}).setScrollFactor(0);


    this.timerTexto = this.scene.add.text(300, 10, "", {
    fontSize: "22px",
    fill: "#CC000F",
    fontFamily: "Verdana",
    fontStyle: "bold",
    stroke: "#000",
    strokeThickness: 3,
  }).setScrollFactor(0).setVisible(false);
    }

  crearColisiones(jugador, sonidoJuntar) {
    this.scene.physics.add.overlap(jugador, this.pociones, (player, pocion) => {
      if (this.pocionesActuales < this.pocionesMax) {
        pocion.destroy();
        sonidoJuntar.play();
        this.pocionesActuales++;
        this.actualizarUI();
      }
    });

    this.scene.physics.add.overlap(jugador, this.luciernagas, (player, luz) => {
      if (this.luciActuales < this.luciMax) {
        luz.destroy();
        sonidoJuntar.play();
        this.luciActuales++;
        this.actualizarUI();
      }
    });

    this.scene.physics.add.overlap(jugador, this.monedas, (player, moneda) => {
      moneda.destroy();
      sonidoJuntar.play();
      this.puntajeMonedas += 5;
      if (this.puntajeMonedas > this.recordMonedas) {
        this.recordMonedas = this.puntajeMonedas;
        localStorage.setItem("recordMonedas", this.recordMonedas);
      }
      this.actualizarUI();
    });
  }

  actualizarUI() {
    this.iconoPocion.setVisible(this.pocionesActuales > 0);
    this.contadorPocion.setVisible(this.pocionesActuales > 0);
    this.contadorPocion.setText(`x${this.pocionesActuales}`);

    this.iconoLuci.setVisible(this.luciActuales > 0);
    this.contadorLuci.setVisible(this.luciActuales > 0);
    this.contadorLuci.setText(`x${this.luciActuales}`);

    this.contadorPuntaje.setText(`Puntaje: ${this.puntajeMonedas}`);
    this.contadorRecord.setText(`Récord: ${this.recordMonedas}`);
  }

  usarPocion() {
    if (this.pocionesActuales > 0) {
      this.pocionesActuales--;
      this.actualizarUI();
      return true;
    }
    return false;
  }

  usarLuci(callbackActivarInmunidad) {
    if (this.luciActuales >= this.luciMax) {
      this.luciActuales = 0;
      this.actualizarUI();

      // Mostrar texto e iniciar temporizador
      this.timerTexto.setVisible(true);
      let segundosRestantes = 10;
      this.timerTexto.setText(`Inmune: ${segundosRestantes}s`);
      callbackActivarInmunidad(true);

      this.inmuneTimer = this.scene.time.addEvent({
        delay: 1000,
        repeat: 9,
        callback: () => {
          segundosRestantes--;
          this.timerTexto.setText(`Inmune: ${segundosRestantes}s`);
          if (segundosRestantes <= 0) {
            this.timerTexto.setVisible(false);
            callbackActivarInmunidad(false);
          }
        }
      });

      return true;
    }
    return false;
  }
}
