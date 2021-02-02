export function getRedditUrl(sub) {
  let url = 'https://www.reddit.com'
  if (sub) url = `${url}/r/${sub}`
  return url + '/.json'
}

export function fetchData(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((json) => json)
    .catch((e) => {
      console.error('Failed fetch:', e)
    })
}
