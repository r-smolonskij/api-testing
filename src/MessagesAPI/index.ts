import { ApiService } from '../ApiService/index.js';
import {
  GetMessageQuery,
  GetMessagesQuery,
  SendMessageModel,
  SendReplyModel,
} from './types.js';

export class MessagesAPI {
  private apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  setApiService(apiService: ApiService) {
    this.apiService = apiService;
  }

  getApiService = () => {
    return this.apiService;
  };

  getMessages = async (query?: GetMessagesQuery) => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET('/api/Messages', { params: { query } });

      return data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return error;
    }
  };

  sendMessage = async (body: SendMessageModel) => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .POST('/api/Messages', { body });

      return data;
    } catch (error) {
      console.error('Error sending a message:', error);
      return error;
    }
  };

  getMessage = async (id: number, query?: GetMessageQuery) => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET('/api/Messages/{id}', {
          params: {
            path: { id },
            query,
          },
        });

      return data;
    } catch (error) {
      console.error('Error fetching message:', error);
      return error;
    }
  };

  sendReply = async (messageId: number, body: SendReplyModel) => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .POST('/api/Messages/{messageID}/reply', {
          params: { path: { messageID: messageId } },
          body,
        });

      return data;
    } catch (error) {
      console.error('Error sending a reply:', error);
      return error;
    }
  };

  getMessageRecipients = async (messageId: number) => {
    try {
      const { data } = await this.apiService
        .getOpenApiClient()
        .GET('/api/Messages/{messageID}/recipients', {
          params: { path: { messageID: messageId } },
        });

      return data;
    } catch (error) {
      console.error('Error fetching message recipients:', error);
      return error;
    }
  };
}
