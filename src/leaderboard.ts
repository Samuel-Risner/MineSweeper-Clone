export class Leaderboard {
    
    private leaderboardElement: HTMLDivElement;

    constructor() {
        this.leaderboardElement = document.getElementById("leaderboard") as HTMLDivElement;
    }

    hide() {
        this.leaderboardElement.hidden = true;
    }

    show() {
        this.leaderboardElement.hidden = false;
    }

}
