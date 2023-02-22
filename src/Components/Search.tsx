import { memo, useState, useContext } from 'react';
import { collection, query, where, getDocs, getDoc, DocumentData, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from '../Contex/AuthContex';

const Search = (): JSX.Element => {
  const [userName, setUserName] = useState<string>('');
  const [user, setUser] = useState<null | DocumentData>(null);
  const [err, setErr] = useState<boolean>(false);

  const currentUser = useContext(AuthContext);

  const handleSearch = async (): Promise<void> => {
    setErr(false);
    const q = query(collection(db, 'users'), where('displayName', '==', userName));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot?.forEach((doc) => {
        setUser(doc.data());
      })
    } catch {
      setErr(true);
    }
  }

  const handleClick = async (): Promise<void> => {
    const combined: string = currentUser!.uid > user!.uid ? currentUser!.uid + user!.uid : user!.uid + currentUser!.uid;
    try {
      const res = await getDoc(doc(db, 'chats', combined))
      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combined), { messages: [] });

        await updateDoc(doc(db, 'userChats', currentUser!.uid), {
          [combined + '.userInfo']: {
            uid: user?.uid,
            displayName: user?.displayName,
            photoURL: user?.photoURL
          },
          [combined + '.date']: serverTimestamp()
        });
        await updateDoc(doc(db, 'userChats', user!.uid), {
          [combined + '.userInfo']: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL
          },
          [combined + '.date']: serverTimestamp()
        });
      }
    } catch (err) {
      console.log(err);
    }

    setUser(null);
    setUserName('');
  }

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.code === 'Enter') handleSearch();
  }
  return (
    <div className='border-b border-gray-50'>
      <div className='p-2'>
        <input type="text" className='bg-transparent border-0 outline-0 text-white' placeholder='Find a User' value={userName} onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKey}
        />
      </div>
      {err ? <span>Error Occured</span> : null}
      {user ?
        <>
          <div className='flex gap-2 p-2 items-center text-white cursor-pointer hover:bg-[#2f2d52]' onClick={handleClick}>
            <img className='w-[50px] h-[50px] rounded-[50%] object-cover' src={user.photoURL} alt="prof" />
            <div>
              <span>{user.displayName}</span>
            </div>
          </div>
        </>
        : null//<span>User Not Found</span>
      }
    </div>
  )
}

export default memo(Search);