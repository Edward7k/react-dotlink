import React, { useEffect, useState } from "react";
import axios from "axios";
import RightMenu from "../components/RightMenu";
import { FcLink } from "react-icons/fc";
import Button from "../components/Button";
import MobileMenu from "../components/MobileMenu";
import DeleteButton from "../components/DeleteButton";
import { useNavigate } from "react-router-dom";

const AllLinks = () => {
  const [links, setLinks] = useState(null);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://dotlinkbackend.herokuapp.com/api/shortener/links/",
        {
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.length === 0){
        setLinks(null)
      }else{
        setLinks(response.data);
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
      if (error.response.status === 401) {
        localStorage.removeItem("token");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <MobileMenu />

      <RightMenu />
      <div className="bg-slate-50 flex flex-col items-center py-10 w-full">
        {links ? links.map((link) => (
          <div
            key={link.id}
            className="rounded-3xl bg-white shadow-sm w-3/4 flex flex-col md:flex-row items-center mb-5 px-5"
          >
            <div className="text-6xl md:pl-5 py-2">
              <FcLink />
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between w-full">
              <div>
                <h2 className="text-gray-600 text-lg">{link.title}</h2>
                <span
                  className="text-sm text-gray-400 cursor-pointer hover:underline"
                  onClick={(e) => navigate("/l/" + link.url_code)}
                >
                  بازدید از لینک
                </span>
              </div>
              <div className="flex flex-row">
                <div onClick={(e) => navigate("/dashboard/edit/" + link.id)}>
                  <Button
                    text={"ویرایش"}
                    addClass="bg-green-500 ml-5 text-sm md:text-base hover:bg-green-400"
                  />
                </div>
                <DeleteButton id={link.id} />
              </div>
            </div>
          </div>
        )) : <h1>لینکی وجود ندارد</h1>}
      </div>
    </div>
  );
};

export default AllLinks;
