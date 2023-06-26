export default class Stats {
    
    private placedFlagsElement: HTMLSpanElement;
    private placedQuestionMarksElement: HTMLSpanElement;
    private amountMinesElement: HTMLSpanElement;
    
    private foundMines: number;
    private placedFlags: number;
    private placedQuestionMarks: number;

    private amountMines: number;

    constructor() {
        this.amountMines = 0;
        
        this.placedFlags = 0;
        this.placedQuestionMarks = 0;
        this.foundMines = 0;

        this.placedFlagsElement = document.getElementById("placedFlags") as HTMLSpanElement;
        this.placedQuestionMarksElement = document.getElementById("amountQuestionMarks") as HTMLSpanElement;
        this.amountMinesElement = document.getElementById("amountMines") as HTMLSpanElement;

        this.placedFlagsElement.textContent = String(this.placedFlags);
        this.placedQuestionMarksElement.textContent = String(this.placedQuestionMarks);
        this.amountMinesElement.textContent = String(this.amountMines);

    }

    private highlightMines() {
        this.amountMinesElement.className = "text-red-600 font-bold";
    }

    private unHighlightMines() {
        this.amountMinesElement.className = "";
    }

    private changeMines(change: 1 | -1, actualMine: boolean) {
        this.placedFlags += change;

        if (actualMine) {
            this.foundMines += change;
        }

        this.placedFlagsElement.textContent = String(this.placedFlags);

        if (this.placedFlags > this.amountMines) {
            this.highlightMines();
        } else {
            this.unHighlightMines();
        }
    }

    private changeQuestionMarks(change: 1 | -1) {
        this.placedQuestionMarks += change;
        this.placedQuestionMarksElement.textContent = String(this.placedQuestionMarks);
    }

    addFlag(actualMine: boolean) {
        this.changeMines(1, actualMine);
    }

    removeFlag(actualMine: boolean) {
        this.changeMines(-1, actualMine);
    }

    addQuestionMark() {
        this.changeQuestionMarks(1);
    }

    removeQuestionMark() {
        this.changeQuestionMarks(-1);
    }

    isVictory(): boolean {
        return (this.foundMines === this.amountMines) && (this.placedQuestionMarks === 0);
    }

    setAmountMines(amount: number) {
        this.amountMines = amount;
        this.amountMinesElement.textContent = String(amount);
    }

}
