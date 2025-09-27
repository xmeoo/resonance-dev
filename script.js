const canvas = document.getElementById('space');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

const numStars = 150;
const stars = [];
for(let i=0;i<numStars;i++){
    stars.push({
        x: Math.random()*width,
        y: Math.random()*height,
        vx: (Math.random()-0.5)*0.5,
        vy: (Math.random()-0.5)*0.5,
        radius: Math.random()*1.5 + 0.5,
        pulse: Math.random()*2*Math.PI
    });
}

let mouse = {x: width/2, y: height/2};
window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

function animate(){
    ctx.clearRect(0,0,width,height);

    for(let star of stars){
        let r = star.radius + Math.sin(star.pulse)*0.5;
        star.pulse += 0.02;

        ctx.beginPath();
        ctx.arc(star.x, star.y, r, 0, Math.PI*2);
        ctx.fillStyle = '#0ff';
        ctx.shadowColor = '#0ff';
        ctx.shadowBlur = 8;
        ctx.fill();

        star.x += star.vx;
        star.y += star.vy;

        if(star.x<0||star.x>width) star.vx*=-1;
        if(star.y<0||star.y>height) star.vy*=-1;

        let dx = star.x - mouse.x;
        let dy = star.y - mouse.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 120){
            ctx.strokeStyle = `rgba(0,255,255,${1-dist/120})`;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    }

    requestAnimationFrame(animate);
}
animate();

document.getElementById('loginBtn').addEventListener('click', () => {
    let u = document.getElementById('username').value;
    let p = document.getElementById('password').value;
    if(u && p) alert(`Login successful!\nUsername: ${u}`);
    else alert('Enter username and password.');
});

document.getElementById('createBtn').addEventListener('click', () => {
    let u = document.getElementById('username').value;
    let p = document.getElementById('password').value;
    if(u && p) alert(`Account created!\nUsername: ${u}`);
    else alert('Enter username and password.');
});
