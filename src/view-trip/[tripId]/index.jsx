import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import InfoSection from "../Components/InfoSection";
import Hotels from "../Components/Hotels";
import PlacesToVisit from "../Components/PlacesToVisit";

const cityStateMap = {
  "Ahmedabad": "Gujarat",
  "Alappuzha": "Kerala",
  "Amritsar": "Punjab",
  "Aurangabad": "Maharashtra",
  "Bengaluru": "Karnataka",
  "Bhopal": "Madhya Pradesh",
  "Bhubaneswar": "Odisha",
  "Chandigarh": "Chandigarh",
  "Chennai": "TamilNadu",
  "Darjeeling": "WestBengal",
  "Delhi": "Delhi",
  "Goa": "Goa",
  "Guwahati": "Assam",
  "Gwalior": "MadhyaPradesh",
  "Haridwar": "Uttarakhand",
  "Hyderabad": "Telangana",
  "Jaipur": "Rajasthan",
  "Jaisalmer": "Rajasthan",
  "Jodhpur": "Rajasthan",
  "Kochi": "Kerala",
  "Kodaikanal": "TamilNadu",
  "Kolkata": "WestBengal",
  "Leh": "Ladakh",
  "Lonavala": "Maharashtra",
  "Lucknow": "UttarPradesh",
  "Madurai": "TamilNadu",
  "Mahabalipuram": "TamilNadu",
  "Manali": "HimachalPradesh",
  "Mount Abu": "Rajasthan",
  "Mumbai": "Maharashtra",
  "Mysore": "Karnataka",
  "Nainital": "Uttarakhand",
  "Nagpur": "Maharashtra",
  "Nashik": "Maharashtra",
  "Ooty": "TamilNadu",
  "Pondicherry": "Pondicherry",
  "Pune": "Maharashtra",
  "Puri": "Odisha",
  "Rameswaram": "TamilNadu",
  "Rishikesh": "Uttarakhand",
  "Shimla": "HimachalPradesh",
  "Siliguri": "WestBengal",
  "Srinagar": "JammuKashmir",
  "Surat": "Gujarat",
  "Thiruvananthapuram": "Kerala",
  "Tirupati": "AndhraPradesh",
  "Udaipur": "Rajasthan",
  "Varkala": "Kerala",
  "Varanasi": "UttarPradesh"
};

function Viewtrip() {
  const { tripId } = useParams();

  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId, setTrip]);

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log(
      //   "Document from docsnap: ",
      //   docSnap.data(),
      //   "type: ",
      //   typeof docSnap.data()
      // );
      setTrip(docSnap.data());
      // console.log("trip", trip, typeof trip);
    } else {
      console.log("No Such Document");
      toast("No Trip Found");
    }
  };

  const getWeatherImage = (city) => {
    const state = cityStateMap[city];
    if (state) {
      try {
        const image = await import(`../assets/weather/${state.toLowerCase()}.png`);
        return image.default;
      } catch (error) {
        console.error(`Weather image for ${city} (${state}) not found.`);
        return null; // Default image or null if not found
      }
    }
    return null;
  };
  
  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information Section */}
      <InfoSection trip={trip} />
      
      {/* Weather Image */}
      {trip?.trip?.userSelection?.Destination && (
        <div className="weather-image">
          <img src={getWeatherImage(trip?.trip?.userSelection?.Destination)} alt={`${trip?.trip?.userSelection?.Destination} weather`} />
        </div>
      )}
      
      {/* Recommended Hotels */}
      <Hotels trip={trip} />
      {/* Daily Plan */}
      <PlacesToVisit trip={trip} />
    </div>
  );
}

export default Viewtrip;
