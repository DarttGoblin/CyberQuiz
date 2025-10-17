const start = document.querySelector('.start');
const github = document.querySelector('.github');
const demo = document.querySelector('.demo');

start.onclick = function() {
    section[1].scrollIntoView({behavior: 'smooth'});
}

github.onclick = function() {
    window.open('https://github.com/DarttGoblin/CyberQuiz', '_blank');
}

demo.onclick = function() {
    alert('Demo will be available soon...');
    // window.open('', '_blank');
}