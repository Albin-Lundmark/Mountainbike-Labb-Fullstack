import logo from '/logo/Mountainbikers-logo.png'
import styled from 'styled-components'

const Logo: React.FC = () => {
  return (
    <Div>
      <img src={logo} alt='Mountainbikers Logotype' />
      <p>Mountainbikers</p>
    </Div>
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
