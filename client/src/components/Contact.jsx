import { useEffect, useState } from "react";
import { FaEnvelope, FaPhone, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <>
      {landlord && (
        <div className="flex mt-5 flex-col gap-4 bg-white p-6 shadow-lg rounded-lg">
          <div>
            <h2 className="mb-4 text-green-600 font-bold text-xl">
              راه های ارتباطی
            </h2>{" "}
            <div className="mb-4 flex items-center justify-start">
              <FaPhoneAlt className="text-blue-500 ml-2 text-xl" />
              <Link
                to="tel:+98123456789"
                className="text-slate-500 hover:underline"
              >
                شماره تلفن خطی: 051-1234567
              </Link>
            </div>
            <div className="mb-4 flex items-center justify-start">
              <FaWhatsapp className="text-green-500 ml-1 text-2xl" />
              <Link
                to="mailto:info@yourrealestate.com"
                className="text-slate-500 hover:underline"
              >
                شماره واتساپ : 073189489
              </Link>
            </div>
            <div className="mb-4 flex items-center justify-start">
              <FaEnvelope className="text-red-500 ml-2 text-xl" />
              <span
                to="mailto:info@yourrealestate.com"
                className="text-slate-500"
              >
                ارسال ایمیل...
              </span>
            </div>
          </div>

          <textarea
            name="message"
            id="message"
            rows="3"
            value={message}
            onChange={onChange}
            placeholder="ایمیل تان را اینجا وارد بنویسید..."
            className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
          ></textarea>

          <Link
            to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="bg-blue-500 text-white text-center p-3 rounded-lg uppercase tracking-wider font-semibold hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            ارسال
          </Link>
        </div>
      )}
    </>
  );
}
