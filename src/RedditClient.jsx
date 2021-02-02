import { useEffect, useState } from 'react'
import { getRedditUrl, fetchData } from './util'
import PostDataWrapper from './PostDataWrapper.jsx'

export default function RedditClient() {
  const [postData, setPostData] = useState(null)

  useEffect(() => {
    fetchData(getRedditUrl()).then((json) => {
      console.log('Fetched json:', json)
      setPostData(json)
    })
  }, [])
  return (
    <div>
      <h1>Reddit Client</h1>
      <PostDataWrapper postData={postData} />
    </div>
  )
}
