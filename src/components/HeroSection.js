import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function HeroSection({ scrollToSection }) {
  const navigate = useNavigate();
  return (
    <section id="home" className="relative pt-20 pb-16 overflow-hidden">
      <div className="bg-transparent"></div>

      <div className="absolute inset-0 opacity-3">
        {/* Decorative dots */}
        <img src="images/images/Pariah.jpg"></img>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-20">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Every Dog Deserves Love
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Discover heartwarming stories of adoption and share your own journey
          of finding your perfect companion.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollToSection("why-adopt")}
            className="px-8 py-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Why Adopt?
          </button>
          <button
            onClick={() => navigate("/share-story")}
            className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
          >
            Share Your Story
          </button>
        </div>
      </div>
    </section>
  );
}
