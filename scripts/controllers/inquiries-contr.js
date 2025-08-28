export class InquiriesContr {
  constructor (model, view, convoDetails) {
    this.model = model;
    this.view = view;
    this.convoDetails = convoDetails;
  }

  async init () {
    console.log(this.convoDetails)

    const chatLists = await this.model.getChatRooms();
    await this.view.renderChatList(chatLists);

    const conversations = await this.model.getConversations (this.convoDetails.roomId || 1);
    await this.view.renderConversations (conversations, this.convoDetails.clientName || 'Kaedehara Llavan Kazuha')

    await this.view.renderFooter (async (textContent) => {
      if (textContent === '') {
        return;
      }

      const conversationData = {chatRoomId: this.convoDetails.roomId || 1, senderId: 16, content: textContent};

      const result = await this.model.createConversation(conversationData);
      console.log(result);

      const updatedConversation = await this.model.getConversations (this.convoDetails.roomId || 1);

      await this.view.renderConversations (updatedConversation, this.convoDetails.clientName || 'Kaedehara Llavan Kazuha')
    })
  }
}