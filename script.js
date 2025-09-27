// ----- Stars Background -----
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

const numStars = 150;
const stars = [];
for(let i=0;i<numStars;i++){
    stars.push({
        x: Math.random()*width,
        y: Math.random()*height,
        vx: (Math.random()-0.5)*0.5,
        vy: (Math.random()-0.5)*0.5,
        radius: Math.random()*1.5 +0.5,
        pulse: Math.random()*2*Math.PI
    });
}

let mouse = {x: width/2, y: height/2};
window.addEventListener('mousemove', e=>{ mouse.x = e.clientX; mouse.y = e.clientY; });

function animate(){
    ctx.clearRect(0,0,width,height);
    for(let star of stars){
        let r = star.radius + Math.sin(star.pulse)*0.5;
        star.pulse += 0.02;
        ctx.beginPath();
        ctx.arc(star.x, star.y, r,0,Math.PI*2);
        ctx.fillStyle="#fff";
        ctx.shadowColor="#fff";
        ctx.shadowBlur = 5;
        ctx.fill();

        star.x += star.vx; star.y += star.vy;
        if(star.x<0||star.x>width) star.vx*=-1;
        if(star.y<0||star.y>height) star.vy*=-1;

        let dx = star.x - mouse.x;
        let dy = star.y - mouse.y;
        let dist = Math.sqrt(dx*dx + dy*dy);
        if(dist<120){
            ctx.strokeStyle = `rgba(255,255,255,${1-dist/120})`;
            ctx.shadowBlur=5;
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    }
    requestAnimationFrame(animate);
}
animate();

// ----- Login System -----
function getUsers(){ return JSON.parse(localStorage.getItem('users')||'[]'); }
function saveUsers(users){ localStorage.setItem('users', JSON.stringify(users)); }

const loginForm = document.querySelector('.container');
if(loginForm){
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const createBtn = document.getElementById('createBtn');
    const stayLogged = document.getElementById('stayLogged');

    // Stay logged in
    if(localStorage.getItem('stayLogged') === 'true'){
        window.location.href = 'dashboard.html';
    }

    loginBtn.addEventListener('click', ()=>{
        const u=usernameInput.value.trim();
        const p=passwordInput.value.trim();
        const users=getUsers();
        const found=users.find(x=>x.username===u && x.password===p);
        if(found){
            if(stayLogged.checked) localStorage.setItem('stayLogged','true');
            window.location.href='dashboard.html';
        } else alert('Invalid username/password');
    });

    createBtn.addEventListener('click', ()=>{
        const u=usernameInput.value.trim();
        const p=passwordInput.value.trim();
        if(!u||!p){ alert('Enter username and password'); return; }
        const users=getUsers();
        if(users.find(x=>x.username===u)){ alert('Username exists'); return; }
        users.push({username:u,password:p});
        saveUsers(users);
        alert('Account created!');
    });
}

// ----- Logout -----
const logoutBtn = document.getElementById('logout');
if(logoutBtn){
    logoutBtn.addEventListener('click', ()=>{
        localStorage.removeItem('stayLogged');
        window.location.href='index.html';
    });
}

// ----- Download Button -----
const downloadBtn = document.getElementById('downloadBtn');
if(downloadBtn){
    downloadBtn.addEventListener('click', ()=>{
        const url = 'https://your-download-link.com/file.exe';
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ResonanceLoader.exe';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
}

// ----- Buy Button -----
const buyBtn = document.getElementById('buyBtn');
if(buyBtn){
    buyBtn.addEventListener('click', ()=>{
        window.location.href='https://your-buy-link.com';
    });
}

// ----- Access Control -----
if(!document.getElementById('username') && localStorage.getItem('stayLogged')!=='true'){
    window.location.href='index.html';
}
