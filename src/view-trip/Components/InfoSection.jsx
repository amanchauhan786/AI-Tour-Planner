import { Button } from "@/components/ui/button";
import { GetPlacesDetails, PHOTO_REF_URL } from "../../service/GlobalApi";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

function InfoSection(trip) {
  // console.log("info: ", trip);

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
    <div>
      <img
        src={photoUrl ? photoUrl : "/placeholder.jpg"}
        alt="trip"
        className=" h-[340px] w-full object-cover rounded"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.trip?.userSelection?.Destination}
          </h2>
          <div className="hidden sm:flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              📅{trip?.trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              💰{trip?.trip?.userSelection?.Budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500">
              🥂 No. of Traveler: {trip?.trip?.userSelection?.Traveler}
            </h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
