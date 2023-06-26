import initCloseButton from "./initCloseButton.js";
import PlaceMode from "./placeMode.js";
import ResultPopup from "./resultPopup.js";
import Timer from "./timer.js";
import Stats from "./../stats.js";

export default class GameBar {

    private timer: Timer;
    private placeMode: PlaceMode;
    private resultPopup: ResultPopup;

    constructor(
        _onQuit: () => void,
        private stats: Stats
    ) {
        initCloseButton(_onQuit);
        this.placeMode = new PlaceMode();
        this.resultPopup = new ResultPopup();
        this.timer = new Timer();
    }

    private onGameEnd() {
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

    newGame(amountMines: number) {
        this.stats.setAmountMines(amountMines);
        this.resultPopup.hide();
    }
    
    startGame() {
        this.timer.start();
    }

    getPlaceMode(): 0 | 1 {
        return this.placeMode.getMode();
    }

}
