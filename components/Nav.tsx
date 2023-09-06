'use client';

import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import MenuItem from './MenuItem';
import Avatar from './Avatar';
import Link from 'next/link';
import { SafeUser } from '@/app/types';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

// todo : comprendre React.FC<UserMenuProps>
const Nav: React.FC<UserMenuProps> = ({ currentUser }) => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen(value => !value);
  }, []);

  return (
    <>
      <div className='flex justify-between w-full mt-6'>
        <div className='gap-3'>
          <div>
            <Link href='/' className='flex gap-2 flex-center'>
              <Image
                src='/assets/images/logo.svg'
                alt='Wilt logo'
                width={30}
                height={30}
                className='object-contain'
              />
              <p className='logo_text'>WILT</p>
            </Link>
          </div>
        </div>

        <div
          onClick={toggleOpen}
          className='
          p-4
          ml-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          '>
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>

          {isOpen && (
            <div
              className='
            absolute 
            rounded-xl 
            shadow-md
            w-[30vw]
            md:w-[10vw]
            bg-white 
            overflow-hidden 
            right-2 
            top-20 
            text-sm
          '>
              <div className='flex flex-col cursor-pointer'>
                {currentUser ? (
                  <>
                    <Link
                      href='/create-hint'
                      className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>
                      Create a tips
                    </Link>
                    <Link
                      href='/profile'
                      className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>
                      My Profile
                    </Link>
                    <hr />
                    <MenuItem label='Logout' onClick={() => signOut()} />
                  </>
                ) : (
                  <>
                    <MenuItem label='Login' onClick={loginModal.onOpen} />
                    <MenuItem label='Sign up' onClick={registerModal.onOpen} />
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
