import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit(trip) {
  let cnt = 1;
  // console.log("Places to Visit: ", trip);

  return (
    <div>
      <h2 className="font-bold mt-4 text-[30px]">Places to Visit</h2>
      <div>
        {Object.keys(trip?.trip?.tripData?.itinerary || {}).map(
          (keyname, keyindex) => {
            const day = "day" + cnt;
            return (
              <div key={keyindex}>
                <h2 className="font-bold text-lg">Day {cnt++}</h2>
                <h2 className="font-bold text-md">
                  Theme: {trip?.trip?.tripData?.itinerary?.[day]?.theme}
                </h2>
                <h2 className="font-bold text-sm">
                  Duration: {trip?.trip?.tripData?.itinerary?.[day]?.time}
                </h2>
                <div className="grid md:grid-cols-2 my-5 gap-6">
                  {trip?.trip?.tripData?.itinerary?.[day]?.locations?.map(
                    (place, index) => (
                      <div key={index} className="my-3">
                        <h2 className="font-medium text-sm text-orange-600">
                          {place.TimeToVisit}
                        </h2>
                        <PlaceCardItem place={place} index={index} />
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;
