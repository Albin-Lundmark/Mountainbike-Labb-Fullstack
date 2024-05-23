import logo from '/logo/Mountainbikers-logo.png'

const Logo: React.FC = () => {
  return (
    <img
      src={logo}
      alt='Mountainbikers Logotype'
      style={{ width: '3rem', height: 'auto' }}
    />
  )
}

export default Logo
