document.getElementById('loginBtn').addEventListener('click', async () => {
    let u = document.getElementById('username').value;
    let p = document.getElementById('password').value;
    if(!u || !p) return alert('Enter username and password.');

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: u, password: p })
        });
        const data = await res.json();
        if(res.ok){
            alert(data.message);
        } else {
            alert(data.error);
        }
    } catch(err){
        alert('Error connecting to server');
    }
});

document.getElementById('createBtn').addEventListener('click', async () => {
    let u = document.getElementById('username').value;
    let p = document.getElementById('password').value;
    if(!u || !p) return alert('Enter username and password.');

    try {
        const res = await fetch('/api/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: u, password: p })
        });
        const data = await res.json();
        if(res.ok){
            alert(data.message);
        } else {
            alert(data.error);
        }
    } catch(err){
        alert('Error connecting to server');
    }
});
