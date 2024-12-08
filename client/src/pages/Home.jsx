import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";
import home from "../public/house-illustration.png";
import { FaBath, FaBed, FaHandPointLeft } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import "./Home.css";

SwiperCore.use([Navigation, Autoplay]);

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=8");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOfferListings();
  }, []);

  return (
    <div>
      {/* top */}
      <div className="max-w-7xl mx-auto px-2 ">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="loader"></span>
          </div>
        ) : (
          offerListings.length > 0 && (
            <div>
              <style jsx>{`
                @keyframes bounce {
                  0%,
                  20%,
                  50%,
                  80%,
                  100% {
                    transform: translateY(0);
                    color: white; 
                  }
                  40% {
                    transform: translateY(-10px);
                  }
                  60% {
                    transform: translateY(-5px);
                  }
                }

                .animate-bounce {
                  animation: bounce 2s infinite;
                }
              `}</style>

              <h2 className="text-3xl mt-1 text-center font-bold bg-slate-800 py-4 border-b-4 border-slate-900 shadow-md animate-bounce">
                املاک با تخفیف ویژه
              </h2>

              <p className="text-center text-slate-600 text-lg mt-2 px-6">
                فرصت استثنایی برای خرید یا کرایه ملک با تخفیف‌های ویژه!
                آپارتمان‌ها لوکس، خانه‌های مدرن با قیمت‌های مناسب در مدت محدود.
                همین حالا اقدام کنید!
              </p>

              <style jsx>{`
                .swiper-button-next,
                .swiper-button-prev {
                  width: 40px; 
                  height: 40px; 
                  color: white; 
                  background-color: rgba(0, 0, 0, 0.5); 
                  border-radius: 50%; 
                  position: absolute; 
                  top: 50%; 
                  transform: translateY(-50%); 
                }

                .swiper-button-next {
                  right: 10px; 
                }

                .swiper-button-prev {
                  left: 10px; 
                }

                .swiper-button-next:hover,
                .swiper-button-prev:hover {
                  background-color: rgba(
                    0,
                    0,
                    0,
                    0.8
                  ); 
                }

                .swiper-button-next::after,
                .swiper-button-prev::after {
                  font-size: 25px; 
                }
              `}</style>

              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
              >
                {offerListings.map((listing) => (
                  <SwiperSlide key={listing._id}>
                    <div className="bg-white rounded-sm shadow-md my-3 transition-shadow overflow-hidden w-full">
                      <Link to={`/listing/${listing._id}`}>
                        <img
                          src={
                            listing.imageUrls[0] ||
                            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
                          }
                          alt="listing cover"
                          className="h-[400px] w-full object-cover hover:scale-105 transition-scale duration-300"
                        />
                        <div className="p-3 flex flex-col gap-2 w-full">
                          <p className="truncate text-lg font-semibold text-slate-700">
                            {listing.name}
                          </p>
                          <div className="flex flex-col justify-start items-start gap-1">
                            <div className="flex flex-row justify-start items-center gap-1">
                              <MdLocationOn className="h-8 w-8 text-green-700" />
                              <p className="text-sm font-bold text-gray-600 truncate w-full">
                                {listing.address}
                              </p>
                            </div>
                            <p className="text-slate-500 text-md font-semibold ">
                              {listing.offer
                                ? listing.discountPrice.toLocaleString("en-US")
                                : listing.regularPrice.toLocaleString("en-US")}
                              {listing.type === "rent" && `  ؋ ماهانه `}
                              {listing.type === "sale" && `  ؋  `}
                            </p>
                          </div>

                          <div className="text-slate-700 flex gap-4">
                            <li className="flex items-center gap-1 whitespace-nowrap ">
                              <FaBed className="text-lg text-blue-500" />
                              {listing.bedrooms > 1
                                ? `${listing.bedrooms} اتاق `
                                : `${listing.bedrooms} اتاق `}
                            </li>
                            <li className="flex items-center gap-1 whitespace-nowrap ">
                              <FaBath className="text-lg text-red-500" />
                              {listing.bathrooms > 1
                                ? `${listing.bathrooms} حمام `
                                : `${listing.bathrooms} حمام `}
                            </li>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )
        )}
      </div>
      {/* ...... */}
      <div className="my-8 flex flex-col lg:flex-row items-start justify-between max-w-7xl mx-auto px-2 pt-3">
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <h1 className="text-slate-700 font-bold text-3xl lg:text-5xl">
            ملک <span className="text-slate-400 leading-normal">رویایی</span>
            <br />
            تان را با ما پیدا کنید!
          </h1>
          <div className="text-gray-400 text-xs mt-2 sm:text-base">
            در
            <span className="text-slate-700 font-bold"> معاملات شما</span> ملک
            با ما، ملک رویایی خود را در زمان خیلی کوتاه، با آرامش خاطر پیدا
            کنید!
            <br />
            ما مجموعه‌ای از املاک مناسب را با قیمت‌های متناسب با بودجه شما ارائه
            می‌دهیم.
          </div>
          <div className="flex flex-row mt-2">
            {!currentUser && (
              <Link to="/sign-up" className="ml-4">
                <li className="text-white flex justify-between items-center bg-blue-400 hover:bg-blue-500 rounded-lg px-4 py-2 transition duration-300 ease-in-out shadow-md">
                  <FaHandPointLeft className="inline ml-2" />
                  ثبت نام
                </li>
              </Link>
            )}
            <Link
              to={"/search"}
              className="ease-in-out transform hover:scale-105 bg-slate-500 w-full max-w-[200px] text-white text-center p-2 rounded-md transition duration-300"
            >
              جستجو کنید
            </Link>
          </div>
        </div>
        <img
          src={home}
          className="w-full h-auto lg:w-[220px] lg:h-220px] object-cover"
          alt=""
        />
      </div>

      <div className="max-w-7xl mx-auto p-3 flex flex-col gap-6 mb-5">
        {/* املاک کرایی */}
        {rentListings && rentListings.length > 0 && (
          <div>
            <h2 className="text-2xl my-5 font-semibold text-slate-600">
              املاک کرایی
            </h2>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
            <Link
              className="inline-block mt-5 text-white bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-blue-300 rounded-md px-4 py-2 text-sm font-semibold transition duration-300"
              to={"/search?type=rent"}
            >
              موارد بیشتر...
            </Link>
          </div>
        )}

        {/* املاک فروشی */}
        {saleListings && saleListings.length > 0 && (
          <div>
            <h2 className="my-5 text-2xl font-semibold text-slate-600">
              املاک فروشی
            </h2>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
            <Link
              className="inline-block mt-5 text-white bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-blue-300 rounded-md px-4 py-2 text-sm font-semibold transition duration-300"
              to={"/search?type=sale"}
            >
              موارد بیشتر...
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
