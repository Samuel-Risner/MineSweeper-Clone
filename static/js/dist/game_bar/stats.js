export class Stats {
    amountMines;
    placedFlagsElement;
    placedQuestionMarksElement;
    amountMinesElement;
    foundMines;
    placedFlags;
    placedQuestionMarks;
    constructor(amountMines) {
        this.amountMines = amountMines;
        this.placedFlags = 0;
        this.placedQuestionMarks = 0;
        this.foundMines = 0;
        this.placedFlagsElement = document.getElementById("placedFlags");
        this.placedQuestionMarksElement = document.getElementById("amountQuestionMarks");
        this.amountMinesElement = document.getElementById("amountMines");
        this.placedFlagsElement.textContent = String(this.placedFlags);
        this.placedQuestionMarksElement.textContent = String(this.placedQuestionMarks);
        this.amountMinesElement.textContent = String(this.amountMines);
    }
    highlightMines() {
        this.amountMinesElement.className = "text-red-600 font-bold";
    }
    unHighlightMines() {
        this.amountMinesElement.className = "";
    }
    changeMines(change, actualMine) {
        this.placedFlags += change;
        if (actualMine) {
            this.foundMines += change;
        }
        this.placedFlagsElement.textContent = String(this.placedFlags);
        if (this.placedFlags > this.amountMines) {
            this.highlightMines();
        }
        else {
            this.unHighlightMines();
        }
    }
    changeQuestionMarks(change) {
        this.placedQuestionMarks += change;
        this.placedQuestionMarksElement.textContent = String(this.placedQuestionMarks);
    }
    addFlag(actualMine) {
        this.changeMines(1, actualMine);
    }
    removeFlag(actualMine) {
        this.changeMines(-1, actualMine);
    }
    addQuestionMark() {
        this.changeQuestionMarks(1);
    }
    removeQuestionMark() {
        this.changeQuestionMarks(-1);
    }
    isVictory() {
        return (this.foundMines === this.amountMines) && (this.placedQuestionMarks === 0);
    }
}
