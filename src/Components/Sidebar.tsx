import {memo} from 'react';
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';

const Sidebar = () :JSX.Element => {
  return (
    <div className='flex-[1_1_33%] bg-[#3e3c61] relative'>
      <Navbar />
      <Search />
      <Chats />
    </div>
  )
}

export default memo(Sidebar);