const translations = {
    pt: {
        title: "Guilherme Leite - Desenvolvedor Web",
        subtitle: "Desenvolvedor Full-Stack",
        aboutTitle: "Sobre mim",
        aboutText: "Sou Guilherme Leite da Silva Chagas, desenvolvedor full-stack apaixonado por tecnologia. Tenho experiência com Laravel, JavaScript, Java, Ollama, bancos de dados (MySQL/MariaDB/MongoDB), Docker, GitHub e APIs.",
        projectsTitle: "Projetos",
        projectTitle1: "Projeto Trilhas",
        projectDesc1: "Projeto Trilhas é uma iniciativa institucional focada no combate à evasão escolar por meio de uma plataforma inovadora que conecta alunos, professores e futuros estudantes do IFPR. Foi meu maior projeto, onde desenvolvi uma aplicação que permite aos alunos compartilhar conhecimentos e, com isso, serem reconhecidos e recompensados. O Trilhas promove o engajamento e o aprendizado colaborativo, incentivando uma comunidade educacional mais integrada e ativa.",
        projectTitle2: "IA-Project",
        projectDesc2: "Neste projeto, fui responsável pelo desenvolvimento do front-end e pela configuração do Docker. A aplicação foi projetada para simplificar a vida dos desenvolvedores, permitindo que o usuário defina as características desejadas para o seu banco de dados, enquanto uma inteligência artificial automatiza o restante do processo.",
        projectTitle3: "Blog-Api",
        projectDesc3: "Uma API de livraria moderna que permite aos usuários explorar, avaliar e descobrir novos livros. Este projeto integra autenticação segura, gerenciamento completo de livros com suas relações a autores e categorias, além de um sistema de avaliações que permite aos leitores compartilhar suas opiniões. A arquitetura foi projetada para ser escalável e de fácil manutenção, com segurança integrada para proteger dados sensíveis.",
        contactTitle: "Contato",
        contactPrompt: "Me envie uma mensagem diretamente:",
        emailLabel: "Seu email:",
        messageLabel: "Sua mensagem:",
        submitButton: "enviar_mensagem.sh",
        languageButton: "English"
    },
    en: {
        title: "Guilherme Leite - Web Developer",
        subtitle: "Full-Stack Developer",
        aboutTitle: "About me",
        aboutText: "I'm Guilherme Leite da Silva Chagas, a full-stack developer passionate about technology. I have experience with Laravel, JavaScript, Java, Ollama, databases (MySQL/MariaDB/MongoDB), Docker, GitHub, and APIs.",
        projectsTitle: "Projects",
        projectTitle1: "Trilhas Project",
        projectDesc1: "Trilhas Project is an institutional initiative focused on combating school dropouts through an innovative platform that connects students, teachers, and future students of IFPR. It was my biggest project, where I developed an application that allows students to share knowledge and, as a result, be recognized and rewarded. Trilhas promotes engagement and collaborative learning, encouraging a more integrated and active educational community.",
        projectTitle2: "IA-Project",
        projectDesc2: "In this project, I was responsible for front-end development and Docker configuration. The application was designed to simplify developers' lives, allowing users to define the desired characteristics for their database, while artificial intelligence automates the rest of the process.",
        projectTitle3: "Blog-Api",
        projectDesc3: "A modern bookstore API that allows users to explore, rate, and discover new books. This project integrates secure authentication, complete book management with author and category relationships, and a review system that enables readers to share their opinions. The architecture was designed to be scalable and easy to maintain, with integrated security to protect sensitive data.",
        contactTitle: "Contact",
        contactPrompt: "Send me a message directly:",
        emailLabel: "Your email:",
        messageLabel: "Your message:",
        submitButton: "send_message.sh",
        languageButton: "Português"
    }
};

function addLanguageToggleButton() {
    const terminalHeader = document.querySelector('.terminal-header');
    
    const languageButton = document.createElement('button');
    languageButton.id = 'language-toggle';
    languageButton.className = 'language-btn';
    languageButton.innerText = 'English';
    
    terminalHeader.appendChild(languageButton);
    
    languageButton.addEventListener('click', toggleLanguage);
}

function toggleLanguage() {
    const currentLang = document.documentElement.getAttribute('lang') || 'pt';
    const newLang = currentLang === 'pt' ? 'en' : 'pt';
    
    document.documentElement.setAttribute('lang', newLang);
    
    const langButton = document.getElementById('language-toggle');
    langButton.innerText = translations[newLang].languageButton;
    
    updatePageContent(newLang);
    
    localStorage.setItem('preferredLanguage', newLang);
}

function updatePageContent(lang) {
    document.title = translations[lang].title;
    
    document.querySelector('.matrix-text').innerText = `echo "${translations[lang].subtitle}"`;
    
    document.querySelector('.about-me .section-prompt').innerText = lang === 'pt' ? 'cat SobreMim.txt' : 'cat AboutMe.txt';
    document.querySelector('.about-me h2').innerText = translations[lang].aboutTitle;
    document.querySelector('.about-me p').innerText = translations[lang].aboutText;
    
    document.querySelector('.projects .section-prompt').innerText = lang === 'pt' ? 'ls -l projetos/' : 'ls -l projects/';
    document.querySelector('.projects h2').innerText = translations[lang].projectsTitle;
    
    const projects = document.querySelectorAll('.project');
    projects[0].querySelector('a').innerText = translations[lang].projectTitle1;
    projects[0].querySelector('p').innerText = translations[lang].projectDesc1;
    projects[1].querySelector('a').innerText = translations[lang].projectTitle2;
    projects[1].querySelector('p').innerText = translations[lang].projectDesc2;
    projects[2].querySelector('a').innerText = translations[lang].projectTitle3;
    projects[2].querySelector('p').innerText = translations[lang].projectDesc3;
    
    document.querySelector('footer .section-prompt').innerText = lang === 'pt' ? 'cat EntreEmContato.txt' : 'cat ContactMe.txt';
    document.querySelector('footer h2').innerText = translations[lang].contactTitle;
    document.querySelector('footer .section-prompt:nth-of-type(2)').innerText = `echo "${translations[lang].contactPrompt}"`;
    
    const formLabels = document.querySelectorAll('.terminal-form label');
    formLabels[0].innerHTML = `$ echo "${translations[lang].emailLabel}"
                               <input type="email" name="email" required>`;
    formLabels[1].innerHTML = `$ echo "${translations[lang].messageLabel}"
                               <textarea name="message" required></textarea>`;
    
    document.querySelector('.terminal-form button').innerText = translations[lang].submitButton;
}

function initLanguage() {
    addLanguageToggleButton();
    
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== 'pt') {
        document.documentElement.setAttribute('lang', savedLang);
        updatePageContent(savedLang);
        document.getElementById('language-toggle').innerText = translations[savedLang].languageButton;
    } else {
        document.documentElement.setAttribute('lang', 'pt');
    }
}

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
    initLanguage();
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