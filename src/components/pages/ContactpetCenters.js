import { useEffect, useState } from "react";
import axios from "axios";

const GOOGLE_API_KEY = "AIzaSyBZpLZ-XlbYLISkYWUHCWpT0nJKpc33Nts";

const ContactPetCenterPage = () => {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        await fetchNearbyCenters(latitude, longitude);
        setLoading(false);
      },
      () => {
        alert("Unable to get location.");
        setLoading(false);
      }
    );
  };

  const geocodeAddress = async () => {
    if (!address) return;

    setLoading(true);
    try {
      const res = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address,
            key: GOOGLE_API_KEY,
          },
        }
      );

      if (res.data.results.length > 0) {
        const location = res.data.results[0].geometry.location;
        await fetchNearbyCenters(location.lat, location.lng);
      } else {
        alert("Address not found.");
      }
    } catch (error) {
      alert("Geocoding failed.");
    } finally {
      setLoading(false);
    }
  };
const fetchNearbyCenters = async (lat, lng) => {
  try {
    const nearbyRes = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json`,
      {
        params: {
          location: `${lat},${lng}`,
          radius: 10000,
          keyword: "animal rescue center",
          type: "veterinary_care",
          key: GOOGLE_API_KEY,
        },
      }
    );

    const nearbyPlaces = nearbyRes.data.results;

    const detailedPlaces = await Promise.all(
      nearbyPlaces.map(async (place) => {
        const detailsRes = await axios.get(
          `https://maps.googleapis.com/maps/api/place/details/json`,
          {
            params: {
              place_id: place.place_id,
              key: GOOGLE_API_KEY,
              fields: "name,formatted_address,formatted_phone_number,website",
            },
          }
        );

        const details = detailsRes.data.result;

        return {
          name: details.name,
          address: details.formatted_address || "No address",
          phone: details.formatted_phone_number || "N/A",
          website:
            details.website ||
            `https://google.com/search?q=${encodeURIComponent(details.name)}`,
        };
      })
    );

    setCenters(detailedPlaces);
  } catch (err) {
    console.error("Error fetching place details", err);
    alert("Failed to fetch nearby centers.");
  }
};


  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Nearby Animal Rescue Centers</h1>

      {/* Address Input */}
      <div className="max-w-xl mx-auto mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Enter your city or address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="flex-1 p-3 rounded-xl border border-gray-300 shadow-sm"
        />
        <button
          onClick={geocodeAddress}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Results */}
      {loading ? (
        <p className="text-center text-gray-600">Loading centers...</p>
      ) : centers.length === 0 ? (
        <p className="text-center text-gray-500">No centers found yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {centers.map((center, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-2xl shadow-md border border-gray-200"
            >
              <h2 className="text-xl font-semibold">{center.name}</h2>
              <p className="text-gray-600 mb-1">{center.address}</p>
              <p className="text-sm">📞 {center.phone}</p>
              <a
                href={center.website}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline text-sm"
              >
                View Online
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactPetCenterPage;
