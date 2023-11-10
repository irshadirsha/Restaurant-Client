import React, { useState } from "react";
import axios from "axios";
import { AiOutlinePlusCircle } from 'react-icons/ai';
function Navbar() {
  const cloudName = import.meta.env.VITE_CLOUD_NAME
  const [showModal, setShowModal] = useState(false);
  const [hoteldata, setHotelData] = useState({
    hotelname: "",
    address: "",
    phone: "",
    image: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(hoteldata);
    if (hoteldata.image == null) {
      console.log("this returnd");
      return;
    } else {
      console.log("in else");
      const formData = new FormData();
      formData.append("file", hoteldata.image);
      formData.append("upload_preset", "I-club");
      const data = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=I-club`,
        formData
      );
      console.log("cloudd", data);
      if (data) {
        console.log("cloudd", data.data.secure_url);
        // setHotelData({...hoteldata,image:data.data.secure_url})
        const info = {
          hotelname: hoteldata.hotelname,
          address: hoteldata.address,
          phone: hoteldata.phone,
          image: data.data.secure_url,
        };
        const response = await axios.post(`${import.meta.env.VITE_BACKEND}/addData`, {
          info,
        });
        console.log(response.data);
        setShowModal(false);
      }
    }
  };

  console.log("hello state ", hoteldata);

  return (
    <div>
      <div className="bg-gray-800 shadow-xl shadow-black h-16 flex justify-end items-center pr-20">
        <button
          onClick={() => setShowModal(true)}
          className=" px-2 py-1  bg-green-600 hover:bg-green-700 text-white rounded "
        >
      <h1 className="text-2xl"><AiOutlinePlusCircle/></h1>
        </button>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 right-0 z-50  bg-opacity-50 flex items-center justify-center h-screen">
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center h-screen">
            <div className="relative   w-1/3 bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              {/* Modal content */}
              <div className="px-6 py-6 lg:px-10 ">
                <h3 className="mb-4 text-xl font-medium text-center text-gray-900 dark:text-white">
                  Add Restaurent Data
                </h3>
                <form className="space-y-6">
                  <div className="w-full">
                    <input
                      type="text"
                      id="hotelname"
                      name="hotelname"
                      onChange={(e) =>
                        setHotelData({
                          ...hoteldata,
                          hotelname: e.target.value,
                        })
                      }
                      placeholder="Restaurent Name"
                      className="mt-2 p-1.5 block w-full rounded-md  border-current border  border-gray-300 shadow-md   "
                      required
                    />
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      onChange={(e) =>
                        setHotelData({ ...hoteldata, address: e.target.value })
                      }
                      placeholder="Address"
                      className="mt-2 p-1.5 block w-full rounded-md  border-current border  border-gray-300 shadow-md   "
                      required
                    />
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      onChange={(e) =>
                        setHotelData({ ...hoteldata, phone: e.target.value })
                      }
                      placeholder="Contact"
                      className="mt-2 p-1.5 block w-full rounded-md  border-current border  border-gray-300 shadow-md   "
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="file"
                      className="w-full border border-gray-300 py-2 px-3 rounded-lg bg-gray-100"
                      accept="image/*"
                      onChange={(e) => {
                        const selectedFile = e.target.files[0];
                        if (
                          selectedFile &&
                          selectedFile.type.includes("image")
                        ) {
                          setHotelData({ ...hoteldata, image: selectedFile });
                        }
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className=" bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-white h-10 w-3/6 rounded-lg shadow-xl "
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
