import { Container, Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { pageLayout } from '../../constants/images'

const {backgroundImage} = pageLayout;

const backgroundStyles = {
  height: '100vh',
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
}

function PageLayout() {

  return (
    <Container maxWidth={false} disableGutters sx={{margin: 0, overflow: 'hidden'}}>
      <div style={backgroundStyles}>
        <Stack sx={{display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
          <Outlet />
        </Stack>
      </div>
    </Container>
  )
}

export default PageLayout