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
    alert('The report would be available very soon...');
    // window.open('', '_blank');
}