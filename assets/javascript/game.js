// wordGuessGame object
var wordGuessGame = {

    // Object of all words that can be chosen, along their picture and associcated sound
    wordsToPick: {
        sword: {
            picture: "sword.png",
            sound: "sword.mp3",
        },
        mace: {
            picture: "mace.jpg",
            sound: "mace.mp3",
        },
        queen: {
            picture: "queen.jpg",
            sound: "queen.mp3",
        },
        king: {
            picture: "king.jpg",
            sound: "king.wav",
        },
        prince: {
            picture: "prince.jpg",
            sound: "prince.wav",
        },
        princess: {
            picture: "princess.jpg",
            sound: "princess.mp3",
        },
        lance: {
            picture: "lance.png",
            sound: "lance.mp3",
        },
        castle: {
            picture: "castle.jpg",
            sound: "castle.ogg",
        },
        catapult: {
            picture: "catapult.jpg",
            sound: "catapult.mp3",
        },
        joust: {
            picture: "joust.jpg",
            sound: "joust.mp3",
        },
        crusade: {
            picture: "crusade.jpg",
            sound: "crusade.mp3",
        },
        dungeon: {
            picture: "dungeon.jpg",
            sound: "dungeon.ogg",
        },
        // alchemy: {
        //     picture: "alchemy.jpg",
        //     sound: "alchemy.mp3",
        // },
        shield: {
            picture: "shield.png",
            sound: "shield.mp3",
        },
        // armor: {
        //     picture: "armor.jpg",
        //     sound: "armor.mp3",
        // },
        // gauntlet: {
        //     picture: "gauntlet.jpg",
        //     sound: "gauntlet.mp3",
        // }
    },

    // Variables that set the initial state of our wordGuess game.
    wordInPlay: null,
    wordLetters: [],
    matchedLetters: [],
    guessedLetters: [],
    guessesLeft: 0,
    totalGuesses: 0,
    letterGuessed: null,
    wins: 0,
    losses: 0,

    //New Game function
    newGame: function () {
        // Random word chooser
        var objKeys = Object.keys(this.wordsToPick);
        this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];

        // Split the chosen word up into its individual letters.
        this.wordLetters = this.wordInPlay.split("");
        // Builds the representation of the word we are trying to guess and displays it on the page.
        // At the start it will be all underscores since we haven't guessed any letters ("_ _ _ _").
        this.rebuildWordView();
        // This function sets the number of guesses the user gets, and renders it to the HTML.
        this.processUpdateTotalGuesses();
    },

    // This function is run whenever the user guesses a letter..
    playGame: function (letter) {

        // Check for and handle incorrect guesses.
        this.handleIncorrect(letter);

        // Check for and handle correct guesses.
        this.handleCorrect(letter);

        // Rebuild the view of the word. Guessed letters are revealed, non-guessed letters have a "_".
        this.rebuildWordView();

        // If the user wins, restart the game.
        if (this.handleWin() === true) {
            this.restartGame();
        }

    },

    // Checks for incorrect guess and updates according if it is one
    handleIncorrect: function (letter) {
        // If they haven't guessed the letter before and it's wrong
        if ((this.guessedLetters.indexOf(letter) === -1) && (this.wordLetters.indexOf(letter) === -1)) {

            // Add the letter to the guessedLetters array.
            this.guessedLetters.push(letter);

            // Decrease guesses left by one.
            this.guessesLeft--;

            // Update guesses remaining and guesses letters on the page.
            document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
            document.querySelector("#guessed-letters").innerHTML =
                this.guessedLetters.join(", ");
        }

        // If the user has no guesses left, restart the game.
        if (this.guessesLeft === 0) {
            this.losses++;
            alert("Thou Hast Failed");
            console.log(this.losses);
            document.querySelector("#losses").innerHTML = this.losses;
            this.restartGame();
        }
    },

    // Starting guesses available
    processUpdateTotalGuesses: function () {
        this.guessesLeft = this.wordLetters.length + 5;
        if (this.guessesLeft > 12) { this.guessesLeft = 12 }
        document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
    },

    // This function governs what happens if the user makes a successful guess.
    handleCorrect: function (letter) {
        // Loop through the letters of the "solution".
        for (var i = 0; i < this.wordLetters.length; i++) {
            // If the guessed letter is in the solution, and we haven't guessed it already..
            if ((letter === this.wordLetters[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
                // Push the newly guessed letter into the matchedLetters array.
                this.matchedLetters.push(letter);
            }
        }
    },

    // Displays the target word's letters that have been guessed with _ for ones that haven't
    rebuildWordView: function () {
        var wordView = "";

        for (var i = 0; i < this.wordLetters.length; i++) {
            if (this.matchedLetters.indexOf(this.wordLetters[i]) !== -1) {
                wordView += (" " + this.wordLetters[i] + " ");
            }
            else {
                wordView += "&nbsp;_&nbsp;";
            }
        }
        document.querySelector("#current-word").innerHTML = wordView;
    },

    // Resetting game variables and starting new game.  Does not reset wins and losses
    restartGame: function () {
        document.querySelector("#guessed-letters").innerHTML = "";
        this.wordInPlay = null;
        this.wordLetters = [];
        this.matchedLetters = [];
        this.guessedLetters = [];
        this.guessesLeft = 0;
        this.totalGuesses = 0;
        this.letterGuessed = null;
        this.newGame();
        this.rebuildWordView();
    },

    // Function that checks to see if the user has won.
    handleWin: function () {
        var win = true;

        // Checks to see if all letters in the target word have been guessed - any non-guessed letter will make win false
        for (var i = 0; i < this.wordLetters.length; i++) {
            if (this.matchedLetters.indexOf(this.wordLetters[i]) === -1) {
                win = false;
            }
        }

        if (win) {

            this.wins = this.wins + 1;
            document.querySelector("#wins").innerHTML = this.wins;
            document.querySelector("#obj-header").innerHTML = this.wordInPlay;
            var newImageSrc = "assets/images/" + this.wordsToPick[this.wordInPlay].picture;
            // console.log(newImageSrc);
            document.querySelector("#med-obj-image").setAttribute("src", newImageSrc);
            document.querySelector("#med-obj-image").setAttribute("alt", this.wordInPlay);
            // document.querySelector("#med-object").innerHTML =
            //     "<img class='med-obj-image' src='assets/images/" +
            //     this.wordsToPick[this.wordInPlay].picture + "' alt='" +
            //     this.wordInPlay + "'>";
            var audio = new Audio("/assets/sounds/" + this.wordsToPick[this.wordInPlay].sound);
            console.log("Audio Source:  " + audio);
            audio.play();
            return true;
        }
        return false;
    }
};

//Load new game on startup
wordGuessGame.newGame();

// Pressed key logger
document.onkeyup = function (event) {
    wordGuessGame.letterGuessed = String.fromCharCode(event.which).toLowerCase();
    wordGuessGame.playGame(wordGuessGame.letterGuessed);
};
