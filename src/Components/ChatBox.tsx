import {memo, useContext} from 'react';
import Messages from './Messages';
import Input from './Input';
import { ChatContext } from '../Contex/ChatContext';

const ChatBox = () :JSX.Element => {

  const Chat = useContext(ChatContext);

  return (
    <div className='flex-[1_1_66%] h-full'>
      <div className='flex bg-[#5d5b8d] p-2 items-center justify-between text-[lightgray] h-[50px]'>
        <span>{Chat?.data.user?.displayName}</span>
        <div className='flex cursor-pointer gap-2'>
          <img className='h-6 ' src="/images/cam.png" alt="cam" />
          <img className='h-6 ' src="/images/add.png" alt="add" />
          <img className='h-6 ' src="/images/more.png" alt="more" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default memo(ChatBox);