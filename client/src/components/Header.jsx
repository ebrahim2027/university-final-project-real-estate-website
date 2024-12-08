import {
  FaLongArrowAltRight,
  FaSearch,
  FaSignOutAlt,
  FaUserAlt,
} from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa"; // آیکن‌های همبرگری و بستن
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import logo from "../public/logo.png";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // وضعیت برای نمایش منو
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // تغییر وضعیت منو
  };

  return (
    <header dir="ltr" className="bg-slate-300 shadow-md relative">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-3">
        <Link to="/" className="flex items-center">
          <img className="w-8 mr-2" src={logo} alt="" />
          <h1 dir="rtl" className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">معاملات</span>
            <span className="text-slate-700 pr-1">شما</span>
          </h1>
        </Link>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-50 p-3 rounded-lg flex items-center justify-center"
        >
          <input
            dir="rtl"
            type="text"
            placeholder="جستجو..."
            className="bg-transparent focus:outline-none mr-2 w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600 " />
          </button>
        </form>

        {/* دکمه همبرگری */}
        <div className="block sm:hidden cursor-pointer" onClick={toggleMenu}>
          {isMenuOpen ? (
            <FaTimes className="text-slate-600" />
          ) : (
            <FaBars className="text-slate-600" />
          )}
        </div>

        {/* منوی اصلی */}
        <ul
          dir="rtl"
          className={`flex gap-4 justify-center items-center ${
            isMenuOpen ? "block" : "hidden"
          } sm:flex`}
        >
          <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-10 w-10 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-white flex justify-between items-center bg-slate-500  rounded-lg px-4 py-2 transition duration-300 ease-in-out shadow-md">
                ورود
                <FaUserAlt className="inline mr-2" />
              </li>
            )}
          </Link>
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 font-bold hover:text-slate-400 transition duration-300">
              خانه
            </li>
          </Link>
          <Link to="/contact">
            <li className="hidden sm:inline text-slate-700 font-bold hover:text-slate-400 transition duration-300">
              ارتباط با ما
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 font-bold hover:text-slate-400 transition duration-300">
              درباره ما
            </li>
          </Link>
        </ul>
      </div>

      {/* منوی همبرگری برای موبایل */}
      {isMenuOpen && (
        <div className="sm:hidden bg-white p-4 flex flex-col absolute right-0 top-14 w-full shadow-lg rounded-lg border border-slate-200 transition-all duration-300">
          <Link
            to="/"
            className="py-2 text-slate-700 hover:bg-slate-100 hover:text-emerald-700 transition-colors duration-300 rounded-lg"
            onClick={() => setIsMenuOpen(false)} // بستن منو
          >
            خانه
          </Link>
          <Link
            to="/contact"
            className="py-2 text-slate-700 hover:bg-slate-100 hover:text-emerald-700 transition-colors duration-300 rounded-lg"
            onClick={() => setIsMenuOpen(false)} // بستن منو
          >
            ارتباط با ما
          </Link>
          <Link
            to="/about"
            className="py-2 text-slate-700 hover:bg-slate-100 hover:text-emerald-700 transition-colors duration-300 rounded-lg"
            onClick={() => setIsMenuOpen(false)} // بستن منو
          >
            درباره ما
          </Link>
          <Link
            to="/profile"
            className="py-2 text-slate-700 hover:bg-slate-100 hover:text-emerald-700 transition-colors duration-300 rounded-lg"
            onClick={() => setIsMenuOpen(false)} // بستن منو
          >
            {currentUser ? "پروفایل" : "ثبت نام"}
          </Link>
        </div>
      )}
    </header>
  );
}
