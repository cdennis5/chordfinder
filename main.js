function drawPiano() {
    var canvas = document.getElementById("piano");
    const pianoWidth = 840;
    const pianoHeight = 200;
    const numOctaves = 2;
    const keyWidth = pianoWidth / (numOctaves * 7);  //two octaves

    if(canvas.getContext) {
        var ctx = canvas.getContext('2d');

        ctx.strokeStyle = "#000000";
        ctx.fillStyle = "#000000";

        const whiteKeys = []
        const blackKeys = []

        //Generate the values for the white keys
        for(var i = 0; i < pianoWidth; i += keyWidth) {
            whiteKeys.push({ x: i, y: 0, width: keyWidth, height: pianoHeight });
        }
        //Generate the values for the black keys
        for(var i = 0; i < numOctaves; i++) {        //number of octaves
            for(var j = 0; j < 7; j++) {    //number of segments per octave
                if(j != 0 && j != 3)        //no black key on the first or fourth edge (left of C and left of F)
                    blackKeys.push({ x: (keyWidth * (j + (i * 7))) - (keyWidth / 4), y: 0, width: keyWidth / 2, height: pianoHeight / 2 });
            }
            
        }

        whiteKeys.forEach(key => {
            ctx.strokeRect(key.x, key.y, key.width, key.height);
        });
        blackKeys.forEach(key => {
            ctx.fillRect(key.x, key.y, key.width, key.height);
        })
    }

}