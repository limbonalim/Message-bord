import express from 'express';
import {imagesUpload} from './multer';
import {randomUUID} from 'crypto';
import {createMessage, getMessage} from './fileBD';
import cors from 'cors'
import {IMessage} from './types'

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(cors());

app.post('/', imagesUpload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.message) {
      return res.status(400).send({error: 'Message must be present in the request'});
    }

    const message: IMessage = {
      id: randomUUID(),
      dateTime: new Date().toISOString(),
      author: req.body.author? req.body.author : null,
      message: req.body.message,
      image: req.file ? `images/${req.file.filename}` : null
    };
    void createMessage(message);
    return res.status(201).send(message);
  } catch (e) {
    next(e);
  }
});


app.get('/', async (req, res, next) => {
  try {
    res.send(await getMessage());
  } catch (e) {
    next(e);
  }
});

app.listen(port, () => {
  console.log(`Server started on ${port} port!`);
});
