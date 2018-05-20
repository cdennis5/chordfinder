const pianoWidth = 840;
const pianoHeight = 200;
const numOctaves = 2;
const keyWidth = pianoWidth / (numOctaves * 7);

const whiteKeys = [];
const blackKeys = [];

function initPiano() {
    var canvas = document.getElementById("piano");
    canvas.width = pianoWidth;
    canvas.height = pianoHeight

    if(whiteKeys.length == 0) {
        //Generate the values for the white keys
        for(var i = 0; i < pianoWidth; i += keyWidth) {
            whiteKeys.push({ x: i, y: 0, width: keyWidth, height: pianoHeight, selected: false });
        }
    }

    if(blackKeys.length == 0) {
        //Generate the values for the black keys
        for(var i = 0; i < numOctaves * 7; i++) {
            //no black key on the first or fourth edge (left of C and left of F)
            if(i % 7 != 0 && i % 7 != 3)
                blackKeys.push({ x: (keyWidth * i) - (keyWidth / 4), y: 0, width: keyWidth / 2, height: pianoHeight / 2, selected: false });
        }
    }

    canvas.addEventListener("click", (e) => {
        const pos = {
            x: e.clientX,
            y: e.clientY
        };

        whiteKeys.forEach(key => {
            if(isIntersect(pos, key)) {
                if(key.selected) {
                    key.selected = false;
                    drawPiano();
                }
                else {
                    key.selected = true;
                    drawPiano();
                }
            }
        });
    });

    drawPiano();
}

function drawPiano() {
    var canvas = document.getElementById("piano");

    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.strokeStyle = "#000000";

        whiteKeys.forEach(key => {
            ctx.strokeRect(key.x, key.y, key.width, key.height);
            if(key.selected) {
                ctx.fillStyle = "#00ff00";
            }
            else {
                ctx.fillStyle = "#ffffff";
            }
            ctx.fillRect(key.x, key.y, key.width, key.height);
        });
        blackKeys.forEach(key => {
            ctx.strokeRect(key.x, key.y, key.width, key.height);
            ctx.fillStyle = "#000000";
            ctx.fillRect(key.x, key.y, key.width, key.height);
        })
    }
}

function isIntersect(point, rect) {
    return (point.x > rect.x && point.x < rect.x + rect.width) && (point.y > rect.y && point.y < rect.y + rect.height);
}
