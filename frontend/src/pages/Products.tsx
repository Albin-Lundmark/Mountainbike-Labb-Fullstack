import { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import styled from 'styled-components'
import axios from 'axios'

interface Product {
  id: number
  name: string
  description: string
  image: string
}

const Products: React.FC = () => {
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
        <div>
          {products.map((product, index) => (
            <ProductCard
              key={index}
              name={product.name}
              image={product.image}
              description={product.description}
            />
          ))}
        </div>
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
