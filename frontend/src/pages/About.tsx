import { Box, Grid, Typography, Card, CardMedia } from '@mui/material'

interface AboutSection {
  title: string
  description: string
  imageUrl: string
  alt: string
}

const aboutSections: AboutSection[] = [
  {
    title: 'Welcome to Mountainbikers!',
    description:
      "We are passionate cyclists who love helping our customers find the perfect bike and gear for their adventures. Here at Mountainbikers, we're more than just a store - we're a destination for cycling enthusiasts and adventurers alike.",
    imageUrl:
      'https://images.unsplash.com/photo-1511900195190-e4aeb22514ed?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'One of our sponsored riders after a race'
  },
  {
    title: 'Our History',
    description:
      'Mountainbikers was founded by two friends with a passion for cycling and adventure. We started as a small shop in a garage and have since grown into one of the leading bike shops in our region. Our journey has been filled with exciting challenges and amazing encounters with like-minded cyclists.',
    imageUrl:
      'https://images.unsplash.com/photo-1650841118191-0b9bcf35c50a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Our two founders in the woods building a trail'
  },
  {
    title: 'Our Team',
    description:
      "We are a team of experienced cycling enthusiasts who are dedicated to sharing our knowledge and passion for cycling with our customers. Whether you're a beginner or experienced rider, our goal is to provide you with the best possible experience and help you find the right bike and gear for your needs.",
    imageUrl:
      'https://images.unsplash.com/photo-1508789454646-bef72439f197?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Man exploring the beauty we call nature'
  },
  {
    title: 'Visit Us',
    description:
      'Come and visit our store to experience the world of cycling up close. We look forward to welcoming you and helping you discover exciting cycling adventures!',
    imageUrl:
      'https://images.unsplash.com/photo-1634801935518-c8fa8e19cf82?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Ride or die!'
  }
]

const About: React.FC = () => {
  return (
    <Box
      mx={4}
      sx={{
        marginTop: {
          xs: '14vh',
          sm: '17vh',
          md: '17vh',
          lg: '18vh',
          xl: '18vh'
        }
      }}
    >
      <Box my={4}>
        {aboutSections.map((section, index) => (
          <Grid
            key={index}
            container
            spacing={4}
            direction={{
              xs: 'column',
              md: index % 2 === 0 ? 'row' : 'row-reverse'
            }}
            alignItems='center'
          >
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                  component='img'
                  height='380'
                  image={section.imageUrl}
                  alt={section.alt}
                />
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                textAlign={{
                  xs: 'center',
                  md: 'left'
                }}
              >
                <Typography
                  textAlign={{ md: 'center' }}
                  variant='h5'
                  gutterBottom
                >
                  {section.title}
                </Typography>
                <Typography variant='body1' paragraph>
                  {section.description}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  )
}

export default About
