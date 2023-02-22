import { memo, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../Contex/AuthContex';
import { ChatContext } from '../Contex/ChatContext';
import MessageInterface from '../models/Message';

const Message = ({ message }: { message: MessageInterface }): JSX.Element => {
  const currentUser = useContext(AuthContext);
  const Chat = useContext(ChatContext);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior:'smooth'})
  },[message])

  //console.log(message)
  return (
    <div className={`flex gap-5 mb-5 
    ${message.senderId === currentUser?.uid ? 'flex-row-reverse' : ''}`} ref={bottomRef}>
      <div className='flex flex-col text-[gray] font-light '>
        <img className='w-10 h-10 object-cover rounded-[50%]' src={message.senderId === currentUser!.uid ? currentUser!.photoURL! :
          Chat!.data.user!.photoURL!
        } alt="prof" />
        <span>Just Now</span>
      </div>
      <div className={`max-w-[50%] flex gap-2 flex-col ${message.senderId === currentUser?.uid ? 'items-end' : ''}`}>
        <p className={`bg-white py-2 px-5 rounded-[10px] rounded-tl-none max-w-max ${message.senderId === currentUser?.uid ? 'bg-[#8da4f1]' : ''}`}>{message.text}</p>
        {message.img ?
          <img src={message.img} alt="attachment" />
          :
          null
        }
      </div>
    </div>
  )
}

export default memo(Message);