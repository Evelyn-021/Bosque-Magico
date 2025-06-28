export default class HUDScene extends Phaser.Scene {
  constructor() {
    super("HUDScene");
  }

  create() {
    this.vidasSprites = [];
    this.vida = this.registry.get("vida") ?? 4;

    for (let i = 0; i < this.vida; i++) {
      const x = 20 + i * 40;
      const y = 20;
      const corazon = this.add.image(x, y, "vida").setScrollFactor(0).setScale(0.8);
      this.vidasSprites.push(corazon);
    }

    // Escuchar cuando se cambie el valor de "vida"
    this.registry.events.on("changedata", this.actualizarVidas, this);
  }

  actualizarVidas(parent, key, value) {
    if (key === "vida") {
      // Eliminar todos los corazones y volver a dibujar solo los necesarios
      this.vidasSprites.forEach(sprite => sprite.destroy());
      this.vidasSprites = [];

      for (let i = 0; i < value; i++) {
        const x = 20 + i * 40;
        const y = 20;
        const corazon = this.add.image(x, y, "vida").setScrollFactor(0).setScale(0.8);
        this.vidasSprites.push(corazon);
      }
    }
  }
}
