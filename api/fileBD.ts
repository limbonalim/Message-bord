import {promises as fs} from 'fs';
import path from 'path';
import config from './config';
import {IMessage} from './types';

export const createMessage = async (message: IMessage) => {
  await fs.mkdir(config.bd, {recursive: true});
  await fs.writeFile(path.join(config.bd, `${message.dateTime}.json`), JSON.stringify(message));
};