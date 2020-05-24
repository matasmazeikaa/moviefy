import axios from 'axios';

const API_URL = 'https://enigmatic-ridge-43445.herokuapp.com/movies';

export const getPaginatedMovieList = (params) => axios.get(API_URL, { params });
