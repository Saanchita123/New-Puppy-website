// src/components/IndianDogBreedsSection.jsx
import React from "react";

const dogBreeds = [
  {
    name: "Indian Pariah Dog",
    image: "images/images/Pariah.jpg",
    description:
      "The Indian Pariah Dog is one of the oldest and most resilient dog breeds native to the Indian subcontinent. Known for its intelligence, loyalty, and adaptability, it's a great family companion and watchdog, thriving in various climates.",
  },

  {
    name: "Mudhol Hound",
    image: "images/images/shahid-shaikh-JIUY6aTw5-0-unsplash.jpg",
    description:
      "Also known as the Caravan Hound, the Mudhol Hound is a graceful and athletic sighthound from Karnataka. This breed is extremely loyal to its owner and is recognized by Indian kennel authorities for its hunting and guarding abilities.",
  },
  {
    name: "Jonangi",
    image: "images/images/Jonangi_Pup_Shakthi.jpg",
    description:
      "The Jonangi is a rare Indian breed primarily found along the East coast, especially Andhra Pradesh. Traditionally used for herding ducks, Jonangis are intelligent, quiet, and known for their unique yodel-like vocalization.",
  },
  {
    name: "Bakharwal Dog",
    image: "images/images/soumya-banerjee-mafPgGqEzZ4-unsplash.jpg",
    description:
      "Originating in the Himalayan region, the Bakharwal Dog is a fierce and loyal guardian used by nomadic tribes to protect livestock. With a thick coat and strong build, it is well-suited for cold climates and rugged terrain.",
  },
];

const IndianDogBreedsSection = () => {
  return (
    <section id="indian-dog-breeds" className="py-20 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent">
          Popular Indian Dog Breeds
        </h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Discover native Indian breeds that are smart, loyal, and adapted to our climate.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dogBreeds.map((breed, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              <img
                src={breed.image}
                alt={breed.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {breed.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {breed.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndianDogBreedsSection;
