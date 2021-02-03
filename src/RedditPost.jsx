import PropTypes from 'prop-types'

export function RedditPost({ post }) {
  const redditUrl = (permalink) => `https://www.reddit.com${permalink}`
  const { permalink, preview, title, url } = post.data

  const imgSrc =
    preview && preview.images[0] ? preview.images[0].source.url : ''

  const SHOW_IMAGE = false
  return (
    <div className='p-6 w-5/6 mx-auto bg-white rounded-xl shadow-md items-center space-x-4 m-9'>
      {SHOW_IMAGE && (
        <div>
          <img alt='Post Image' src={imgSrc} />
          <span>{imgSrc}</span>
        </div>
      )}
      <div>
        <a href={url}> {title}</a>
      </div>
      <div>
        <a href={redditUrl(permalink)}>reddit link</a>
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
    }).isRequired,
  }).isRequired,
}
