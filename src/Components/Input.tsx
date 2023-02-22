import { memo, useContext, useState } from 'react'
import { AuthContext } from '../Contex/AuthContex';
import { ChatContext } from '../Contex/ChatContext';
import { doc, updateDoc, arrayUnion, arrayRemove, Timestamp, serverTimestamp } from "firebase/firestore";
import { db, storage } from '../firebase';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = (): JSX.Element => {
  const [text, setText] = useState<string>('');
  const [img, setImg] = useState<File | null>(null);
  const currentUser = useContext(AuthContext);
  const Chat = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, v4());

      await uploadBytesResumable(storageRef, img)
        .then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            await updateDoc(doc(db, 'chats', Chat!.data.chatId), {
              messages: arrayUnion({
                id: v4(),
                text,
                senderId: currentUser?.uid,
                date: Timestamp.now(),
                img: downloadURL

              })
            })
          });
        });
    } else {
      await updateDoc(doc(db, 'chats', Chat!.data.chatId), {
        messages: arrayUnion({
          id: v4(),
          text,
          senderId: currentUser?.uid,
          date: Timestamp.now()

        })
      })
    }
    await updateDoc(doc(db, 'userChats', currentUser!.uid), {
      [Chat!.data.chatId + '.lastMessage']: { text },
      [Chat!.data.chatId + '.date']: serverTimestamp()

    });
    await updateDoc(doc(db, 'userChats', Chat!.data.user!.uid!), {
      [Chat!.data.chatId + '.lastMessage']: { text },
      [Chat!.data.chatId + '.date']: serverTimestamp()

    });

    setText('');
    setImg(null);
  }

  return (
    <div className='h-[50px] bg-white p-2 flex items-center justify-between w-full z-10'>
      <input type='text' placeholder='Type Something...' className='border-0 outline-0 w-[70%] text-[#2f2d52] text-[18px] placeholder:text-[lightgray]' value={text} onChange={(e) => setText(e.target.value)} />
      <div className='flex gap-2 items-center'>
        <img className='h-6 cursor-pointer' src="/images/attach.png" alt="attach" />
        <input type="file" className='hidden' id='file' onChange={(e) => setImg(e.target.files![0])} />
        <label htmlFor="file">
          <img className='h-6 cursor-pointer' src="/images/img.png" alt="file" />
        </label>
        <button className='border-0 bg-[#8da4f1] py-[10px] px-[15px]' onClick={handleSend} >Send</button>
      </div>
    </div>
  )
}

export default memo(Input)