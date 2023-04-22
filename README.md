# Wordle!
## [CLick for demo](https://devitodbug.github.io/Wordle-Game/)
Welcome to Wordle, a daily word guessing game where you try to guess the word of the day! Each day, a new word will be generated for you to guess, so make sure to come back and play every day.

## Installation
To play the game, simply open the index.html file in your web browser. The game requires an internet connection to fetch the word of the day from https://words.dev-apis.com/word-of-the-day, so make sure you have an active internet connection.

## How to Play
* There is a secret five letter word chosen
* Players have six guesses to figure out the secret word. After six guesses, they lose
* If the player guesses a letter that is in the right place, it is shown as green
* If the player guesses a letter that is in the word but not in the right place, it is shown as yellow
* It does account for however many of the letter exist in the word. For example, if the player guesses "SPOOL" and the word is "OVERT", one "O" is shown as yellow and the second one is not.
* If the player guesses the right word, the player wins and the game is over.

## Technologies Used
This game was created using HTML, CSS, and JavaScript. It fetches the word of the day from https://words.dev-apis.com/word-of-the-day using the fetch API.

## Future Improvements
1. Add a scoreboard to keep track of high scores
2. Allow users to choose a difficulty level
3. Improve the UI and overall user experience
4. Check if the user's guess is a valid English five-letter word before validating the guess

## Screenshot
![screenshot](https://github.com/DevitoDbug/Wordle-Game/blob/master/screenshots/image2.0.jpg?raw=true)
![screenshot](https://github.com/DevitoDbug/Wordle-Game/blob/master/screenshots/image2.1.jpg?raw=true)
![screenshot](https://github.com/DevitoDbug/Wordle-Game/blob/master/screenshots/image2.2.jpg?raw=true)


