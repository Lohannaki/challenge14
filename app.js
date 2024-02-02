"use strict";

const User = function (name) {
  this.name = name;
};

const Conversation = function() {
  this.users = []; 
  this.messages = []; 
}; 

const Message = function (user, content) {
  this.content = content; 
  this.user = user; 
};

Conversation.prototype.addUsers = function (users) {
  if(!Array.isArray(users)) throw new Error(`Argument must be an array`); 
  users.forEach(user => {
    if(user instanceof User && !this.users.includes(user)){
      this.users.push(user); 
      console.log(`Added ${user.name} to conversation`); 
    } else { 
      throw new Error(`User could not be added to conversation`); 
    }
  });
  return this; 
};

User.prototype.sendMessage = function (conversation, content){
  if (!conversation.users.includes(this)) throw new Error(`STOP INTRUDER`); 
  
  const message = new Message(this, content); 
  conversation.messages.push(message); 
  message.display(); 
  return this; 
}; 

Message.prototype.display = function () {
  const className = this.user === currentUser ? "from-me" : "from-them"; 
  const html = `
  <div>
    <span class=${className}>${this.user.name}</span>
    <p class=${className}>${this.content}</p>
  </div>`; 

  document.querySelector(".conversation").insertAdjacentHTML("beforeend", html); 
}; 

const anna = new User("Anna");
const bijan = new User("Bijan"); 
const maman = new User("Maman"); 
const currentUser = anna; 

const conversation = new Conversation();
conversation.addUsers([anna, bijan]); 

anna.sendMessage(conversation, "coucou loulou"); 



