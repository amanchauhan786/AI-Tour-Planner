import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { Link, useNavigation } from "react-router";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";

function Header() {
  // const [user, Setuser] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDailog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Setuser(JSON.parse(localStorage.getItem("user")));

    console.log("header", user?.picture);
  }, [user]);

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
        window.location.reload();
      });
  };
  const login = useGoogleLogin({
    onSuccess: (codeRes) => GetUserProfile(codeRes),
    onError: (error) => console.log(error),
  });

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="/logo3.jpeg" alt="logo" className="h-[41px] w-[170px]" />
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip">
              <Button varient="outline" className="rounded-full">
                Create Trip
              </Button>
            </a>
            <a href="/my-trips">
              <Button varient="outline" className="rounded-full">
                My Trips
              </Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  alt="picture"
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>

              <PopoverContent>
                <a href="/">
                  <h2
                    className="cursor-pointer"
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    Logout
                  </h2>
                </a>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign in</Button>
        )}
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

export default Header;
