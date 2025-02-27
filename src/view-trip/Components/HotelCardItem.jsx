import { GetPlacesDetails, PHOTO_REF_URL } from "@/service/GlobalAPI";
import React, { useState, useEffect } from "react";
import { Link } from "react-router";

function HotelCardItem(hotel, index) {
  //   console.log("hotel card", hotel);
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && GetplacePhoto();
  }, [hotel]);

  const GetplacePhoto = async () => {
    const data = {
      textQuery: hotel?.hotel?.hotelName,
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
        hotel?.hotel?.hotelName +
        "," +
        hotel?.hotel?.hotelAddress
      }
      target="_blank"
      key={index}
    >
      <div
        className="hover:scale-110 transition-all cursor-pointer"
        key={index}
      >
        <img
          src={photoUrl ? photoUrl : "/placeholder.jpg"}
          alt="hotel"
          className="rounded-xl h-[180px] w-full object-cover"
        />
        <div className="my-2">
          <h2 className="font-medium">{hotel?.hotel?.hotelName}</h2>
          <h2 className="font-medium">📌{hotel?.hotel?.hotelAddress}</h2>
          <h2 className="text-sm">💰 ₹{hotel?.hotel?.price}</h2>
          <h2 className="text-sm">⭐ {hotel?.hotel.rating}</h2>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
