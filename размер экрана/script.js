const button = document.querySelector("button");
const widthScreen = window.screen.width;
const heightScreen = window.screen.height;


button.addEventListener('click', () => {
   alert(`размер вашего экрана, ширина: ${widthScreen}, высота: ${heightScreen}.`);
});