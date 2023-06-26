import { Timer } from "./timer";
import { PlaceMode } from "./placeMode";
import { Stats } from "./stats";
import { ResultPopup } from "./resultPopup";
export class GameBar {
    closeButton;
    timer;
    placeMode;
    stats;
    resultPopup;
    constructor(amountMines) {
        this.closeButton = document.getElementById("closeGame");
        this.closeButton.onclick = () => {
            this.timer.stop();
        };
        this.timer = new Timer();
        this.placeMode = new PlaceMode();
        this.stats = new Stats(amountMines);
        this.resultPopup = new ResultPopup();
    }
    newGame() {
    }
}
