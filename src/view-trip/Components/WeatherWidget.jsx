import React from "react";

const WeatherWidget = (trip) => {
  const months = [
    { name: "Jan", temp: "5/24°C", aqi: 27 },
    { name: "Feb", temp: "3/26°C", aqi: 19 },
    { name: "Mar", temp: "6/31°C", aqi: 12 },
    { name: "Apr", temp: "6/35°C", aqi: 11 },
    { name: "May", temp: "10/38°C", aqi: 20 },
    { name: "Jun", temp: "15/41°C", aqi: 20 },
    { name: "Jul", temp: "18/41°C", aqi: 10 },
    { name: "Aug", temp: "19/42°C", aqi: 13 },
    { name: "Sep", temp: "17/41°C", aqi: 19 },
    { name: "Oct", temp: "15/34°C", aqi: 13 },
    { name: "Nov", temp: "8/31°C", aqi: 22 },
    { name: "Dec", temp: "9/21°C", aqi: 37 },
  ];

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        Weather in {trip?.trip?.userSelection?.Destination}
      </h2>
      <div className="flex overflow-x-auto space-x-4">
        {months.map((month, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg flex-shrink-0 w-27 border ${
              month.highlight ? "bg-green-100 border border-green-400" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">{month.name}</span>
              <span className="text-yellow-500 text-xl">☀️</span>
            </div>
            <p className="text-gray-700">{month.temp}</p>
            <div className="mt-2">
              <span
                className={`px-2 py-1 rounded-full text-white ${
                  month.aqi <= 20
                    ? "bg-green-500"
                    : month.aqi <= 30
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
              >
                AQI {month.aqi}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Best time to visit */}
      {/* <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded-lg">
        <p className="text-green-700 font-medium">
          🏆 Best time to visit March - May
        </p>
      </div> */}
    </div>
  );
};

export default WeatherWidget;
