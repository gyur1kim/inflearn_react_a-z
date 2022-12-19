import axios from "axios"

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "2808f49cb7a157269d3c55874b8d52e5",
    language: "ko-KR"
  }
})

export default instance