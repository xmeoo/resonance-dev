// ----- Optimized Stars Background -----
const canvas = document.createElement('canvas');
canvas.id = "space";
document.body.prepend(canvas);
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', ()=>{
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Fewer stars for performance
const numStars = 80; // reduced from 150
const stars = [];

for(let i=0;i<numStars;i++){
    stars.push({
        x: Math.random()*width,
        y: Math.random()*height,
        vx: (Math.random()-0.5)*0.3, // slower
        vy: (Math.random()-0.5)*0.3,
        radius: Math.random()*1.2 +0.3, // smaller radius
        pulse: Math.random()*2*Math.PI
    });
}

let mouse = {x: width/2, y: height/2};
window.addEventListener('mousemove', e=>{ mouse.x = e.clientX; mouse.y = e.clientY; });

function animate(){
    ctx.clearRect(0,0,width,height);

    for(let star of stars){
        // simple pulsate
        let r = star.radius + Math.sin(star.pulse)*0.3;
        star.pulse += 0.02;

        // draw star without heavy shadow
        ctx.beginPath();
        ctx.arc(star.x, star.y, r,0,Math.PI*2);
        ctx.fillStyle="#fff";
        ctx.fill();

        // move star
        star.x += star.vx; 
        star.y += star.vy;
        if(star.x<0||star.x>width) star.vx*=-1;
        if(star.y<0||star.y>height) star.vy*=-1;

        // only draw line if very close
        const dx = star.x - mouse.x;
        const dy = star.y - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist<100){ // smaller distance threshold
            ctx.strokeStyle = `rgba(255,255,255,${1-dist/100})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    }

    requestAnimationFrame(animate);
}

animate();
