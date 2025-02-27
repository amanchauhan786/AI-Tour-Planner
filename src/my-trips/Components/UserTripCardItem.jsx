import { GetPlacesDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

function UserTripCardItem(trip, index) {
  console.log(trip);
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    trip && GetplacePhoto();
  }, [trip]);

  const GetplacePhoto = async () => {
    const data = {
      textQuery: trip?.trip?.userSelection?.Destination,
    };
    const result = await GetPlacesDetails(data).then((resp) => {
      console.log(resp.data.places[0].photos[3].name);
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[3].name
      );
      console.log(PhotoUrl);
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link key={index} to={"/view-trip/" + trip?.trip?.id}>
      <div className="hover:scale-105 transition-all">
        <img
          src={photoUrl ? photoUrl : "/placeholder.jpg"}
          alt="trips"
          className="object-cover rounded-xl h-[220px]"
        />
        <div>
          <h2 className="font-bold text-lg">
            {trip?.trip?.userSelection?.Destination}
          </h2>
          <h2>
            {trip?.trip?.userSelection.noOdDays} Days trip with{" "}
            {trip?.trip?.userSelection.Budget} Budget{" "}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
