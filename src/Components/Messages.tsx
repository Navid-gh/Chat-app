import { memo, useContext, useState, useEffect } from 'react';
import { ChatContext } from '../Contex/ChatContext';
import Message from './Message';
import { db } from '../firebase';
import { doc, onSnapshot, DocumentData } from 'firebase/firestore';
import MessageInterface from '../models/Message';

const Messages = (): JSX.Element => {
  const [messages, setMessages] = useState<DocumentData | undefined>(undefined)

  const Chat = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', Chat!.data.chatId),
      (doc) => doc.exists() && setMessages(doc.data())
    )
    return () => {
      unSub() ;
    }
  }, [Chat!.data.chatId])

  //console.log(messages)

  return (
    <div className='bg-[#ddddf7] p-2 h-[calc(100%_-_100px)] overflow-auto'>
      {messages?.messages?.map((message:MessageInterface) => {
        return (
          <Message message={message} key={message.id} />

        )
      })
      }
    </div>
  )
}

export default memo(Messages);