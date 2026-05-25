import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewList from '../components/ReviewList';

const CompanyDetail = () => {

  const { id } = useParams();

  const [company, setCompany] = useState(null);

  useEffect(() => {

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/companies/${id}`)
      .then((res) => {

        setCompany(res.data.data);

      })
      .catch((err) => {

        console.log(err);

      });

  }, [id]);

  // Loading
  if (!company) {

    return (

      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">

        Loading...

      </div>

    );

  }

  return (

  <div className="min-h-screen bg-[#f7f7f7] flex justify-center">

    <div className="w-full">

      <ReviewList
        companyId={id}
        company={company}
      />

    </div>

  </div>

);
};

export default CompanyDetail;