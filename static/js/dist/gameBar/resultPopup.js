export default class ResultPopup {
    spentTimeVictoryElement;
    spentTimeDefeatElement;
    victoryPopupElement;
    defeatPopupElement;
    constructor() {
        this.spentTimeVictoryElement = document.getElementById("spentTimeVictory");
        this.spentTimeDefeatElement = document.getElementById("spentTimeDefeat");
        this.victoryPopupElement = document.getElementById("victoryPopup");
        this.defeatPopupElement = document.getElementById("defeatPopup");
    }
    hide() {
        this.victoryPopupElement.hidden = true;
        this.defeatPopupElement.hidden = true;
    }
    onDefeat(time) {
        this.spentTimeDefeatElement.textContent = time;
        this.defeatPopupElement.hidden = false;
    }
    onVictory(time) {
        this.spentTimeVictoryElement.textContent = time;
        this.victoryPopupElement.hidden = false;
    }
}
