export interface ChatObject {
  id: string;
  sender: string;
  receiver: string;
  message: string;
  media: boolean;
  timestamp: string | Date;
  status: string;
}
