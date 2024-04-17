import './App.css';
import { useEffect, useState } from 'react';
import { getLocations, isNameValid } from './mock-api/apis';

function App() {
  const [name, setName] = useState('');
  const [nameIsValid, setNameIsValid] = useState(undefined);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [submissions, setSubmissions] = useState([]);

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
                setNameIsValid(undefined);
                isNameValid(e.target.value).then((resp) => {
                  setNameIsValid(resp);
                });
                setName(e.target.value);
              }}
            />
            <span className="error-message" style={{ visibility: nameIsValid !== false ? 'hidden' : 'visible' }}>this name has already been taken</span>
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
          disabled={!nameIsValid || name === "" || selectedLocation === ""}
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
