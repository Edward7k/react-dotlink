import React, { useEffect, useState } from 'react'
import axios from "axios";
import RightMenu from "../components/RightMenu";
import Button from "../components/Button";
import MobileMenu from "../components/MobileMenu";
import { useParams } from 'react-router-dom';
import { FcComboChart } from 'react-icons/fc';
import Locations from '../components/Locations';

const EditLink = () => {
    const [title, setTitle] = useState("");
    const [longUrl, setLongUrl] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [views, setViews] = useState('')
    let { id } = useParams();

    // handle form submit for edit
    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
          const response = await axios.put(
            "https://dotlinkbackend.herokuapp.com/api/shortener/links/"+ id+'/',
            {
              title,
              long_url: longUrl,
              description,
            },
            {
              headers: {
                Authorization: "Token " + localStorage.getItem("token"),
              },
            }
          );
          console.log(response);
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
          setError(error.response.data.message);
          setLoading(false);
          if (error.response.status === 401) {
            localStorage.removeItem("token");
          }
        }
      };

    // function to fetch link by id
    const fetchData = async (id) => {
      try {
        const response = await axios.get(
          "https://dotlinkbackend.herokuapp.com/api/shortener/links/"+id,
          {
            headers: {
              Authorization: "Token " + localStorage.getItem("token"),
            },
          }
        );
        console.log(response);
        setTitle(response.data.title)
        setLongUrl(response.data.long_url)
        setDescription(response.data.description)
        setViews(response.data.view)
      } catch (error) {
        console.error(error);
        if (error.response.status === 401) {
          localStorage.removeItem("token");
        }
      }
    };

    useEffect(()=>{
        fetchData(id)
    }, [id])
  
    return (
      <div className="flex flex-col md:flex-row h-screen">
        <MobileMenu />
        <RightMenu />
        <div className='bg-slate-50 w-full flex justify-center items-center'>

        <div className="flex flex-col md:flex-row bg-slate-50 w-full md:w-3/4 items-center md:items-start justify-between py-10 md:overflow-y-auto h-screen">
          <div className="bg-white rounded-2xl w-10/12 md:w-1/2  shadow px-5 py-5 md:p-10 flex flex-col justify-center items-center">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-600 mb-5 md:mb-12">
              دات لینک
            </h1>
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
              {success ? <p className="text-white bg-green-500 rounded-lg text-sm py-2 px-4 mb-3">لینک با موفقیت ثبت شد</p> : null}
              {error ? <p className="text-red-500 text-sm">{error.title}</p> : null}
              <input
                className="appearance-none bg-transparent w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none border-b border-teal-500 focus:border-red-300 focus:border-b-2 mb-10"
                type="text"
                name="title"
                placeholder="موضوع"
                autoFocus
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
              />
              {error ? <p className="text-red-500 text-sm">{error.long_url}</p> : null}
              <input
                className="appearance-none bg-transparent w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none border-b border-teal-500 focus:border-red-300 focus:border-b-2 mb-10"
                type="text"
                name="long_url"
                placeholder="لینک"
                value={longUrl}
                onChange={(e)=>setLongUrl(e.target.value)}
              />
              {error ? <p className="text-red-500 text-sm">{error.description}</p> : null}
              <textarea
                name="description"
                className="appearance-none bg-transparent w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none border-b border-teal-500 focus:border-red-300 focus:border-b-2"
                placeholder="توضیحات"
                id=""
                cols="30"
                rows="5"
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
              />
              <div className='flex flex-row justify-between items-center'>
                <Button text={"ثبت تغییرات"} loading={loading} />
                <div className='flex flex-row justify-center items-center'>
                    <FcComboChart className='text-2xl' />
                    <p className='pr-2 text-gray-600 text-sm'>{views} بازدید</p>    
                </div>
              </div>
            </form>
          </div>
          <div className='w-3/4 md:w-4/12'>
            <Locations />
          </div>
        </div>
        </div>

      </div>
    );
  };

export default EditLink