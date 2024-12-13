const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');

// Set values
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
    const paragraph = ["God is everywhere and in everything. God is love and provides us with everything we need. All we have to do is have faith in Him. He will never leave us or forsake us. His love for us is everlasting."];
    const randomIndex = Math.floor(Math.random() * paragraph.length);
    typingText.innerHTML = '';

    for (const char of paragraph[randomIndex]) {
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');

    // Focus input field when paragraph is clicked
    typingText.addEventListener("click", () => {
        input.focus();
    });
}

// Handle user input
function initTyping() {
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);

    if (charIndex < char.length && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTime, 1000); // Start the timer when user starts typing
            isTyping = true;
        }

        if (char[charIndex].innerText === typedChar) {
            char[charIndex].classList.add('correct');
        } else {
            mistake++;
            char[charIndex].classList.add('incorrect');
        }

        charIndex++;
        if (charIndex < char.length) {
            char[charIndex].classList.add('active');
        }

        // Update UI stats
        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;
    } else if (charIndex >= char.length) {
        clearInterval(timer); // Stop timer when typing is done
        input.value = ''; // Clear the input field when done
    }
}

// Update time and WPM
function initTime() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;

        let wpmVal = Math.round((charIndex - mistake) / 5 / (maxTime - timeLeft) * 60);
        wpm.innerText = wpmVal;
    } else {
        clearInterval(timer);
    }
}

// Reset the game
function reset() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    input.value = '';
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
}

// Event Listeners
input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);

// Load initial paragraph
loadParagraph();
