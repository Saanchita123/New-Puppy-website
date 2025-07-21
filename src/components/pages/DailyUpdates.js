import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const NEWS_API_KEY = "pub_023be3e60dbe4c699a9fa867037bd466"; // Replace with your actual key

const AnimalNewsPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("https://newsdata.io/api/1/news", {
          params: {
            apikey: NEWS_API_KEY,
            q: "animals",
            language: "en",
            category: "environment,science,top",
          },
        });

        setArticles(res.data.results || []);
      } catch (err) {
        console.error("Failed to fetch news", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-pink-600">
        🐾 Daily Animal News
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading news articles...</p>
      ) : articles.length === 0 ? (
        <p className="text-center text-gray-400">No articles found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 flex flex-col"
            >
              {article.image_url && (
                <img
                  src={article.image_url}
                  alt="Article thumbnail"
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg font-semibold mb-2 text-gray-800">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4 flex-1">
                  {article.description || "No description available."}
                </p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline mt-auto"
                >
                  Read full article →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimalNewsPage;