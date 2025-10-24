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
let num_of_question = 20;
let difficulty = "medium";
let correctAnswer;
let chosen_option;
let chosen_question;
let lives = 3;
let progress = 0;
let answer;

ClickOption();
NextQuestion();

intro_start.onclick = function() { IntroState(true); };
quit_icon.onclick = function() { IntroState(false); };
skip.onclick = NextQuestion;
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
    explanation.textContent = chosen_question.explanation;
    chosen_option.classList.add('correct');
    Interactions(false);

    // Increase difficulty step
    if (difficulty === "easy") difficulty = "medium";
    else if (difficulty === "medium") difficulty = "hard";

    if (progress === 100) setTimeout(YouWon, 2000);
    else check.textContent = "Continue";
}

function Wrong() {
    lives--;
    lives_count.textContent = lives;
    chosen_option.classList.add('wrong');

    options.forEach(option => {
        if (option.textContent === correctAnswer) {
            option.classList.add('correct');
        }
    });

    explanation.textContent = chosen_question.explanation;
    Interactions(false);
    check.textContent = "Continue";

    // Decrease difficulty step
    if (difficulty === "hard") difficulty = "medium";
    else if (difficulty === "medium") difficulty = "easy";

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

    // Filter questions by current difficulty level
    const matchingDifficulty = availableQuestions.filter(q => q.difficulty === difficulty);
    let pool = matchingDifficulty.length ? matchingDifficulty : availableQuestions;

    chosen_question = pool[Math.floor(Math.random() * pool.length)];
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
    console.log("Current difficulty:", difficulty);
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
    difficulty = "medium";
    ids = [];
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
            options.forEach(o => o.classList.remove('option-clicked'));
            option.classList.add('option-clicked');
            chosen_option = option;
            answer = option.textContent;
        };
    });
}

function IntroState(show) {
    if (show) {
        quiz_intro.style.display = 'none';
        quiz_container.style.display = 'flex';
    } else {
        quiz_intro.style.display = 'flex';
        quiz_container.style.display = 'none';
        lives = 3;
        lives_count.textContent = lives;
        progress = 0;
        progress_bar_child.style.width = "0%";
        difficulty = "medium";
    }
}