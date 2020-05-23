import axios from 'axios';

const API_URL = 'http://localhost:3001/';

export const getPaginatedMovieList = (params) => axios.get(API_URL, { params });
