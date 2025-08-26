export class InquiriesContr {
  constructor (model, view, client) {
    this.model = model;
    this.view = view;
    this.clientId = client.userId;
    this.clientName = client.name;
  }

  async init () {
    const requiredIds = {clientId: this.clientId, adminId: 16};

    const isChatRoomExist = await this.model.isChatRoomExist(requiredIds);
    await this.view.renderChatRoom(isChatRoomExist);

    await this.view.createChatRoom(async (isClicked) => {
      if (isClicked) {
        const result = await this.model.createChatRoom(requiredIds);
        
        if (result) {
          const updatedChatRoomExist = await this.model.isChatRoomExist(requiredIds);
          await this.view.renderChatRoom(updatedChatRoomExist);
        }
      }
    });

    const chatRoomId = await this.model.fetchChatRoomId(requiredIds);

    const conversations = await this.model.fetchConversations(chatRoomId);
    
    await this.view.renderConversations (conversations, this.clientName)

    await this.view.renderChatFooter(async (textContent) => {
      if (textContent === '') return;

      const conversation = {chatRoomId: chatRoomId, senderId: this.clientId, content: textContent};

      const result = await this.model.createConversation(conversation);

      console.log(result);

      if (result) {
        const updatedConversation = await this.model.fetchConversations(chatRoomId);    
        await this.view.renderConversations (updatedConversation, this.clientName);
      }
    })
  }
}