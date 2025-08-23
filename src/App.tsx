import { Toaster } from 'react-hot-toast'
import './App.css'
import Router from './routes/routes'

function App() {

  return (
    <>
      <Router></Router>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{
          top: 30,
          bottom: 20,
          right: 30,
        }}
      />
    </>
  )
}

export default App
