import PropTypes from 'prop-types'
import { RedditPost } from './RedditPost.jsx'

export default function RedditPage({ page, numPostsToShow = 1 }) {
  const { sub, pageObj } = page
  const posts = pageObj.data.children

  let postsToShow
  if (posts && posts.length >= numPostsToShow) {
    postsToShow = posts.slice(0, numPostsToShow)
  } else {
    postsToShow = posts.slice()
  }
  return (
    <>
      {postsToShow.map((post, ndx) => (
        <RedditPost key={ndx} {...{ post, sub }} />
      ))}
    </>
  )
}
RedditPage.propTypes = {
  page: PropTypes.shape({
    sub: PropTypes.string.isRequired,
    pageObj: PropTypes.shape({
      data: PropTypes.shape({
        children: PropTypes.array.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  numPostsToShow: PropTypes.number,
}
