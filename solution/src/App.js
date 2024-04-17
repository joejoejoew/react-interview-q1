import './App.css';
import { useEffect, useState } from 'react';
import { getLocations, isNameValid } from './mock-api/apis';

function App() {
  const [name, setName] = useState('');
  const [validNameMap, setValidNameMap] = useState(new Map());
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [submissions, setSubmissions] = useState([]);
  
  let nameIsValid = validNameMap.get(name);

  useEffect(() => {
    getLocations().then((resp) => {
      setLocations(resp);
    });
  }, []);

  return (
    <div className="App">
      <form>
        <div>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                setName(value);
                isNameValid(value).then((resp) => {
                  setValidNameMap(prev => 
                    new Map(prev.set(value, resp))
                  );
                });
              }}
            />
            <span
              className="error-message"
              style={{
                visibility: nameIsValid === false ? "visible" : "hidden",
              }}
            >
              this name has already been taken
            </span>
          </label>
        </div>
        <div>
          <label>
            Country
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option key="" value="">
                Select a country
              </option>
              {locations.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button
          type="button"
          disabled={submissions?.length === 0}
          onClick={() => setSubmissions([])}
        >
          Clear
        </button>
        <button
          type="button"
          disabled={
            nameIsValid !== true || name === "" || selectedLocation === ""
          }
          onClick={() => {
            setSubmissions((prev) => [
              ...prev,
              {
                name,
                country: selectedLocation,
              },
            ]);
          }}
        >
          Add
        </button>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {submissions?.map((submission, index) => (
              <tr key={index}>
                <td>{submission.name}</td>
                <td>{submission.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default App;
