import { useEffect } from 'react'
import { getRedditUrl, fetchData } from './util'

export default function RedditClient() {
  useEffect(() => {
    fetchData(getRedditUrl()).then((json) => {
      console.log('json:', json)
    })
  }, [])
  return (
    <div>
      <h1>Reddit Client</h1>
    </div>
  )
}
