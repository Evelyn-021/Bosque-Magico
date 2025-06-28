// SoundButton.js
export default class SoundButton extends Phaser.GameObjects.Image {
  constructor(scene, x, y) {
    super(scene, x, y, "Sonido");

    scene.add.existing(this);
    this.setInteractive({ useHandCursor: true }).setScrollFactor(0).setScale(0.5);

    this.scene = scene;
    this.activo = true;

    this.on("pointerdown", () => {
      this.activo = !this.activo;
      scene.sound.mute = !this.activo;

      const nuevaTextura = this.activo ? "Sonido" : "SinSonido";
      this.setTexture(nuevaTextura);
    });
  }
}
