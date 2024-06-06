import logo from '/logo/Mountainbikers-logo.png'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Typography } from '@mui/material'

const Logo: React.FC = () => {
  return (
    <Link to={'/home'} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Div>
        <img src={logo} alt='Mountainbikers Logotype' />
        <Typography color='text.primary' fontSize={10}>
          Mountainbikers
        </Typography>
      </Div>
    </Link>
  )
}

export default Logo

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 5rem;
    margin-top: 1vh;
  }
  @media (max-width: 640px) {
    img {
      width: 4rem;
    }
  }
`
