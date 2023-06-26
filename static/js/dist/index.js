import { Game } from "./game.js";
import { GameBar } from "./gameBar/index.js";
import { Menu } from "./menu/index.js";
const game = new Game();
const gameBar = new GameBar(0);
const menu = new Menu(game);
