import React from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

  return (
    <div className='flex flex-col justify-center items-center h-screen w-screen gap-5'>
        <h1 className='text-7xl'>DOTLINK</h1>
        <div className='flex flex-row gap-5'>
            <div onClick={e=>navigate('/login')}>
                <Button text={'ورود'} />
            </div>
            <div onClick={e=>navigate('/register')}>
                <Button text={'ثبت نام'} />
            </div>
        </div>
    </div>
  )
}

export default Home