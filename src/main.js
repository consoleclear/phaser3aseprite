import MainGame from './scenes/MainGame';
import {AUTO, Scale, Game} from 'phaser';

/** @type Phaser.Types.Core.GameConfig */
const config = {
    type: AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    parent: 'game',
    scale: {
        // mode: Scale.FIT,
        // width: window.innerWidth,
        // height: window.innerHeight,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 900},
            debug: true,
        },
    },
    scene: [
        MainGame,
    ],
};

export default new Game(config);
