export class ResultPopup {
    spentTimeElements;
    victoryPopup;
    defeatPopup;
    constructor() {
        this.spentTimeElements = document.getElementsByName("spentTime");
        this.victoryPopup = document.getElementById("victoryPopup");
        this.defeatPopup = document.getElementById("defeatPopup");
    }
    setTime(time) {
        for (const el of this.spentTimeElements) {
            el.textContent = time;
        }
    }
    hide() {
        this.victoryPopup.hidden = true;
        this.defeatPopup.hidden = true;
    }
    onDefeat(time) {
        this.setTime(time);
        this.defeatPopup.hidden = false;
    }
    onVictory(time) {
        this.setTime(time);
        this.victoryPopup.hidden = false;
    }
}
