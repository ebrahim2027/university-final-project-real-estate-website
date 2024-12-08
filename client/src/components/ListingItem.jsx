import { Link } from "react-router-dom";
import { MdAttachMoney, MdLocationOn, MdWallet } from "react-icons/md";
import {
  FaBath,
  FaBed,
  FaHome,
  FaMoneyBill,
  FaMoneyBillWave,
  FaRestroom,
  FaWallet,
} from "react-icons/fa";

export default function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[300px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            "https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg"
          }
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-ful font-bold">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <p className="text-slate-500 mt-2 font-semibold flex gap-2">
            {listing.offer
              ? listing.discountPrice.toLocaleString("en-US")
              : listing.regularPrice.toLocaleString("en-US")}
            {listing.type === "rent" && `  ؋ ماهانه `}
            {listing.type === "sale" && `  ؋  `}
          </p>
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
  );
}
