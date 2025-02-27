// import { GoogleGenerativeAI } from "@google/generative-ai";

// const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-2.0-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 40,
//   maxOutputTokens: 8192,
//   responseMimeType: "application/json",
// };

// export const chatSession = model.startChat({
//   generationConfig,
//   history: [
//     {
//       role: "user",
//       parts: [
//         {
//           text: "Generate Travel Plan for Location: Las Vegas, for 3 Days and for Couple with a Cheap budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.",
//         },
//       ],
//     },
//     {
//       role: "model",
//       parts: [
//         {
//           text: "```json",
//         },
//       ],
//     },
//   ],
// });

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: Goa, for 3 Days and for Family with a Luxury budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with time to visit in JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "tripName": "Goa Luxury Getaway (3 Days, 3-5 People)",\n  "travelers": "Group (3-5 people)",\n  "budget": "Luxury",\n  "location": "Goa, India",\n  "currency": "INR",\n  "hotels": [\n    {\n      "hotelName": "The Leela Goa",\n      "hotelAddress": "Mobor, Cavelossim, Salcete, Goa 403731, India",\n      "price": 25000,\n      "hotelImageUrl": "https://media-cdn.tripadvisor.com/media/photo-s/1b/4d/8c/03/the-leela-goa.jpg",\n      "geoCoordinates": {\n        "latitude": 15.1232,\n        "longitude": 73.9702\n      },\n      "rating": 4.7,\n      "description": "Luxury resort with lagoons, a 12-hole golf course, and multiple dining options. Offers private beach access."\n    },\n    {\n      "hotelName": "Taj Exotica Resort & Spa, Goa",\n      "hotelAddress": "Calwaddo, Benaulim, Salcete, Goa 403716, India",\n      "price": 22000,\n      "hotelImageUrl": "https://media-cdn.tripadvisor.com/media/photo-s/1b/b9/48/a0/taj-exotica-resort-spa.jpg",\n      "geoCoordinates": {\n        "latitude": 15.2696,\n        "longitude": 73.9692\n      },\n      "rating": 4.6,\n      "description": "Mediterranean-inspired resort with landscaped gardens, sea-facing villas, and a Jiva Grande Spa."\n    },\n    {\n      "hotelName": "W Goa",\n      "hotelAddress": "Vagator Beach, Bardez, Goa 403509, India",\n      "price": 28000,\n      "hotelImageUrl": "https://media-cdn.tripadvisor.com/media/photo-s/17/68/7e/e9/w-goa.jpg",\n      "geoCoordinates": {\n        "latitude": 15.5825,\n        "longitude": 73.7333\n      },\n      "rating": 4.5,\n      "description": "Stylish beachfront hotel with vibrant nightlife, a spa, and trendy dining venues. Offers stunning sunset views."\n    }\n  ],\n  "itinerary": {\n    "day1": {\n      "theme": "South Goa Relaxation & Exploration",\n      "time": "9:00 AM to 9:00 PM",\n      "locations": [\n        {\n          "placeName": "Breakfast at The Leela Goa",\n          "placeDetails": "Start the day with a luxurious breakfast at your hotel.",\n          "placeImageUrl": "https://www.theleela.com/theleela/images/home/goa-hotel.jpg",\n          "geoCoordinates": {\n            "latitude": 15.1232,\n            "longitude": 73.9702\n          },\n          "ticketPricing": "Included in Hotel Price",\n          "rating": 4.8,\n          "timeTravel": "0 minutes",\n          "TimeToVisit": "9:00 AM - 10:00 AM"\n        },\n        {\n          "placeName": "Mobor Beach",\n          "placeDetails": "Relax on the pristine sands, enjoy water sports, or take a dolphin-watching tour.",\n          "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Goa_Beach_India.jpg/1280px-Goa_Beach_India.jpg",\n          "geoCoordinates": {\n            "latitude": 15.1198,\n            "longitude": 73.9695\n          },\n          "ticketPricing": "Free (water sports extra)",\n          "rating": 4.4,\n          "timeTravel": "15 minutes",\n          "TimeToVisit": "10:00 AM - 1:00 PM"\n        },\n        {\n          "placeName": "Lunch at Fisherman\'s Wharf",\n          "placeDetails": "Enjoy fresh seafood and Goan specialties with waterfront views.",\n          "placeImageUrl": "https://b.zmtcdn.com/data/pictures/5/90325/901b2d39b97e41f0982788f44c582c61.jpg",\n          "geoCoordinates": {\n            "latitude": 15.2542,\n            "longitude": 73.9778\n          },\n          "ticketPricing": "1500-3000 INR per person",\n          "rating": 4.5,\n          "timeTravel": "30 minutes",\n          "TimeToVisit": "1:00 PM - 2:30 PM"\n        },\n        {\n          "placeName": "Dudhsagar Falls (Jeep Safari)",\n          "placeDetails": "Take a thrilling jeep safari through the jungle to reach the magnificent Dudhsagar Falls.",\n          "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Dudhsagar_Falls_in_Monsoon.jpg/1280px-Dudhsagar_Falls_in_Monsoon.jpg",\n          "geoCoordinates": {\n            "latitude": 15.3103,\n            "longitude": 74.3152\n          },\n          "ticketPricing": "2500-3500 INR per person (including jeep safari)",\n          "rating": 4.3,\n          "timeTravel": "2 hours (to reach the starting point) + 3-4 hours for the safari",\n          "TimeToVisit": "2:30 PM - 7:30 PM (Consider starting earlier for a less rushed experience)"\n        },\n        {\n          "placeName": "Dinner at Martin\'s Corner",\n          "placeDetails": "Enjoy traditional Goan cuisine in a lively atmosphere.",\n          "placeImageUrl": "https://content3.jdmagicbox.com/comp/goa/x1/0832px832.x832.180906192315.b6x1/catalogue/martin-s-corner-betalbatim-goa-multicuisine-restaurants-b332u4a4w8.jpg",\n          "geoCoordinates": {\n            "latitude": 15.2357,\n            "longitude": 73.9521\n          },\n          "ticketPricing": "1000-2500 INR per person",\n          "rating": 4.6,\n          "timeTravel": "45 minutes",\n          "TimeToVisit": "8:00 PM - 9:00 PM"\n        }\n      ]\n    },\n    "day2": {\n      "theme": "North Goa Beaches & Culture",\n      "time": "9:00 AM to 9:00 PM",\n      "locations": [\n        {\n          "placeName": "Breakfast at W Goa",\n          "placeDetails": "Start your day with breakfast at the hotel.",\n          "placeImageUrl": "https://cache.marriott.com/marriottassets/marriott/GOIWC/goiwc-the-kitchen-table-5782-hor-feat.jpg",\n          "geoCoordinates": {\n            "latitude": 15.5825,\n            "longitude": 73.7333\n          },\n          "ticketPricing": "Included in Hotel Price",\n          "rating": 4.6,\n          "timeTravel": "0 minutes",\n          "TimeToVisit": "9:00 AM - 10:00 AM"\n        },\n        {\n          "placeName": "Fort Aguada",\n          "placeDetails": "Explore the historic Portuguese fort with panoramic views of the Arabian Sea.",\n          "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Aguada_fort_Goa_India_DSC00013.JPG/1280px-Aguada_fort_Goa_India_DSC00013.JPG",\n          "geoCoordinates": {\n            "latitude": 15.5038,\n            "longitude": 73.7648\n          },\n          "ticketPricing": "Free",\n          "rating": 4.3,\n          "timeTravel": "30 minutes",\n          "TimeToVisit": "10:30 AM - 12:00 PM"\n        },\n        {\n          "placeName": "Calangute Beach",\n          "placeDetails": "Relax on the popular Calangute Beach and enjoy water sports.",\n          "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Calangute_Beach_Goa_India.jpg/1280px-Calangute_Beach_Goa_India.jpg",\n          "geoCoordinates": {\n            "latitude": 15.5327,\n            "longitude": 73.7627\n          },\n          "ticketPricing": "Free (water sports extra)",\n          "rating": 4.2,\n          "timeTravel": "15 minutes",\n          "TimeToVisit": "12:15 PM - 1:30 PM"\n        },\n        {\n          "placeName": "Lunch at Curlies Beach Shack, Anjuna",\n          "placeDetails": "Enjoy lunch with a view at this iconic beach shack.",\n          "placeImageUrl": "https://im1.dineout.co.in/images/uploads/restaurant/sharpen/1/a/n/r1085-15754414015de509f998095.jpg?w=1200",\n          "geoCoordinates": {\n            "latitude": 15.5664,\n            "longitude": 73.7413\n          },\n          "ticketPricing": "1000-2500 INR per person",\n          "rating": 4.4,\n          "timeTravel": "30 minutes",\n          "TimeToVisit": "1:30 PM - 2:30 PM"\n        },\n        {\n          "placeName": "Anjuna Flea Market (Wednesday Only)",\n          "placeDetails": "Shop for souvenirs, handicrafts, and clothing at the vibrant Anjuna Flea Market (open only on Wednesdays).",\n          "placeImageUrl": "https://www.holidify.com/images/cmsuploads/compressed/anjunafleamarket_20170712175549.jpg",\n          "geoCoordinates": {\n            "latitude": 15.5674,\n            "longitude": 73.7385\n          },\n          "ticketPricing": "Free (shopping costs vary)",\n          "rating": 4.3,\n          "timeTravel": "0 minutes",\n          "TimeToVisit": "2:30 PM - 5:00 PM"\n        },\n        {\n          "placeName": "Chapora Fort",\n          "placeDetails": "Visit the famous Chapora Fort, known for its scenic views and Bollywood connection.",\n          "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Chapora_Fort%2C_Goa.jpg/1280px-Chapora_Fort%2C_Goa.jpg",\n          "geoCoordinates": {\n            "latitude": 15.5903,\n            "longitude": 73.7447\n          },\n          "ticketPricing": "Free",\n          "rating": 4.1,\n          "timeTravel": "15 minutes",\n          "TimeToVisit": "5:15 PM - 6:30 PM"\n        },\n        {\n          "placeName": "Dinner at Antares Restaurant & Beach Club, Vagator",\n          "placeDetails": "Enjoy a fine dining experience with stunning sunset views at this popular restaurant.",\n          "placeImageUrl": "https://b.zmtcdn.com/data/pictures/5/18455625/2a9d466ca458f7636e702f162856e32d.jpg",\n          "geoCoordinates": {\n            "latitude": 15.5848,\n            "longitude": 73.7311\n          },\n          "ticketPricing": "2000-4000 INR per person",\n          "rating": 4.5,\n          "timeTravel": "10 minutes",\n          "TimeToVisit": "7:00 PM - 9:00 PM"\n        }\n      ]\n    },\n    "day3": {\n      "theme": "Luxury & Departure",\n      "time": "9:00 AM to 3:00 PM",\n      "locations": [\n        {\n          "placeName": "Breakfast at your Hotel",\n          "placeDetails": "Enjoy a leisurely breakfast at your Hotel.",\n          "placeImageUrl": "https://www.theleela.com/theleela/images/home/goa-hotel.jpg",\n          "geoCoordinates": {\n            "latitude": 15.1232,\n            "longitude": 73.9702\n          },\n          "ticketPricing": "Included in Hotel Price",\n          "rating": 4.8,\n          "timeTravel": "0 minutes",\n          "TimeToVisit": "9:00 AM - 10:00 AM"\n        },\n        {\n          "placeName": "Spa Treatment",\n          "placeDetails": "Enjoy a relaxing spa treatment to recover.",\n          "placeImageUrl": "https://media.cntraveler.com/photos/5c16e171d446e36c50975907/16:9/w_2560%2Cc_limit/The-Leela-Goa_Spa_treatment-room_Leela-Goa.jpg",\n          "geoCoordinates": {\n            "latitude": 15.1232,\n            "longitude": 73.9702\n          },\n          "ticketPricing": "4000-8000 INR per person",\n          "rating": 4.7,\n          "timeTravel": "15 minutes",\n          "TimeToVisit": "10:00 AM - 12:00 PM"\n        },\n        {\n          "placeName": "Departure/Lunch",\n          "placeDetails": "Check out of your hotel, grab lunch nearby and head to the airport.",\n          "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Goa_Beach_India.jpg/1280px-Goa_Beach_India.jpg",\n          "geoCoordinates": {\n            "latitude": 15.1198,\n            "longitude": 73.9695\n          },\n          "ticketPricing": "500-1500 INR per person",\n          "rating": 4.0,\n          "timeTravel": "30 minutes",\n          "TimeToVisit": "12:00 AM - 1:00 PM"\n        }\n      ]\n    }\n  }\n}\n```',
        },
      ],
    },
  ],
});
