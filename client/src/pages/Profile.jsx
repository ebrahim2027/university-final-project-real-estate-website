import logo from "../public/private-account_9634319.png";

import {
  FaSignOutAlt,
  FaUserMinus,
  FaTrash,
  FaEdit,
  FaCamera,
} from "react-icons/fa"; 
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import "./Profile.css"; // Import custom styles for confirm alert

import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const isAdmin = currentUser && currentUser.isAdmin === true;

  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();



  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    confirmAlert({
      title: "تایید حذف حساب کاربری",
      message: "آیا مطمئن هستید که می‌خواهید حساب کاربری خود را حذف کنید؟",
      buttons: [
        {
          label: "لغو",
          onClick: () => console.log("حذف لغو شد"),
          className: "cancel", 
        },
        {
          label: "بله",
          onClick: async () => {
            try {
              dispatch(deleteUserStart());
              const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: "DELETE",
              });
              const data = await res.json();
              if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
              }
              dispatch(deleteUserSuccess(data));
            } catch (error) {
              dispatch(deleteUserFailure(error.message));
            }
          },
        },
      ],
    });
  };

  const handleSignOut = async () => {
    confirmAlert({
      title: "تایید خروج",
      message: "آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟",
      buttons: [
        {
          label: "لغو",
          onClick: () => console.log("خروج لغو شد"),
          className: "cancel",
        },
        {
          label: "بله",
          onClick: async () => {
            try {
              dispatch(signOutUserStart());
              const res = await fetch("/api/auth/signout");
              const data = await res.json();
              if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
              }
              dispatch(deleteUserSuccess(data));
            } catch (error) {
              dispatch(deleteUserFailure(error.message));
            }
          },
        },
      ],
    });
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };


  const handleListingDelete = (listingId) => {
    confirmAlert({
      title: "تایید حذف ملک",
      message: "آیا مطمئن هستید که می‌خواهید این ملک را حذف کنید؟",
      buttons: [
        {
          label: "لغو",
          onClick: () => console.log("حذف لغو شد"),
          className: "cancel",
        },
        {
          label: "بله",
          onClick: async () => {
            try {
              const res = await fetch(`/api/listing/delete/${listingId}`, {
                method: "DELETE",
              });
              const data = await res.json();
              if (data.success === false) {
                console.log(data.message);
                return;
              }
              // حذف ملک از لیست
              setUserListings((prev) =>
                prev.filter((listing) => listing._id !== listingId)
              );
            } catch (error) {
              console.log(error.message);
            }
          },
        },
      ],
    });
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="border rounded-lg p-4  gap-4 shadow-md hover:shadow-lg transition-shadow duration-300">
        <h1 className="text-3xl font-semibold text-center my-7">حساب کاربری</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex justify-center items-center flex-col">
            <div className="relative">
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                ref={fileRef}
                hidden
                accept="image/*"
              />
              <img
                onClick={() => fileRef.current.click()}
                src={formData.avatar || currentUser.avatar}
                alt="تصویر پروفایل"
                className="rounded-full h-24 w-24 object-cover cursor-pointer"
              />
  
              <FaCamera
                onClick={() => fileRef.current.click()}
                className="absolute bottom-1 right-1 transform translate-x-1/4 translate-y-1/4 bg-white rounded-full p-1 cursor-pointer shadow-md hover:bg-gray-200 transition-all duration-300"
                size={24} 
              />
            </div>
            <p className="text-sm self-center mt-2">
              {fileUploadError ? (
                <span className="text-red-700">
                  خطا در آپلود تصویر (تصویر باید کمتر از 2 مگابایت باشد)
                </span>
              ) : filePerc > 0 && filePerc < 100 ? (
                <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
                <span className="text-green-700">
                  تصویر با موفقیت آپلود شد!
                </span>
              ) : (
                ""
              )}
            </p>
          </div>
          <input
            type="text"
            placeholder="نام کاربری"
            defaultValue={currentUser.username}
            id="username"
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="ایمیل"
            id="email"
            defaultValue={currentUser.email}
            className="border p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="پسورد"
            onChange={handleChange}
            id="password"
            className="border p-3 rounded-lg"
          />
          <button
            disabled={loading}
            className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? "بارگیری..." : "بروزرسانی"}
          </button>
        </form>
        <div className="flex justify-between mt-5">
          <span
            onClick={handleDeleteUser}
            className="text-red-700 cursor-pointer"
          >
            <FaUserMinus className=" ease-in-out transform hover:scale-110 text-yellow-500 transition duration-200 text-2xl" />
          </span>
          <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
            <FaSignOutAlt className=" ease-in-out transform hover:scale-110 text-red-500  transition duration-200 text-2xl" />
          </span>
        </div>

        <p className="text-red-700 mt-5">{error ? error : ""}</p>
        <p className="text-green-700 mt-5">
          {updateSuccess ? "موفقانه بروزرسانی شد!" : ""}
        </p>
      </div>
      {isAdmin && (
        <div className=" mt-10 border rounded-lg p-4  gap-4 shadow-md hover:shadow-lg transition-shadow duration-300">
          <div className="flex justify-start items-center mb-4 border-b-2 border-slate-600">
            <img
              src={logo}
              alt="تصویر پروفایل"
              className="rounded-full h-20 w-20 object-cover "
            />
            <h2 className=" text-3xl font-semibold text-center    text-slate-900  p-4 my-4">
              مدیریت املاک
            </h2>
          </div>

          <div className="flex flex-row items-center justify-center gap-4 mb-8">
          
            <Link
              to={"/create-listing"}
              className="bg-green-700 text-white w-1/2 py-3 rounded-lg uppercase text-center hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              افزودن ملک
            </Link>
            <button
              onClick={handleShowListings}
              className="bg-blue-700 text-white w-1/2 py-3 rounded-lg uppercase text-center hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              دیدن املاک
            </button>
          </div>

          <p className="text-red-700 mt-5 text-center">
            {showListingsError ? "خطا در نمایش املاک" : ""}
          </p>

          {userListings && userListings.length > 0 && (
            <div className="flex flex-col gap-4">
              <h1 className="text-center mt-7 text-2xl font-semibold text-slate-900">
                املاک شما
              </h1>
              {userListings.map((listing) => (
                <div
                  key={listing._id}
                  className="border rounded-lg p-4 flex justify-between items-center gap-4 shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Link to={`/listing/${listing._id}`}>
                    <img
                      src={listing.imageUrls[0]}
                      alt="listing cover"
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                  </Link>
                  <Link
                    className="text-slate-800 font-semibold hover:underline truncate flex-1"
                    to={`/listing/${listing._id}`}
                  >
                    <p>{listing.name}</p>
                  </Link>
                  <div className="flex flex-col items-center justify-center gap-2">
                    
                    <button
                      onClick={() => handleListingDelete(listing._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash className="text-xl" />
                    </button>

                   
                    <Link to={`/update-listing/${listing._id}`}>
                      <button className="text-green-600 hover:text-green-800">
                        <FaEdit className="text-xl" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
  c;
}
