import { useState, useCallback } from 'react'

export default function AddFeed() {
  const [feedToAdd, setFeedToAdd] = useState('')

  const handleSubscribe = useCallback(() => {
    console.log('click!')
  }, [])

  const handleFeedChange = useCallback((e) => {
    setFeedToAdd(e.target.value)
  }, [])

  return (
    <div className='p-6 w-5/6 mx-auto bg-white rounded-xl shadow-md items-center space-x-4 m-9'>
      <div>r/</div>
      <div>
        <input type='text' value={feedToAdd} onChange={handleFeedChange} />
      </div>
      <div>
        <button onClick={handleSubscribe}>SUBSCRIBE</button>
      </div>
    </div>
  )
}
