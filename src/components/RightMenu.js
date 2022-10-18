import React from "react";
import { BsFillPlusCircleFill, BsPersonCircle, BsViewList } from "react-icons/bs";
import { AiOutlineAreaChart, AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const RightMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 md:w-20 py-10 px-5 md:flex flex-col justify-between items-center hidden">
      <div
        className="rounded-full text-white cursor-pointer text-2xl"
        onClick={(e) => navigate("/dashboard/profile")}
      >
        <BsPersonCircle />
      </div>

      <div>
        <div
          className="rounded-full text-white mb-5 cursor-pointer text-3xl"
          onClick={(e) => navigate("/dashboard/new")}
        >
          <BsFillPlusCircleFill />
        </div>

        <div
          className="rounded-full text-white mb-5 cursor-pointer text-3xl"
          onClick={(e) => navigate("/dashboard")}
        >
          <AiOutlineAreaChart />
        </div>

        <div className="rounded-full text-white cursor-pointer text-3xl"
        onClick={(e) => navigate("/dashboard/links")}
        >
          <BsViewList />
        </div>
      </div>

      <div className="rounded-full text-white cursor-pointer text-2xl" onClick={(e)=>{
        localStorage.removeItem('token')
        navigate('/login')
      }}>
        <AiOutlineLogout />
      </div>
    </div>
  );
};

export default RightMenu;
