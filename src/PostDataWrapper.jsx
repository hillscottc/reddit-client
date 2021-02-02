import PropTypes from 'prop-types'

function PostImagePreview({ preview }) {
  console.log('PREVIEW:', preview)
  const src = preview && preview.images[0] ? preview.images[0].source.url : ''
  return (
    <>
      <img alt='postImg' src={src} />
      <span>{src}</span>
    </>
  )
}
PostImagePreview.propTypes = {
  preview: PropTypes.shape({
    images: PropTypes.array.isRequired,
  }),
}

function RedditPost({ post }) {
  const redditUrl = (permalink) => `https://www.reddit.com${permalink}`
  const { permalink, preview, title, url } = post.data
  return (
    <div className='p-6 w-5/6 mx-auto bg-white rounded-xl shadow-md items-center space-x-4 m-9'>
      {/*<div>*/}
      {/*  <PostImagePreview preview={preview} />*/}
      {/*</div>*/}
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
      preview: PropTypes.object,
    }).isRequired,
  }).isRequired,
}

export default function PostDataWrapper({ postData }) {
  // console.log('postData:', postData)
  return (
    <div>
      <h2>POSTS</h2>
      {postData &&
        postData.data.children.map((post, ndx) => (
          <RedditPost key={ndx} post={post} />
        ))}
    </div>
  )
}
PostDataWrapper.propTypes = {
  postData: PropTypes.shape({
    data: PropTypes.shape({
      modhash: PropTypes.string.isRequired,
      children: PropTypes.array.isRequired,
    }).isRequired,
  }),
}
