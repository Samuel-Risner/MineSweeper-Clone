import { Menu } from "./index.js";
import { settings } from "../settings.js";

export default function initDefault(menu: Menu) {
    const container = document.getElementById("selectFieldSizeContainer") as HTMLDivElement;

    for (const size of settings.defaultFieldSizes) {
        const button = document.createElement("button");
        const div = document.createElement("div");

        button.className = "w-full aspect-square border-8";

        div.textContent = `${size.width}x${size.height}\nMines: ${size.amountMines}`;
        div.className = "m-auto whitespace-pre-line";

        button.appendChild(div);
        container.appendChild(button);

        button.onclick = () => {
            menu.newGame(size.width, size.height, size.amountMines);
        }
    }
}
