export class InquiriesModel {
  async getChatRooms () {
    try {
      const res = await fetch('https://localhost:7109/api/ChatRoom/GetChatRooms');
      if (!res.ok) return [];
      return await res.json();
    } catch (error) {
      return [];
    }
  }

  async getConversations (id) {
    try {
      const res = await fetch(`https://localhost:7109/api/Conversation/GetConversationsByChatRoomId/${id}`);
      if (!res.ok) return [];
      return await res.json();
    } catch (error) {
      return [];
    }
  }

  async createConversation (conversation) {
    try {
      const res = await fetch('https://localhost:7109/api/Conversation/CreateConversation', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(conversation)
      })

      if (!res.ok) throw new Error(`Status Response: ${res.status}`);

      return await res.json();
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  }
}