import React, { useState, useEffect } from "react";
import HeroSection from "../HeroSection";
import WhyAdoptSection from "../AdoptSection";
import ShareStorySection from "../Story";
import CommunityStoriesSection from "../blogs";
import Footer from "../footer";
import {
  Heart, Users, DollarSign, Activity, Shield, GraduationCap
} from "lucide-react";

const PawStoriesHome = ({ setScrollToSectionFn }) => {
  // ✅ Define scrollToSection only once
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ✅ Register scroll function with App
  useEffect(() => {
    if (setScrollToSectionFn) {
      setScrollToSectionFn(() => scrollToSection);
    }
  }, [setScrollToSectionFn]);

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: "", type: "", visible: false });
  const [formData, setFormData] = useState({
    authorName: "", dogName: "", storyTitle: "", storyContent: ""
  });

  const defaultStories = [/* your stories */];

 const benefits = [
  {
    icon: Heart,
    title: "Unconditional Love",
    description:
      "Adopted dogs offer a level of love and loyalty that is unmatched. Their gratitude and affection for a second chance at life form a deep, lifelong bond."
  },
  {
    icon: Shield,
    title: "Save a Life",
    description:
      "Every adoption helps reduce overcrowding in shelters and gives a dog a chance to live a safe, healthy, and happy life in a loving home."
  },
  {
    icon: Activity,
    title: "Better Health",
    description:
      "Having a dog encourages a more active lifestyle — from daily walks to playful bonding — improving both your physical and mental health."
  },
  {
    icon: Users,
    title: "Social Connection",
    description:
      "Dogs are social magnets. They help you connect with other pet owners and build friendships through shared activities like walks, park visits, and events."
  },
  {
    icon: DollarSign,
    title: "Cost Effective",
    description:
      "Adopting from a shelter is often more affordable than buying from breeders, and adopted dogs usually come vaccinated and spayed or neutered."
  },
  {
    icon: GraduationCap,
    title: "Life Lessons",
    description:
      "Adoption teaches compassion, empathy, and responsibility. It’s a powerful example for children and adults alike about kindness and second chances."
  }
];

  useEffect(() => {
    setTimeout(() => {
      setStories(defaultStories);
      setLoading(false);
    }, 1000);
  }, []);

  const showMessage = (text, type) => {
    setMessage({ text, type, visible: true });
    setTimeout(() => setMessage({ text: "", type: "", visible: false }), 5000);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.authorName && formData.dogName && formData.storyTitle && formData.storyContent) {
      const newStory = {
        _id: Date.now().toString(),
        ...formData,
        dateCreated: new Date(),
        likes: 0
      };
      setStories([newStory, ...stories]);
      setFormData({ authorName: "", dogName: "", storyTitle: "", storyContent: "" });
      showMessage("Thank you for sharing your story! It has been added to our community.", "success");
    }
  };

  const handleLike = (storyId) => {
    setStories(stories.map((story) =>
      story._id === storyId ? { ...story, likes: story.likes + 1 } : story
    ));
  };

  const getInitials = (name) => name.split(" ").map((n) => n[0]).join("").toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <section id="home" className="scroll-mt-24">
        <HeroSection scrollToSection={scrollToSection} />
      </section>

      <section id="why-adopt" className="scroll-mt-24">
        <WhyAdoptSection benefits={benefits} />
      </section>

      <section id="share-story" className="scroll-mt-24">
        <ShareStorySection
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          message={message}
        />
      </section>

      <section id="stories" className="scroll-mt-24">
        <CommunityStoriesSection
          stories={stories}
          loading={loading}
          handleLike={handleLike}
          getInitials={getInitials}
        />
      </section>

      <Footer />
    </div>
  );
};

export default PawStoriesHome;
