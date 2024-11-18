// Login elements
const login = document.querySelector(".login-box");
const loginForm = login.querySelector(".login-form");
const loginInput = document.getElementById("login-input");
// Chat elements
const chat = document.querySelector(".chat-box");
const chatForm = login.querySelector(".chat-form");
const chatInput = document.getElementById("chat-input");
const chatMessage = document.getElementById("chat-message");

// Server
let webSocket;

const colors = ["cadetblue", "darkgoldenrod", "cornflowerblue", "darkkhai", "hotpink", "gold"];

const user = { id: "", name: "", color: "" };

const randonColor = () => {
    const randonIndex = Math.floor(Math.random() * colors.length);
    return colors[randonIndex];
};

// Menssage
const processMessage = ({ data }) => {
    const {userId, userName, userColor, content} = JSON.parse(data);

    const message = userId === user.id ? createdMessageSelf(content) : createdMessageOther(content, userName, userColor);

    chatMessage.appendChild(message);

    scrollScreen();
};

const createdMessageSelf = (content) => {
    const section = document.createElement("section");

    section.classList.add("message-self");
    section.innerHTML = content;

    return section;
};

const createdMessageOther = (content, sender, senderColor) => {
    const section = document.createElement("section");
    const span = document.createElement("span");

    section.classList.add("message-other");

    section.classList.add("message-self");
    span.classList.add("message-sender");
    span.style.color = senderColor;

    section.appendChild(span);

    span.innerHTML = sender;
    section.innerHTML += content;

    return section;
};

const sendMessage = (ev) => {
    ev.preventDefault();

    const message = { userId: user.id, userName: user.name, userColor: user.color, content: chatInput.value };

    webSocket.send(JSON.stringify(message));

    chatInput.value = "";
};

const scrollScreen = () => {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
};

// Login
const handleLogin = (ev) => {
    ev.preventDefault();

    user.id = crypto.randomUUID;
    user.name = loginInput.value;
    user.color = randonColor();

    login.style.display = "none";
    chat.style.display = "flex";


    webSocket = new WebSocket("ws://localhost:8080");
    webSocket.onmessage = processMessage;

    console.log(user);
};

loginForm.addEventListener("submit", handleLogin);
chatForm.addEventListener("submit", sendMessage);
