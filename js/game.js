
document.getElementById("btn-back").addEventListener("click", function (){
    window.open("./index.html");
})

window.RufflePlayer = window.RufflePlayer || {};
window.addEventListener("load", () => {
    const ruffle = window.RufflePlayer.newest();
    const player = ruffle.createPlayer();
    player.style.width = "800px";
    player.style.height = "600px";
    document.getElementById("flash-container").appendChild(player);
    player.load("./games/papashotdoggeria.swf");

    document.getElementById("btn-pause").addEventListener("click", function (){
        player.pause();
    })
});

