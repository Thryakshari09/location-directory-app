import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [place, setPlace] = useState("");
  const [category, setCategory] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchPlaces = async () => {
    if (!place || !category) {
      alert("Please enter city and select category");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${category} in ${place}&limit=30`
      );

      setResults(response.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">🗺️ Location Directory & Maps Finder</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter City"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="hotel">Hotels</option>
          <option value="restaurant">Restaurants</option>
          <option value="mall">Malls</option>
          <option value="hospital">Hospitals</option>
          <option value="petrol pump">Petrol Bunks</option>
          <option value="school">Schools</option>
          <option value="college">Colleges</option>
          <option value="park">Parks</option>
        </select>

        <button onClick={searchPlaces}>Search</button>
      </div>

      {loading && <h3 className="loading">Searching...</h3>}

      {results.length > 0 && (
        <h3 className="result-count">
          {results.length} Results Found for "{category}" in "{place}"
        </h3>
      )}

      <table className="results-table">
        <thead>
          <tr>
            <th>Property Name</th>
            <th>Address</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Google Maps</th>
          </tr>
        </thead>

        <tbody>
          {results.map((item, index) => (
            <tr key={index}>
              <td>{item.display_name.split(",")[0]}</td>
              <td>{item.display_name}</td>
              <td>{item.lat}</td>
              <td>{item.lon}</td>
              <td>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lon}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Map
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;