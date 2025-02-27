import { GetPlacesDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

function PlaceCardItem(place, index) {
  // console.log("PlaceCard ", place);

  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    place && GetplacePhoto();
  }, [place]);
  const GetplacePhoto = async () => {
    const data = {
      textQuery: place?.place?.placeName,
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
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        place?.place?.placeName +
        "," +
        place?.place?.geoCoordinates.latitude +
        "," +
        place?.place?.geoCoordinates.longitude
      }
      target="_blank"
      key={index}
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-110 transition-all cursor-pointer hover:shadow-md">
        <img
          src={photoUrl ? photoUrl : "/placeholder.jpg"}
          alt="places"
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />
        <div>
          <h2 className="font-bold text-lg">{place?.place?.placeName}</h2>
          <p className="text-sm text-gray-400 ">{place?.place?.placeDetails}</p>
          <p className="mt-2"> 🕔{place?.place?.timeTravel}</p>
          <p>💵 {place?.place?.ticketPricing}</p>
          <p>⭐ {place?.place?.rating}</p>
        </div>
      </div>
    </Link>
  );
}
9;

export default PlaceCardItem;
