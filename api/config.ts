import path from 'path';

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  bd: path.join(rootPath, 'message'),
};

export default config;