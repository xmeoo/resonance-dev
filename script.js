// Generate stars (CSS-based)
const starContainer = document.getElementById('stars');
if(starContainer){
    const numStars = 50;
    for(let i=0; i<numStars; i++){
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.animationDuration = (5 + Math.random()*5) + 's';
        starContainer.appendChild(star);
    }
}

// Login system
function getUsers(){ return JSON.parse(localStorage.getItem('users')||'[]'); }
function saveUsers(users){ localStorage.setItem('users', JSON.stringify(users)); }

const loginForm = document.querySelector('.container');
if(loginForm){
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');
    const createBtn = document.getElementById('createBtn');
    const stayLogged = document.getElementById('stayLogged');

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

// Logout
const logoutBtn = document.getElementById('logout');
if(logoutBtn){
    logoutBtn.addEventListener('click', ()=>{
        localStorage.removeItem('stayLogged');
        window.location.href='index.html';
    });
}

// Download button
const downloadBtn = document.getElementById('downloadBtn');
if(downloadBtn){
    downloadBtn.addEventListener('click', ()=>{
        const url = 'https://your-download-link.com/file.exe'; // replace
        const a = document.createElement('a');
        a.href = url;
        a.download = 'ResonanceLoader.exe';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
}

// Buy button
const buyBtn = document.getElementById('buyBtn');
if(buyBtn){
    buyBtn.addEventListener('click', ()=>{
        window.location.href='https://your-buy-link.com'; // replace
    });
}

// Access control for protected pages
const protectedPages = ['dashboard.html','install.html','buy.html'];
if(protectedPages.includes(window.location.pathname.split('/').pop()) && localStorage.getItem('stayLogged')!=='true'){
    window.location.href='index.html';
}
