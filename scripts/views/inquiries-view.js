export class InquiriesView {
  constructor () {
    this.chatList = document.querySelector('.chat-list');
    this.chatSection = document.querySelector('.js-chat-section');
    this.chatFooter = document.querySelector('.chat-footer');
  }

  async renderChatList (chatRooms) {
    this.chatList.innerHTML = '';

    chatRooms.forEach(cr => {
      const div = document.createElement('div');
      div.className = 'border p-3 shadow-sm mb-3';
      div.style.borderRadius = '50px';

      div.addEventListener('click', () => {
        location.href = `../../admin-pages/inquiries.html?id=${cr.id}&name=${cr.clientName}`;
      })

      const initial = document.createElement('span');
      initial.className = 'border text-light bg-primary me-2'
      initial.style = "border-radius: 100%; padding: 10px 16px;"
      initial.innerText = cr.clientName[0];

      const name = document.createElement('span');
      name.innerText = cr.clientName;

      div.appendChild(initial);
      div.appendChild(name);

      this.chatList.appendChild(div);
    })
  }

  createContainer (className, style) {
    const div = document.createElement('div');
    div.className = className || "";
    div.style = style || "";
    return div;
  }

  createSpan (className, style, value) {
    const span = document.createElement('span');
    span.className = className || "";
    span.style = style || "";
    span.innerText = value;
    return span;
  }

  async renderConversations (conversations, clientName, callback) {
    this.chatSection.innerHTML = '';

    // Chat Header
    const header = this.createContainer('border py-4 px-3', '');
    const headerInitial = this.createSpan('border text-light bg-primary me-2', 'border-radius: 100%; padding: 10px 16px;', clientName[0]);
    const headerClientName = this.createSpan('', '', clientName)
    header.appendChild(headerInitial);
    header.appendChild(headerClientName);

    this.chatSection.appendChild(header);

    // Chat Body
    const body = this.createContainer('border p-3 overflow-auto shadow-sm d-flex flex-column-reverse', 'height: 400px;');

    if (conversations.length == 0) {
      const noChatHistory = document.createElement('p');
      noChatHistory.innerText = 'No Chat History';
      noChatHistory.className = 'text-center text-secondary'

      body.appendChild(noChatHistory);
    }

    else {
      conversations.forEach(c => {
        const chatContainer = this.createContainer('p-3 d-flex align-items-center', '');
        chatContainer.classList.add(c.senderId != 16 ? "justify-content-start" : "justify-content-end");
        
        if (c.senderId != 16) {
          const chatInitial = this.createSpan('fs-2 bg-primary px-3 py-1 text-light me-3', 'border-radius: 100%;', clientName[0])

          chatContainer.appendChild(chatInitial);

          const textContentContainer = this.createContainer('d-flex flex-column', 'width: 45%;');
          const textContent = this.createSpan('border shadow-sm p-3 rounded', '', c.content);
          const sentAt = this.createSpan('text-end mt-2', '', `${this.formatDate (c.sentAt)}`);

          textContentContainer.appendChild(textContent);
          textContentContainer.appendChild(sentAt);

          chatContainer.appendChild(textContentContainer);
        }
        else {
          const textContentContainer = this.createContainer('d-flex flex-column align', 'width: 45%;');
          const textContent = this.createSpan('border shadow-sm p-3 rounded', '', c.content);
          const sentAt = this.createSpan('mt-2', '', `${this.formatDate (c.sentAt)}`);

          textContentContainer.appendChild(textContent);
          textContentContainer.appendChild(sentAt);

          chatContainer.appendChild(textContentContainer);

          const chatInitial = this.createSpan('fs-2 bg-primary px-3 py-1 text-light ms-3', 'border-radius: 100%;', 'A')

          chatContainer.appendChild(chatInitial);
        }

        body.appendChild(chatContainer);
      })
    }
    
    this.chatSection.appendChild(body);
  }

  async renderFooter (callback) {
    this.chatFooter.innerHTML = '';
    // Chat Footer
    const footer = this.createContainer('chat-footer border p-3 d-flex', '');

    const textContent = document.createElement('textarea');
    textContent.className = 'form-control me-3';
    textContent.placeholder = 'Enter a message';
    textContent.style = 'width: 95%; resize: none;';

    const sendButton = document.createElement('i');
    sendButton.className = 'bi bi-arrow-right-circle fs-1 text-primary';

    sendButton.addEventListener('click', () => {
      callback(textContent.value)
      textContent.value = '';
    })

    footer.appendChild(textContent);
    footer.appendChild(sendButton);

    this.chatFooter.appendChild(footer);
  }

  formatDate (isoString) {
    const date = new Date(isoString);

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'P.M.' : 'A.M.';
    hours = hours % 12;
    hours = hours ? hours : 12;

    const formatted = `Sent on ${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

    return formatted;
  }
}