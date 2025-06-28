export default class PerderVida extends Phaser.Scene {
  constructor() {
    super("PerderVida");
  }

  init(data) {
    this.origen = data.origen; // Escena que llamó
  }

  create() {
    // Obtener la vida actual desde el registro global
    let vida = this.registry.get("vida") || 4;

    // Restar 1 corazón si hay vida
    if (vida > 0) {
      vida--;
      this.registry.set("vida", vida);
    }

    // Volver a la escena de origen
    this.scene.stop();
    this.scene.resume(this.origen);

    // Si se quedó sin vida, lanzar Game Over
    if (vida <= 0) {
      this.scene.stop(this.origen);
      this.scene.launch("GameOverScene");
    }
  }
}