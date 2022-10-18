import axios from "axios";
import React, { useEffect, useState } from "react";
import { FcBusinessman } from "react-icons/fc";
import Button from "../components/Button";
import MobileMenu from "../components/MobileMenu";
import RightMenu from "../components/RightMenu";

const Profile = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const getData = async () => {
    try {
      const response = await axios.get("https://dotlinkbackend.herokuapp.com/api/user/", {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      });
      setUser(response.data.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
      if (error.response.status === 401) {
        localStorage.removeItem("token");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true);

    try {
      const response = await axios.patch("https://dotlinkbackend.herokuapp.com/api/user/", 
      {
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        current_password: user.current_password,
        password: user.password,
        confirm_password: user.confirm_password,
      },
      {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      }
    );
      setUser(response.data.data);
      console.log(response.data);
      setLoading(false);
      setSuccess(true);
      
      const timeId = setTimeout(() => {
        // After 3 seconds set the show value to false
        setSuccess(false)
      }, 3000)
      return () => {
        clearTimeout(timeId)
      }

    } catch (error) {
      console.error(error);
      setLoading(false);
      setError(error.response.data.data.errors);
      console.log(error);
      if (error.response.status === 401) {
        localStorage.removeItem("token");
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <MobileMenu />
      <RightMenu />
      <div className="w-full bg-slate-50 flex justify-center items-center py-5 md:py-5 overflow-auto">
        <div className="w-3/4 md:w-1/2 bg-white rounded-2xl shadow-lg">
          <div className="w-full flex justify-center h-fit py-5 items-center text-9xl ">
            <FcBusinessman className="rounded-full bg-gray-100 p-3" />
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col justify-center  gap-2 px-5 md:px-10">
          {success ? <p className="text-white bg-green-500 rounded-lg text-sm py-1 px-4">اطلاعات با موفقیت ثبت شد</p> : null}
            <div className="flex flex-col md:flex-row gap-2 w-full">
              {error ? (
                <p className="text-red-500">{error.first_name}</p>
              ) : null}
              <input
                type="text"
                name="first_name"
                className=" w-full text-gray-700 bg-gray-100 py-3 px-3 leading-tight focus:outline-none focus:border-teal-300 focus:border-2 rounded-3xl"
                placeholder="نام"
                value={user.first_name}
                onChange={(e) => {
                  setUser((prevState) => ({
                    ...prevState,
                    first_name: e.target.value,
                  }));
                }}
              />
              {error ? <p className="text-red-500">{error.last_name}</p> : null}
              <input
                type="text"
                name="last_name"
                className=" w-full text-gray-700 bg-gray-100 py-3 px-3 leading-tight focus:outline-none focus:border-teal-300 focus:border-2 rounded-3xl"
                placeholder="نام خانوادگی"
                value={user.last_name}
                onChange={(e) => {
                  setUser((prevState) => ({
                    ...prevState,
                    last_name: e.target.value,
                  }));
                }}
              />
            </div>

            {error ? <p className="text-red-500">{error.email}</p> : null}
            <input
              type="email"
              name="email"
              className=" w-full text-gray-700 bg-gray-100 py-3 px-3 leading-tight focus:outline-none focus:border-teal-300 focus:border-2 rounded-3xl"
              placeholder="ایمیل"
              value={user.email}
              onChange={(e) => {
                setUser((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }));
              }}
            />
            {error ? (
              <p className="text-red-500">{error.current_password}</p>
            ) : null}
            <input
              type="password"
              name="current_password"
              className=" w-full text-gray-700 bg-gray-100 py-3 px-3 leading-tight focus:outline-none focus:border-teal-300 focus:border-2 rounded-3xl"
              placeholder="رمز عبور فعلی"
              value={user.current_password}
              onChange={(e) => {
                setUser((prevState) => ({
                  ...prevState,
                  current_password: e.target.value,
                }));
              }}
            />
            {error ? <p className="text-red-500">{error.password}</p> : null}
            <input
              type="password"
              name="password"
              className=" w-full text-gray-700 bg-gray-100 py-3 px-3 leading-tight focus:outline-none focus:border-teal-300 focus:border-2 rounded-3xl"
              placeholder="رمز عبور جدید"
              value={user.password}
              onChange={(e) => {
                setUser((prevState) => ({
                  ...prevState,
                  password: e.target.value,
                }));
              }}
            />
            {error ? (
              <p className="text-red-500">{error.confirm_password}</p>
            ) : null}
            <input
              type="password"
              name="confirm_password"
              className=" w-full text-gray-700 bg-gray-100 py-3 px-3 leading-tight focus:outline-none focus:border-teal-300 focus:border-2 rounded-3xl"
              placeholder="تکرار رمز عبور"
              value={user.confirm_password}
              onChange={(e) => {
                setUser((prevState) => ({
                  ...prevState,
                  confirm_password: e.target.value,
                }));
              }}
            />
            <div className="flex justify-start items-start w-full">
                <div onClick={e=>setError('')}>
                <Button text={'ثبت تغییرات'} loading={loading} />

                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
