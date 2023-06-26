export default function initCloseButton(onQuit) {
    const closeButton = document.getElementById("closeGame");
    closeButton.onclick = onQuit;
}
