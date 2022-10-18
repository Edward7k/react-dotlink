import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-gray-800 px-5 py-5 md:hidden rounded-b-2xl">
      <div className="flex flex-row justify-between items-center">
        <AiOutlineMenu
          className="text-3xl text-white md:hidden"
          onClick={(e) => setOpen(!open)}
        />
        <h1 className="text-lg text-gray-200">دات لینک</h1>
      </div>

      {open ? (
        <div className="w-full flex flex-col justify-center text-gray-100 mt-5">
          <div
            className="text-sm font-bold mb-3"
            onClick={(e) => navigate("/dashboard/profile")}
          >
            پروفایل
          </div>
          <div
            className="text-sm font-bold mb-3"
            onClick={(e) => navigate("/dashboard/new")}
          >
            لینک جدید
          </div>
          <div
            className="text-sm font-bold mb-3"
            onClick={(e) => navigate("/dashboard")}
          >
            آمار
          </div>
          <div
            className="text-sm font-bold mb-3"
            onClick={(e) => navigate("/dashboard/links")}
          >
            لیست لینک ها
          </div>
          <div
            className="text-sm font-bold "
            onClick={(e) => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            خروج
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MobileMenu;
