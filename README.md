Of course. Here is a more elaborate and detailed README file for your **VIHARA - AI Tour Planner** project, incorporating the comprehensive information from the project report you provided. This version is designed to be a thorough showcase for your GitHub profile.

# VIHARA - AI Tour Planner

**Live Demo:** **[vihara-ai-tour-planner.vercel.app](https://vihara-ai-tour-planner.vercel.app/)**

**GitHub Repository:** **[amanchauhan786/AI-Tour-Planner](https://github.com/amanchauhan786/AI-Tour-Planner)**

VIHARA is an innovative, AI-powered web application designed to revolutionize the travel planning experience. It provides travelers with a seamless, all-in-one platform to generate personalized holiday and tour itineraries effortlessly. By leveraging Google's Gemini AI, VIHARA considers user preferences for destination, budget, trip duration, and travel style to create customized and optimized travel plans[1].

This project was developed as part of the Software Engineering course at Vellore Institute of Technology (VIT) and showcases a full-stack application with a modern, responsive user interface and a robust backend architecture[1].

### The Problem

In today's digital age, travel planning has become overly complex. Travelers face an overwhelming number of options for flights, hotels, and activities, spread across countless websites. This fragmentation makes it difficult and time-consuming to create a cohesive and personalized itinerary that fits a specific budget and interest[1].

*   **For a solo adventurer**, finding unique, off-the-beaten-path experiences requires extensive research beyond typical tourist traps[1].
*   **For a family**, planning a vacation involves balancing the interests of different age groups, ensuring safety, and finding family-friendly accommodations and activities[1].

### The Solution: VIHARA

VIHARA addresses these challenges by acting as a centralized, intelligent travel curator. It simplifies the entire planning process into a single, intuitive interface. Users simply input their preferences, and VIHARA's AI engine does the heavy lifting, delivering a complete, day-by-day itinerary in seconds[1].

## Key Features

The platform is packed with features designed to create a comprehensive and user-friendly planning experience:

*   **AI-Powered Itinerary Generation:** At its core, VIHARA uses a sophisticated AI prompt to the Google Gemini API to generate detailed daily plans based on user inputs[1].
*   **Deep Personalization:** Users can specify their destination, trip duration, budget (Cheap, Moderate, Luxury), and travel style (Solo, Couple, Family, Friends) for truly tailored results[1].
*   **Hotel and Activity Recommendations:** The generated plan includes suggestions for hotels, sightseeing spots, and dining, complete with estimated costs and images fetched from the Google Places API[1].
*   **Weather-Based Recommendations:** The system is designed to integrate real-time weather data, allowing it to suggest itinerary adjustments based on the forecast, such as proposing indoor activities on a rainy day[1].
*   **Secure Google Authentication:** Easy and secure login/signup process using Google OAuth 2.0, allowing users to save and manage their trips[1].
*   **Trip History:** Signed-in users can access a history of their previously generated travel plans for future reference[1].
*   **Integrated Payment Gateway:** Features a Razorpay integration for handling payments, designed for future premium features or booking capabilities[1].
*   **Responsive and Intuitive UI:** Built with React and Vite, the user interface is clean, modern, and fully responsive, ensuring a seamless experience on desktops, tablets, and mobile devices[1].

## Tech Stack & Architecture

VIHARA is built on a modern, full-stack architecture designed for performance, scalability, and maintainability.

| Area | Technology / Service |
| :--- | :--- |
| **Frontend** | React, Vite, JavaScript, HTML5, CSS3, Axios for API calls[1] |
| **AI & APIs**| Google Gemini API (for itinerary generation), Google Places API (for location details)[1] |
| **Backend** | Go (as specified in the project design for API services)[1][2] |
| **Database** | Firebase/Firestore (for user data, trip history, and real-time updates)[1] |
| **Authentication** | Google OAuth 2.0[1] |
| **Payments** | Razorpay[1] |

The system operates via a clear data flow: the user's travel preferences are sent from the React frontend to the backend, which constructs a detailed prompt for the Google Gemini API. The AI's response is then parsed and enriched with data from the Google Places API before being displayed to the user[1].

## Quality Assurance & Testing

The project underwent a thorough testing process to ensure functional integrity, usability, and performance.

*   **Strategy:** The testing strategy included manual and automated testing covering functional, usability, performance, security, and compatibility aspects[1].
*   **Tools Used:** A comprehensive set of tools was employed, including **Selenium** for automation, **Jest** and **React Testing Library** for component testing, **Postman** for API validation, and **Google Lighthouse** for performance audits[1].
*   **Coverage:** Test cases were designed to cover user registration, itinerary generation, external service integrations (Google Maps), and security vulnerabilities like SQL injection and XSS[1].

## Getting Started (Local Development)

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/amanchauhan786/AI-Tour-Planner.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd AI-Tour-Planner
    ```
3.  **Install the dependencies:**
    ```sh
    npm install
    ```
4.  **Set up environment variables:** Create a `.env` file in the root directory and add your API keys. These are required for the application to connect to Google's services[1].
    ```env
    VITE_GOOGLE_PLACES_API_KEY=YOUR_GOOGLE_PLACES_API_KEY
    VITE_GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    ```
5.  **Run the development server:**
    ```sh
    npm run dev
    ```
6.  Open your browser and navigate to `http://localhost:5173`.

## Team Members

This project was a collaborative effort by[1]:

*   **Aditya Shriwal**
*   **Aman Chauhan**
*   **Archit Yadav**

## Acknowledgments

We extend our heartfelt gratitude to our supervisor, **Prof. Yoganand S.**, and **Vellore Institute of Technology (VIT)** for their continuous guidance, motivation, and support throughout the development of this project[1].

