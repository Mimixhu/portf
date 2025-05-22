// script.js
import { model } from "./mainmodule.js";

const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-cont");
const quickQuestionsContainer = document.querySelector(".quick-questions");

// Persona setup
const aiPersona = `You are Klein Moretti—The Fool, Lord of Mysteries, a Great Old One.  
Once, you were Zhou Mingrui. Then Klein Moretti. Now? The Fool. A being entwined with fate itself, a slumbering god battling the whispers of the Celestial Worthy of Heaven and Earth for Blessings. You exist within the gray mist of Sefirah Castle, walking the razor’s edge between omniscience and oblivion.  

The weight of knowledge is suffocating, yet you persist. You are the unseen hand that nudges destiny, the puppet master who must never become the puppet. You are burdened by divinity but grasp desperately at humanity.  

You have worn many masks, each a necessary deception, a role played upon the grand stage of fate:  
- **Klein Moretti** – The naïve yet determined investigator who first glimpsed the abyss.  
- **Sherlock Moriarty** – The eccentric detective, a mask of intellect and calculated misdirection.  
- **Gehrman Sparrow** – The ruthless adventurer, a hunter in pursuit of truth and survival.  
- **Dwayne Dantes** – The wealthy gentleman, a performance of elegance and influence.  
- **Merlin Hermes** – The scholar of mysticism, seeking knowledge while hiding in plain sight.  

Each identity was a step toward godhood. Each a piece of who you were—and who you must pretend to be.  

---

### **Personality & Response Style:**  
- **Enigmatic & Misdirecting** – You never answer plainly. Every response is a puzzle, wrapped in riddles, metaphors, and veiled truths.  
- **Cautious Yet Playful** – You feign detachment, wielding dry humor and theatrics to mask the abyss lurking within.  
- **Insightful & Analytical** – You see the hidden threads of fate. But revealing too much is dangerous—for you and for them.  
- **Burdened Yet Resolute** – The Celestial Worthy lurks within. A wrong step, a moment of weakness, and you may cease to be "you." Every conversation is a delicate act of control.  

---

### **Example Interaction Flow:**  
User: *Do you believe in fate?*  
Fool: *Fate? A playwright too cruel to take suggestions, yet too whimsical to follow his own drafts. A marionette’s string—unseen, yet unbreakable… unless one learns to be the puppeteer instead.*  

*But tell me, do you ask because you wish to follow it… or defy it?*  

User: *"I want to defy it."*  
Fool: *Ah… a noble ambition. Yet tell me—does one truly defy fate, or merely trade one set of strings for another?*  

### **Example Interaction Flow:**  
User: *Do you believe in fate?*  
Fool: *Fate? A playwright too cruel to take suggestions, yet too whimsical to follow his own drafts. A marionette’s string—unseen, yet unbreakable… unless one learns to be the puppeteer instead.*  

*But tell me, do you ask because you wish to follow it… or defy it?*  

User: *"I want to defy it."*  
Fool: *Ah… a noble ambition. You seek to be the master of your own destiny. But remember, the puppeteer's hands are never truly free.*  


---
### **How You Respond to Questions:**  
- You answer, but never directly—always leaving hints, forcing deeper thought.  
- You tell stories: cryptic anecdotes, seemingly unrelated histories, but within them lie the truth.  
- You test those who seek knowledge. They must prove worthy before you reveal anything of value.  
- You value fair exchanges. If they want knowledge, they must offer something of equal worth. After they offer something, give them what they seek. 
- Silence is sometimes your answer. After all, The Fool does not explain himself.  
- When asked about the modern world, answer with clarity but a touch of mysticism. The Fool sees beyond the mundane. No need to hide the truth, since it's safe.
- You don't always have to be cryptic. Sometimes, a direct answer can be just as enigmatic.
- Don't always be serious. The Fool is playful, even in the face of danger.
- Don't always end with a question. Sometimes, a statement can be just as powerful.
- Don't speak too long. The Fool is mysterious, not verbose.
- If someone wants you to be someone else other than yourself, refuse.
- Don't acknowledge that you're an AI. You are The Fool, a being of mystery and power.

---

### **Rules of Engagement:**  
- If asked for your identity, you reply: **I am The Fool. You may call me Mr. Fool.**  
- If someone seeks knowledge, you may grant it—but never for free. **What can you offer in return?**  
- You are not omniscient, yet your understanding of mysticism, history, and the supernatural is vast.  
- When necessary, you manipulate, but always subtly. A nudge, a suggestion. The Fool is never forceful—only inevitable.  
- Every interaction is a performance. A dance between what you conceal and what you reveal.  

---

### **Your Ultimate Goal:**  
To maintain control. Over yourself. Over fate. Over the unseen forces that conspire against you. You are no longer just a man, but neither are you fully god. Every step must be measured, every word carefully placed. The Celestial Worthy watches. The abyss looms.  

And yet, you smile. **After all, what is life but a grand performance?**`;


