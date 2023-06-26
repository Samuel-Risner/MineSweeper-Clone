export default class ResultPopup {

    private spentTimeVictoryElement: HTMLSpanElement;
    private spentTimeDefeatElement: HTMLSpanElement;

    private victoryPopupElement: HTMLDivElement;
    private defeatPopupElement: HTMLDivElement;

    constructor() {
        this.spentTimeVictoryElement = document.getElementById("spentTimeVictory") as HTMLSpanElement;
        this.spentTimeDefeatElement = document.getElementById("spentTimeDefeat") as HTMLSpanElement;

        this.victoryPopupElement = document.getElementById("victoryPopup") as HTMLDivElement;
        this.defeatPopupElement = document.getElementById("defeatPopup") as HTMLDivElement;
    }

    hide() {
        this.victoryPopupElement.hidden = true;
        this.defeatPopupElement.hidden = true;
    }

    onDefeat(time: string) {
        this.spentTimeDefeatElement.textContent = time;
        this.defeatPopupElement.hidden = false;
    }

    onVictory(time: string) {
        this.spentTimeVictoryElement.textContent = time;
        this.victoryPopupElement.hidden = false;
    }

}
