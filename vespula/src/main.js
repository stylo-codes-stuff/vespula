import { Boot } from "./scenes/Boot";
import { mainmenu } from "./scenes/mainmenu";
import { Preloader } from "./scenes/Preloader";
import { template } from "./scenes/template";
import { debugmenu } from "./scenes/debug";
import { Game } from "phaser";
import { orbit } from "./scenes/debug scenes/orbit";
import { hive } from "./scenes/debug scenes/hive";
//  Find out more information about the Game Config at: https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400 }
        }
    },
    scene: [
        Boot,
        Preloader,
        mainmenu,
        debugmenu,
        orbit,
        hive
    ]
};

export default new Game(config);
