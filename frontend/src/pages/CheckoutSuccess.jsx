import React from "react";
import { Link } from "react-router-dom";

function CheckoutSuccess() {
  return (
    <div className="text-center">
      <h2 className="font-bold text-2xl mt-6">
        Thank you for completing secure online payment
      </h2>
      <p className="text-xl mt-3">Have a great day!</p>
      <div className="bg-gray-300 w-fit mx-auto p-2 rounded font-bold mt-8">
        <Link to="/">Go Back to home</Link>
      </div>
    </div>
  );
}

export default CheckoutSuccess;
