import axios from "axios";

/** base url to make requests to the movie database */

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;

//here we are exporting instance with "default", so we can call import from the other file with any name like import axios instead of import instance. we can rename variable. Otherwise we need the curly brackets.

//u can only have one default export in a file.
