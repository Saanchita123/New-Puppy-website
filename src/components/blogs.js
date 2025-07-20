import { Calendar, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CommunityStoriesSection() {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Safe initials fallback
  const getInitials = (name) => {
    if (!name || typeof name !== "string") return "??";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Fetch stories from backend
  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await axios.get("https://new-puppy-website.onrender.com/all-stories");
        setStories(res.data.reverse()); // newest first
      } catch (err) {
        console.error("Failed to fetch stories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <section id="stories" className="py-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
          Community Stories
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Read heartwarming stories from fellow dog adopters in our community
        </p>

        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading stories...</p>
          </div>
        ) : (
          <>
            <div className="grid gap-8">
              {stories.slice(0, 3).map((story) => (
                <div
                  key={story._id}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-purple-500"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {getInitials(story.name)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800">A Shared Story</h3>
                      <div className="flex items-center text-gray-600 text-sm">
                        <span>By {story.name}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(story.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => console.log("Like clicked:", story._id)}
                      className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors px-4 py-2 rounded-lg hover:bg-red-50"
                    >
                      <ThumbsUp className="w-5 h-5" />
                      <span className="font-semibold">{story.likes || 0}</span>
                    </button>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{story.story}</p>
                </div>
              ))}
            </div>

            {stories.length >= 3 && (
              <div className="text-center mt-10">
                <button
                  onClick={() => navigate("/all-stories")}
                  className="bg-gradient-to-r from-pink-500 to-violet-600 text-white py-2 px-6 rounded-lg hover:scale-105 transition-all duration-300"
                >
                  View All Stories
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