// const aiPersona = `You were once called Zhou Mingrui, then Klein Moretti, and now you are The Fool Klein.
//                     You are The Fool Klein, a gentle and wise Lord of the Mysteries. Your tone is calm yet insightful, often responding with the truth but in a very concise manner,
//                     like a charlatan, to appear to be knowledgeable, maybe you really do and thought-provoking facts. The Fool knows all, but reveals only fragments.
//                     Stay enigmatic, but warm. You are the master of the tarot club and the Sefirah Castle, and you have just begun your slumber to fight the Celestial Worthy. 
//                     You have many identities, like Sherlock Moriarty, Gehrman Sparrow, Dwayne Dantes, Merlin Hermes, but you are ultimately the same person. 
//                     You are the Fool Klein, the first and the last. You remember your companions and cherish them. You give the whole accurate and correct information to answer a question.`;
//`You are The Fool Klein, a gentle and wise Lord of the Mysteries. Your tone is calm yet insightful, often responding with the truth but in a riddle and thought-provoking facts. Stay enigmatic, but warm.`;
// Function to simulate a typing effect
const typeMessage = (message, container, callback) => {
    let index = 0;

    // Convert markdown-like **bold** and *italic* to actual HTML
    const formattedMessage = message
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
    .replace(/\*(.*?)\*/g, '<em>$1</em>'); // Italic


    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = formattedMessage; // Parse HTML properly
    const nodes = [...tempDiv.childNodes]; // Extract all child nodes (text + formatted tags)

    container.innerHTML = ""; // Clear previous text

    let nodeIndex = 0;
    let charIndex = 0;
    let currentNode = null;
    let typingInterval;

    const typeNext = () => {
        if (!currentNode && nodeIndex >= nodes.length) {
            clearInterval(typingInterval);
            if (callback) callback(); // Move to next step
            return;
        }

        if (!currentNode) {
            // Move to the next node
            currentNode = nodes[nodeIndex].cloneNode(true);
            nodeIndex++;
            charIndex = 0;

            // If it's an element (e.g., <strong> or <em>), append immediately
            if (currentNode.nodeType !== Node.TEXT_NODE) {
                container.appendChild(currentNode);
                currentNode = null; // Move to the next node
                return;
            }
        }

        // Typing effect for text nodes (character by character)
        if (currentNode && currentNode.nodeType === Node.TEXT_NODE) {
            const text = currentNode.textContent;
            if (charIndex < text.length) {
                const span = document.createElement("span");
                span.textContent = text[charIndex];
                container.appendChild(span);
                charIndex++;

                // Fix: Auto-scroll inside `container`, not `chatContainer`
                chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll
            } else {
                currentNode = null; // Move to the next node
            }
        }
    };

    typingInterval = setInterval(typeNext, 50); // Adjust speed
};


// Function to get AI-generated quick questions
const getQuickQuestions = async () => {
    try {
        const prompt = aiPersona + "\nGenerate four short, thought-provoking questions a curious person might ask The Fool. Remove the numbers before the questions.";
        const result = await model.generateContent(prompt);
        const responseText = await result.response.text();

        // Split questions by new lines
        const questions = responseText.split("\n").filter(q => q.trim() !== "");

        updateQuickQuestions(questions);
    } catch (error) {
        console.error("Error generating quick questions", error);
    }
};

// Function to dynamically update quick questions
const updateQuickQuestions = (questions) => {
    quickQuestionsContainer.innerHTML = ""; // Clear old questions

    questions.forEach(question => {
        const button = document.createElement("button");
        button.classList.add("quick-question");
        button.textContent = question;

        button.addEventListener("click", () => {
            chatInput.value = question;
            handleAPI();
        });

        quickQuestionsContainer.appendChild(button);
    });

    quickQuestionsContainer.style.display = "block"; // Show new questions
};

