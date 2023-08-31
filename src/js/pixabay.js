import axios from 'axios';

const BASE_URL = "https://pixabay.com/api/";
const KEY = "39168194-caf31c4785fb07e962fbb3d97";

export async function searchFoto(q, page, per_page) {
    const url = `${BASE_URL}?key=${KEY}&q=${q}&page=${page}&per_page=${per_page}&image_type=photo&orientation=horizontal&safesearch=true`;
    const resp = await axios.get(url);
    // console.log(resp);
    return resp.data;
};