import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import FormatDate from '../UI/FormatDate/FormatDate.ts';

interface Props {
  message: string;
  dateTime: string;
  author: string | null;
  image: string | null;
}

const Message: React.FC<Props> = ({message, dateTime, author, image}) => {
  let authorItem = null;
  let imageItem = null;
  if (author) {
    authorItem = (
      <Typography gutterBottom variant="h5" component="div">
        {author}
      </Typography>
    );
  }
  if (image) {
    imageItem = (
      <CardMedia
        sx={{height: 140}}
        image={image}
        title={author ? author : message}
      />
    );
  }

  return (
    <Card sx={{maxWidth: 345}}>
      <CardActionArea>
        {imageItem}
        <CardContent>
          {authorItem}
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