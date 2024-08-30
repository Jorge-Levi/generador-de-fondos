const color1 = document.getElementById('color1');
const color2 = document.getElementById('color2');
const direction = document.getElementById('direction');
const preview = document.getElementById('preview');
const generateBtn = document.getElementById('generate-btn');
const downloadBtn = document.getElementById('download-btn');

function generateBackground() {
    const gradient = `linear-gradient(${direction.value}, ${color1.value}, ${color2.value})`;
    preview.style.background = gradient;
}

function downloadBackground() {
    const link = document.createElement('a');
    link.download = 'background.png';
    link.href = preview.toDataURL();
    link.click();
}

generateBtn.addEventListener('click', generateBackground);
downloadBtn.addEventListener('click', downloadBackground);