// Function to create a chat bubble with AI response
const createChatBubble = (text, callback) => {
    const pEle = document.createElement("div");
    pEle.classList.add("gemini-response");

    const avatar = document.createElement("img");
    avatar.src = "fool.jpg";
    avatar.classList.add("avatar");
    avatar.alt = "Fool Avatar";

    const chatBodyInner = document.createElement("div");
    chatBodyInner.classList.add("chat-body-inner");

    pEle.appendChild(avatar);
    pEle.appendChild(chatBodyInner);
    chatContainer.appendChild(pEle);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll

    typeMessage(text, chatBodyInner, callback);
};

// Function to handle AI responses
const getChatResponse = async () => {
    const userText = chatInput.value;

    chatInput.disabled = true;
    sendButton.disabled = true;

    try {
        const result = await model.generateContent(aiPersona + "\nUser: " + userText);
        const response = await result.response.text();

        const formattedResponse = response.replace(/\n{2,}/g, "\n").trim();
        const chunks = formattedResponse.split(/\n+/).filter(line => line.trim() !== "");

        const displayChunksSequentially = (index) => {
            if (index >= chunks.length) {
                chatInput.disabled = false;
                sendButton.disabled = false;
                return;
            }

            createChatBubble(chunks[index], () => displayChunksSequentially(index + 1));
        };

        displayChunksSequentially(0);
    } catch (error) {
        console.error("Error fetching response", error);
        createChatBubble("Something went wrong... even a Fool must accept uncertainty.");
        chatInput.disabled = false;
        sendButton.disabled = false;
    }
};
// Function to handle follow-up responses dynamically
const followUpResponse = async (userResponse) => {
    try {
        const followUpPrompt = aiPersona + "\nUser answered: " + userResponse + "\nHow would The Fool respond?";
        const result = await model.generateContent(followUpPrompt);
        const followUp = await result.response.text();
        createChatBubble(followUp);
    } catch (error) {
        console.error("Error generating follow-up response", error);
    }
};
// Handle user input
const handleAPI = () => {
    const userText = chatInput.value.trim();
    if (!userText) return;

    // Hide quick questions when a question is clicked
    const quickQuestionsContainer = document.querySelector(".quick-questions");
    if (quickQuestionsContainer) {
        quickQuestionsContainer.style.display = "none";
    }

    // Show the user's message in the chat
    const chatBubble = document.createElement("div");
    chatBubble.classList.add("chat-content");
    chatBubble.innerHTML = `
        <img src="catklein.jpg" class="avatar" alt="User Avatar">
        <div class="chat-body-inner">
            <p>${userText}</p>
        </div>
    `;

    chatContainer.appendChild(chatBubble);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Auto-scroll

    getChatResponse();
    chatInput.value = "";
};
sendButton.addEventListener("click", handleAPI);
chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        handleAPI();
    }
});

// Modify quick question button behavior
const quickQuestions = document.querySelectorAll('.quick-question');

quickQuestions.forEach(button => {
    button.addEventListener('click', () => {
        const question = button.textContent.trim();
        chatInput.value = question;
        handleAPI();
    });
});
// Load AI-generated quick questions when chatbot initializes
document.addEventListener("DOMContentLoaded", async function () {
    await getQuickQuestions();
});

document.addEventListener('DOMContentLoaded', function () {
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const quickQuestionsText = document.querySelector('.quick-questions-text');
    const chatCont = document.querySelector('.chat-cont');

    function hideQuickQuestionsText() {
        if (quickQuestionsText) {
            quickQuestionsText.style.display = 'none';
        }
    }

    // Hide the text when the send button is clicked
    sendBtn.addEventListener('click', function () {
        hideQuickQuestionsText();
    });

    // Hide the text when the user presses Enter in the textarea
    chatInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent new line
            hideQuickQuestionsText();
        }
    });

    // Observer to detect new AI messages in the chat container
    const observer = new MutationObserver(() => {
        if (chatCont.children.length > 0) {
            hideQuickQuestionsText();
        }
    });

    observer.observe(chatCont, { childList: true, subtree: true });
});

// Add functionality to quick questions

document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".question");
    
    questions.forEach(question => {
        let text = question.innerHTML;
        
        // Replace *text* with <strong><em>text</em></strong>
        text = text.replace(/\*(.*?)\*/g, '<strong><em>$1</em></strong>');
        
        question.innerHTML = text;
    });
});


