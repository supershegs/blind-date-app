/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// Messaging types
export interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
  sender?: {
    id: number;
    username: string;
    profile?: {
      firstname?: string;
      lastname?: string;
      imageUpload?: string;
    }
  };
}

export interface ConversationPreview {
  userId: number;
  username: string;
  profile?: {
    firstname?: string;
    lastname?: string;
    imageUpload?: string;
  };
  lastMessage: string | null;
  lastMessageTime: string;
  unreadCount: number;
  connectionStatus: string;
}

export interface GetConversationResponse {
  success: boolean;
  messages: Message[];
}

export interface GetConversationsResponse {
  success: boolean;
  conversations: ConversationPreview[];
}

export interface SendMessageResponse {
  success: boolean;
  message: string;
  data: Message;
}

export interface UnreadCountResponse {
  success: boolean;
  unreadCount: number;
}

// Date Planning
export interface DatePlan {
  id: number;
  connectionId: number;
  proposerId: number;
  dateTime: string;
  location: string;
  notes?: string | null;
  status: 'proposed' | 'accepted' | 'declined' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface DatePlanResponse {
  success: boolean;
  plan: DatePlan | null;
  message?: string;
}

export interface DatePlanActionResponse {
  success: boolean;
  plan: DatePlan;
  message?: string;
}
