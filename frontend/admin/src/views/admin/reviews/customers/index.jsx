import ComplexTable from "views/admin/dashboard/components/ComplexTable";
import React, { useState, useEffect } from "react";
import { reviewsServices } from "services/reviews";
import { Link } from "react-router-dom";
import Loader from "views/admin/loader";

const Reviews = () => {
  const [reviewsData, setReviewsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const columnsDataComplex = [
    {
      Header: "Review",
      accessor: "review_text",
    },
    {
      Header: "Rating",
      accessor: "rating",
    },
  ];

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    let response = await reviewsServices.getAllReviews();
    setReviewsData(response.data);
    setLoading(false);
  };

  return (
    <>
      {loading ? <Loader /> : (
        <div className="list-table reviews">
          {/* <div className="add-row text-align-right mb-5 px-6">
            <Link to="add" className="btn btn-primary">
              Add Reviews
            </Link>
          </div> */}
          <ComplexTable
            columnsData={columnsDataComplex}
            tableData={reviewsData}
            element="reviews"
          />
        </div>
      )}
    </>
  );
};

export default Reviews;
