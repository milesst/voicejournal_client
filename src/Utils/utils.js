import Fuse from 'fuse.js'

export function getAccessToken() {
    const json = JSON.parse(localStorage.getItem('token'))
    return json['accessToken']
}

export function getUserId() {
    const json = JSON.parse(localStorage.getItem('token'))
    return json['userId']
}

export function parseFullDateFromJSON(date) {
    let options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return `${new Date(date).toLocaleString('ru-RU', options)}`
}

export function parseDateFromJSONDate(date) {
    if (!date) return null
    return date.split('T')[0]
}

export function isAdmin() {
    const json = JSON.parse(localStorage.getItem('token'))
    return Boolean(json['isAdmin'])
}

export function fuzzyMatch(searchString, keys, list, threshold = 0.6) {
    const options = {
        includeScore: true,
        //
        keys,
        threshold
      }
      
      const fuse = new Fuse(list, options)
      const result = fuse.search(searchString) 
      if (result.length > 0) {
      const res = Object.assign({}, result[0].item)
      res.score = result[0].score
      return res
      }
      return null
}