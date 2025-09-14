// Mock data for Trip-Sync AI

export const mockTrips = [
  {
    id: "1",
    name: "Tokyo Adventure",
    description: "Cherry blossoms and city lights",
    members: [
      { id: "1", name: "Alex", avatar: "/api/placeholder/32/32" },
      { id: "2", name: "Sam", avatar: "/api/placeholder/32/32" },
      { id: "3", name: "Jordan", avatar: "/api/placeholder/32/32" },
    ],
    status: "planning",
    destination: "Tokyo, Japan",
    dates: "April 2024",
  },
  {
    id: "2", 
    name: "European Backpacking",
    description: "Hostels, trains, and adventure",
    members: [
      { id: "1", name: "Alex", avatar: "/api/placeholder/32/32" },
      { id: "4", name: "Riley", avatar: "/api/placeholder/32/32" },
    ],
    status: "voting",
    destination: "Multiple Cities",
    dates: "Summer 2024",
  },
];

export const mockVibeItems = [
  {
    id: "1",
    type: "image",
    content: "/api/placeholder/300/200",
    caption: "Sunset beach vibes",
    addedBy: "Alex",
  },
  {
    id: "2", 
    type: "text",
    content: "Love exploring local street food markets!",
    addedBy: "Sam",
  },
  {
    id: "3",
    type: "image", 
    content: "/api/placeholder/300/200",
    caption: "Mountain hiking goals",
    addedBy: "Jordan",
  },
];

export const mockChatMessages = [
  {
    id: "1",
    type: "ai",
    content: "Welcome to your Tokyo trip planning! I've analyzed everyone's preferences and have some exciting suggestions.",
    timestamp: "2024-01-15T10:00:00Z",
  },
  {
    id: "2",
    type: "user",
    content: "We're looking for unique cultural experiences",
    sender: "Alex",
    timestamp: "2024-01-15T10:05:00Z",
  },
  {
    id: "3",
    type: "suggestion",
    content: {
      title: "Traditional Tea Ceremony in Urasenke",
      description: "Authentic tea ceremony experience in a historic tea house",
      image: "/api/placeholder/400/250",
      votes: { up: 2, down: 0 },
      votedBy: ["Alex", "Sam"],
    },
    timestamp: "2024-01-15T10:10:00Z",
  },
];

export const mockDestinations = [
  {
    id: "1",
    name: "Kyoto, Japan",
    image: "/api/placeholder/400/300",
    votes: 3,
    totalMembers: 4,
    votedBy: ["Alex", "Sam", "Jordan"],
  },
  {
    id: "2", 
    name: "Seoul, South Korea",
    image: "/api/placeholder/400/300", 
    votes: 2,
    totalMembers: 4,
    votedBy: ["Riley", "Sam"],
  },
  {
    id: "3",
    name: "Bangkok, Thailand", 
    image: "/api/placeholder/400/300",
    votes: 1,
    totalMembers: 4,
    votedBy: ["Jordan"],
  },
];

export const mockActivities = [
  {
    id: "1",
    title: "Ramen Tasting Tour",
    description: "Visit 4 legendary ramen shops in Shibuya district",
    image: "/api/placeholder/350/250",
    price: "$45/person",
    duration: "3 hours",
  },
  {
    id: "2",
    title: "Senso-ji Temple Visit", 
    description: "Early morning visit to Tokyo's oldest temple",
    image: "/api/placeholder/350/250",
    price: "Free",
    duration: "2 hours",
  },
];

export const mockUserProfile = {
  id: "1",
  name: "Alex Chen",
  email: "alex@example.com",
  avatar: "/api/placeholder/120/120",
  preferences: {
    loves: ["Cultural experiences", "Local food", "Photography", "Temples & History"],
    avoids: ["Crowded places", "Late nights", "Expensive shopping"],
  },
};