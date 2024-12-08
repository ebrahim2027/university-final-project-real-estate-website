import React from "react";
import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaTwitter,
} from "react-icons/fa";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col justify-start items-center bg-gray-50">
      <h1 className="my-10 text-4xl font-bold text-slate-700">ارتباط با ما</h1>
      <div className="flex flex-col md:flex-row justify-center items-center bg-white mt-10 p-6 rounded-lg shadow-lg w-full max-w-4xl text-center">
        <div className="md:w-1/2">
          <h2 className="text-xl text-slate-700 font-bold mb-6 flex justify-start">
            ما 24 ساعت در خدمت شما هستیم
          </h2>

          <div className="mb-4 flex items-center justify-start">
            <FaWhatsapp className="text-slate-500 ml-2" />
            <Link
              to="mailto:info@yourrealestate.com"
              className="text-slate-500 hover:underline"
            >
              شماره واتساپ : 073189489
            </Link>
          </div>
          <div className="mb-4 flex items-center justify-start">
            <FaPhoneAlt className="text-slate-500 ml-2" />
            <Link
              to="tel:+98123456789"
              className="text-slate-500 hover:underline"
            >
              شماره تلفن خطی: 051-1234567
            </Link>
          </div>

          <div className="mb-4 flex items-center justify-start">
            <FaEnvelope className="text-slate-500 ml-2" />
            <Link
              to="mailto:info@yourrealestate.com"
              className="text-slate-500 hover:underline"
            >
              ایمیل: mo'amelatehoma@gmail.com
            </Link>
          </div>

          <div className="flex justify-start space-x-4 mt-6 mr-20">
            <Link
              to="https://facebook.com"
              target="_blank"
              className="text-slate-500 hover:underline"
            >
              <FaFacebook size={24} />
            </Link>
            <Link
              to="https://instagram.com"
              target="_blank"
              className="text-slate-500 hover:underline"
            >
              <FaInstagram className="mr-4" size={24} />
            </Link>
            <Link
              to="https://instagram.com"
              target="_blank"
              className="text-slate-500 hover:underline"
            >
              <FaTwitter size={24} />
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img
            className="h-80 w-80 object-cover rounded-lg "
            src="https://img.freepik.com/premium-vector/illustration-contact-us-concept-with-options-by-phone-email-location_7496-1712.jpg?ga=GA1.1.1059072598.1706421133"
            alt="Contact Us Illustration"
          />
        </div>
      </div>
    </div>
  );
}
