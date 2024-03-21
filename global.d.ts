import { messages } from './messages/es';

const messagesJson = JSON.stringify(messages);

type Messages = typeof messagesJson;
declare interface IntlMessages extends Messages { }