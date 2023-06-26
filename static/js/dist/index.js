import GameBar from "./gameBar/index.js";
import { Menu } from "./menu/index.js";
import { Game } from "./game.js";
import Stats from "./stats.js";
function _endOfGame() {
}
function newGame(width, height, amountMines) {
    gameBar.newGame(amountMines);
    game.newGame(width, height, amountMines, onDefeat, onVictory, startGame, () => { return gameBar.getPlaceMode(); });
    menu.hide();
    game.show();
}
function startGame() {
    gameBar.startGame();
}
function onDefeat() {
    _endOfGame();
    gameBar.onDefeat();
}
function onVictory() {
    _endOfGame();
    gameBar.onVictory();
}
function onQuit() {
    _endOfGame();
    gameBar.onQuit();
    game.hide();
    menu.show();
}
const stats = new Stats();
const gameBar = new GameBar(onQuit, stats);
const game = new Game(stats);
const menu = new Menu(newGame);
