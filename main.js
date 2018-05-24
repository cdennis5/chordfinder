const pianoWidth = 840;
const pianoHeight = 200;
const numOctaves = 2;
const keyWidth = pianoWidth / (numOctaves * 7);

const whiteKeys = [];
const blackKeys = [];
const whiteNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const blackNotes = ['', 'C#/Db', 'D#/Eb', '', 'F#/Gb', 'G#/Ab', 'A#/Bb'];

function initPiano() {
    var canvas = document.getElementById("piano");
    
    canvas.width = pianoWidth;
    canvas.height = pianoHeight;

    //Generate the values for the white keys
    if(whiteKeys.length == 0) {
        for(var i = 0; i < numOctaves * 7; i++) {
            whiteKeys.push({ x: i * keyWidth, y: 0, width: keyWidth, height: pianoHeight, selected: false, note: whiteNotes[i%7]})
        }
    }

    //Generate the values for the black keys
    if(blackKeys.length == 0) {
        for(var i = 0; i < numOctaves * 7; i++) {
            //no black key on the first or fourth edge (left of C and left of F)
            if(i % 7 != 0 && i % 7 != 3)
                blackKeys.push({ x: (keyWidth * i) - (keyWidth / 4), y: 0, width: keyWidth / 2, height: pianoHeight / 2, selected: false, note: blackNotes[i%7] });
        }
    }

    canvas.addEventListener("click", (e) => {
        const pos = {
            x: e.clientX,
            y: e.clientY
        };

        //since the black keys overlap the white keys, check if
        //we clicked a black key first, then if we didn't, check
        //if we clicked a white key
        var haveSelectedKey = false;

        blackKeys.forEach(key => {
            if(isIntersect(pos, key)) {
                haveSelectedKey = true;

                if(key.selected) {
                    key.selected = false;
                }
                else {
                    key.selected = true;
                }
                drawPiano();
            }
        });

        if(!haveSelectedKey) {
            whiteKeys.forEach(key => {
                if(isIntersect(pos, key)) {
                    if(key.selected) {
                        key.selected = false;
                    }
                    else {
                        key.selected = true;
                    }
                    drawPiano();
                }
            });
        }
    });

    drawPiano();
}

function drawPiano() {
    var canvas = document.getElementById("piano");

    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 4;
        ctx.font = "18px Verdana";

        whiteKeys.forEach(key => {
            ctx.strokeRect(key.x, key.y, key.width, key.height);
            if(key.selected) {
                ctx.fillStyle = "#00ff00";
            }
            else {
                ctx.fillStyle = "#ffffff";
            }
            ctx.fillRect(key.x, key.y, key.width, key.height);

            ctx.fillStyle = "#000000"
            ctx.fillText(key.note, key.x + (key.width / 2.5), key.y + (key.height / 1.25), key.width);
        });
        blackKeys.forEach(key => {
            ctx.strokeRect(key.x, key.y, key.width, key.height);
            if(key.selected) {
                ctx.fillStyle = "#00ff00";
            }
            else {
                ctx.fillStyle = "#000000";
            }
            ctx.fillRect(key.x, key.y, key.width, key.height);

            ctx.fillStyle = "#ffffff"
            ctx.fillText(key.note, key.x, key.y + (key.height / 1.5), key.width);
        });
    }
}

function isIntersect(point, rect) {
    return (point.x >= rect.x && point.x <= rect.x + rect.width) && (point.y >= rect.y && point.y <= rect.y + rect.height);
}
