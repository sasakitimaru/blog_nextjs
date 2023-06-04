import React from 'react'
import '../utils/Global.css'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
import '../utils/notion.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'

// // used for collection views (optional)
import 'rc-dropdown/assets/index.css'

// // used for rendering equations (optional)
import 'katex/dist/katex.min.css'

const App = ({Component,pageProps}) => {
  return <Component {...pageProps} />
}

export default App