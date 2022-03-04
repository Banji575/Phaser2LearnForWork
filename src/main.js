import 'pixi'
import 'p2'
import Phaser from 'phaser'

import StartScene from './states/mainScene'
import BootState from './states/boot'
import MainScene from './states/mainScene'

class Game extends Phaser.Game {
  constructor () {
    super(600, 400, Phaser.AUTO, 'game')

    this.state.add('BootState', BootState, true)
    this.state.add('mainScene', MainScene)
  }
}

new Game() // eslint-disable-line
