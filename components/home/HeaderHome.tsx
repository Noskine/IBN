import Image from 'next/image';
import React from 'react';
import { ThemeSwitch } from '../theme-switch';
import { Button } from '../ui/button';

const HeaderHome: React.FC<{ top: boolean }> = ({ top }) => {
  return (
    <>
   {top && (
     <div className="w-screen  bg-green-900 flex items-center justify-center">
      <span className="text-sm text-white font-medium py-1">
        Desde 1945
      </span>
    </div>
   )}
    <header className="bg-zinc-50 dark:bg-zinc-800 py-3 px-[5%] flex items-center justify-between shadow-lg shadow-black/15 border-b-zinc-200">
        <Image src="/ibnhorizontal.png" alt="Instituto Bíblico do Norte" width={80} height={80} className=" dark:invert" />
      <div className="flex items-center gap-3">
        <ThemeSwitch />
        <Button asChild className="ml-auto bg-green-900 hover:bg-green-800 text-white active:bg-green-700 focus:ring-green-300 shadow-md ">
          <a href="/login">
            Login
          </a>
        </Button>
      </div>
      
    </header>
    </>
  );
};

export default HeaderHome;
