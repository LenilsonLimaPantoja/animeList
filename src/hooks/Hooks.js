import axios from "axios";
export const requestAnimes = (filtro) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://gogoanime.consumet.org/search?keyw=${filtro == '' ? 'naruto' : filtro}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
