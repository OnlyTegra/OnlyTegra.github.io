/*
    sta roba assolutamente non fatta da me (figurati se mi metto a fare il matrix)
    do i crediti a lui (https://github.com/javascriptacademy-stash/digital-rain)
    grande fra ora sembro un hacker!!
*/

const canvas = document.getElementById('Matrix');
const context = canvas.getContext('2d');

const nums = '01';
const alphabet = nums;
const fontSize = 16;

let columns;
let rainDrops = [];

function initCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    columns = Math.floor(canvas.width / fontSize);
    rainDrops = Array(columns).fill(1);
}

function draw() {
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = 'rgb(255, 255, 255)';
    context.font = fontSize + 'px IBMVGA';

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        context.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
}

document.fonts.ready.then(() => {
    initCanvas();
    setInterval(draw, 30);
});

window.addEventListener("resize", () => {
    initCanvas(); 
});
