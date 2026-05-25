import React, { useState } from "react";
import axios from "axios";

const AddCompanyModal = ({ closeModal, refreshData }) => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    foundedOn: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("https://zoronal-1.onrender.com/api/companies", formData);

      refreshData();
      closeModal();
    } catch (error) {
      console.log(error);
      alert("Error adding company");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
      
      {/* Modal */}
      <div className="relative bg-white w-full max-w-[360px] rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] overflow-hidden">

        {/* Purple Top Design */}
        <div className="absolute top-0 left-0">
          <div className="w-24 h-24 bg-gradient-to-b from-fuchsia-500 to-indigo-700 rounded-br-full"></div>

          <div className="absolute top-0 right-[-28px] w-16 h-16 bg-purple-200 rounded-full opacity-80"></div>
        </div>

        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-5 text-[26px] text-black hover:text-red-500 transition-all"
        >
          ×
        </button>

        {/* Modal Content */}
        <div className="px-7 pt-16 pb-7">

          {/* Heading */}
          <h2 className="text-[20px] font-bold text-center text-black mb-8">
            Add Company
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Company Name */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Company name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter..."
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm outline-none focus:border-purple-600"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Location
              </label>

              <input
                type="text"
                name="location"
                placeholder="Select Location"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm outline-none focus:border-purple-600"
              />
            </div>

            {/* Founded On */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                Founded on
              </label>

              <input
                type="date"
                name="foundedOn"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm outline-none focus:border-purple-600"
              />
            </div>

            {/* City */}
            <div>
              <label className="block text-sm text-gray-500 mb-2">
                City
              </label>

              <input
                type="text"
                name="city"
                placeholder="Enter city"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm outline-none focus:border-purple-600"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-center pt-3">
              <button
                type="submit"
                className="bg-gradient-to-r from-fuchsia-600 to-indigo-700 text-white text-sm font-medium px-10 py-2.5 rounded-lg hover:opacity-90 transition-all"
              >
                Save
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCompanyModal;