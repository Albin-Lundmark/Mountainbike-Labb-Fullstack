import { Box, Typography } from '@mui/material'

const About: React.FC = () => {
  return (
    <Box mx={3} sx={{ marginTop: '18vh' }}>
      <Typography variant='h1'>About</Typography>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae
        sequi, perferendis sint quaerat harum officia minima repudiandae
        blanditiis eveniet quidem, quibusdam doloribus a optio voluptate animi
        et non deserunt aliquid!
      </p>
    </Box>
  )
}

export default About
