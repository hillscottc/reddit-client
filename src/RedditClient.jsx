import { useEffect, useState } from 'react'
import { getRedditUrl, fetchData } from './util'
import RedditPostWrapper from './RedditPostWrapper.jsx'
import AddFeed from './AddFeed.jsx'

export default function RedditClient() {
  const [postData, setPostData] = useState(null)
  const [favlist, setFavlist] = useState([])
  const [feedToAdd, setFeedToAdd] = useState('')

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
        console.log('Loading localstorage redditFavList, set to: ', localList)
        setFavlist(JSON.parse(localList))
      }
    } catch (e) {
      console.warn('Failed to parse localStorage localList:', localList)
    }
  }

  const favlistUpdate = async (fav, isAdd = true) => {
    if (fav === '') return
    const newWatchlist = isAdd
      ? [...favlist, fav]
      : favlist.filter((x) => x !== fav)
    if (newWatchlist) {
      setFavlist(newWatchlist)
      localStorage.setItem('redditFavList', JSON.stringify(newWatchlist))
    }
  }

  const handleSubscribe = async () => {
    console.log('subscribe click:', feedToAdd)
    const index = favlist.indexOf(feedToAdd)
    console.log('index', index)

    // if its already there, remove it, otherwise add it
    if (index > -1) await favlistUpdate(feedToAdd, false)
    else await favlistUpdate(feedToAdd)
  }

  return (
    <div className='flex flex-col justify-center content-center items-center '>
      <h1>Reddit Client</h1>
      <AddFeed {...{ feedToAdd, handleSubscribe, setFeedToAdd }} />
      <div>favs: {JSON.stringify(favlist)}</div>
      <RedditPostWrapper postData={postData} />
    </div>
  )
}
