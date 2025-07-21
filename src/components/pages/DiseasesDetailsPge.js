import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const DiseaseDetailPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`
        );
        setData(res.data);
      } catch (err) {
        alert("Failed to load disease details.");
      }
    };

    fetchDetails();
  }, [name]);

  if (!data) return <p className="text-center mt-10">Loading details...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl mt-6 shadow-md">
      <h1 className="text-3xl font-bold mb-3">{data.title}</h1>
      {data.thumbnail && (
        <img
          src={data.thumbnail.source}
          alt={data.title}
          className="w-64 mb-4 rounded-xl"
        />
      )}
      <p className="text-gray-700 mb-6">{data.extract}</p>
      <a
        href={data.content_urls.desktop.page}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline text-sm"
      >
        Read full article on Wikipedia
      </a>
      <br />
      <Link
        to="/search-diseases"
        className="mt-6 inline-block text-pink-600 hover:underline text-sm"
      >
        ← Back to search
      </Link>
    </div>
  );
};

export default DiseaseDetailPage;
