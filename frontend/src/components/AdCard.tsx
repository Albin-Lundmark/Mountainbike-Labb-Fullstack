import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Grid
} from '@mui/material'
import { Link } from 'react-router-dom'

interface ProductCardProps {
  title: string
  description: string
  imageUrl: string
  buttonText: string
  reverse: boolean
}

const AdCard: React.FC<ProductCardProps> = ({
  title,
  description,
  imageUrl,
  buttonText,
  reverse
}) => {
  return (
    <Card sx={{ maxWidth: '80vw' }}>
      <Grid
        container
        direction={reverse ? 'row-reverse' : 'row'}
        alignItems='center'
      >
        <Grid item xs={12} md={8}>
          <CardMedia
            component='img'
            image={imageUrl}
            alt={title}
            sx={{ height: '140' }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {title}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small' component={Link} to={'/products'}>
              {buttonText}
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  )
}

export default AdCard
