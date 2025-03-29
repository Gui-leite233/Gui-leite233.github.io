const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.querySelector('.matrix-bg').appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(0);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}

function simulateTyping(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

function applyTerminalEffects() {
    const projects = document.querySelectorAll('.project');
    projects.forEach((project, index) => {
        project.classList.add('terminal-fade-in');
        project.style.animationDelay = `${index * 0.2}s`;
    });
    // Removed btn cursor animation
}

document.addEventListener('DOMContentLoaded', () => {
    const prompts = document.querySelectorAll('.section-prompt');
    prompts.forEach((prompt, index) => {
        prompt.classList.add('command-prompt');
        prompt.style.animationDelay = `${index * 0.2}s`;
    });

    const mobileTitle = document.querySelector('.mobile-title');
    if (mobileTitle) {
        simulateTyping(mobileTitle, mobileTitle.textContent);
    }

    applyTerminalEffects();
});

document.querySelector(".terminal-form").addEventListener("submit", async function (event) {
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    let response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
        alert("Message sent successfully!");
        form.reset();
    } else {
        alert("Error sending message. Try again later.");
    }
});

setInterval(drawMatrix, 50);