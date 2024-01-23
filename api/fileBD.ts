import {promises as fs} from 'fs';
import path from 'path';
import config from './config';
import {IMessage} from './types';

export const createMessage = async (message: IMessage) => {
  await fs.mkdir(config.bd, {recursive: true});
  await fs.writeFile(path.join(config.bd, `${message.dateTime}.json`), JSON.stringify(message));
};

export const getMessage = async () => {
  const arrOfFiles = await fs.readdir(config.bd);
  return await Promise.all(arrOfFiles.map(async (file) => {
    const content = await fs.readFile(path.join(config.bd, file));
    return JSON.parse(content.toString());
  }));
};