const sampleListings = [
  {
    title: "Heritage Haveli in Udaipur",
    description:
      "Stay in a royal palace-turned-home, featuring intricate carvings and a private courtyard.",
    image: {
      url: "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=2070&auto=format&fit=crop",
      filename: "listingimage",
    },
    price: 45000,
    location: "Udaipur, Rajasthan",
    country: "India",
    geometry: { type: "Point", coordinates: [73.6877, 24.5854] },
  },
  {
    title: "Backwater Houseboat Experience",
    description:
      "Drift along the serene backwaters of Alleppey in a traditional wooden houseboat.",
    image: {
      url: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9f44?q=80&w=1964&auto=format&fit=crop",
      filename: "listingimage",
    },
    price: 12000,
    location: "Alleppey, Kerala",
    country: "India",
    geometry: { type: "Point", coordinates: [76.3355, 9.4981] },
  },
  {
    title: "Modern Penthouse in Bangalore",
    description:
      "A luxury high-rise apartment with floor-to-ceiling windows and a view of the garden city.",
    image: {
      url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop",
      filename: "listingimage",
    },
    price: 8000,
    location: "Bangalore, Karnataka",
    country: "India",
    geometry: { type: "Point", coordinates: [77.5946, 12.9716] },
  },
  {
    title: "Tea Garden Cottage",
    description:
      "Wake up to the smell of fresh tea leaves in this charming wooden cottage nestled in the hills.",
    image: {
      url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070&auto=format&fit=crop",
      filename: "listingimage",
    },
    price: 5500,
    location: "Darjeeling, West Bengal",
    country: "India",
    geometry: { type: "Point", coordinates: [88.2636, 27.041] },
  },
  {
    title: "Desert Glamping Tent",
    description:
      "Experience the magic of the Thar Desert under a blanket of stars in a luxury tent.",
    image: {
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
      filename: "listingimage",
    },
    price: 9000,
    location: "Jaisalmer, Rajasthan",
    country: "India",
    geometry: { type: "Point", coordinates: [70.9167, 26.9157] },
  },
];

module.exports = { data: sampleListings };
