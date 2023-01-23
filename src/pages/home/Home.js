import { useEffect, useState } from "react";
import { requestAnimes } from "../../hooks/Hooks";
import ReactLoading from 'react-loading';
import "./home.scss";
function Home() {
  const [filtro, setFiltro] = useState("");
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setAnimes([]);
    const dataRequest = async () => {
      setLoading(true);
      await requestAnimes(filtro)
        .then((response) => {
          setAnimes(response);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    };
    dataRequest();
  }, [filtro]);
  return (
    <div className="container">
      <div>
        <label>
          <input
            placeholder="Pesquise seu anime favorito"
            type="search"
            onChange={(e) => setFiltro(e.target.value)}
            value={filtro}
          />
        </label>
        {loading ? (
          <ReactLoading type='bars' color='#6464f8'  />
        ) : (
          <ul>
            {animes?.map((anime) => {
              return (
                <li key={anime.animeId}>
                  <img src={anime.animeImg} alt={anime.animeTitle} />
                  <p className="titulo">{anime.animeTitle}</p>
                  <a href={anime.animeUrl}>{anime.animeUrl.substring(0, 20)}</a>
                  <p>{anime.status}</p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Home;
