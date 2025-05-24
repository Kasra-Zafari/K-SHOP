"use client"

import React, { useState } from "react";

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-8">
      {/* tab btn*/}
      <div className="flex gap-4 border-b border-gray-200">
        {["description", "features", "reviews", "tags"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 px-4 font-medium ${
              activeTab === tab ? "border-b-2 border-black" : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab dscrp*/}
      <div className="mt-4">
        {activeTab === "description" && <p>{product.description}</p>}

        {activeTab === "features" && (
          <div className="text-sm text-gray-700 space-y-2">
            <p>
              <strong>Warranty:</strong>{" "}
              {product.warrantyInformation || "Not available"}
            </p>
            <p>
              <strong>Shipping:</strong>{" "}
              {product.shippingInformation || "Standard shipping"}
            </p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded">
                  <p className="font-bold">{review.reviewerName}</p>
                  <p className="text-yellow-500">⭐ {review.rating}</p>
                  <p>{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        )}

        {activeTab === "tags" && (
          <div className="text-sm text-gray-600">
            {product.tags && product.tags.length > 0
              ? product.tags.join(", ")
              : "No tags available."}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
