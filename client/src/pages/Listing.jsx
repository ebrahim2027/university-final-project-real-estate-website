import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaTree,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import Contact from "../components/Contact";


export default function Listing() {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && <p className="text-center my-7 text-2xl">بارگیری...</p>}
      {error && <p className="text-center my-7 text-2xl">مشکلی پیش آمد!</p>}
      {listing && !loading && !error && (
        <div className="mt-4">
          <Swiper navigation loop>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "contain",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div
            className="hover:shadow-sm hover:shadow-slate-900 fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer transition-transform duration-700 ease-in-out hover:rotate-360"
            onClick={() => {
              
              navigator.clipboard.writeText(window.location.href);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
          >
            <FaShare className="text-slate-500" />
          </div>

          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              کاپی شد!
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-5 gap-4">
            <p className="text-2xl font-semibold">
              {listing.name}
              {listing.offer
                ? listing.discountPrice.toLocaleString("en-US")
                : listing.regularPrice.toLocaleString("en-US")}
              {listing.type === "rent" && `  ؋ ماهانه `}
              {listing.type === "sale" && `  ؋  `}
            </p>
            <p className="flex items-center mt-1 gap-2 text-slate-600 font-bold  text-sm">
              <FaMapMarkerAlt className="text-green-700" />
              {listing.address}
            </p>
            <div className="flex gap-4">
              <p className="bg-red-700 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "کرایی" : "فروشی"}
              </p>
              {listing.offer && (
                <p className="bg-green-700 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  {+listing.regularPrice - +listing.discountPrice}؋ تخفیف
                </p>
              )}
            </div>
            <p className="text-slate-800">
              <span className="font-semibold text-black">توضیحات - </span>
              {listing.description}
            </p>
            <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} اتاق `
                  : `${listing.bedrooms} اتاق `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} حمام `
                  : `${listing.bathrooms} حمام `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "پارکینگ" : "بدون پارکینگ"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaTree className="text-lg" />
                {listing.furnished ? "باغچه" : "بدون باغچه"}
              </li>
            </ul>
            {!currentUser && (
              <Link to="/sign-up">
                <button
                  onClick={() => setContact(true)}
                  className="bg-blue-500 text-white w-full rounded-lg uppercase hover:opacity-95 p-3"
                >
                  برای سفارش مُلک، ابتدا باید ثبت نام کنید!
                </button>
              </Link>
            )}
            <div>
              {currentUser && !currentUser.isAdmin && (
                <Contact listing={listing} />
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
