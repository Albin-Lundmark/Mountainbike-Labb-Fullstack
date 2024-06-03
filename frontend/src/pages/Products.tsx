import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { Grid, Box, FormControlLabel } from '@mui/material'
import styled from 'styled-components'
import axios from 'axios'

interface Product {
  id: number
  name: string
  description: string
  image: string
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
        {categories &&
          categories.map(category => (
            <FormControlLabel
              key={category.id}
              control={
                <HiddenCheckbox
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleSelCat(category.id)}
                />
              }
              label={
                <Label
                  selected={selectedCategories.includes(category.id)}
                  onClick={() => handleSelCat(category.id)}
                >
                  {category.name}
                </Label>
              }
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
            {products.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ProductCard
                  name={product.name}
                  image={product.image}
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

const HiddenCheckbox = styled.input`
  display: none;
`

const Label = styled.span<{ selected: boolean }>`
  cursor: pointer;
  color: ${({ selected }) => (selected ? 'blue' : 'white')};
`
