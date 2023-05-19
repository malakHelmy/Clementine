const form = document.getElementById('chatform');
const chatContainer = document.getElementById('chat_container');

let loadInterval;
const loader = (element) => {
    element.textContent = '';

     loadInterval = setInterval(() => {
        element.textContent += '.';

        if (element.textContent === '....') {
            element.textContent = '';
        }
    }, 300);
};

const typeText = (element, text) => {
    let index = 0;

    const interval = setInterval(() => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
        } else {
            clearInterval(interval);
        }
    }, 20);
};

const generateUniqueId = () => {
    const timestamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);

    return `id-${timestamp}-${hexadecimalString}`;
};

const chatStripe = (isAi, value, uniqueId) => {
    return `
        <div class="wrapper ${isAi ? 'ai' : ''}">
            <div class="chat">
                <div class="profile">
                    <img src="${isAi ? 'Images/bot.svg' : 'Images/user.svg'}" alt="${isAi ? 'bot' : 'user'}" />
                </div>
                <div class="message" id="${uniqueId}">${value}</div>
            </div>
        </div>
    `;
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const prompt = data.get('prompt');

    if (!prompt) {
        return;
    }

    // user's chatstripe
    chatContainer.innerHTML += chatStripe(false, prompt);

    // to clear the textarea input
    form.reset();

    // bot's chatstripe
    const uniqueId = generateUniqueId();
    chatContainer.innerHTML += chatStripe(true, '', uniqueId);

    // to focus scroll to the bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // specific message div
    const messageDiv = document.getElementById(uniqueId);

    // messageDiv.innerHTML = "..."
    loader(messageDiv);

    try {
        const response = await fetch('http://localhost:8080/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: data.get('prompt'),
            }),
        });

        clearInterval(loadInterval);
        messageDiv.innerHTML = '';

        if (response.ok) {
            const data = await response.json();
            const parsedData = data.bot.trim(); // trims any trailing spaces/'\n'

            typeText(messageDiv, parsedData);
        } else {
            throw new Error('Something went wrong');
        }
    } catch (err) {
        messageDiv.innerHTML = 'Something went wrong';
        console.error(err);
    }
};

form.addEventListener('submit', handleSubmit);