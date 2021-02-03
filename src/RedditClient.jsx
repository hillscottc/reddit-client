import { useEffect, useState } from 'react'
import { getRedditUrl, fetchData } from './util'
import RedditPostWrapper from './RedditPostWrapper.jsx'
import AddFeed from './AddFeed.jsx'

export default function RedditClient() {
  const [postData, setPostData] = useState(null)
  const [favlist, setFavlist] = useState([0])

  useEffect(() => {
    setFavlistFromLocal()
  }, [])

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

  const setFavlistFromLocal = () => {
    const localList = localStorage.getItem('redditFavList')
    try {
      if (localList) {
        console.log(
          'Loading redditFavList list from local, setting to: ',
          localList
        )
        setFavlist(JSON.parse(localList))
      }
    } catch (e) {
      console.warn('Failed to parse localStorage localList:', localList)
    }
  }

  const favlistUpdate = async (id, isAdd = true) => {
    const newWatchlist = isAdd
      ? [...favlist, id]
      : favlist.filter((x) => x !== id)
    if (newWatchlist) {
      setFavlist(newWatchlist)
      localStorage.setItem('redditFavList', JSON.stringify(newWatchlist))
    }
  }

  const doFavlistClick = async (id) => {
    const index = favlist.indexOf(id)
    console.log('index', index)

    // if its already there, remove it, otherwise add it
    if (index > -1) await favlistUpdate(id, false)
    else await favlistUpdate(id)
  }

  return (
    <div className='flex flex-col justify-center content-center items-center '>
      <h1>Reddit Client</h1>
      <AddFeed />
      <RedditPostWrapper postData={postData} />
    </div>
  )
}
