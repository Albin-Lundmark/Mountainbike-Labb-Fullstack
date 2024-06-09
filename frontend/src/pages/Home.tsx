import { Grid } from '@mui/material'
import Hero from '../components/Hero'
import AdCard from '../components/AdCard'

const products = [
  {
    title: 'Crosscountry',
    description: `Maximize your speed and endurance with our Cross-Country bikes. Engineered for efficiency on long rides and varied terrain, these bikes are perfect for those who seek adventure and performance on every ride. Embrace the thrill of exploration and go the distance with ease.`,
    imageUrl:
      'https://images.unsplash.com/photo-1531578001713-f79d396f134f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    buttonText: 'Go check out our bikes!'
  },
  {
    title: 'Enduro',
    description: `Conquer both uphill and downhill with our Enduro bikes, designed to handle extended and rugged terrain. Whether it's technical trails or steep descents, these bikes offer stability and control in all conditions. Ride with confidence and take on any adventure with unmatched durability.`,
    imageUrl:
      'https://images.unsplash.com/photo-1458372810370-daad23adb565?q=80&w=1930&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    buttonText: 'Go check out our bikes!'
  },
  {
    title: 'Trail',
    description: `Discover the joy of versatile riding with our Trail bikes, ideal for a mix of climbs and descents. Built for adaptability, these bikes provide the perfect balance of performance and comfort on any trail. Enjoy every ride with smooth handling and responsive design.`,
    imageUrl:
      'https://images.unsplash.com/photo-1572854874809-932a6a2361fd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    buttonText: 'Go check out our bikes!'
  },
  {
    title: 'Freeride',
    description: `Experience boundless adrenaline with our Freeride bikes. Perfect for tackling the most challenging descents and performing spectacular jumps, these bikes give you the freedom to explore terrain your way. Push your limits and redefine what's possible on the trails.`,
    imageUrl:
      'https://images.unsplash.com/photo-1572852066176-6a955f944917?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    buttonText: 'Go check out our bikes!'
  }
]

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        maxWidth='1300px'
        mt={1}
        spacing={4}
        sx={{ mx: 'auto' }}
      >
        {products.map((product, index) => (
          <Grid justifyContent='center' item key={index} xs={12} mx={1}>
            <AdCard
              title={product.title}
              description={product.description}
              imageUrl={product.imageUrl}
              buttonText={product.buttonText}
              reverse={index % 2 !== 0}
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Home
