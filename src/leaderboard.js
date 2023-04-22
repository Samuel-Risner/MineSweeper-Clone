export class Leaderboard {
    leaderboardElement;
    constructor() {
        this.leaderboardElement = document.getElementById("leaderboard");
    }
    hide() {
        this.leaderboardElement.hidden = true;
    }
    show() {
        this.leaderboardElement.hidden = false;
    }
}
