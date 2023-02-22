import { useState, memo, useRef } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase';
import { doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

const Register = (): JSX.Element => {
  const [err, setErr] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const NameRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleClick: () => void = async () => {
    setErr(false);
    setLoading(true);
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, emailRef.current!.value, passRef.current!.value);
      console.log(res)

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${NameRef.current!.value + date}`);

      await uploadBytesResumable(storageRef, fileRef.current!.files![0])
        .then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              //Update profile
              await updateProfile(res.user, {
                displayName: NameRef.current?.value,
                photoURL: downloadURL,
              });
              //create user on firestore
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName: NameRef.current?.value,
                email: emailRef.current?.value,
                photoURL: downloadURL,
              });

              //create empty user chats on firestore
              await setDoc(doc(db, "userChats", res.user.uid), {});
              navigate("/");
            } catch (err) {
              console.log(err);
              setErr(true);
              setLoading(false);
            }
          });
        });
    } catch (err) {
      console.log(err)
      setErr(true);
      setLoading(false);
    }
  };
  return (
    <div className='h-screen w-full bg-[#a7bcff] flex justify-center items-center'>
      <div className='flex flex-col gap-[15px] bg-white py-[20px] px-[60px] rounded-[10px] items-center'>
        <span className='text-[#5d5b8d] text-[24px] font-bold'>Navid Chat</span>
        <span className='text-[#5d5b8d] text-[10px] font-bold'>Register</span>
        <div className='flex flex-col gap-[15px]'>
          <input className='w-[300px] p-[15px] border-0 border-b border-[#a7bcff] outline-0' type='text' placeholder='display-name' ref={NameRef} />
          <input className='w-[300px] p-[15px] border-0 border-b border-[#a7bcff] outline-0' type='email' placeholder='email' ref={emailRef} />
          <input className='w-[300px] p-[15px] border-0 border-b border-[#a7bcff] outline-0' type='password' placeholder='password' ref={passRef} />
          <input className='hidden' type='file' id='file' ref={fileRef} />
          <label htmlFor="file" className='flex flex-row gap-2 items-center cursor-pointer text-[#8da4f1]'>
            <img src="/images/addAvatar.png" alt="add avatar" className='w-8' />
            <span className='text-[12px]'>Add an Avatar</span>
          </label>
          <button className='bg-[#a7bcff] text-white p-[10px] font-bold outline-0 border-0 cursor-pointer' onClick={handleClick}>Sign up</button>
          {err ?
            <span>an Error Occured</span>
            : null
          }
        </div>
        <p className='text-[#5d5b8d] text-[12px] mt-1'>You do have an acoount ? <Link to='/login'>Log in</Link></p>
      </div>
    </div>
  )
}

export default memo(Register)