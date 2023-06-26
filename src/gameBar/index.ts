import Timer from "./timer";
import PlaceMode from "./placeMode";
import Stats from "./stats";
import ResultPopup from "./resultPopup";

export class GameBar {

    private closeButton: HTMLButtonElement;

    private timer: Timer;
    private placeMode: PlaceMode;
    private stats: Stats;
    private resultPopup: ResultPopup;

    constructor(amountMines: number) {
        this.closeButton = document.getElementById("closeGame") as HTMLButtonElement;
        this.closeButton.onclick = () => {
            this.timer.stop();
        }

        this.timer = new Timer();
        this.placeMode = new PlaceMode();
        this.stats = new Stats(amountMines);
        this.resultPopup = new ResultPopup();
    }

    newGame(amountMines: number) {

    }

    onClick() {
        
    }

}
