import { useState } from 'react';
import NavLink from './NavLink';
import Link from 'next/link';
import { MdMenu } from 'react-icons/md';
import MobileMenu from './MobileMenu';

const NavBar = ({ navbar }) => {
  const { title, link } = navbar;
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  return (
    <nav className='sticky top-0 flex items-center justify-center w-screen h-16 px-2 md:px-6 bg-white border-b z-50'>
      <div className='flex align-center w-full justify-between font-poppins'>
        <div className='flex items-center justify-center'>
          <Link href='/' className='font-bold md:text-lg tracking-wide'>
            {title}
          </Link>
        </div>
        {/* Links for desktop */}
        {link.length > 0 && (
          <ul className='hidden md:flex items-center justify-center flex-row tracking-wide'>
            {link.map((l) => (
              <li key={l.id}>
                <NavLink link={l}>
                  <div className='mx-4 hover:text-gray-500'>{l.text}</div>
                </NavLink>
              </li>
            ))}
          </ul>
        )}
        <button
          className='p-1 md:hidden'
          onClick={() => setShowMobileMenu(true)}
        >
          <MdMenu className='h-8 w-auto' />
        </button>
        {showMobileMenu && (
          <MobileMenu
            navbar={navbar}
            closeSelf={() => setShowMobileMenu(false)}
          />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
