import { useEffect, useState } from 'react'
import { getRedditUrl, fetchData } from './util'
import PostDataWrapper from './PostDataWrapper.jsx'
import AddFeed from './AddFeed.jsx'

export default function RedditClient() {
  const [postData, setPostData] = useState(null)

  useEffect(() => {
    fetchData(getRedditUrl())
      .then((json) => {
        console.log('Fetched json:', json)
        setPostData(json)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  return (
    <div>
      <h1>Reddit Client</h1>
      <AddFeed />
      <PostDataWrapper postData={postData} />
    </div>
  )
}
