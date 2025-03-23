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
import { useNavigate, useNavigation } from "react-router";
import Header from "@/components/Custom/Header";
import { collection, getDocs, query, where } from "firebase/firestore";

function CreatrTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDailog, setOpenDialog] = useState(false);
  const [loading, setloading] = useState(false);
  const [userTrips, setUserTrips] = useState([]);

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

  //Getting user trip details
  useEffect(() => {
    GetUserTrips();
  }, []);

  const navigation = useNavigation();

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigation("/");
      return 0;
    }

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user.email)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  };

  //Generating trip using AI
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
    const tripCount = await GetUserTrips();

    if (tripCount >= 2) {
      toast("Free trial finished. Purchase premium.");
      var options = {
        key: "rzp_test_vv1FCZvuDRF6lQ",
        key_secret: "P4JAUwn4VdE6xDLJ6p2Zy8RQ",
        amount: 1,
        currency: "INR",
        name: "VIHARA",
        description: "for testing purpose",
        handler: function (response) {
          const paymentId = response.razorpay_payment_id;
          console.log("paymant id", paymentId, shipping_address);
        },
        theme: {
          color: "#07a291db",
        },
      };
      var pay = new window.Razorpay(options);
      pay.open();
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
    console.log("Creation: ", typeof result.response?.text());
    setloading(false);
    saveAITrip(result.response?.text());
  };

  //setting static images
  const setImagedata = (TripData) => {
    let images = [
      "https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc=",
      "data:image/jpeg;base64,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",
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAzgMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAEBQMGAAECB//EAEAQAAIBAwMBBgQDBAcIAwAAAAECAwAEEQUSITEGEyJBUWEUcYGRMkKhI7HB8AcVUmKy0eEkJjM1coKS8TRTVP/EABoBAAIDAQEAAAAAAAAAAAAAAAMEAAECBQb/xAAoEQACAgEEAgMAAQUBAAAAAAABAgARAwQSITETQSIyURQFQmFxgRX/2gAMAwEAAhEDEQA/AKdY6m9rJ3qRAJjw7ifCR7df1qzaF2rIiKag+7bn9oq+nliq1q82nuwjgLqoHULweOn60X2e0ZtQuWJAECBiyM/iwD1wPLnH0NAxDIhpIBiDyZeYddsJ7lbbvD3jjcoKnBFMjzyOlUa07Pi6uElTvO5Vv+HyCvPn74/nir3GhWNQTuIGM+tdbGzHuLkC+JERUbLRJWuGUedEmDBCKjZaKZPagr+8tNPjEl5OkSn8IY8t8h1NXurmZokzlhQt5PDaQma5lSKP+05wD7Uj1HtTI+VsoRAnlLcDLH/pjHT6kfKkLXhluRMyNc3P5ZbhtxHsB0HyFAyatVHxh00zH7R9Pq89wSumW5VTx8Tc+FfovU/XFd6dbvbagl7eytdzxg7VlXMZBBBwo4HX91JrS+ubi+tIO+KLdyMoCcDjr1+VMZbC5+IaNpWKdBjiubmzZcvBPEdxY8ePkS32V1p2oTrbzaZCJnzt7iZkY/Q7qLm7L2soJtrmeE/2Zoww/wDJf8qWdgbCODtHaMqjJL8nr+E16leWMFxGVkXk8ZBwfvSynNjPxaFPjbtZ5Xc9ltRQFrdEuo8ZJhbdj6daSTQtG5SRSrA4IIwRXqdxpVvbs7GSQIoUhhglSSfP6UDPC94GQtb6ig/I4/aAfP8AEKZT+qZk4yC4JtGjcqanmZXj2rgrVvvuz9rcOfgZTBcf/nuDwfk/+eKrl7ZT2c7Q3MTRyL1VhXV0+sxZx8TzEsuB8fcA21m2piuD05rW2mjBXIcVvbUu2s21Uu5HtroLXYFdhakq5wFroLUgWuwtVKuVTUtJvZrc3aq8kaAbm88eXHr70T2Xur+wu7cxybT4nEL/AJxxnPn+b7jpV417SbqLRGgsYiQ2QyKBkqOgHpVK0Ds7q2q6lCzwSxWhRd7kkYGP31yPGUIIjam15nq1iiNCsqqoZh4thyCanK1DpOmppdilrEzMi9N3lUetW+pT2hTSbqG3mzy0i5yMdAecc+eD/GnQTVwFWZFqepWWlopvZ1jZhlU6s3yUcmqVqnbmVpQtlAI4lYEqSGkYA8g44TP/AHH5Umu9H1SO7kg1IGNyfGQ5cyY4DFjyw+dSxaUDbTYXPhZQfIDavn8yaWfK7cRhMajmMLvthqKOwi3W5dShDwqxXPmCTjPvtqvb7iV2cF+9bIeRmLOeM8seatmt2SSLL4c8HA8z8qV29nHEMOyruc8AbjnuunHQ+fNBsnswvA6ETC1fu45RjDGI/R2A5ppbaYWu7d40PdxXMpY44UbMcn5mpG7qGOOSG37xGa2wZucgtgeHoMZz50U4mfULPMzOq3M/hJ4K93jHHvVlVHUqzOdPtLZNY0VpbiPvRJJ3UaDfuJLZ8XQY/fVlu4h8QTiq7p+lldZ0N8LGLd5SULBSSzE/h+VWm6/45+VVXMlw/smuNftDjzb/AAmvR3OFzjPtmvO+yv8Az21+bf4TXobHj/TpQcv2m05Eqeoz3suoy20LkRCONpS3BUMThRjOfOiY4reMv3SR4A7smNRE/X0/CentWrx44NWud5RzNDCoAGShBYZI8vaov6sZbaXY3ff7SWJVu8xyfPqKTYcxlTYnYszdRyxzzxvKBmMSRlHPsQevpnJoXVdMtpIjZXxyVGEfGTFnpg+ntR9uksovzLiRYpCyocMPPjnp9MVWO3DzQ6s1nHNL3CIpVSx6kc89T8qJptO2RxtNGYy5Qi/LkSqXds9tcSQSY3RsVODkcHyqArRJWudlenWwKM4x74kG2t7am2Vm2pclyILz7V2qjOB+taucJbuxbYAPx4zj6UhbUCrkGQSheFb1z04PzFKanUnD0IbHj3ywhcY5BzUmADg1XBfSDAR9pHQHg5qQX43sr75Spx4Sfv8AKlv/AEPjYEINN/mexLNbuMpMjcleD5jyrpVDfg5HtQdySgjjto0YY6E4CgccDBzyRxx5813dpvXu5ZXWMthShII6efrnHNLfz2/Iz/EH7CNvkK5K1HaODEYImA2kAZJJPXnPXnzruN3ORIEXphgep9KPj1isaPEE+mZeuZTe1gA1keBSO7UHd5dfLpSNonnt3EpLKQUB6AAqn+tNu01w0uvIYDH3OCjmRPECFPTPA59qr3w/xNtbtO0tw/f7klc9BkY+nHlVsbMpRQqWDV499vINucqePX2pGe4s4mlmlREZyWx4znuwvQfxp7q+O4l3ruG0kg/mHpVaRLa10l0dooVkmLHcd2DtX+yCc1QEuSTSRQ3FmgtZJlmaAB3baqjIAIUemakS4vf66WBplW2YSbljUJ+UnJxzXN3d29vc2W9LhsGIqY0G3GQQfM+9KbnUpXmkm01E3sCgkUHPORnnoR8vOqLACzJzD9CtNvazT54neSNZX3kEsB4ccn61d7onvzn0qldntQvrvXbLErGNWzJGx2hePSrpdH9seegrKkNLMZdl/wDnlr82/wAJq/55qgdlv+d23sW/wmr68scKNJLjaoJ59vSgZ/uIbF9ZX9UCjW7xpQVV4rcxkcbyrP8Au/jSUQXNrbTtJLKkr3xdWBKNjnitXWpC/wBVmmVsFPhwg5wAWbdx6nP6Uui1PVWt7lpLhpD8e21ZRvGznjnpQTjs8witxLVYXtzci+a52yLbv3iKy84HPUYpH28X/eGT07pP3GmWi6gXOqu9rGvcsQ+1ipYfLkZrvtXo819qjTwSxZMSDY5IPn54x+6mdE643+RgdSpZaEozLXOymlxpN7BzJbPjHVRuH6UEU5IHOK7K5Fbo3OYVI7kGys2VNsPXHFY21cbmC5OBk4qFq7lCKdau5bGFZYk3gZLqVJBH29ar6RT3MpeO37kHxbN2APTK1Y9S1ExsIYIobhHHjDSgfTFKZ5EnfuoYXUnaCwfccnnzPKj51zs7qxoG43jBA5iYRyO+UjldUQjdklWYcnB4wMfuNTrdyxKkKJNBIgO90fax9B0PA9KsE8d7YRKYnlnQIoEYjZNvlycjjrQeiWtwtvL8Mky3cczJKkUndAL1GWJA4zjHX1oWwjgQ1giO7X+lCyaRDc6bPHhcExyKR1zxnHFWK47TaQUiSS6kjzh+6UZfjnnBOK8MLNtxnqcGtmdzKXSXLZwW86VOEHqGXMfc9nse12mSX90weffhXZO4C4I44OcY48vPNE32uyT28V1BHHAkRZ43uJB4jtI6YPTNUr+irTbPU76+n1IERqiCORpTGqvz6denT3oftpJDb6j8LaiRhGrJklmWXPpuyBg45U1ewAzW8lbuM9W1q3vr+C4tZpGj7sBwYgHbKnHPlyfWhI7eOeKFZGaV0uNxMjZZfEOOar1hMsNpLLOJg0TbECyHnI6mm9p8PfRpcXUsMEMUu9BJ+InIP2ouNje2LN+y06hhopFIJDDGKrnw8dtpbxFYYgZWYiWUKOi/P0qTW9XeK9EIjSaCZCw2DOPb3pbZNDLpXdyCFHeVnYkhVXgDqfpRBkG6pUl1mYJNbIt4qyBUMaIjeHAB3ZxjFLo0W5jnlW6XvVIJKcd4SccD1pnq00cRtu77p51VERSegIHJPTbSmwllit0jjcPJLIDyuAB+/wBemKFnYwmOr5jRFWyuIWvJZ2V2Bkih5dgMdccffn0q5RyROi9y7sgGBvyWHsc85qlaX3k+sQRSSHvWfx5XGQPTy8hVz7tYmCp7ZPrVadWB5kyV6jLs5qNrB2ktreWYLK+4LlDtyUOBnGPpSgdu9akvpoLqTFoDJubuhuUhiAM9MHjHzqrdorgy6jHLDbzARSIO+YNtkYHhVA/nmgry5N5DdzvcJFDuAlgkcK8kmMhgPTJ/Q/Oryi2uRSQs9De7u7yD4hIEaUzQxoFIKlmYjJI4OPTy5qfTbqXUJTbzaTDkEuQhMZ3qcZ44J60t7CXNvc6fPAzTNtaEulugWQOD4SCx2448jVlsBp0txqFuJJ4pgkqN3tvyMjxHIJ6EmlsjNfEYx7SOYTo11DfyX1vbRTxNMT3pbbtXy9uBzTjV7aWS/DxFGJRBjHi+45H3pT2ZtYYri6EF/BMehIVkYc9CD75oztBeWlvqCC4hlZlVH3RkH9P560IWU5hDQfiDyNeQ/iiJ4PIbHl7/AMTQl7qVooU6nbrtz1miyQNxHDLuP6ih01CQXo+EuLjupIkEYO4BSpJOfEV/MPL0z5Ugu9Re4lUvc20iEq2HwpzvbP8AZPkKJiRyeDUxkK+xD7jUuzhiMkUoLH8IhnDAfPrj5Zqg9pb+LUZYVhEoEROf2gKtk4+/H2NGa4bSCNYry2EU8iDYMHngH38/eqzbKS8jLHvRMEquRnn3+nvxTpZ623cVKLd1CIo98DxRxlCw5OR6jz/youxte6RWGe9U8KrY/iP86Fj/ANmtVO0PvjDrkkAHjPHljNZHFLtilKKc4w3ADZ+ePQ0myMDCcRpNq07TKhLMqtkxuC3RD/dPQ+LOfKgYtQk+Gka3WTvXnLSMhYE5HHQijp3js42V44jKDhYwFIIK8e/mKg0yAW1rLIWiErShXYAN5dOhx9hRy9gAyx+SHQOzljqOmST32oC0y/gwRjYPPn61bbb+iKxuLcSjXpIi34FaJckeWaSaLqfZ7TdMl79re9laLCxu5wpx6Ein/ZC7uO02ndpJ2Cn4ayxDKgKsJNrEAfLYef73lVF39CpAqrMs/wCj6/0xGi0/tRaRK5JYPb8nj1zVN1/TdQS+jFxqKPAZikU87FO9wQC4jALbc+eOfLNdaf2mutLvE1CYrcquSIZZGYHcMe/r6VbuyvaSHtbrd/Nc6FBJcw2ss+NwIAVRsjU4823c/LrUBc89yiFPU84tbS+1CW6+BVrgReNzHnnnGQDgn7fauO4vEdVMUvILDcPIdTir9a20FxFrt9pudP7q3S4HdOU2h8eA4PQYbr9aVaDZRy6lcvLcl45YirhpOcnj19/1ogMyyj1KvbTli8saswXjdj8OfOjITnYrRlQ7Z2MuAfqOvSrNqPZNLfV9YtreKRLexnTZ3THJVn4BJPO0Dz+tA9n4YNd13T9KdG/ayHL7vwrtPT6gUNvsKkC/G4tn768nDSSAQ7FXuvIYqYvMt9aTow/ZOqohTg8n79aBM9xFPJb3KRpNEWVkDAkMpII+4pnoEEuom8Mvdj4a0e5GGBxs5Pn6A+VGZFIuWhIMDW1aK4E/xEhkU7xnnB/kUwl1TUHOXupefRsfupZHdSyOUkihXYvVWyW58xk+hp9qejtbi1SAGSSa3SQqfdTnH1BrY4mTCuy15I884nuscLgzZYDn58U20/QNM1q87QvK8bTJe4icEgFRGM/Qk1WNFR47qeKUYcHYR6HOKu3Zq0S11HV7TgbLtWUnknO0Y+1J6gEEkRnDRABk/ZzQhNaTPBqt1Dcbgrk7HK7fw5BX19KkTRryHX2La1M+9S/7SJNsu4MGDqoGeRny6VH2P1ae5sfiiloBcXypIsEoZYiy+RBPmBx/e96Ej15tU1O1jmt7WO4nWZElhn3FWTnBweehBpcjJcOESS29n2msZbqO01mAzCYb2+HQNIpAbABHuPfqPSmeq6Vr19fxXL31lKsUWxY3iIUtjG7Hrznr1FVHVdcvrntFPE8VvBPA6IGWbgYP4mwDzyP0zimFz23vo9OmuoreD9hMbZsyfiIGdwPmTWmx5D1MA4xJdU0TVLcR3FxfaXCId0iqkT4ZyT+XOB1XyPAA8qp8tlfaeguLqwlltZU/ZNHKniPTy3EAdeQPSnN52ql1qewtZ4EQux8aSZJOAenlkE0s1af+rr1oZHTu16Nu4A46+nWmMSNVNBuyj6xpedv9SFum/TYkmjwI55bfJRQAOMjjOD96QT6tpl/ezXV3O0ZmRe9i+FTxPty23GOB0569cV3r9+trpVvOVLx3O+MjjJ48sg1XrO1OqaddXEqyt8DHFwhA3BpMNj7j7UVcW02IJnLCodc3Nnb3EMkM4dFTaHMZUgceQJzQs+qwNKA7mWNCAhBbGPUZ59abaL2KfUocXMk1vMlxLC8TMDtwoK9Pc1Xtc0p9KisGcPm6t+8YHHhkDEMv0G371oi5ijDodRhnD43NInIdhlj8vXy4oq0vVy7HhN52evQeVVRGYdDgn0on9okKSDIDk9POqKKDcsE9S+wadLELmbUtMtUVJXXbEFLIc5I45PUEE/Pzp/2N1K8sYpbXQ007ubsPJm5RsmTaowdp5G32/fTeeYT28U0NnHI8q7nzG3PUZPHyrjS4YjNHK+lfCvEMhwF8LEY45/nNccZMllh3HPAgIIPEod32RlTRWeMb7tLhYEtghBAztHiPXnz6Yrj+j9dVsdVvobWWWwklt2RmEKljg48LEYGOTx1+lXe4ttXn2ObnY5ILK6g7vXJAGP8A386nhs7/AGOLiSPBZTmNJAFxn+0T1z600j5thBHco4sQcESh/DXtvp12lvqshkuG7qSOXAO3O3k+mM+XQ0r0zTY11hUnu5rQxRGZZDGGO5cEDB9RzV1/qXTrV3aTWFZm5YyGCZ/ttJBz7Ct3UeiXd38NM91cTRxKxWKPyCjnIA5wR5+dMruqBcJuiq61q/uZru+h1F5Ly6vAzWoRFDoGAHT+6FzSPs/Kmk6uL5LiaGaBj3ZVVbnGCCCKtkFvpbW6Lbwar3XedAxVVYEZJ59aAE2mXLOkWmTzMuSRLPt/XnrRERjcwzICBEv9XfHmbUDcNcX8paSbKqivk5JGAAM5H3qHTVv9Fmu175onuYDFhSr+Bs5Hn70+tmsbeEzJZGHhmjAumcE49OOuOtQG6muQyPYaeUVTjdGzkj38VbGF/wB4g2zJY/YqNlFGiSQSSPI+RKHBOD9B7mnUt3cSXUKrcFxGBEjyqeM9F/D65rmGWG0MO210+NGcM4hh6DI9/b9KJvZ4lkjYmJ8MrFjbL5E8jjP19Sa148lyebHRiWK/urfUJpZ7MhpWLHehAbr0/f8ASmttr12l42o28E15O04dt0q8gMMDGAemB51Gt5dXTMsLqihjhREnT3yKsHZ/T3a6nTUZXCQyKojMKpklh18Ppg0PJiCi2m8WTcaWKtJ1SysXjtbKS6t4pbsXTRNt8cgYEKOOVBXoKEdbm1v01BoXVFmkdAG6biTzz0IOPXmn9poV7dzMVmZWibEwZU8PAOBge/WutQ0y+t1jhkuooyBI3doxLSDIxnr0/jSxC7u40C1dSsLDf3M3x4jM8+9ln7xwmcjPi9MDHn50PLHNOZbIKYkuZjKse47GdVOdvXJ8NWWWC8sZ0tAY5pZSrK8eSo3D9/B86NXQtUNx4ryNpgGcR7/yEEDnHkT+lFNL/dBgk8VKZFa3VgqXscFuxhkHduZu8YEAflB54xnPT2qPFzq7ktcW5YnLl3Cgcf6fpV07QaXdWVlEba7uZJDw4wNvz6fvpAWmtkR3uWZ3ye7Q5kXAIyVA4HvWkAcbgZh2KmiIi1Z43iisrycbIAAgD/sy3ILDPXOflWxKNOsI44ruLuZlIcRE+AZ6P68mmskl3PHvVbzqTu28AHpnPSoZ11SFgHWZTsVyB0VD5nHsaKMd8XB+WvU3Y688TC4l1GWb9pvJjdV8WMLnyPQfTPrQ8+qw39tJb3oWZQcx7uqevXnn264o3ToLm+27Bcuryd2pDgeLBI6+4oHWXn0xLaQXDyPOHIBYnaFwPqCSftVeEFuTK8x22Ix7ORaI2bZdGgmwC7PcJuDeWAxyV+h60r1TQrNJP9mvP2O5tkDktJEOuDjqPcit6HrsscsheFZ3C+HvC2PkRnnn5UKZZr6SWSV1aUyMXP4ep9BRfF6gzk44nr9xpkWnW4n1K6isYuih873+Sg8n+eKG0a4OqwzPpNncXMUTsrTm4CDKgHAGfRh16fWq9/SDJfz69cRXvhMWRAMdUJ4I/wA6j7E6qdO0LtJaOdubVpIxnkMVMZ+vKf8AjS6oXS7hHy7Hqv8Asn0ntm6oWuLSSSMZY91Ljn06fL50fo+pjXL28iCiC2jha523LSMXVR0JByAMZ+p9KT9gCGku7dwhQbWw2PfP8/KsvHtdD1SdLJZdl1aywsjKcIXAHHTIxn1ovgxlynuL/wAnJsGQniRWvaTv9P1J544kup0HcxpHxFyvA9uppNZXE5u1yXUSYQmM7cjI8/OoGAeQkL3eRg+mccmpIcxICq5J4yf4V0F06AGpz8mqZmBPqWjXb2Oz1zW7a0fFr8SoWNG/Bz4uvqcmlnZOO1ttc097lgYjKQ+8cYCnn9KUyvJPPPPJzJO5kc+pJyf1JrUYZTvXdx55PFQYaFCU2pN/6k95I0+oyuiIpuJCygDG0McgY9s4+lG6Lci1mvEkxultJIV5824/jQ08pRww2s+AemajQQNcRFwQpYFiOo9qIygLtg0e3ucPKrBVXJboQRjHP+po7W7kXE1vsBOy2jjOf7WST++uLCGBr+HaXOWyA3IptOA0h3AH581ewAybiQYp0ZgbiVSxGNucLk4zVmgvYXuNZuLqV8reosajjdhU9f8AppTa31la3PeS4I5V0VeTxxQI1+e0bVZLa1LJcTLIsrjiPjHSktTgZ2M6ekzImMfstXZ3W7W3srp9s8s8jjcIomYnzA6YHPFbfVTda7Iv9XTgxxsmCoyu0MWLYzj+ND6Lq0GqpM9wZRHGsKkQcbHLYAHrTDTbjTE1HUHjte9kdZOJG3Fjg7h9SK5+TGFYkiPo5dRRglr/AFtqVzc/Cw26OsoJDvkgABOP8uvWmusW2sWl/CIHTvGiTcUhzjOfCM+eR1rvs7rb3F/dJHBDb7FxhEA88fwp3rl1aRXcJu2JcJEcZx5kfxNYLgHqWMbEUWlTQ6jcfsbq9dmZNzBVUeAtjGMeoP2FJriwVLiSVWmEpzuKkDbnII+1XJbmMENaWgHgKB2XHmxHJ9yKBvLJr5iwdVzk/shk/m+n/qjYsyrxUDlxMebla1PXrmOFkjsoMToiSBvLaBgj7UgbVZ5pLyR2z3yBVHyIq4ah2atxEe8vBCwBBE8g5wOOBVKubRbZ9rlX88jimEwlvkpnOzPkQ03ULtdZl0+3tu7j5jkMox8iMfqaX3F0LiK2Mi+KMBACBwu4nn7muolUhiDjIPU8fIVyir4VLHwnp51DjyjoXMjUCqk8a2cLyOp3AYyE8/5NQ2AiY3BI6PwfXIrqS2k3qY3xnaR0wc813C7LEwhLbiwLeGptzfk2uVJ6tcG1123W31SVO8A8MroAQfZhjHyNA6t2MeeHvI44p35Pex8Mfp5jilAnmXnggeVFWmsXlp/wmZR6Z4+1A8LA2s6JdGFMJmmdnodNWYxvK7zptdWxwOehHz61WO0NpcRTNJIioDjJI5Y+XUkmr0vaUTcX9qkhP514NRzSaXexMvfmMsCMTLnA9j5U1jzbDZHMTzafeAFPE80jC7NsgYsTkEUTCCrxKviXdk8e9We/7NK0neWiI0WAB3UmcfQ0ol06aCSFXBDBvzoVPWmk1CE88RB9JlHq4Ne2+ZWkBUKBgAVAp7qFTkg5P1FMr23mEZGwsP7tLmysQ3oykZGCKYQqejFsiOvYmXDqZMOqnIBzjkVDGAV5ycNnkdakuFG4EdcDrUYZwGCnwnrWmBMypEmSNra4TDcKcg00Vy/iP/ulVqHkmjXCvg8K3Q00dm3jdgN5gdKyFN8y935IUspNS1SC0hj3SOw5HGVHJ5+QNCahb2/fyx2gYLGSoVjkscnn7fuq0dknB1+2z/f/AMJp1D2Ms7e4a6+KlkYhsqwXad3rxxS2bULjy00bw6d8uLcn6ZSbOxlggZcyRyF4mQZAwVbPIo2z06W0klnl1BEyrKdo7xizZ4OOhPNGNYR2N1ND+HIhKLjrlyD+lD/B3giu07plxcYDuNqnr51hwr83D4suTGKqNNKt00+W9ntGlea3G52Y4DEeLoPkKfdpdRsbe7he9uBHI1vG5iVCzkZJJ+XGOtKtHtkjl1ISXH40/aCEA+HzGTxQf9I6qNegGAR8FH/ielcemXLm2GN5dW2HD5Kg9z2qhUuLSy70lcb7mTjqfyr8/Wlt12j1K63A3BjjYYMcQ2jH0payKfKuDD5g1100WJOlnNP9ROT7GbMzE5yd3qTmh77vblV2yAFT5120TDyqPDA8g0UpxUyHRjdwNkuYgxaSEhVzg13a3i7ldo1JB9PvW7lWk2hCABkEMOtCmOW2UFHGB+IDypZsZuGAQiPlmt2IIjXJx1P8KgiKfFXboo4dVxnj8IoCS73QjbyxHHHIri3uF72aUEAORw3HQVbTS415lzU/3qkWXyqEcVma51R25OWU9QK4YIfM/IVHurealSXNBnU+ByD6g4ouK/u1AXeHX0cZFB4Nb3GpUuECSNvDcWwIPUoSMfrWGC0k/DI6ezjcKF3FT1zW97HpipKM2+lRyOGjeJseWcULPo0xYt3TYznKnNTyOIwCwGT6VuO7Cnwyuh+dWHYdEzDYVbsQG3spI7uPO5V/vLiiprd+88OD8jRiXsvByJM/2hXRm3/jhjb5cUQajIPdwLaPEfVTvsojJr1sWU9W5/7TV/uZNsLHr8+lUS0uRaXSXEcRV0yck5HTHSm47Tu42TRoyn+zlT/GlNTvzOGqN6ZFwoUkWpy/Eapcmc5EEMXdYHTc5FLL65nuVvQ5d2F3sVW5Y9cYxRt1d21xP3oiMeVAIDZzg559flRTarGEnFnH8OZHz4Op9STWg5WvjM+K7tpxZaddWnxzT7I0lAXxZZgD54U/LrS3+kl/94IQM/8Aw4+v/U9NIrmFZb0sy4uOFBYL9eaA7YwjUtRjuoZU2iBY8Zycgtz+oomlzBdQGfjiC1WAtpyqC+ZUN2PKs30VJZyIfER9iKhNtJ5DPyrtDPiPRnDOlyjtZFurW4e1dmCQfkNcGNh+U/at71PRmPEw9SOYArxjmgzax5JyQfPnNGsvFDOmT1ob0YVGZYN8INw2N19RUfwJ4beAeegozuz61mGHvQtohhmb9lmzWZ4rKyubOyJtea2aysqSpgrXnW6yqlzVbWsrKkkGuSd4HtQ5JyPnWVlVCjqMlc7ceQrpMegrKyszEnHDYycVhUZHnWVlVNTgnk1hAxmsrKgkMxuF4J+9DyytGQFxz7VusolcTM2rEv3ZwRtz/P2rNqtC7EDIPWsrKsdzHqcPGgWM45brWhEOeW+9arKjcdSxyeZFIAK47tCOUXn2rVZWdx/ZbIv5NG2h/wDrFc/Cwn8uPkTWVlGRjUA2ND6n/9k=",
    ];
    let i = 0;
    TripData.hotels.map((item) => {
      item.hotelImageUrl = images[i++];
    });
    console.log("setimage: ", TripData);
    return TripData;
  };

  //saving trip in firebase
  const saveAITrip = async (TripData) => {
    setloading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    TripData = JSON.parse(TripData);
    // set image url
    TripData = setImagedata(TripData);
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: TripData,
      userEmail: user?.email,
      id: docId,
    });
    setloading(false);
    navigate("/view-trip/" + docId);
  };

  //User profile after authorization
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
              <img src="/logo3.svg" alt="company logo" />
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
