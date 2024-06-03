import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import { Grid, Box, Checkbox, FormControlLabel } from '@mui/material'
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Category[]>('/categories')
        setCategories(response.data)
        console.log(categories)
      } catch (err) {
        console.error('Error fetching categories:', err)
      }
    }

    fetchCategories()
  }, [])

  const handleSelCat = (categoryId: number) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const fetchProducts = async () => {
    try {
      const query = selectedCategories.length
        ? `?categories=${selectedCategories.join(',')}`
        : ''
      const response = await axios.get<Product[]>(`/products${query}`)
      setProducts(response.data)
      setLoading(false)
    } catch (err) {
      setError(`Error fetching data: ${err}`)
      setLoading(false)
      console.error(err)
    }
  }

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
    return <Div>{error}</Div>
  }

  return (
    <>
      <Box>
        {categories.map(category => (
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
          error
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

const HiddenCheckbox = styled(Checkbox)`
  display: none;
  color: yellow;
`

const Label = styled.span<{ selected: boolean }>`
  cursor: pointer;
  color: ${({ selected }) => (selected ? 'blue' : 'black')};
`
