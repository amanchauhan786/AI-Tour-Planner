import React from "react";
import { Link } from "react-router";
import HotelCardItem from "./HotelCardItem";

function Hotels(trip) {
  // console.log("hotels: ", trip);

  return (
    <div>
      <h2 className="font-bold text-[30px] my-5">Hotel Recommendation</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-5">
        {trip?.trip?.tripData?.hotels?.map((hotel, index) => (
          <HotelCardItem hotel={hotel} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Hotels;
