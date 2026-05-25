import React, { useState } from "react";
import axios from "axios";

const AddReviewForm = ({
  companyId,
  closeModal,
  refreshReviews,
}) => {

  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    reviewText: "",
    rating: 4,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRating = (value) => {
    setFormData({
      ...formData,
      rating: value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews`,
        {
          companyId,
          ...formData,
        }
      );

      refreshReviews();
      closeModal();

    } catch (error) {

      console.log(error);
      alert("Error adding review");

    }
  };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">

      {/* Modal */}
      <div className="relative bg-white w-full max-w-[420px] rounded-[22px] shadow-2xl overflow-hidden">

        {/* Top Purple Design */}
        <div className="absolute top-0 left-0">
          <div className="w-20 h-20 bg-gradient-to-b from-fuchsia-500 to-indigo-700 rounded-br-full"></div>

          <div className="absolute top-0 right-[-22px] w-14 h-14 bg-purple-200 rounded-full opacity-80"></div>
        </div>

        {/* Close */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-5 text-gray-400 hover:text-red-500 text-xl"
        >
          ×
        </button>

        {/* Content */}
        <div className="px-8 pt-14 pb-8">

          {/* Heading */}
          <h2 className="text-[24px] font-bold text-center mb-8">
            Add Review
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="text-xs text-gray-400">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm outline-none focus:border-purple-600"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="text-xs text-gray-400">
                Subject
              </label>

              <input
                type="text"
                name="subject"
                placeholder="Enter"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm outline-none focus:border-purple-600"
              />
            </div>

            {/* Review */}
            <div>
              <label className="text-xs text-gray-400">
                Enter Your Review
              </label>

              <textarea
                name="reviewText"
                placeholder="Description"
                rows="4"
                required
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-sm px-3 py-2 text-sm outline-none resize-none focus:border-purple-600"
              />
            </div>

            {/* Rating */}
            <div>

              <h3 className="font-bold text-lg mb-2">
                Rating
              </h3>

              <div className="flex items-center gap-1">

                {[1, 2, 3, 4, 5].map((star) => (

                  <span
                    key={star}
                    onClick={() => handleRating(star)}
                    className={`text-3xl cursor-pointer transition-all ${
                      star <= formData.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>

                ))}

                <span className="text-xs text-gray-400 ml-2">
                  satisfied
                </span>

              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center pt-2">

              <button
                type="submit"
                className="bg-gradient-to-r from-fuchsia-600 to-indigo-700 text-white text-sm px-8 py-2 rounded-md hover:opacity-90"
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

export default AddReviewForm;