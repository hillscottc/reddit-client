import { getRedditUrl } from './util'

describe('util tests', () => {
  test('getRedditUrl', () => {
    let url = getRedditUrl()
    expect(url).toBe('https://www.reddit.com/.json')

    url = getRedditUrl('AskReddit')
    expect(url).toBe('https://www.reddit.com/r/AskReddit/.json')
  })
})
