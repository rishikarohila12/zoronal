import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSearch } from "react-icons/fi";
import { Link } from 'react-router-dom'; // 1. Link import kiya
import AddCompanyModal from '../components/AddCompanyModal';
import Signup from "./Signup";
import Login from "./Login";

const Dashboard = () => {
  const [showSignup, setShowSignup] = useState(false);
const [showLogin, setShowLogin] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [city, setCity] = useState('Indore, Madhya Pradesh, India');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('Name');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCompanies = async () => {
    try {
      const parsedCity = city.split(',')[0].trim();
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/companies`, {
        params: { search, city: parsedCity, sortBy }
      });
      setCompanies(response.data.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [city, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchCompanies();
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow-sm px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-100">

  {/* LOGO */}
  <div className="flex items-center gap-3 cursor-pointer">

    {/* Star */}
   <div className="w-12 h-12 rounded-full bg-gradient-to-b from-fuchsia-600 to-indigo-700 flex items-center justify-center shadow-md">

  <span className="text-white text-[45px]">
    ★
  </span>

</div>
    {/* Text */}
    <h1 className="text-[20px] tracking-tight">

      <span className="text-gray-700 font-normal">
        Review
        <span className="text-purple-600 font-semibold">
  &
</span>
      </span>

      <span className="text-black font-bold">
        RATE
      </span>

    </h1>

  </div>

  {/* Search */}
  <form
    onSubmit={handleSearchSubmit}
    className="relative w-full max-w-md"
  >

    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full bg-gray-100 border border-transparent rounded-full py-2 px-5 pr-10 outline-none focus:bg-white focus:border-purple-400 transition-all text-sm"
    />

    <button
      type="submit"
      className="absolute right-4 top-[10px] text-purple-600 transition-all"
    >
       <FiSearch size={20} strokeWidth={2.5} />
    </button>

  </form>

  {/* Right Buttons */}
 {/* Right Buttons */}
<div className="flex items-center gap-4 text-sm font-medium">

  <button
    onClick={() => setShowSignup(true)}
    className="cursor-pointer text-gray-700 hover:text-purple-600 transition-all"
  >
    Signup
  </button>

  <button
    onClick={() => setShowLogin(true)}
    className="cursor-pointer bg-purple-50 text-purple-600 border border-purple-200 rounded-lg px-4 py-2 hover:bg-purple-600 hover:text-white transition-all"
  >
    Login
  </button>

</div>

</header>

      {/* <div className="max-w-4xl mx-auto px-4 py-8 mb-20"> */}
        <div className="w-full px-25 py-8 mb-20">
            <div className="bg-white w-full p-6 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-end justify-between gap-5 mb-8">
          <div className="flex flex-col sm:flex-row items-end gap-3 w-full lg:w-auto">
            <div className="w-full sm:w-72">
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Select City</label>
              <input 
                type="text" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                className="w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none"
              />
            </div>
            <button onClick={fetchCompanies} className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm px-5 py-2.5 rounded-lg shadow-sm transition-all whitespace-nowrap">
              Find Company
            </button>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)} 
            className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium text-sm px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            + Add Company
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Sort:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-lg p-2 text-sm bg-white focus:ring-2 focus:ring-purple-500/20 outline-none text-gray-700"
            >
              <option value="Name">Name</option>
              <option value="Average Rating">Average Rating</option>
              <option value="Location">Location</option>
            </select>
          </div>
        </div>

        <main className="space-y-4 max-w-4xl mx-auto">
          <h3 className="text-gray-500 text-sm font-medium">Result Found: {companies.length}</h3>
          
          {companies.map((company) => (

<div key={company._id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <img src={company.logoUrl} alt={company.name} className="w-16 h-16 object-cover rounded-lg border border-gray-100 bg-gray-50" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{company.name}</h4>
                  <p className="text-sm text-gray-400 mt-0.5"><i className="fa-solid fa-location-dot text-[#8c8c8c] text-[12px]"></i>{company.location}, {company.city}</p>
                  <div className="flex items-center gap-2 mt-2">

  {company.totalReviews > 0 && (
    <>

      {/* Rating Number */}
      <span className="text-[16px] font-semibold text-black">
        {company.averageRating}
      </span>

      {/* Stars */}
      <div className="flex items-center gap-[1px]">

        {[1, 2, 3, 4, 5].map((star) => (

          <span
            key={star}
            className={`text-[16px] ${
              star <= Math.round(company.averageRating)
                ? "text-[#f4b400]"
                : "text-gray-300"
            }`}
          >
            ★
          </span>

        ))}

      </div>

      {/* Reviews */}
      <span className="text-[16px] font-semibold text-black ml-1">
        {company.totalReviews} Reviews
      </span>

    </>
  )}

</div>
                </div>
              </div>
              <div className="flex sm:flex-col items-end justify-between sm:justify-center w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-100 gap-2">
                <span className="text-xs text-gray-400 font-medium">Founded: {new Date(company.foundedOn).toLocaleDateString()}</span>
                
                {/* 2. Link wrap kar diya button ko */}
                <Link to={`/company/${company._id}`}>
                  <button className="bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium px-4 py-2 rounded-lg shadow-sm transition-colors">
                    Detail Review
                  </button>
                </Link>
                
              </div>
            </div>
          ))}
        </main>
      </div>
{isModalOpen && (
  <AddCompanyModal
    closeModal={() => setIsModalOpen(false)}
    refreshData={fetchCompanies}
  />
)}

{/* Signup Modal */}
{showSignup && (
  <Signup
    setShowSignup={setShowSignup}
    setShowLogin={setShowLogin}
  />
)}

{/* Login Modal */}
{showLogin && (
  <Login
    setShowLogin={setShowLogin}
    setShowSignup={setShowSignup}
  />
)}
    </div>
  );
};

export default Dashboard;