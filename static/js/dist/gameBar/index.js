import initCloseButton from "./initCloseButton.js";
import PlaceMode from "./placeMode.js";
import ResultPopup from "./resultPopup.js";
import Timer from "./timer.js";
export default class GameBar {
    stats;
    timer;
    placeMode;
    resultPopup;
    constructor(_onQuit, stats) {
        this.stats = stats;
        initCloseButton(_onQuit);
        this.placeMode = new PlaceMode();
        this.resultPopup = new ResultPopup();
        this.timer = new Timer();
    }
    onGameEnd() {
        this.timer.stop();
    }
    onDefeat() {
        this.onGameEnd();
        this.resultPopup.onDefeat(this.timer.getTimeToDisplay());
    }
    onVictory() {
        this.onGameEnd();
        this.resultPopup.onVictory(this.timer.getTimeToDisplay());
    }
    onQuit() {
        this.onGameEnd();
    }
    newGame(amountMines) {
        this.stats.setAmountMines(amountMines);
        this.resultPopup.hide();
    }
    startGame() {
        this.timer.start();
    }
    getPlaceMode() {
        return this.placeMode.getMode();
    }
}
