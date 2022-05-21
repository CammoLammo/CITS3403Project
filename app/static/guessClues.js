var trueGuess = "zone";
var guessedWords = [];
var numGuesses = 0;
var guessOutput = document.getElementById("guessOutput");
var userGuess = document.getElementById("guess");
var userGuessText = document.getElementById("userGuessText");
var trueGuessText = document.getElementById("trueGuessText");
userGuess.addEventListener("keydown", function(checkEnter){
    if (checkEnter.key == "Enter"){
        submitGuess(checkEnter);
}});

guessOutput.innerHTML = "test123";

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
                document.getElementById("clue2").innerHTML = "CLUE 2!";
                break;
            case 2:
                document.getElementById("clue3").innerHTML = "CLUE 3!";
                break;
            case 3:
                document.getElementById("clue4").innerHTML = "CLUE 4!";
                break;
            case 4:
                document.getElementById("clue5").innerHTML = "CLUE 5!";
                break;
            case 5:
                document.getElementById("failure").innerHTML = "YOU HAVE FAILED!";
        }
    }
    else{
        alert("CORRECT ANSWER!");
    }
    guessOutput.innerHTML = checkGuess;
    trueGuessText.innerHTML = trueGuess;
    userGuessText.innerHTML = userGuessInput;
}