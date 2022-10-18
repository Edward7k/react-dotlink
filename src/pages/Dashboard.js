import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { FcComboChart } from "react-icons/fc";
import { IoBarChart } from "react-icons/io5";
import Locations from "../components/Locations";
import MobileMenu from "../components/MobileMenu";
import RightMenu from "../components/RightMenu";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const Dashboard = () => {
  const [views, setViews] = useState("");
  const [links, setLinks] = useState("");

  const getInfo = async () => {
    try {
      const response = await axios.get(
        "https://dotlinkbackend.herokuapp.com/api/shortener/info/",
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
          },
        }
      );
      setLinks(response.data.data.number);
      setViews(response.data.data.views);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      if (error.response.status === 401) {
        localStorage.removeItem("token");
      }
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <MobileMenu />
      <RightMenu />
      <div className="bg-slate-50 w-full flex flex-col md:flex-row md:justify-between p-5 md:py-10 md:px-16 md:overflow-y-auto">
        <div className=" flex flex-col items-center">
          <div>
            <h1 className="font-bold text-lg md:text-3xl">آمار لینک ها</h1>
          </div>
          <div className="flex flex-row justify-center">
            <div className="flex flex-col justify-between px-5 py-2 w-36 h-36 md:w-44 md:h-44 text-white rounded-3xl ml-5 my-5 md:ml-10 md:my-10 bg-gradient-to-tr from-blue-500 to-blue-200 ">
              <span className="">بازدیدها</span>
              <IoBarChart className="text-7xl opacity-50 w-full my-3" />
              <span className="text-sm">{views}</span>
            </div>
            <div className="flex flex-col justify-between px-5 py-2 w-36 h-36 md:w-44 md:h-44 text-white rounded-3xl my-5 md:ml-10 md:my-10 bg-gradient-to-tr from-blue-500 to-blue-200 ">
              <span className="">لینک ها</span>
              <BsLink45Deg className="text-7xl opacity-50 w-full my-3" />
              <span className="text-sm">{links}</span>
            </div>
            <div></div>
          </div>
        </div>
        <div className="md:w-1/4 mx-4 mt-5 md:mt-0">
          <Locations />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
