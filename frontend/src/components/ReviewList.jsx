import React, { useState, useEffect } from "react";
import axios from "axios";
import AddReviewForm from "./AddReviewForm";

const ReviewList = ({ companyId, company }) => {

  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    fetchReviews();
  }, [sortBy, companyId]);

  const fetchReviews = async () => {

    try {

      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${companyId}?sortBy=${sortBy}`
      );

      setReviews(res.data.data);

    } catch (err) {

      console.error("Error fetching reviews:", err);

    }
  };

  // Stars
  const renderStars = (rating) => {

    return (

      <div className="flex items-center gap-[2px]">

        {[1, 2, 3, 4, 5].map((star) => (

          <span
            key={star}
            className={`text-[15px] ${
              star <= rating
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
          >
            ★
          </span>

        ))}

      </div>

    );
  };

  // Like
 const handleLike = async (reviewId) => {

  // LocalStorage Key
  const likedReviews =
    JSON.parse(localStorage.getItem("likedReviews")) || [];

  // Already liked?
  if (likedReviews.includes(reviewId)) {

    // alert("You already liked this review!");

    return;
  }

  try {

    await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/reviews/like/${reviewId}`
    );

    // Save locally
    likedReviews.push(reviewId);

    localStorage.setItem(
      "likedReviews",
      JSON.stringify(likedReviews)
    );

    fetchReviews();

  } catch (error) {

    console.log(error);

  }
};
  // Share
  const handleShare = async () => {

    try {

      await navigator.clipboard.writeText(window.location.href);

      alert("Link copied successfully!");

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="min-h-screen bg-[#f7f7f7] py-10 px-4">

      {/* Main */}
      <div className="max-w-[900px] mx-auto">

        {/* Card */}
        <div className="bg-white rounded-[18px] border border-gray-100 shadow-sm px-7 py-6">

          {/* Top */}
          <div className="flex items-start justify-between">

            {/* Left */}
            <div className="flex gap-4">

              {/* Logo */}
              {company?.logoUrl ? (

                <img
                  src={company?.logoUrl}
                  alt=""
                  className="w-20 h-20 rounded-xl object-cover border"
                />

              ) : (

                <div className="w-20 h-20 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-700 flex items-center justify-center text-white text-3xl font-bold shadow-md">

                  {company?.name?.charAt(0).toUpperCase()}

                </div>

              )}

              {/* Info */}
              <div>

                <h2 className="text-[18px] font-semibold text-black">

                  {company?.name}

                </h2>

                <p className="text-[12px] text-gray-500 mt-2 leading-5 max-w-[450px]">

                  {company?.description}

                </p>

                <p className="text-[11px] text-gray-400 mt-2">

                  📍 {company?.location}, {company?.city}

                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-4">

                  <span className="font-semibold text-[15px] text-black">

                    {company?.averageRating || 0}

                  </span>

                  {renderStars(Math.round(company?.averageRating || 0))}

                  <span className="text-[15px] font-semibold text-black ml-2">

                    {company?.totalReviews || 0} Reviews

                  </span>

                </div>

              </div>

            </div>

            {/* Right */}
            <div className="flex flex-col items-end">

              <p className="text-[11px] text-gray-400 mb-5">

                Founded on{" "}
                {new Date(company?.foundedOn).toLocaleDateString()}

              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-fuchsia-600 to-indigo-700 hover:opacity-90 transition-all text-white text-[13px] font-medium px-5 py-2 rounded-lg shadow-sm"
              >
                + Add Review
              </button>

            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-6"></div>

          {/* Header */}
          <div className="flex items-center justify-between mb-8">

            <p className="text-[13px] text-gray-400">

              Result Found: {reviews.length}

            </p>

            <select
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-[13px] outline-none bg-white"
            >
              <option value="date">Most Recent</option>
              <option value="rating">Highest Rated</option>
            </select>

          </div>

          {/* Reviews */}
          <div className="space-y-7">

            {reviews.map((rev) => (

              <div
                key={rev._id}
                className="flex items-start justify-between border-b border-gray-100 pb-7"
              >

                {/* Left */}
                <div className="flex gap-4 max-w-[700px]">

                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-black font-bold text-[15px]">

                    {rev.fullName?.charAt(0).toUpperCase()}

                  </div>

                  {/* Content */}
                  <div>

                    <h3 className="text-[16px] font-semibold text-black">

                      {rev.fullName}

                    </h3>

                    <p className="text-[11px] text-gray-400 mt-1">

                      {new Date(rev.createdAt).toLocaleDateString()}

                    </p>

                    <p className="text-[13px] text-gray-600 leading-7 mt-4">

                      {rev.reviewText}

                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-5 mt-5">

                      <button
  onClick={() => handleLike(rev._id)}
  className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-all text-xs cursor-pointer"
>
                        ❤️ {rev.likes || 0}
                      </button>

                      <button
                        onClick={handleShare}
                        className="flex items-center gap-1 text-gray-500 hover:text-indigo-600 transition-all text-[12px] cursor-pointer"
                      >
                        🔗 Share
                      </button>

                    </div>

                  </div>

                </div>

                {/* Stars */}
                <div className="mt-1">

                  {renderStars(rev.rating)}

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Modal */}
      {isModalOpen && (

        <AddReviewForm
          companyId={companyId}
          closeModal={() => setIsModalOpen(false)}
          refreshReviews={fetchReviews}
        />

      )}

    </div>

  );
};

export default ReviewList;