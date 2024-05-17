import { useEffect, useState } from 'react'
import './App.css'

interface Product {
  id: number
  name: string
  description: string
  image: string
}

function App() {
  const [products, setProducts] = useState<Product[]>()

  useEffect(() => {
    fetch('http://localhost:8080/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
      })
  }, [])

  return (
    <div>
      <h1>Products</h1>
      {products && (
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
      )}
    </div>
  )
}

export default App
