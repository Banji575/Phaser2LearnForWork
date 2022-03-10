import Phaser from 'phaser'

export default class Boot extends Phaser.State {
  preload () {
    this.load.image('table', '/assets/8ball/table.png')
    this.load.physics('table', '/assets/8ball/table.json')
    this.load.spritesheet('balls', './assets/8ball/balls.png', 26, 26, 5)
    this.game.physics.startSystem(Phaser.Physics.P2JS)
    this.load.image('cushions', './assets/8ball/cushions.png')
    this.isDebug = true
  }

  create () {
    this.table = this.add.sprite(400, 300, 'table')
    this.physics.p2.enable(this.table, this.isDebug)
    this.table.body.static = true
    this.table.body.clearShapes()
    this.table.body.loadPolygon('table', 'pool-table-physics-shape')

    this.pockets = this.add.sprite()
    this.physics.p2.enable(this.pockets, this.isDebug)
    this.pockets.body.static = true
    this.pockets.body.clearShapes()

    this.pockets.body.addCircle(32, 64, 80)
    this.pockets.body.addCircle(16, 400, 80)
    this.pockets.body.addCircle(32, 736, 80)

    this.pockets.body.addCircle(32, 64, 528)
    this.pockets.body.addCircle(16, 400, 528)
    this.pockets.body.addCircle(32, 736, 528)

    this.shadow = this.add.group()
    this.balls = this.add.physicsGroup(Phaser.Physics.P2JS)
    this.balls.enableBodyDebug = this.isDebug

    this.tableMaterial = this.physics.p2.createMaterial('tableMaterial', this.table.body)
    this.ballMaterial = this.physics.p2.createMaterial('ballMaterial')

    const ballVsTableMaterial = this.physics.p2.createContactMaterial(this.ballMaterial, this.tableMaterial)
    ballVsTableMaterial.restitution = 0.6
    const ballVsBallMaterial = this.physics.p2.createContactMaterial(this.ballMaterial, this.ballMaterial)
    ballVsBallMaterial.restitution = 0.9

    this.add.sprite(0, 0, 'cushions')

    let y = 241
    this.makeBall(200, y, 1)
    this.makeBall(200, y + 32, 2)
    this.makeBall(200, y + 64, 2)
    this.makeBall(200, y + 96, 3)
    this.makeBall(200, y + 128, 2)
    y = 257

    this.makeBall(232, y, 2)
    this.makeBall(232, y + 32, 3)
    this.makeBall(232, y + 64, 2)
    this.makeBall(232, y + 96, 3)

    y = 273
    this.makeBall(264, y, 3)
    this.makeBall(264, y + 32, 4)
    this.makeBall(264, y + 64, 2)

    y = 289
    this.makeBall(296, y, 2)
    this.makeBall(296, y + 32, 3)

    this.makeBall(328, 305, 3)

    this.cueball = this.makeBall(576, 305, 5)
  }

  makeBall (x, y, color) {
    console.log('create ball')

    const ball = this.balls.create(x, y, 'balls', color)
    ball.body.setCircle(13)
    ball.body.fixedRotation = true
    ball.body.setMaterial(this.ballMaterial)
    ball.body.damping = 0.4
    ball.body.angularDamping = 0.45
    ball.body.createBodyCallback(this.pockets, this.hitPocket, this)

    const shadow = this.shadow.create(x + 4, y + 4, 'balls', 4)
    shadow.anchor.set(0.5)

    ball.shadow = shadow
    return ball
  }

  preRender () {
    this.balls.forEach(this.positionShadow, this)
  }

  positionShadow (ball) {
    ball.shadow.x = ball.x + 4
    ball.shadow.y = ball.y + 4
  }
}
