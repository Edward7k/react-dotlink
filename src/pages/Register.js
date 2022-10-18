import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import Image from '../components/Image'

const Register = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState({})

  const handleSubmit = async (e) =>{
      e.preventDefault()
      try {
          const response = await axios.post('https://dotlinkbackend.herokuapp.com/api/user/register/', {
              email,
              username,
              password,
              confirm_password: confirmPassword,
          });
          console.log(response);
          navigate('/login')

        } catch (error) {
          console.error(error);
          console.log(error.response.data);
          setError(error.response.data.message)
        }
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-slate-50'>
        <div className='rounded-3xl w-4/5 h-5/6 flex flex-row justify-between items-center shadow md:py-2  md:px-5 lg:px-12 bg-white'>
            <div className='w-full md:w-1/2 lg:p-12 px-5 py-10'>
                <form className='flex flex-col' onSubmit={handleSubmit}>
                    {error ? <p className='text-red-500'>{error.email}</p> : null}
                    <input className='rounded-2xl py-2 px-4 my-3 border-b-2 outline-0' type='text' name='email' placeholder='ایمیل' value={email} onChange={(e) => setEmail(e.target.value)} required autoFocus />
                    {error ? <p className='text-red-500'>{error.username}</p> : null}
                    <input className='rounded-2xl py-2 px-4 my-3 border-b-2 outline-0' type='text' name='username' placeholder='نام کاربری' value={username} onChange={(e) => setUsername(e.target.value)} required />
                    {error ? <p className='text-red-500'>{error.password}</p> : null}
                    <input className='rounded-2xl py-2 px-4 my-3 border-b-2 outline-0' type='password' name='password' placeholder='رمز عبور' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {error ? <p className='text-red-500'>{error.confirm_password}</p> : null}
                    <input className='rounded-2xl py-2 px-4 my-3 border-b-2 outline-0' type='password' name='confirm_password' placeholder='تکرار رمز عبور' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <Button text={'ثبت نام'} />
                    <a href='/login' className='w-fit underline hover:cursor-pointer hover:text-blue-500 py-2 px-4'>قبلا عضو شده ام</a>
                </form>
            </div>
            <Image src={'/images/undraw_login_re_4vu2.svg'} />
        </div>
    </div>
  )
}

export default Register