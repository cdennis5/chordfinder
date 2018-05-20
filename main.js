function drawPiano() {
    var canvas = document.getElementById("piano");
    var pianoWidth = 420;
    var pianoHeight = 200;

    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.strokeStyle = "#000000";
        ctx.fillStyle = "#000000";

        var keyWidth = pianoWidth / 7;

        //Draw white keys
        for(var i = 0; i < pianoWidth; i += keyWidth) {
            ctx.strokeRect(i, 0, keyWidth, pianoHeight);
        }

        //Draw black keys
        ctx.fillRect(45, 0, keyWidth / 2, pianoHeight / 2);
        ctx.fillRect(105, 0, keyWidth / 2, pianoHeight / 2);
        ctx.fillRect(225, 0, keyWidth / 2, pianoHeight / 2);
        ctx.fillRect(285, 0, keyWidth / 2, pianoHeight / 2);
        ctx.fillRect(345, 0, keyWidth / 2, pianoHeight / 2);
    }

}