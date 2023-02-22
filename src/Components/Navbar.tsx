import { memo, useContext } from 'react';
import { signOut, User } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../Contex/AuthContex';

const Navbar = (): JSX.Element => {
  const currentUser = useContext(AuthContext);

  return (
    <>

      {currentUser ?
        <div className='flex justify-between items-center h-12 bg-[#2f2d52] text-[#ddddf7] p-3'>
          <span className='font-bold tablet:hidden'>Navid Chat</span>
          <div className='flex gap-2'>
            <img src={currentUser!.photoURL!} alt="profile" className='w-6 h-6 rounded-[50%] bg-[#ddddf7] object-cover' />
            <span>{currentUser.displayName}</span>
            <button className='bg-[#3e3c61] border-0 outline-0 cursor-pointer text-3 p-1 tablet:absolute tablet:bottom-0' onClick={(): Promise<void> => signOut(auth)}>Log out</button>
          </div>
        </div>
        :
        null
      }
    </>
  )
}

export default memo(Navbar);