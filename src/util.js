export function getRedditUrl(sub) {
  let url = 'https://www.reddit.com'
  if (sub) url = `${url}/r/${sub}`
  return url + '/.json'
}

export async function fetchData(url) {
  const response = await fetch(url)
  if (!response.ok) {
    const message = `fetchData error: status ${response.status}`
    throw new Error(message)
  }
  return await response.json()
}
