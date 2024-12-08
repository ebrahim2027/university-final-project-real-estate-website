import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; // آیکن‌های شبکه‌های اجتماعی
import { Link } from "react-router-dom";
import logo from "../public/logo.png"; // آدرس لوگو

export default function Footer() {
  return (
    <footer dir="ltr" className="bg-slate-300 shadow-md mt-10">
      <div className="flex flex-col justify-center items-center max-w-7xl mx-auto p-3">
        <Link to="/" className="flex items-center mb-3">
          <img className="w-8 mr-2" src={logo} alt="logo" />
          <h1 dir="rtl" className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">معاملات</span>
            <span className="text-slate-700">شما</span>
          </h1>
        </Link>
        <ul dir="rtl" className="flex gap-4 justify-center items-center mb-3">
          <Link to="/about">
            <li className="text-slate-700 font-bold">درباره ما</li>
          </Link>
          <Link to="/contact">
            <li className="text-slate-700 font-bold">ارتباط با ما</li>
          </Link>
          <Link to="/privacy">
            <li className="text-slate-700 font-bold">حریم خصوصی</li>
          </Link>
        </ul>
        <div className="flex gap-4 mb-3">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-slate-600 text-2xl" />
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-slate-600 text-2xl" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-slate-600 text-2xl" />
          </a>
        </div>
        <p className="text-slate-500 text-sm">تمامی حقوق محفوظ است &copy; 2024</p>
      </div>
    </footer>
  );
}
