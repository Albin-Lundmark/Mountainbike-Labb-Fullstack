import { useState, useEffect } from 'react'
import axios from 'axios'

interface Product {
  id: number
  name: string
  description: string
  image: string
}

const ProductCard = () => {
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
      setError('Error fetching data')
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
    <div>
      {products ? (
        <ul>
          {products.map(
            (product: {
              id: number
              name: string
              description: string
              image: string
            }) => (
              <li key={product.id}>
                {product.name}:{product.description}
                <img src={product.image} alt={'Picture of ' + product.name} />
              </li>
            )
          )}
        </ul>
      ) : (
        error
      )}
    </div>
  )
}

export default ProductCard
