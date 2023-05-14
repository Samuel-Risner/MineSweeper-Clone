export class Stats {
    amountMines;
    timeDisplay;
    timerId;
    startTime;
    spentTime;
    foundMines;
    placedFlagsDisplay;
    placedQuestionMarksDisplay;
    amountMinesDisplay;
    placedFlags;
    placedQuestionMarks;
    constructor(amountMines) {
        this.amountMines = amountMines;
        this.placedFlags = 0;
        this.placedQuestionMarks = 0;
        this.placedFlagsDisplay = document.getElementById("placedFlags");
        this.placedQuestionMarksDisplay = document.getElementById("amountQuestionMarks");
        this.amountMinesDisplay = document.getElementById("amountMines");
        this.placedFlagsDisplay.textContent = String(this.placedFlags);
        this.placedQuestionMarksDisplay.textContent = String(this.placedQuestionMarks);
        this.amountMinesDisplay.textContent = String(this.amountMines);
        this.foundMines = 0;
        this.timeDisplay = document.getElementById("timer");
        this.timeDisplay.textContent = "00:00:00";
        this.timerId = null;
        this.startTime = Date.now();
        this.spentTime = 0;
    }
    highlightMines() {
        this.placedFlagsDisplay.className = "text-red-600";
    }
    unHighlightMines() {
        this.placedFlagsDisplay.className = "";
    }
    changeMines(change, actualMine) {
        this.placedFlags += change;
        if (actualMine) {
            this.foundMines += change;
        }
        this.placedFlagsDisplay.textContent = String(this.placedFlags);
        if (this.placedFlags > this.amountMines) {
            this.highlightMines();
        }
        else {
            this.unHighlightMines();
        }
        if ((this.foundMines === this.amountMines) && (this.placedQuestionMarks === 0)) {
            this.stopTimer();
            return this.spentTime;
        }
        return -1;
    }
    changeQuestionMarks(change) {
        this.placedQuestionMarks += change;
        this.placedQuestionMarksDisplay.textContent = String(this.placedQuestionMarks);
    }
    addFlag(actualMine) {
        return this.changeMines(1, actualMine);
    }
    removeFlag(actualMine) {
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
            let hours = Math.floor((this.spentTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((this.spentTime % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((this.spentTime % (1000 * 60)) / 1000);
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
