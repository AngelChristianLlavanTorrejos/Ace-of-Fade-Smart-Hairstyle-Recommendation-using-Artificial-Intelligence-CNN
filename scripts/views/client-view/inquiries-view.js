export class InquiriesView {
  constructor () {
    this.getStarted = document.querySelector('#js-get-started');
    this.chat = document.querySelector('#js-chat')

    this.startChatButton = document.querySelector('#js-start-chat-btn');

    this.chatBody = document.querySelector('.js-chat-body');

    this.chatFooter = document.querySelector('.js-chat-footer');
  }

  async renderChatRoom (isChatRoomExist) {
    if (isChatRoomExist) {
      this.getStarted.classList.add('d-none');
      this.chat.style.display = 'block';
    }
  }

  async createChatRoom (callback) {
    this.startChatButton.addEventListener('click', () => callback(true));
  }

  async renderConversations (conversations, clientName) {
    this.chatBody.innerHTML = '';

    let chatHTML = '';

    conversations.forEach(convo => {
      if (convo.senderId == 16) {
        chatHTML += `
          <div class="p-3 d-flex align-items-center">
            <span class="fs-2 bg-primary px-3 py-1 text-light me-3" style="border-radius: 100%;">A</span>

            <div class="d-flex flex-column" style="width: 30%;">
              <span class="border shadow-sm p-3 rounded">
                ${convo.content}
              </span>
              <small class="text-end mt-2">Sent At ${convo.sentAt}</small>
            </div>
          </div>
        `
      }
      else {
        chatHTML += `
          <div class="p-3 d-flex align-items-center justify-content-end">
            <div class="d-flex flex-column" style="width: 30%;">
              <span class="border shadow-sm p-3 rounded">
                ${convo.content}
              </span>
              <small class="mt-2">Sent At ${convo.sentAt}</small>
            </div>
            
            <span class="fs-2 bg-primary px-3 py-1 text-light ms-3" style="border-radius: 100%;">${clientName[0]}</span>
          </div>
        `
      }
    });

    this.chatBody.innerHTML = chatHTML;
  }

  async renderChatFooter (callback) {
    this.chatFooter.innerHTML = '';

    const textContent = document.createElement('textarea');
    textContent.className = 'form-control';
    textContent.placeholder = 'Enter a message';
    textContent.style.width = '97%';

    this.chatFooter.appendChild(textContent);

    const div = document.createElement('div');
    div.style.width = '3%';
    div.className = 'ms-2';

    const i = document.createElement('i');
    i.className = 'bi bi-arrow-right-circle text-primary fs-1';

    i.addEventListener('click', () => {
      callback(textContent.value);
      textContent.value = '';
    })

    div.appendChild(i);

    this.chatFooter.appendChild(div);
  }
}