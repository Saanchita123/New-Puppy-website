import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AnimalDiseaseSearchPage = () => {
  const [animal, setAnimal] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!animal) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `https://en.wikipedia.org/w/api.php`,
        {
          params: {
            action: "query",
            list: "search",
            srsearch: `${animal} diseases`,
            format: "json",
            origin: "*",
          },
        }
      );

      setResults(res.data.query.search);
    } catch (err) {
      alert("Failed to fetch disease info.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-4 text-center">Animal Disease Search</h1>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter animal name (e.g., dog, cat)"
          value={animal}
          onChange={(e) => setAnimal(e.target.value)}
          className="flex-1 p-3 rounded-xl border border-gray-300 shadow-sm"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-center text-gray-400">No diseases found yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((item) => (
            <div
              key={item.pageid}
              className="p-4 bg-white rounded-2xl border shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
              <p className="text-sm text-gray-600 mb-3">{item.snippet.replace(/(<([^>]+)>)/gi, "")}...</p>
              <button
                onClick={() => navigate(`/disease/${encodeURIComponent(item.title)}`)
}
                className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 text-sm"
              >
                View More
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimalDiseaseSearchPage;
