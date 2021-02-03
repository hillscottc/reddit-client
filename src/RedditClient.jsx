import { useCallback, useEffect, useState } from 'react'
import { getRedditUrl, fetchData } from './util'
import RedditPage from './RedditPage.jsx'
import AddFeed from './AddFeed.jsx'

export default function RedditClient() {
  const [favlist, setFavlist] = useState([])
  const [feedToAdd, setFeedToAdd] = useState('')
  const [pages, setPages] = useState([])
  const [numToShow, setNumToShow] = useState(1)

  useEffect(() => {
    setFavlistFromLocal()
  }, [])

  useEffect(() => {
    // if (favlist.length < 1) return
    console.log('FETCH DATA FOR SUBREDDITS: ', favlist)
    // if (favlist && favlist.length > 0) {
    //   updatePagesForSubs(favlist).then((pageArr) => {
    //     console.log('Got pages:', pageArr)
    //     setPages(pageArr)
    //   })
    // }
    updatePagesForSubs(favlist).then((pageArr) => {
      console.log('Got pages:', pageArr)
      setPages(pageArr)
    })
  }, [favlist])

  const updatePagesForSubs = async (favlist) => {
    const pageArr = []
    let pageObj
    for (const sub of favlist) {
      pageObj = await fetchSubreddit(sub)
      if (pageObj) pageArr.push({ sub, pageObj })
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

  const favlistUpdate = (fav, isAdd = true) => {
    if (fav === '') return
    const newWatchlist = isAdd
      ? [...favlist, fav]
      : favlist.filter((x) => x !== fav)
    if (newWatchlist) {
      setFavlist(newWatchlist)
      localStorage.setItem('redditFavList', JSON.stringify(newWatchlist))
    }
  }

  // if its already there, remove it, otherwise add it
  const handleSubscribe = () => {
    const index = favlist.indexOf(feedToAdd)
    if (index > -1) favlistUpdate(feedToAdd, false)
    else favlistUpdate(feedToAdd)
  }

  const handleNumToShow = useCallback((e) => {
    setNumToShow(e.target.value)
  }, [])

  const handleRemoveFav = (e) => {
    const fav = e.target.value
    console.log('REMOVE:', fav)
    const newWatchlist = favlist.filter((x) => x !== fav)
    setFavlist([])
    setFavlist(newWatchlist)
    localStorage.setItem('redditFavList', JSON.stringify(newWatchlist))
  }

  return (
    <div className='flex flex-col justify-center content-center items-center mt-4'>
      <AddFeed {...{ feedToAdd, handleSubscribe, setFeedToAdd }} />

      <section className='flex rounded-xl shadow-md m-2 p-2'>
        Subscribed subreddits:&nbsp;
        {favlist.map((fav) => (
          <div key={fav}>
            <div className='bg-green-400 pl-1 pr-1 mr-2'>
              <button
                className='text-red-600 pr-1'
                // eslint-disable-next-line
                onClick={handleRemoveFav}
                value={fav}
              >
                X
              </button>
              {fav}
            </div>
          </div>
        ))}
      </section>

      <section className='flex rounded-xl shadow-md m-2 p-2'>
        Posts to show per subreddit:&nbsp;
        <select className='bg-gray-300' onChange={handleNumToShow}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </section>

      {pages.map((page, ndx) => (
        <RedditPage key={ndx} page={page} numPostsToShow={numToShow} />
      ))}
    </div>
  )
}
