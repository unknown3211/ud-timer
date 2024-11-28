const hud = document.querySelector("#hud");
let timerInterval = null;
let timeLeftInSeconds = 0;

hud.style.display = "none";

window.addEventListener('message', event => {
    const eventType = event.data.event;

    if (eventType === "setVisible") {
        hud.style.display = event.data.visible ? "flex" : "none";
        return;
    }

    if (eventType === "setElements") {
        setElements(event.data.elements);
        return;
    }

    if (eventType === "setTimer") {
        setTimer(event.data.timeLeft);
    }
});

function setElements(elements) {
    hud.innerHTML = "";
    elements.forEach(element => {
        const el = document.createElement("div");
        el.classList.add("part");

        const header = document.createElement("h2");
        header.innerText = element.title;

        const val = document.createElement("h1");
        val.innerText = element.value;
        val.style.color = element.color;

        el.append(header, val);
        hud.appendChild(el);
    });
}

function setTimer(timeInSeconds) {
    timeLeftInSeconds = timeInSeconds;

    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timerInterval = setInterval(() => {
        if (timeLeftInSeconds > 0) {
            timeLeftInSeconds--;
            updateTimerDisplay(timeLeftInSeconds);
        } else {
            clearInterval(timerInterval);
        }
    }, 1000);
}

function updateTimerDisplay(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const timeString = `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
    const timerElement = hud.querySelector(".part h1");
    if (timerElement) {
        timerElement.innerText = timeString;
    }
}

function padZero(number) {
    return number < 10 ? '0' + number : number;
}