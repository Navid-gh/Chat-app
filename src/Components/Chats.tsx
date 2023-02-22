import { memo, useEffect, useState, useContext, } from 'react';
import { onSnapshot, doc, DocumentData } from 'firebase/firestore';
import { db } from '../firebase';
import { AuthContext } from '../Contex/AuthContex';
import { ChatContext } from '../Contex/ChatContext';
import { User } from '../models/InitialState';

const Chats = (): JSX.Element => {
  const [chats, setChats] = useState<DocumentData | undefined>(undefined);

  const currentUser = useContext(AuthContext);
  const Chat = useContext(ChatContext);

  useEffect(() => {
    if (currentUser?.uid) {
      const unsub = onSnapshot(doc(db, "userChats", currentUser!.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      }
    }
  }, [currentUser!.uid])

  const handleSelecet = (info: User) => {
    Chat?.dispatch({type:'CHANGE_USER',payload:info})
  }

  return (
    <div className=''>
      {chats && Object.entries(chats)?.sort((a,b) => b[1].date - a[1].date).map((item) => {
        console.log(item[1])
        return (
          <div className='flex gap-2 p-2 items-center text-white cursor-pointer hover:bg-[#2f2d52]' key={item[0]} onClick={() => handleSelecet(item[1].userInfo)}>
            <img className='w-[50px] h-[50px] rounded-[50%] object-cover' src={item[1].userInfo.photoURL} alt="prof" />
            <div>
              <span className='font-medium text-[18px] '>{item[1].userInfo.displayName}</span>
              <p className='text-[12px] text-[lightgray]'>{item[1].lastMessage?.text}</p>
            </div>
          </div>
        )
      })
      }
    </div>
  )
}

export default memo(Chats);