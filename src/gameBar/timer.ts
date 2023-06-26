export default class Timer {
    
    private displayElement: HTMLDivElement;
    private timerId: number | null;
    private startTime: number;
    private spentTime: number;
    private displayTime: string;

    constructor() {
        this.displayElement = document.getElementById("timer") as HTMLDivElement;
        this.displayElement.textContent = "00:00:00";

        this.timerId = null;
        this.startTime = Date.now();
        this.spentTime = 0;
        this.displayTime = "00:00:00";
    }

    start() {
        this.startTime = Date.now();

        this.timerId = setInterval(() => {
            this.spentTime = Date.now() - this.startTime;

            let hours: string | number = Math.floor((this.spentTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes: string | number = Math.floor((this.spentTime % (1000 * 60 * 60)) / (1000 * 60));
            let seconds: string | number = Math.floor((this.spentTime % (1000 * 60)) / 1000);

            hours = String(hours).length === 1 ? `0${String(hours)}` : String(hours);
            minutes = String(minutes).length === 1 ? `0${String(minutes)}` : String(minutes);
            seconds = String(seconds).length === 1 ? `0${String(seconds)}` : String(seconds);

            this.displayTime = `${hours}:${minutes}:${seconds}`;
            this.displayElement.textContent = this.displayTime;
        }, 1000);
    }

    stop() {
        if (this.timerId !== null) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    getTimeToDisplay(): string {
        return this.displayTime as string;
    }

}
