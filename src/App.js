import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [playersData, updatedata] = useState([]);
  const [search, updateSearch] = useState("");

  const fetchData = async () => {
    const res = await fetch("https://api.npoint.io/20c1afef1661881ddc9c");
    const data = await res.json();
    const sortedData = data.playerList.sort((a, b) => a.Value - b.Value);
    updatedata(sortedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const smallCase = search.toLowerCase();
  const filteredData = playersData.filter(
    ({ TName, PFName }) => PFName.toLowerCase().includes(smallCase) || TName.toLowerCase().includes(smallCase)
  );
  return (
    <div className="App">
      <div className="search-input">
        <div className="search-text">Search player:</div>
        <div>
          <input value={search} onChange={(e) => updateSearch(e.target.value)} />
        </div>
      </div>
      <div className="player-grid">
        {filteredData.map(({ Id, PFName, SkillDesc, UpComingMatchesList, Value }) => (
          <div className="player-card" key={`${Id}-${PFName}`}>
            <img
              className="player-img"
              src={`/player-images/${Id}.jpg`}
              onError={(e) => (e.target.src = "/player-images/person-icon.jpeg")}
              alt={PFName}
            />
            <div>
              <b>{PFName}</b>
              <div>{`Price: $ ${Value}`}</div>
              <div>{`Position: ${SkillDesc}`}</div>
              <div>{`Upcoming Match: ${UpComingMatchesList[0].CCode} vs ${UpComingMatchesList[0].VsCCode}`}</div>
              <div>{`Match Time: ${UpComingMatchesList[0].MDate}`}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
