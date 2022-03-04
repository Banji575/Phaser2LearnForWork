import Phaser from 'phaser'

export default class Boot extends Phaser.State {
  init () {
    const box = this.make.graphics(0, 0)
    box.lineStyle(8, 0xFF0000, 0.8)
    box.beginFill(0xFF700B, 1)
    box.drawRect(-50, -50, 100, 100)
    box.endFill()

    this.spinner = this.add.sprite(this.world.centerX, this.world.centerY, box.generateTexture())
    this.spinner.anchor.set(0.5)

    const style = {
      font: '32px Arial',
      fill: '#ffffff',
      align: 'center',
    }
    this.text = this.add.text(400, 300, 'Loading: 0%', style)
  }

  preload () {
    this.load.image('background', '../assets/wave.jpg')
    this.load.image('phaser', '../assets/phaser.png')

    for (let i = 0; i < 2000; i++) {
      this.load.image('asuna' + i,
        '../assets/asuna_sao_by_vali233.png?rnd=' + i
      )
    }
    this.load.onFileComplete.add(this.fileLoaded, this)
  }

  fileLoaded (progress) {
    this.text.text = 'Loading: ' + progress + '%'
  }

  loadUpdate () {
    this.spinner.rotation += 0.05
  }

  create () {
    this.add.tween(this.spinner.scale)
      .to({x: 0, y: 0}, 1000, 'Elastic.easeIn', true, 250)
    this.add.tween(this.text)
      .to({alpha: 0}, 1000, 'Linear', true)
  }
}
