import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import {
  AI_Prompt,
  SelectBudgetOptions,
  SelectTravelsList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/service/AIModal";
import { useGoogleLogin, useGoogleOAuth } from "@react-oauth/google";
import axios from "axios";
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router";
import Header from "@/components/Custom/Header";

function CreatrTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDailog, setOpenDialog] = useState(false);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeRes) => GetUserProfile(codeRes),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      // openDailog(true)
      toast("Sign in First");
      return;
    }
    if (
      !formData?.Destination ||
      !formData?.Budget ||
      !formData?.Traveler ||
      !formData?.noOfDays ||
      formData?.noOfDays > 5 ||
      formData?.noOfDays <= 0
    ) {
      toast("Please fill all details and no. of days should be less than 5");
      return;
    }
    setloading(true);
    toast("Please wait we are generating your trip, Happy Travelling");
    const FINAL_PROMPT = AI_Prompt.replace("{location}", formData?.Destination)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.Traveler)
      .replace("{budget} ", formData?.Budget)
      .replace("{totalDays}", formData?.noOfDays);
    console.log(FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result.response?.text());
    setloading(false);
    saveAITrip(result.response?.text());
  };

  const saveAITrip = async (TripData) => {
    setloading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setloading(false);
    navigate("/view-trip/" + docId);
  };

  const GetUserProfile = (tokeninfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokeninfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 mb-10">
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip will generate a
        customizes itinerary on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is destination of choice?
          </h2>

          {/* <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                console.log(v);
                handleInputChange("Destination", v);
              },
            }}
          /> */}

          <Select
            onValueChange={(e) => {
              setPlace(e);
              handleInputChange("Destination", e);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ahmedabad">Ahmedabad</SelectItem>
              <SelectItem value="Alappuzha">Alappuzha</SelectItem>
              <SelectItem value="Amritsar">Amritsar</SelectItem>
              <SelectItem value="Aurangabad">Aurangabad</SelectItem>
              <SelectItem value="Bengaluru">Bengaluru</SelectItem>
              <SelectItem value="Bhopal">Bhopal</SelectItem>
              <SelectItem value="Bhubaneswar">Bhubaneswar</SelectItem>
              <SelectItem value="Chandigarh">Chandigarh</SelectItem>
              <SelectItem value="Chennai">Chennai</SelectItem>
              <SelectItem value="Darjeeling">Darjeeling</SelectItem>
              <SelectItem value="Delhi">Delhi</SelectItem>
              <SelectItem value="Goa">Goa</SelectItem>
              <SelectItem value="Guwahati">Guwahati</SelectItem>
              <SelectItem value="Gwalior">Gwalior</SelectItem>
              <SelectItem value="Haridwar">Haridwar</SelectItem>
              <SelectItem value="Hyderabad">Hyderabad</SelectItem>
              <SelectItem value="Jaipur">Jaipur</SelectItem>
              <SelectItem value="Jaisalmer">Jaisalmer</SelectItem>
              <SelectItem value="Jodhpur">Jodhpur</SelectItem>
              <SelectItem value="Kochi">Kochi</SelectItem>
              <SelectItem value="Kodaikanal">Kodaikanal</SelectItem>
              <SelectItem value="Kolkata">Kolkata</SelectItem>
              <SelectItem value="Leh">Leh</SelectItem>
              <SelectItem value="Lonavala">Lonavala</SelectItem>
              <SelectItem value="Lucknow">Lucknow</SelectItem>
              <SelectItem value="Madurai">Madurai</SelectItem>
              <SelectItem value="Mahabalipuram">Mahabalipuram</SelectItem>
              <SelectItem value="Manali">Manali</SelectItem>
              <SelectItem value="Mount Abu">Mount Abu</SelectItem>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
              <SelectItem value="Mysore">Mysore</SelectItem>
              <SelectItem value="Nainital">Nainital</SelectItem>
              <SelectItem value="Nagpur">Nagpur</SelectItem>
              <SelectItem value="Nashik">Nashik</SelectItem>
              <SelectItem value="Ooty">Ooty</SelectItem>
              <SelectItem value="Pondicherry">Pondicherry</SelectItem>
              <SelectItem value="Pune">Pune</SelectItem>
              <SelectItem value="Puri">Puri</SelectItem>
              <SelectItem value="Rameswaram">Rameswaram</SelectItem>
              <SelectItem value="Rishikesh">Rishikesh</SelectItem>
              <SelectItem value="Shimla">Shimla</SelectItem>
              <SelectItem value="Siliguri">Siliguri</SelectItem>
              <SelectItem value="Srinagar">Srinagar</SelectItem>
              <SelectItem value="Surat">Surat</SelectItem>
              <SelectItem value="Thiruvananthapuram">
                Thiruvananthapuram
              </SelectItem>
              <SelectItem value="Tirupati">Tirupati</SelectItem>
              <SelectItem value="Udaipur">Udaipur</SelectItem>
              <SelectItem value="Varkala">Varkala</SelectItem>
              <SelectItem value="Varanasi">Varanasi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip
          </h2>
          <Input
            type="number"
            placeholder="eg.3"
            onChange={(e) =>
              handleInputChange("noOfDays", Number(e.target.value))
            }
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("Budget", item.title)}
              className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg active:border-sky-800 ${
                formData?.Budget == item.title && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">
          Who do you plan on travelling with on your next adventure?
        </h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("Traveler", item.people)}
              className={`cursor-pointer p-4 border rounded-lg hover:shadow-lg active:border-sky-800 ${
                formData?.Traveler == item.people && "shadow-lg border-black"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 flex justify-end">
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Genrate Trip"
          )}
        </Button>
      </div>
      <Dialog open={openDailog}>
        {/* <DialogTitle >Sign in</DialogTitle> */}
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo2.svg" alt="company logo" />
              <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
              <p>Sign in to the app with Google Authentication securley</p>
              <Button onClick={login} className="w-full mt-5 flex gap-5">
                <FcGoogle className="h-7 w-7" /> Sign in
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreatrTrip;
