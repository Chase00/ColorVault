let APIURL = '';

switch (window.location.hostname) {
    case "localhost" || "127.0.0.1": 
        APIURL = "http://localhost:3000"
        break
    case "thecolorvault.herokuapp.com":
        APIURL = "https://thecolorvault-api.herokuapp.com"
        break
}

export default APIURL;