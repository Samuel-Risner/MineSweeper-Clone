export default function initCloseButton(onQuit: () => void) {
    const closeButton = document.getElementById("closeGame") as HTMLButtonElement;
    closeButton.onclick = onQuit;
}
