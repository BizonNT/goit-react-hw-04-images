import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '40836630-710aac82fe531023a7159c672',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  },
});

async function getData(q, page, per_page) {
  const options = {
    params: {
      q,
      page,
      per_page,
    },
  };
  return await instance.get("/", options).then(resp => resp.data);
}

export default getData;
