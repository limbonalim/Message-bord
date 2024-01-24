import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import FormatDate from '../UI/FormatDate/FormatDate.ts';
import {BASE_URL} from '../../constants.ts';
import { IMessage } from '../../types';

type Props = Omit<IMessage, 'id'>;

const Message: React.FC<Props> = ({message, dateTime, author, image}) => {
  let imageItem = null;

  if (image) {
    imageItem = (
      <CardMedia
        sx={{height: 140}}
        image={BASE_URL + '/' + image}
        title={author ? author : message}
      />
    );
  }

  return (
    <Card sx={{maxWidth: 345}}>
      <CardActionArea>
        {imageItem}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {author? author : 'Anonymous'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
          <Typography gutterBottom component="div">
            {new FormatDate(dateTime).getFormatDate()}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>

  );
};

export default Message;