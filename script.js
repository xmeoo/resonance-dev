const canvas = document.createElement('canvas');
canvas.id = 'space';
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Fewer stars for performance
const numStars = 40;
const stars = [];
for (let i = 0; i < numStars; i++) {
    stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1 + 0.5
    });
}

let mouse = { x: width / 2, y: height / 2 };
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#fff';
    
    for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Move star
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0 || star.x > width) star.vx *= -1;
        if (star.y < 0 || star.y > height) star.vy *= -1;

        // Optional subtle parallax (no lines)
        let dx = (mouse.x - width / 2) * 0.01;
        let dy = (mouse.y - height / 2) * 0.01;
        star.x += dx * 0.1;
        star.y += dy * 0.1;
    }

    requestAnimationFrame(animate);
}

animate();
