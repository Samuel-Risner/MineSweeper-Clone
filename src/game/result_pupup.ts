export class ResultPupup {

    private spentTimeElements: NodeListOf<HTMLElement>;

    private victoryPopup: HTMLDivElement;
    private defeatPopup: HTMLDivElement;

    constructor() {
        this.spentTimeElements = document.getElementsByName("spentTime");

        this.victoryPopup = document.getElementById("victoryPopup") as HTMLDivElement;
        this.defeatPopup = document.getElementById("defeatPopup") as HTMLDivElement;
    }

    setTime(time: string) {
        for (const el of this.spentTimeElements) {
            el.textContent = time;
        }
    }

    hide() {
        this.victoryPopup.hidden = true;
        this.defeatPopup.hidden = true;
    }

    onDefeat(time: string) {
        this.setTime(time);
        this.defeatPopup.hidden = false;
    }

    onVictory(time: string) {
        this.setTime(time);
        this.victoryPopup.hidden = false;
    }

}
