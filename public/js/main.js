// Simple fade-in effect for page elements
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, 100 * index);
    });
    
    // Optional: Add reflection effects on hover
    const glossyElements = document.querySelectorAll('.glossy-panel');
    
    glossyElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.background = `
                linear-gradient(
                    135deg, 
                    rgba(255,255,255,0.4) ${x / 5}%, 
                    rgba(255,255,255,0.1) ${x / 3 + 20}%
                ),
                rgba(228, 245, 255, 0.7)
            `;
        });
    });
});
