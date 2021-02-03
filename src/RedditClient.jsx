import { useEffect, useState } from 'react'
import { getRedditUrl, fetchData } from './util'
import RedditPage from './RedditPage.jsx'
import AddFeed from './AddFeed.jsx'

export default function RedditClient() {
  const [favlist, setFavlist] = useState([])
  const [feedToAdd, setFeedToAdd] = useState('')
  const [pages, setPages] = useState([])

  useEffect(() => {
    setFavlistFromLocal()
  }, [])

  useEffect(() => {
    if (favlist.length < 1) return
    console.log('FETCH DATA FOR SUBREDDITS: ', favlist)
    if (favlist && favlist.length > 0) {
      updatePagesForSubs(favlist).then((pageArr) => {
        console.log('Got pages:', pageArr)
        setPages(pageArr)
      })
    }
  }, [favlist])

  const updatePagesForSubs = async (favlist) => {
    const pageArr = []
    let pageObj
    for (const sub of favlist) {
      pageObj = await fetchSubreddit(sub)
      if (pageObj) pageArr.push({ url: sub, pageObj })
      else console.log('No data for: ', sub)
    }
    return pageArr
  }

  const fetchSubreddit = (sub) => {
    const url = getRedditUrl(sub)
    return fetchData(url)
      .then((json) => json)
      .catch((error) => {
        console.error(`Failed ${url} error:`, error)
      })
  }

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
    const index = favlist.indexOf(feedToAdd)

    // if its already there, remove it, otherwise add it
    if (index > -1) await favlistUpdate(feedToAdd, false)
    else await favlistUpdate(feedToAdd)
  }

  return (
    <div className='flex flex-col justify-center content-center items-center '>
      <h1>Reddit Client</h1>
      <AddFeed {...{ feedToAdd, handleSubscribe, setFeedToAdd }} />
      <div>favs: {JSON.stringify(favlist)}</div>

      {pages.map((page, ndx) => (
        <RedditPage key={ndx} page={page} />
      ))}
    </div>
  )
}
