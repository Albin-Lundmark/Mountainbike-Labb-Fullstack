import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { Grid, Box, Chip } from '@mui/material'
import styled from 'styled-components'
import axios from 'axios'

interface Product {
  id: number
  name: string
  description: string
  image: string
  price: number
  category_id: number
}

interface Category {
  id: number
  name: string
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<number[]>([])

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>(
        'http://localhost:8080/categories'
      )
      setCategories(response.data)
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  const fetchProducts = async () => {
    try {
      const query = selectedCategories.length
        ? `?categories=${selectedCategories.join(',')}`
        : ''
      const response = await axios.get<Product[]>(
        `http://localhost:8080/products${query}`
      )
      setProducts(response.data)
      setLoading(false)
    } catch (err) {
      setError(`Error fetching data: ${err}`)
      setLoading(false)
      console.error(err)
    }
  }

  const handleSelCat = (categoryId: number) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [selectedCategories])

  if (loading) {
    return (
      <Div>
        <h1>Loading...</h1>
      </Div>
    )
  }

  if (error) {
    return (
      <Div>
        <h1>{error}</h1>
      </Div>
    )
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {categories.map(category => (
          <Chip
            key={category.id}
            label={
              category.name.charAt(0).toUpperCase() + category.name.slice(1)
            }
            onClick={() => handleSelCat(category.id)}
            variant={
              selectedCategories.includes(category.id) ? 'outlined' : 'filled'
            }
            color={
              selectedCategories.includes(category.id) ? 'primary' : 'default'
            }
            sx={{
              fontSize: '1rem',
              cursor: 'pointer',
              marginRight: 1,
              marginTop: 1
            }}
          />
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: 2
        }}
      >
        {products ? (
          <Grid container spacing={2} sx={{ maxWidth: 1300 }}>
            {products.map(product => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  price={product.price}
                  description={product.description}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Div>
            <h1>{error}</h1>
          </Div>
        )}
      </Box>
    </>
  )
}

export default Products

const Div = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: 1fr;
  margin: 1rem;

  @media (min-width: 768px) {
    //Tablet
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    //Desktop
    grid-template-columns: repeat(3, 1fr);
  }
`
