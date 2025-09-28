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
