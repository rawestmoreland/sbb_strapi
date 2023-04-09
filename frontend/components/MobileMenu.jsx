import NavLink from './NavLink';
import { MdClose } from 'react-icons/md';

const MobileMenu = ({ navbar, closeSelf }) => {
  const { title, link } = navbar;
  return (
    <div className='fixed top-0 left-0 h-screen w-screen bg-white'>
      <div className='container h-full flex flex-col justify between'>
        {/* Top Row */}
        <div className='flex flex-row justify-between items-center py-2 px-1'>
          <div className='flex items-center justify-center'>
            <a className='font-bold md:text-lg tracking-wide'>{title}</a>
          </div>
          <button onClick={closeSelf} className='p1'>
            <MdClose className='h-8 w-auto' />
          </button>
        </div>
        {/* Links */}
        {link?.length > 0 && (
          <ul className='flex items-center justify-center w-full h-full flex-col tracking-wide'>
            {link.map((link) => {
              return (
                <li className='text-center py-2' key={link.id}>
                  <NavLink link={link}>
                    <div className='mx-4 hover:text-gray-500'>{link.text}</div>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
