import { useCallback } from 'react'
import PropTypes from 'prop-types'

export default function AddFeed({ feedToAdd, handleSubscribe, setFeedToAdd }) {
  const handleFeedChange = useCallback((e) => {
    setFeedToAdd(e.target.value)
  }, [])

  return (
    <div className='flex rounded-xl shadow-md items-center text-lg'>
      <div className='bg-gray-300 p-5 rounded-xl font-bold'>r/</div>
      <div>
        <input
          className='bg-gray-100 leading-10 pl-1'
          type='text'
          placeholder='AskReddit'
          value={feedToAdd}
          onChange={handleFeedChange}
        />
      </div>
      <div>
        <button
          className='pt-1 pt-1 pl-2 pr-2 bg-blue-400 text-white'
          onClick={handleSubscribe}
        >
          SUBSCRIBE
        </button>
      </div>
    </div>
  )
}
AddFeed.propTypes = {
  feedToAdd: PropTypes.string.isRequired,
  handleSubscribe: PropTypes.string.isRequired,
  setFeedToAdd: PropTypes.func.isRequired,
}
