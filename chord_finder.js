const root = 0;
const minor_second = 1;
const major_second = 2;
const minor_third = 3;
const major_third = 4;
const perfect_fourth = 5;
const tritone = 6;
const perfect_fifth = 7;
const minor_sixth = 8;
const major_sixth = 9;
const minor_seventh = 10;
const major_seventh = 11;

const chordTypes = {
    'Maj' : [root, major_third, perfect_fifth],
    'min' : [root, minor_third, perfect_fifth],
    'Diminished' : [root, minor_third, tritone],
    'Augmented' : [root, major_third, minor_sixth],
    'Sus2' : [root, major_second, perfect_fifth],
    'Sus4' : [root, perfect_fourth, perfect_fifth],
    'add2' : [root, major_second, major_third, perfect_fifth],
    '6' : [root, major_third, perfect_fifth, major_sixth],
    '6/9' : [root, major_third, perfect_fifth, major_sixth, major_second],
    'Maj7' : [root, major_third, perfect_fifth, major_seventh],
    'Dominant 7th' : [root, major_third, perfect_fifth, minor_seventh],
    'min7' : [root, minor_third, perfect_fifth, minor_seventh],
    '7b5' : [root, major_third, tritone, minor_seventh],
    '7#5' : [root, major_third, minor_sixth, minor_seventh],
    'min9' : [root, minor_third, perfect_fifth, minor_seventh, major_second],
    '9' : [root, major_third, perfect_fifth, minor_seventh, major_second],
    'add9' : [root, major_third, perfect_fifth, major_second],
    '11' : [root, major_third, perfect_fifth, minor_seventh, major_second, perfect_fourth],
    '13' : [root, major_third, perfect_fifth, minor_seventh, major_second, perfect_fourth, major_sixth]
}

const notes = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab', 'A', 'A#/Bb', 'B'];
const scales = [];

//initialize all twelve-tone scales
for(var i = 0; i < notes.length; i++) {
    var scale = [];
    for(var j = i; j < i + notes.length; j++) {
        scale.push(notes[j % notes.length]);
    }
    scales.push(scale);
}

function searchForChord() {
    var selectedNotes = [];
    
    //Get the selected notes
    whiteKeys.forEach(key => {
        if(key.selected)
            selectedNotes.push(key.note);
    });
    blackKeys.forEach(key => {
        if(key.selected)
            selectedNotes.push(key.note);
    });

    if(selectedNotes.length < 3) {
        alert("Select at least three notes to find a chord");
        return;
    }

    //Eliminate duplicates
    var prunedSelectedNotes = [];
    for(var i = 0; i < selectedNotes.length; i++) {
        if(!prunedSelectedNotes.includes(selectedNotes[i]))
            prunedSelectedNotes.push(selectedNotes[i]);
    }

    selectedNotes = prunedSelectedNotes;

    var tryScales = [];

    //Treat each selected note as the root to try to find chords
    for(var i = 0; i < selectedNotes.length; i++) {
        for(var j = 0; j < scales.length; j++) {
            if(selectedNotes[i] == scales[j][0]) {
                tryScales.push(scales[j]);
            }
        }
    }

    console.log(tryScales);

    var tryPatterns = {};

    for(var i = 0; i < tryScales.length; i++) {
        var tryPattern = [];
        for(var j = 0; j < selectedNotes.length; j++) {
            var scaleDegree = tryScales[i].indexOf(selectedNotes[j]);
            tryPattern.push(scaleDegree);
        }
        tryPatterns[tryScales[i][0]] = tryPattern;
    }

    console.log(tryPatterns);

    var matches = [];

    for(var chordIndex in chordTypes) {
        var chord = chordTypes[chordIndex];

        //skip over a chord if its lenght is not the same as the number
        //of selected notes (we can do this because we pruned the selected
        //notes of duplicates earlier)
        if(chord.length == selectedNotes.length) {
            for(var patternIndex in tryPatterns) {
                var pattern = tryPatterns[patternIndex];
                var isMatch = true;
                for(var j = 0; j < pattern.length; j++) {
                    if(!chord.includes(pattern[j])) {
                        isMatch = false;
                    }
                }
                if(isMatch) {
                    matches.push('' + patternIndex + ' ' + chordIndex)
                }
            }
        }
    }

    console.log(matches);

    var results = document.getElementById('results');
    results.innerHTML = '';
    for(var i = 0; i < matches.length; i++) {
        results.innerHTML = results.innerHTML + matches[i] + '<br>';
    }
}