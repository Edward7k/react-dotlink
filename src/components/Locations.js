import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcComboChart } from "react-icons/fc";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const Locations = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://dotlinkbackend.herokuapp.com/api/shortener/locations/",
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
          },
        }
      );
      setData(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      if (error.response.status === 401) {
        localStorage.removeItem("token");
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="flex flex-col md:w-full md:mt-0">
        <h1 className="text-gray-500 md:text-lg md:mb-5">کشور بازدیدکنندگان</h1>
        {data.map((e, index) => (
          <div
            key={index}
            className="flex flex-row justify-between items-center px-5 py-2 w-full text-gray-700 rounded-xl ml-10 my-3 bg-gradient-to-tr bg-white shadow first:text-white first:bg-gray-700"
          >
            <span className="flex flex-row gap-2 text-gray-300">
              <FcComboChart className="text-xl" />
              {e.id__count}
            </span>
            <span>{e.country}</span>
            <span
              className={"text-3xl my-3 fi fi-" + e.country_code.toLowerCase()}
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;
