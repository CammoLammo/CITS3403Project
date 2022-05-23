var offset = 1;
var wordID = 0;
var trueGuess = "null";
var guessedWords = [];
var numGuesses;
var responseObject;
var guessOutput = document.getElementById("guessOutput");
var userGuess = document.getElementById("guess");
var userGuessText = document.getElementById("userGuessText");
var trueGuessText = document.getElementById("trueGuessText");

var today = new Date();
const startDay = new Date('05/19/2022');

var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

var diffTime = Math.abs(today - startDay);

wordID = Math.ceil(diffTime / (1000 * 60 * 60 *24)) - offset;

userGuess.addEventListener("keydown", function(checkEnter){
    if (checkEnter.key == "Enter"){
        submitGuess(checkEnter);
}});

function initialisePuzzle(){
    var requestJSON = {"requestType": "initialisePuzzle", "puzzleID": wordID};
    var requestJSONString = JSON.stringify(requestJSON);

    $.ajax({
        url: "/index",
        type: "POST",
        data: requestJSONString,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        complete: function(response){
            var responseText = response["responseText"];
            responseObject = JSON.parse(responseText);
            numGuesses = responseObject.guesses;
            todayCorrect = responseObject.correct;
            document.getElementById("clue1").innerHTML = responseObject.definition;
            trueGuess = responseObject.word;
            clue2 = responseObject.wordType.toLowerCase();
            clue3 = '"'+responseObject.sentence.slice(1,-1)+'"';
            clue4 = responseObject.word.charAt(0);
            clue5 = "1 guess remaining";

            if(todayCorrect){
                document.getElementById("clue2").innerHTML = clue2;
                document.getElementById("clue3").innerHTML = clue3;
                document.getElementById("clue4").innerHTML = clue4;
                document.getElementById("clue5").innerHTML = "Congratulations! You have already solved today's puzzle";

                var modal = document.getElementById("myModal");
                var span = document.getElementsByClassName("close")[0];

                document.getElementById("answer").innerHTML = trueGuess;
                document.getElementById("clue4").innerHTML = trueGuess;        

                modal.style.display = "block";
                span.onclick = function() {
                    modal.style.display = "none";
                }
                window.onclick = function(event) {
                    if (event.target == modal) {
                    modal.style.display = "none";
                    }
                }
            }
            else if(numGuesses > 0){
                document.getElementById("clue2").innerHTML = clue2;
                document.getElementById("clue5").innerHTML = "4 guesses remaining";
                if(numGuesses > 1){
                    document.getElementById("clue3").innerHTML = clue3;
                    document.getElementById("clue5").innerHTML = "3 guesses remaining";
                    if(numGuesses > 2){
                        document.getElementById("clue4").innerHTML = clue4;
                        document.getElementById("clue5").innerHTML = "2 guesses remaining";
                        if(numGuesses > 3){
                            document.getElementById("clue5").innerHTML = clue5;
                            if(numGuesses > 4){
                                document.getElementById("clue5").innerHTML = "You have used all your guesses and failed to get the puzzle, try again tomorrow!";
                                document.getElementById("guess").disabled = true;
                                document.getElementById("clue4").innerHTML = trueGuess;
                            }
                        }
                    }
                }
            }
        }
    });

}

function submitGuess(checkEnter){
    var userGuessInput = checkEnter.target.value.toLowerCase();
    var checkGuess = trueGuess === userGuessInput;
    if (guessedWords.includes(userGuessInput)){
        alert("You have already guessed this word!");
    }
    else if (!checkGuess){
        numGuesses += 1;
        guessedWords.push(userGuessInput)
        switch (numGuesses){
            case 1:
                document.getElementById("clue5").innerHTML = "4 guesses remaining";
                document.getElementById("clue2").innerHTML = clue2;
                var requestJSON = {"requestType": "firstGuess"};
                var requestJSONString = JSON.stringify(requestJSON);
                $.ajax({
                    url: "/index",
                    type: "POST",
                    data: requestJSONString,
                    contentType: "application/json; charset=utf-8"
                });
                break;
            case 2:
                document.getElementById("clue5").innerHTML = "3 guesses remaining";
                document.getElementById("clue3").innerHTML = clue3;
                var requestJSON = {"requestType": "middleGuess"};
                var requestJSONString = JSON.stringify(requestJSON);
                $.ajax({
                    url: "/index",
                    type: "POST",
                    data: requestJSONString,
                    contentType: "application/json; charset=utf-8"
                });
                break;
            case 3:
                document.getElementById("clue5").innerHTML = "2 guesses remaining";
                document.getElementById("clue4").innerHTML = clue4;
                var requestJSON = {"requestType": "middleGuess"};
                var requestJSONString = JSON.stringify(requestJSON);
                $.ajax({
                    url: "/index",
                    type: "POST",
                    data: requestJSONString,
                    contentType: "application/json; charset=utf-8"
                });
                break;
            case 4:
                document.getElementById("clue5").innerHTML = "1 guesses remaining";
                document.getElementById("clue5").innerHTML = clue5;
                var requestJSON = {"requestType": "middleGuess"};
                var requestJSONString = JSON.stringify(requestJSON);
                $.ajax({
                    url: "/index",
                    type: "POST",
                    data: requestJSONString,
                    contentType: "application/json; charset=utf-8"
                });
                break;
            case 5:
                document.getElementById("clue5").innerHTML = "You have used all your guesses and failed to get the puzzle, come back tomorrow for a new puzzle!";
                document.getElementById("clue4").innerHTML = trueGuess;
                document.getElementById("guess").disabled = true;
                var requestJSON = {"requestType": "finalGuess"};
                var requestJSONString = JSON.stringify(requestJSON);
                $.ajax({
                    url: "/index",
                    type: "POST",
                    data: requestJSONString,
                    contentType: "application/json; charset=utf-8"
                });
        }
    }
    else{
        var modal = document.getElementById("myModal");
        var span = document.getElementsByClassName("close")[0];

        var requestJSON = {"requestType": "correctGuess"};
        var requestJSONString = JSON.stringify(requestJSON);
        $.ajax({
            url: "/index",
            type: "POST",
            data: requestJSONString,
            contentType: "application/json; charset=utf-8"
        });

        document.getElementById("answer").innerHTML = trueGuess;
        document.getElementById("clue4").innerHTML = trueGuess;
        document.getElementById("clue5").innerHTML = "Congratulations! You have already solved today's puzzle";
        modal.style.display = "block";
        span.onclick = function() {
            modal.style.display = "none";
        }
        window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
            }
        }
    }
}