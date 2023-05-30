import React from 'react'
import '../utils/Global.css'

const App = ({Component,pageProps}) => {
  return <Component {...pageProps} />
}

export default App