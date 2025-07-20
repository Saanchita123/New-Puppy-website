import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const StoryShare = () => {
     const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    story: "",
    date: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/submit", form); // Your API endpoint
      alert("Story submitted!");
      setForm({ name: "", email: "", story: "", date: "" });
    } catch (error) {
      console.error(error);
      alert("Error submitting story");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
          <button
        onClick={() => navigate("/")} // Navigate to landing page
        className="mb-4 border-2 p-2 rounded-full text-white bg-blue-600 hover:text-white  self-start ml-4"
      >
        ← Back to Home
      </button>
      <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
        Share Your Story
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-lg"
      >
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border rounded-lg"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          type="email"
          className="w-full mb-4 p-3 border rounded-lg"
        />
        <textarea
          name="story"
          placeholder="Your story..."
          value={form.story}
          onChange={handleChange}
          required
          rows="5"
          className="w-full mb-4 p-3 border rounded-lg"
        />
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border rounded-lg"
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-pink-500 to-violet-600 text-white py-3 rounded-lg hover:scale-105 transition-all duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default StoryShare;
