import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import InfoSection from "../Components/InfoSection";
import Hotels from "../Components/Hotels";
import PlacesToVisit from "../Components/PlacesToVisit";

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

  return (
    <div className="p-10 md:px-20 lg:px-44 xl:px-56">
      {/* Information Section */}
      <InfoSection trip={trip} />
      {/* Recommended Hotels */}
      <Hotels trip={trip} />
      {/* Daily Plan */}
      <PlacesToVisit trip={trip} />
    </div>
  );
}

export default Viewtrip;
