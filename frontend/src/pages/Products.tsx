import { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from '@mui/material'
import axios from 'axios'

interface Product {
  id: number
  name: string
  description: string
  image: string
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(
        'http://localhost:8080/products'
      )
      setProducts(response.data)
      setLoading(false)
      console.log(products)
    } catch (err) {
      setError(`Error fetching data: ${err}`)
      setLoading(false)
      console.error(err)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <Div>
      {products ? (
        <ul>
          {products.map(
            (product: {
              id: number
              name: string
              description: string
              image: string
            }) => (
              <Li key={product.id}>
                <Card key={product.id} sx={{ maxWidth: 500 }}>
                  <CardMedia
                    component='img'
                    alt={`Picture of ${product.name}`}
                    height='260'
                    image={product.image}
                  />
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      {product.name}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      {product.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size='small'>Share</Button>
                    <Button size='small'>Learn More</Button>
                  </CardActions>
                </Card>
              </Li>
            )
          )}
        </ul>
      ) : (
        error
      )}
    </Div>
  )
}

export default Products

const Div = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr;
`
const Li = styled.li`
  list-style: none;
`
