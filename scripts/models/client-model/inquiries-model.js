export class InquiriesModel {
  async isChatRoomExist (chatRoomIds) {
    try {
      const res = await fetch('https://localhost:7109/api/ChatRoom/IsChatRoomExist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(chatRoomIds)
      })

      if (!res.ok) return false;
      return true;
      }
    catch (error) {
      throw new Error(error);
    }
  }

  async createChatRoom (chatRoomIds) {
    try {
      const res = await fetch('https://localhost:7109/api/ChatRoom/CreateChatRoom', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(chatRoomIds)
      })

      if (!res.ok) return false;
      
      return true;
    } catch (error) {
      return false;
    }
  }

  async fetchChatRoomId (chatRoomIds) {
    try {
      const res = await fetch('https://localhost:7109/api/ChatRoom/GetChatRoomId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(chatRoomIds)
      })

      if (!res.ok) return 0;
      return await res.json();
    } catch (error) {
      return 0;
    }
  }

  async fetchConversations (id) {
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