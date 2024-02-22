import { Routes, Route } from 'react-router-dom'
import PageLayout from './components/PageLayout/PageLayout'
import Main from './pages/Main/Main'

function App() {

  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path='/' element={<Main />}>
        </Route>  
      </Route>
    </Routes>
  )
}

export default App
