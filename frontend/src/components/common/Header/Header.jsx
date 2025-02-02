import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, UserPen } from "lucide-react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { menu } from "../../../constant/Headerconstant";
import { Avater } from "../../../assets/images/Index";
import { logout } from "../../../slices/UserSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const isAuthenticated = useSelector((state) => state.user.token)?.length > 0;
  const userInfo = useSelector((state) => state.user);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const accountItem = menu.find((item) => item.name === "Account");
  const otherItems = menu.filter((item) => item.name !== "Account");

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signIn");
    setIsAuth(false);
  };

  return (
    <header className="flex justify-between items-center px-8 py-2 border-b-2 bg-white shadow-sm">
      {/* Logo and Navigation */}
      <div className="flex items-center">
        <div className="text-3xl font-serif text-primary">ATKLT TERA</div>
        <nav className="ml-20 hidden md:flex">
          <ul className="flex gap-8">
            {otherItems.map((list) => (
              <li key={list.id}>
                <a
                  href={list.Link}
                  className="flex items-center gap-2 hover:text-red-700"
                >
                  {list.name} {list?.Icon}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* User & Cart Section */}
      <div className="flex items-center gap-4">
        {accountItem && (
          <div className="relative flex items-center gap-4">
            {isAuth ? (
              <>
                <Link to="/cart" className="relative">
                  <ShoppingCart className="h-6 w-6 hover:text-blue-600" />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
                {/* Profile Dropdown */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 hover:text-red-700"
                >
                  <img
                    className="w-8 h-8 rounded-full ring-2 ring-gray-300"
                    src={Avater}
                    alt="User Avatar"
                  />
                  {!dropdownOpen ? (
                    <IoIosArrowDown className="text-xl" />
                  ) : (
                    <IoIosArrowUp className="text-xl" />
                  )}
                </button>

                {/* Dropdown Content */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-4 mt-6 w-48 bg-white rounded-md shadow-lg z-10">
                    <ul className="py-1">
                      <li>
                        <Link
                          to="/UserProfile"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          NAME: {userInfo.firstName + " " + userInfo.lastName}
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/UserProfile"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          My Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/UserSettings"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Settings
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={() => handleLogout()}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Cart Icon with Badge */}

                <Link
                  to="/signUp"
                  className="flex items-center gap-2 hover:text-red-700"
                >
                  Login <UserPen />
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
