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