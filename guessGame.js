let number = Math.floor(Math.random() * 10) + 1;

function new_game() {
    number = Math.floor(Math.random() * 10) + 1;
    document.getElementById("user_input").value = ''; // Clear input field
    document.getElementById("result").textContent = "Result will appear here!";
}

function guess() {
    const userInput = document.getElementById("user_input");
    const userValue = Number(userInput.value);
    const result = document.getElementById("result");

    if (number > userValue) {
        result.textContent = "Your input is lower than the number";
    } else if (number < userValue) {
        result.textContent = "Your input is higher than the number";
    } else {
        result.textContent = "Congrats! You guessed right!";
    }
}
