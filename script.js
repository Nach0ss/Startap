const title = document.getElementById('title');
const btn = document.getElementById('mybtn');

console.log('Знайшов заголовок:', title);
console.log('Знайшов кнопку:', btn);

btn.addEventListener('click', function() {
    title.textContent = 'JS працює! 🎉';
    title.style.color = 'teal';
    
    btn.textContent = 'Натиснуто ✓';
    btn.style.background = 'teal';
    btn.style.color = 'white';
});

const toggleSwitch = document.querySelector('#checkbox');

toggleSwitch.addEventListener('change', function(e) {
    if (e.target.checked) {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }    
});