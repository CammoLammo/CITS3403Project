// let wordData = [
//     [0, "lettuce", "A cultivated plant of the daisy family, with edible leaves that are eaten in salads.", "NOUN", "‘Verlaine's chine was stuffed with leeks, spring onions, [REDACTED], raspberry leaves, parsley, thyme and marjoram.’"], 
//     [1, "annoy", "Make (someone) a little angry; irritate.", "VERB", "‘the decision really [REDACTED]ed him’"], 
//     [2, "card", "A piece of thick, stiff paper or thin pasteboard, in particular one used for writing or printing on.", "NOUN", "‘some notes jotted down on a [REDACTED]’"], 
//     [3, "past", "Gone by in time and no longer existing.", "ADJECTIVE", "‘the danger is now [REDACTED]’"], 
//     [4, "country", "A nation with its own government, occupying a particular territory.", "NOUN", "‘the [REDACTED]'s increasingly precarious economic position’"], 
//     [5, "locket", "A small ornamental case, typically made of gold or silver, worn round a person's neck on a chain and used to hold things of sentimental value, such as a photograph or lock of hair.", "NOUN", "‘A gold chain with a [REDACTED] containing a picture of her late husband hung around her neck as it did every day.’"], 
// ];

var offset = 0;
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
const startDay = new Date('05/21/2022');

var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

var diffTime = Math.abs(today - startDay);

wordID = Math.ceil(diffTime / (1000 * 60 * 60 *24)) - offset;

// for(let i = 0; i < wordData.length; i++ ){
//     console.log(wordData[i][0]);
//     if (wordData[i][0] == wordID){
//         document.getElementById("clue1").innerHTML = wordData[i][2];
//         console.log((wordData[i][1]));
//         trueGuess = (wordData[i][1]);
//         clue2 = "part of language: " + wordData[i][3];
//         clue3 = "used in a sentence: " + wordData[i][4];
//         clue4 = "The first letter is: " + trueGuess.charAt(0);
//         clue5 = "you are retarded";
//     }
// }

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
            document.getElementById("clue1").innerHTML = responseObject.definition;
            trueGuess = responseObject.word;
            clue2 = responseObject.wordType.toLowerCase();
            clue3 = '"'+responseObject.sentence.slice(1,-1)+'"';
            clue4 = responseObject.word.charAt(0);
            clue5 = "one guess remaining";

            if(numGuesses > 0){
                document.getElementById("clue2").innerHTML = clue2;
                document.getElementById("clue5").innerHTML = "four guesses remaining";
                if(numGuesses > 1){
                    document.getElementById("clue3").innerHTML = clue3;
                    document.getElementById("clue5").innerHTML = "three guesses remaining";
                    if(numGuesses > 2){
                        document.getElementById("clue4").innerHTML = clue4;
                        document.getElementById("clue5").innerHTML = "two guesses remaining";
                        if(numGuesses > 3){
                            document.getElementById("clue5").innerHTML = clue5;
                            if(numGuesses > 4){
                                document.getElementById("clue5").innerHTML = "you have used all your guesses";
                                document.getElementById("guess").disabled = true;
                                document.getElementById("clue4").innerHTML = trueGuess;    
                                document.getElementById("failure").innerHTML = "you didn't guess the word"
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
                document.getElementById("clue5").innerHTML = "four guesses remaining";
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
                document.getElementById("clue5").innerHTML = "three guesses remaining";
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
                document.getElementById("clue5").innerHTML = "two guesses remaining";
                document.getElementById("clue4").innerHTML = clue4;
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
                document.getElementById("clue5").innerHTML = "one guesses remaining";
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
                document.getElementById("clue5").innerHTML = "you have used all your guesses";
                document.getElementById("failure").innerHTML = "you didn't guess the word";
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
        document.getElementById("clue5").innerHTML = "you win";
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