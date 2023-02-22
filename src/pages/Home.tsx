import {memo} from 'react';
import ChatBox from '../Components/ChatBox';
import Sidebar from '../Components/Sidebar';

const Home = () : JSX.Element => {
  return (
    <div className='h-screen w-full bg-[#a7bcff] flex justify-center items-center'>
        <div className='border border-white w-[65%] h-[80%] flex overflow-hidden rounded-[10px] tablet:w-[90%]'>
            <Sidebar />
            <ChatBox />
        </div>
    </div>
  )
}

export default memo(Home)