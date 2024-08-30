const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const direction = document.getElementById('direction');
const preview = document.getElementById('preview');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');

const shareFacebookBtn = document.getElementById('share-facebook');
const shareTwitterBtn = document.getElementById('share-twitter');

function generateBackground() {
    const gradient = `linear-gradient(${direction.value}, ${color1.value}, ${color2.value})`;
    preview.style.background = gradient;
    preview.textContent = '';  // Clear text when a background is generated
    saveGradient(gradient);  // Guardamos el gradiente en localStorage
}

function updatePreview() {
    const gradient = `linear-gradient(${direction.value}, ${color1.value}, ${color2.value})`;
    preview.style.background = gradient;
}

function downloadBackground() {
    html2canvas(preview).then(canvas => {
        const link = document.createElement('a');
        link.download = 'background.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

function shareOnFacebook() {
    html2canvas(preview).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const blob = dataURLtoBlob(imgData);
        const formData = new FormData();
        formData.append('source', blob);
        formData.append('message', 'Mira el fondo que generé con esta herramienta!');

        fetch('https://graph.facebook.com/me/photos?access_token=YOUR_ACCESS_TOKEN', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => console.log('Compartido exitosamente en Facebook:', data))
        .catch(error => console.error('Error al compartir en Facebook:', error));
    });
}

function shareOnTwitter() {
    html2canvas(preview).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const twitterUrl = `https://twitter.com/intent/tweet?text=Mira el fondo que generé con esta herramienta!&url=${encodeURIComponent(imgData)}&hashtags=fondo,generador`;

        window.open(twitterUrl, '_blank');
    });
}

function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime});
}

function saveGradient(gradient) {
    let gradients = JSON.parse(localStorage.getItem('gradients')) || [];
    gradients.push(gradient);
    localStorage.setItem('gradients', JSON.stringify(gradients));
    updateHistory();
}

function updateHistory() {
    const historyContainer = document.getElementById('history-container');
    historyContainer.innerHTML = '';
    const gradients = JSON.parse(localStorage.getItem('gradients')) || [];
    gradients.forEach((gradient, index) => {
        const gradientItem = document.createElement('div');
        gradientItem.className = 'history-item';
        gradientItem.style.background = gradient;
        gradientItem.title = `Gradiente ${index + 1}`;
        gradientItem.addEventListener('click', () => {
            preview.style.background = gradient;
            preview.textContent = '';  // Clear text when a history item is applied
        });
        historyContainer.appendChild(gradientItem);
    });
}

// Initial Load
updateHistory();  // Load history on page load

// Event Listeners
generateBtn.addEventListener('click', generateBackground);
downloadBtn.addEventListener('click', downloadBackground);
shareFacebookBtn.addEventListener('click', shareOnFacebook);
shareTwitterBtn.addEventListener('click', shareOnTwitter);
color1.addEventListener('input', updatePreview);
color2.addEventListener('input', updatePreview);
direction.addEventListener('change', updatePreview);
