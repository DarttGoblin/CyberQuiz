const quiz_intro = document.querySelector('.quiz-intro');
const intro_start = document.querySelector('.intro-start');
const quiz_container = document.querySelector('.quiz-container');
const quit_icon = document.querySelector('.quit-icon');
const progress_bar_child = document.querySelector('.progress-bar-child');
const lives_count = document.querySelector('.lives-count');
const topic_image = document.querySelector('.topic-image');
const topic = document.querySelector('.topic');
const question = document.querySelector('.question');
const options = document.querySelectorAll('.option');
const explanation = document.querySelector('.explanation');
const skip = document.querySelector('.skip');
const check = document.querySelector('.check');

let ids = [];
let num_of_question = 5;
let difficulty = 50;
let correctAnswer;
let state = false;
let chosen_option;
let chosen_question;
let lives = 3;
let progress = 0;
let answer;

IntroState();
ClickOption();
NextQuestion();

skip.onclick = function() { NextQuestion(); };
quit_icon.onclick = function() { alert('User has quit'); };

check.onclick = function() {
    if (check.textContent === "Reload") {
        location.reload();
        ids = [];
    }

    if (check.textContent === "Continue") {
        check.textContent = "Check";
        explanation.textContent = '';
        options.forEach(option => option.classList.remove('correct', 'wrong'));
        Interactions(true);
        NextQuestion();
        return;
    }

    if (!answer) return;
    correctAnswer = chosen_question.options[0];
    if (answer === correctAnswer) Correct();
    else Wrong();
};

function Correct() {
    progress = progress + (100 / num_of_question);
    progress_bar_child.style.width = `${progress}%`;
    difficulty = Math.min(difficulty + 10, 100);
    explanation.textContent = chosen_question.explanation;
    chosen_option.classList.add('correct');
    Interactions(false);
    if (progress == 100) setTimeout(YouWon, 2000);
    else check.textContent = "Continue";
}

function Wrong() {
    lives--;
    lives_count.textContent = lives;
    difficulty = Math.min(difficulty - 10, 0);
    chosen_option.classList.add('wrong');

    options.forEach(option => {
        if (option.textContent === correctAnswer) {
            option.classList.add('correct');
        }
    });

    explanation.textContent = chosen_question.explanation;
    Interactions(false);
    check.textContent = "Continue";

    if (lives <= 0) {
        setTimeout(GameOver, 500);
    }
}

function NextQuestion() {
    answer = null;
    options.forEach(option => option.classList.remove('option-clicked'));

    const availableQuestions = quiz_questions.filter(q => !ids.includes(q.id));
    if (availableQuestions.length === 0) {
        YouWon();
        return;
    }

    let filtered = availableQuestions.reduce((prev, curr) => {
        return (Math.abs(curr.difficulty - difficulty) < Math.abs(prev.difficulty - difficulty) ? curr : prev);
    });

    chosen_question = filtered;
    topic_image.src = chosen_question.image;
    topic.textContent = chosen_question.topic;
    topic.style.color = chosen_question.color;
    question.textContent = chosen_question.question;

    let shuffled_options = [...chosen_question.options];
    for (let i = shuffled_options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled_options[i], shuffled_options[j]] = [shuffled_options[j], shuffled_options[i]];
    }

    options.forEach((optionElement, index) => {
        optionElement.textContent = shuffled_options[index];
    });

    ids.push(chosen_question.id);
    console.log(chosen_question.difficulty);
}

function Interactions(allow) {
    if (!allow) {
        check.style.pointerEvents = "auto";
        skip.style.pointerEvents = "none";
        options.forEach(option => option.style.pointerEvents = "none");
    } else {
        check.style.pointerEvents = "auto";
        skip.style.pointerEvents = "auto";
        options.forEach(option => option.style.pointerEvents = "auto");
    }
}

function GameOver() {
    alert("Game Over! You lost all your lives.");
    lives = 3;
    lives_count.textContent = lives;
    progress = 0;
    progress_bar_child.style.width = "0%";
    NextQuestion();
}

function YouWon() {
    alert("Congrats, you won! Reload the page for replay.");
    check.textContent = "Reload";
    Interactions(false);
}

function ClickOption() {
    options.forEach(option => {
        option.onclick = function() {
            options.forEach(previous_option => previous_option.classList.remove('option-clicked'));
            option.classList.add('option-clicked');
            chosen_option = option;
            answer = option.textContent;
        };
    });
}

function IntroState() {
    intro_start.onclick = function() {
        quiz_intro.style.display = 'none';
        quiz_container.style.display = 'flex';
    }
}
