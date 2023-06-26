import { Timer } from "./timer";
import { PlaceMode } from "./placeMode";
import { Stats } from "./stats";
export class GameBar {
    closeButton;
    timer;
    placeMode;
    stats;
    constructor() {
        this.closeButton = document.getElementById("closeGame");
        this.closeButton.onclick = () => {
            this.timer.stop();
        };
        this.timer = new Timer();
        this.placeMode = new PlaceMode();
        this.stats = new Stats();
    }
}
