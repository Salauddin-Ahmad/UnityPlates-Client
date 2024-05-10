import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
    const { user, logOut } = useAuth();
    return (
        <div className='navbar bg-base-100 shadow-xl  mx-auto'>
        <div className='flex-1'>
          <NavLink to='/' className='flex gap-2 items-center'>
            <img className='w-full h-10 rounded-full' src='https://i.postimg.cc/BQFMmtL1/imagesss.png' alt='' />
            <span className='font-bold'>UnityPlates</span>
          </NavLink>
        </div>
        <div className='flex-none'>
          <ul className='menu menu-horizontal px-1'>
            <li>
              <NavLink to='/'
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 border  rounded-lg border-[#58d4db77]  font-bold mr-2 "
                  : "font-bold mr-2"
              }
              >
              <span className="p-2 text-lg font-bold">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/availabefoods'
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 border  rounded-lg border-[#58d4db77]  font-bold mr-2 "
                  : "font-bold mr-2"
              }
              >
              <span className="p-2 text-lg font-bold">Available Foods</span>
              </NavLink>
            </li>

            <li>
              <NavLink to='/addfood'
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 border  rounded-lg border-[#58d4db77]  font-bold mr-2 "
                  : "font-bold mr-2"
              }
              >
              <span className="p-2 text-lg font-bold">Add Food</span>
              </NavLink>
            </li>


            <li>
              <NavLink to='/managefoods'
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 border  rounded-lg border-[#58d4db77]  font-bold mr-2 "
                  : "font-bold mr-2"
              }
              >
              <span className="p-2 text-lg font-bold">Manage My Foods</span>
              </NavLink>
            </li>

            <li>
              <NavLink to='/foodrequests'
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 border  rounded-lg border-[#58d4db77]  font-bold mr-2 "
                  : "font-bold mr-2"
              }
              >
              <span className="p-2 text-lg font-bold">My Food Request</span>
              </NavLink>
            </li>



  
            {!user && (
              <li>
                <NavLink to='/login'>Login</NavLink>
              </li>
            )}
          </ul>
  
          {user && (
            <div className='dropdown dropdown-end z-50'>
              <div
                tabIndex={0}
                role='button'
                className='btn btn-ghost btn-circle avatar'
              >
                <div title={user?.displayName} className='w-10 rounded-full'>
                  <img
                    referrerPolicy='no-referrer'
                    alt='User Profile Photo'
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
              >

                <li className='mt-2'>
                  <button
                    onClick={logOut}
                    className='bg-gray-200 block text-center'
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    );
};

export default Navbar;