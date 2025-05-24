"use client"

import React, { useState } from "react";

const ProductTabs = ({ product }) => {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { key: "description", label: "Description" },
    { key: "features", label: "Features" },
    { key: "reviews", label: "Reviews" },
    { key: "tags", label: "Tags" },
  ];

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex gap-2 border-b border-gray-200 mb-4 overflow-x-auto whitespace-nowrap
                      scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100
                      -webkit-overflow-scrolling-touch">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-t-lg font-medium transition-all duration-200
              ${
                activeTab === tab.key
                  ? "bg-[#002AB3]/10 text-[#002AB3] border-b-2 border-[#002AB3]"
                  : "text-gray-500 hover:text-[#002AB3]"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="text-sm text-gray-700">
        {activeTab === "description" && <p>{product.description}</p>}

        {activeTab === "features" && (
          <div className="space-y-2">
            <p>
              <strong>Warranty:</strong>{" "}
              {product.warrantyInformation || "Not available"}
            </p>
            <p>
              <strong>Shipping:</strong>{" "}
              {product.shippingInformation || "Standard shipping"}
            </p>
            <p>
              <strong>Dimensions:</strong>{" "}
              {product.dimensions
                ? `${product.dimensions.width}×${product.dimensions.height}×${product.dimensions.depth}`
                : "Not specified"}
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
          <div>
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