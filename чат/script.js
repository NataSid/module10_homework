const messageInput = document.querySelector('.message');
const sendBtn = document.querySelector('.j-btn-send');
const textWindow = document.querySelector('.text-window');
const geoBtn = document.querySelector('.j-btn-geo');

const wsUri = "wss://echo-ws-service.herokuapp.com";
const placeholder = 'Здесь вводится текст сообщения';

function addMessage(masadge){
let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}

// создаем объект вебсокет и описываем его поведение
let websocket = new WebSocket(wsUri); 

//открываем соединение
websocket.onopen = function(evt) {
    console.log("CONNECTED");
};
//если ошибка
websocket.onerror = function(evt) {
    console.log(evt.data)
};

//ответ от сервера
websocket.onmessage = function(evt) {
  //console.log(evt.data);
  addMessage(
    '<span style="color: blue;">Ответ сервера: ' + evt.data+'</span>'
    );
};

//отправка сообщения из формы
sendBtn.addEventListener('click', () => {
    let message = messageInput.value;
    websocket.send(message);
    addMessage(message);
    messageInput.value = ''
})

//функция для добавления сообщений в чат
function addMessage(message, position='flex-end') {
    let element = `
        <p class='message-window' style='align-self: ${position}'>
            ${message}
        </p>
    `;
    let chat = textWindow.innerHTML;
    textWindow.innerHTML = chat + element;
}


//функция об ошиибки
const error = () => {
    let error = "ваше положение не определяется" 
    addMessage(error);
}
//функция о геолокации
const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    addLink(link)
}


//функция для вставки ссылки в чат
function addLink(link) {
    let element = `
    <a  href='${link}'
        target='_blank'
        style='text-decoration: none;'
        >
        Ваша геолокация
        </a>
    `;
    let chat = textWindow.innerHTML;
    textWindow.innerHTML = chat + element;
};


//добавляем обработчик события при нажатии кнопки гео-позиции
geoBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        console.log("не поддерживается геолокация")
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    };
});