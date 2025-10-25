const benefit_container = document.querySelectorAll('.benefit-container'); 

benefit_container.forEach(container => {
    container.onclick = function() {
        window.open('https://staysafeonline.org/resources/', '_blank');
    }
});