import { Component } from 'react'
import RedditClient from './RedditClient.jsx'
import './app.styles.scss'

class App extends Component {
  render() {
    return (
      <div>
        <RedditClient />
      </div>
    )
  }
}

export default App
