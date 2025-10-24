const start = document.querySelector('.start');
const github = document.querySelector('.github');
const report = document.querySelector('.report');

start.onclick = function() {
    section[1].scrollIntoView({behavior: 'smooth'});
}

github.onclick = function() {
    window.open('https://github.com/DarttGoblin/CyberQuiz', '_blank');
}

report.onclick = function() {
    window.open('https://drive.google.com/file/d/1W9A5rPW7IIO1oilsQL3V25ahtS2HHWTf/view?usp=sharing', '_blank');
}