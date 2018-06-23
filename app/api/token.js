let loadToken = () => {
  try {
    const serializedToken = localStorage.getItem('token');
    if (serializedToken === null) {
      return ''
    }
    return JSON.parse(serializedToken)
  } catch (err) {
    return ''
  }
}

let saveToken = (token) => {
  try {
    const serializedToken = JSON.stringify(token);
    localStorage.setItem('token', serializedToken);
  } catch (err) {
    console.error(err)
  }
}

let storedToken = loadToken()

export function storeToken(token){
  if (token) {
    storedToken = token
    saveToken(token)
  }
}
export function fetchToken(){
  return storedToken
}
