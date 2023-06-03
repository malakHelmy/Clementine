var socket;
document.addEventListener("DOMContentLoaded", function () {
  socket = io();
});


// Chat window toggling
function toggleChatWindow() {
    var chatWindow = document.getElementById("chat-window");
    chatWindow.classList.toggle("active");
}

// Send message
function sendMessage() {
    var messageInput = document.getElementById("chat-input");
    var message = messageInput.value.trim();
    if (message !== "") {
      // Emit the "chat message" event to the server
      socket.emit("chat message", message);
  
      // Create a new message element
      var newMessage = document.createElement("div");
      newMessage.classList.add("message", "sent");
      newMessage.innerText = message;
  
      // Append the message to the chat body
      var chatBody = document.getElementById("chat-body");
      chatBody.appendChild(newMessage);
  
      // Clear the message input
      messageInput.value = "";
    }
  }
  
  

// Receive message
socket.on("chat message", function (message) {
    var chatBody = document.getElementById("chat-body");
    var newMessage = document.createElement("div");
    newMessage.className = "message received";
    newMessage.innerText = message;
    chatBody.appendChild(newMessage);
});
