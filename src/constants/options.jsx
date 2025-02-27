export const SelectTravelsList=[
    {
        id:1,
        title:'Just me',
        desc:'A sole travels in exploration',
        icon:'✈️',
        // icon:'✈',
        people:'1 person'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Two travels in tandem',
        icon:'🍻',
        people:'2 people'
    },
    {
        id:3,
        title:'Family',
        desc:'A group of fun loving adv',
        icon:'🚗',
        people:'3 to 5 people'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:'🚌',
        people:'5 to 10 people'
    }
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap ',
        desc:'Stay conscious of costs',
        icon:'💵'
    },
     {
        id:2,
        title:'Moderate ',
        desc:'Keep cost on the average side',
        icon:'💰'
    },
     {
        id:3,
        title:'Luxury ',
        desc:"Don't worry about cost",
        icon:'💸'
    }
]

export const AI_Prompt = `Generate Travel Plan for Location:{location}, for {totalDays} Days for {traveler} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.`;