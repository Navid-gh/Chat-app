import { memo, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = (): JSX.Element => {
  const [err, setErr] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const passRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleClick: () => void = async () => {
    setErr(false);
    setLoading(true);

    signInWithEmailAndPassword(auth, emailRef.current!.value, passRef.current!.value)
      .then((userCredential) => {
        // Signed in 
        navigate('/');
        // ...
      })
      .catch(err => {
        console.log(err)
        setErr(true);
        setLoading(false);
      })

  };
  return (
    <div className='h-screen w-full bg-[#a7bcff] flex justify-center items-center'>
      <div className='flex flex-col gap-[15px] bg-white py-[20px] px-[60px] rounded-[10px] items-center'>
        <span className='text-[#5d5b8d] text-[24px] font-bold'>Navid Chat</span>
        <span className='text-[#5d5b8d] text-[10px] font-bold'>Log in</span>
        <div className='flex flex-col gap-[15px]'>
          <input className='w-[300px] p-[15px] border-0 border-b border-[#a7bcff] outline-0' type='email' placeholder='email' ref={emailRef} />
          <input className='w-[300px] p-[15px] border-0 border-b border-[#a7bcff] outline-0' type='password' placeholder='password' ref={passRef} />
          <button className='bg-[#a7bcff] text-white p-[10px] font-bold outline-0 border-0 cursor-pointer' onClick={handleClick}>Log in</button>
          {err ? <span>error</span> : null}
        </div>
        <p className='text-[#5d5b8d] text-[12px] mt-1'>You do not have an acoount ? <Link to='/Register'>Sign up</Link></p>
      </div>
    </div>
  )
}

export default memo(Login)