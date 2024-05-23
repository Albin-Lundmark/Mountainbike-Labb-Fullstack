import { useState } from 'react'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@mui/material'

interface CardProps {
  name: string
  image: string
  description: string
}

const Max_desc_length = 50

const ProductCard: React.FC<CardProps> = ({ name, image, description }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleDescription = () => {
    setIsExpanded(!isExpanded)
  }

  const truncatedDescription =
    description.length > Max_desc_length
      ? description.slice(0, Max_desc_length) + '...'
      : description

  return (
    <Card sx={{ maxWidth: 380, marginBottom: 1.5, borderRadius: 3 }}>
      <CardMedia component='img' alt={name} height='auto' image={image} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {isExpanded ? description : truncatedDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={toggleDescription} size='small'>
          {isExpanded ? 'Done reading' : 'Read more '}
        </Button>
        <Button size='small'>Add to cart</Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
