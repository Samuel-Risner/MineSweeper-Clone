export class Stats {

    private timeDisplay: HTMLDivElement;
    private timerId: number | null;
    private startTime: number;
    private spentTime: number;

    private foundMines: number;

    private placedFlagsDisplay: HTMLSpanElement;
    private placedQuestionMarksDisplay: HTMLSpanElement;
    private amountMinesDisplay: HTMLSpanElement;

    private placedFlags: number;
    private placedQuestionMarks: number;

    constructor(
        private amountMines: number
    ) {
        this.placedFlags = 0;
        this.placedQuestionMarks = 0;

        this.placedFlagsDisplay = document.getElementById("placedFlags") as HTMLSpanElement;
        this.placedQuestionMarksDisplay = document.getElementById("amountMines") as HTMLSpanElement;
        this.amountMinesDisplay = document.getElementById("amountQuestionMarks") as HTMLSpanElement;

        this.placedFlagsDisplay.textContent = String(this.placedFlags);
        this.placedQuestionMarksDisplay.textContent = String(this.placedQuestionMarks);
        this.amountMinesDisplay.textContent = String(this.amountMines);

        this.foundMines = 0;

        this.timeDisplay = document.getElementById("timer") as HTMLDivElement;
        this.timeDisplay.textContent = "00:00:00";
        this.timerId = null;
        this.startTime = Date.now();
        this.spentTime = 0;
    }

    private highlightMines() {
        this.placedFlagsDisplay.className = "text-red-600";
    }

    private unHighlightMines() {
        this.placedFlagsDisplay.className = "";
    }

    private changeMines(change: 1 | -1, actualMine: boolean): number {
        this.placedFlags += change;

        if (actualMine) {
            this.foundMines += change;
        }

        this.placedFlagsDisplay.textContent = String(this.placedFlags);

        if (this.placedFlags > this.amountMines) {
            this.highlightMines();
        } else {
            this.unHighlightMines();
        }

        if ((this.foundMines === this.amountMines) && (this.placedQuestionMarks === 0)) {
            this.stopTimer();
            return this.spentTime;
        }

        return -1;
    }

    private changeQuestionMarks(change: 1 | -1) {
        this.placedQuestionMarks += change;
        this.placedQuestionMarksDisplay.textContent = String(this.placedQuestionMarks);
    }

    addFlag(actualMine: boolean): number {
        return this.changeMines(1, actualMine);
    }

    removeFlag(actualMine: boolean): number {
        return this.changeMines(-1, actualMine);
    }

    addQuestionMark() {
        this.changeQuestionMarks(1);
    }

    removeQuestionMark() {
        this.changeQuestionMarks(-1);
    }

    startTimer() {
        this.startTime = Date.now();

        this.timerId = setInterval(() => {
            this.spentTime = Date.now() - this.startTime;

            let hours: string | number = Math.floor((this.spentTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes: string | number = Math.floor((this.spentTime % (1000 * 60 * 60)) / (1000 * 60));
            let seconds: string | number = Math.floor((this.spentTime % (1000 * 60)) / 1000);

            hours = String(hours).length === 1 ? `0${String(hours)}` : String(hours);
            minutes = String(minutes).length === 1 ? `0${String(minutes)}` : String(minutes);
            seconds = String(seconds).length === 1 ? `0${String(seconds)}` : String(seconds);

            this.timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
        }, 1000);
    }

    stopTimer() {
        if (this.timerId !== null) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }
}
