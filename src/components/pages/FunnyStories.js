// AllStoriesPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AllStoriesPage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get("https://new-puppy-website.onrender.com/all-stories");
        setStories(res.data);
      } catch (err) {
        console.error("Error fetching all stories:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="mb-8 text-sm bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
        >
          ← Back to Home
        </button>

        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
          All Community Stories
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Real stories from our loving dog adopters
        </p>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading stories...</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {stories.map((story) => (
              <div
                key={story._id}
                className="bg-white rounded-2xl p-8 shadow-md border-l-4 border-purple-500 hover:shadow-xl transition duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                    {getInitials(story.name)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Shared by {story.name}
                    </h3>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{new Date(story.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <ThumbsUp className="w-5 h-5" />
                    <span className="font-semibold">{story.likes || 0}</span>
                  </div>
                </div>

                <h4 className="text-xl font-bold text-purple-600 mb-2">
                  {story.storyTitle || "Untitled Story"}
                </h4>
                <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">
                  {story.story}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllStoriesPage;
