import axios from "axios";

const api = axios.create({
    baseURL: 'https://yt-api.p.rapidapi.com',
    params: {
        geo: "TR",
        lang: "tr",
    },
    headers: {
        'x-rapidapi-key': '1360098d52msh827a16b8e6844dbp1c7dbbjsn8ff5b0d45905',
        'x-rapidapi-host': 'yt-api.p.rapidapi.com'
    },
})

export default api