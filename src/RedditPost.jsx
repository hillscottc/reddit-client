import PropTypes from 'prop-types'
import LikeIcon from './assets/like-svgrepo-com.svg'

export function RedditPost({ post, sub }) {
  const redditUrl = (permalink) => `https://www.reddit.com${permalink}`
  const { permalink, preview, title, ups } = post.data

  console.log('DATA:', post.data)

  const imgSrc =
    preview && preview.images[0] ? preview.images[0].source.url : ''

  const SHOW_IMAGE = false
  return (
    <div className='p-6 w-5/6 bg-white rounded-xl shadow-md items-center space-x-4 m-9'>
      {SHOW_IMAGE && (
        <div>
          <img alt='Post Image' src={imgSrc} />
          <span>{imgSrc}</span>
        </div>
      )}
      <div className='ml-4'>r/{sub}</div>
      <div className='mt-2'>
        <a
          className='text-xl underline text-blue-600 hover:text-blue-800 visited:text-purple-600'
          href={redditUrl(permalink)}
        >
          {title}
        </a>
      </div>
      <div className='mt-2 flex'>
        {ups}
        <LikeIcon
          className='pl-1.5'
          viewBox='0 0 100 100'
          width='25px'
          height='25px'
        />
        <div className='pl-3 pr-3'>|</div>
        <div>the date</div>
      </div>
    </div>
  )
}
RedditPost.propTypes = {
  post: PropTypes.shape({
    data: PropTypes.shape({
      permalink: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      preview: PropTypes.shape({
        images: PropTypes.array.isRequired,
      }),
      ups: PropTypes.number,
    }).isRequired,
  }).isRequired,
  sub: PropTypes.string.isRequired,
}
