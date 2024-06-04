import logo from '/logo/Mountainbikers-logo.png'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Logo: React.FC = () => {
  return (
    <Link to={'/home'} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Div>
        <img src={logo} alt='Mountainbikers Logotype' />
        <p>Mountainbikers</p>
      </Div>
    </Link>
  )
}

export default Logo

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 5rem;
    margin-top: 1vh;
    margin-bottom: -2vh;
  }
  p {
    font-size: 0.8rem;
  }
`
