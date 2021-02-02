import PropTypes from 'prop-types'
import { RedditPost } from './RedditPost.jsx'

export default function RedditPostWrapper({ postData }) {
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
RedditPostWrapper.propTypes = {
  postData: PropTypes.shape({
    data: PropTypes.shape({
      modhash: PropTypes.string.isRequired,
      children: PropTypes.array.isRequired,
    }).isRequired,
  }),
}
