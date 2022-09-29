import axios from "axios";

const TOKEN = "ccq88eaad3i4o9irrmcgccq88eaad3i4o9irrmd0 "
export default axios.create({
    baseURL: "https://finnhub.io/api/v1", 
    params: {
        token: TOKEN
    }
})