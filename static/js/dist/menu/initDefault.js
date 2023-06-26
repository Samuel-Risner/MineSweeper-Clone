import { settings } from "./../settings.js";
export default function initDefault(newGame) {
    const container = document.getElementById("selectFieldSizeContainer");
    for (const size of settings.defaultFieldSizes) {
        const button = document.createElement("button");
        const div = document.createElement("div");
        button.className = "w-full aspect-square border-8";
        div.textContent = `${size.width}x${size.height}\nMines: ${size.amountMines}`;
        div.className = "m-auto whitespace-pre-line";
        button.appendChild(div);
        container.appendChild(button);
        button.onclick = () => {
            newGame(size.width, size.height, size.amountMines);
        };
    }
}
