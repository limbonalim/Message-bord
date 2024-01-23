export interface IMessage {
  id: string;
  dateTime: string;
  author: string | null;
  message: string;
  image: string | null;
}