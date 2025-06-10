"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
	{ name: "Beauty", image: "/img/category-beauty.jpg" },
	{ name: "Fragrances", image: "/img/category-fragrances.jpg" },
	{ name: "Furniture", image: "/img/category-furniture.jpg" },
	{ name: "Groceries", image: "/img/category-groceries.jpg" },
];

const benefits = [
	{ icon: "🚚", title: "Fast Delivery", desc: "Receive your order in no time." },
	{ icon: "💳", title: "Secure Payment", desc: "Your transactions are safe with us." },
	{ icon: "🔄", title: "Easy Returns", desc: "Hassle-free return policy." },
	{ icon: "⭐", title: "Customer Satisfaction", desc: "Top-rated service and quality." },
];

const reviews = [
	{
		name: "John Doe",
		comment: "Great shopping experience! Fast delivery and excellent support.",
		image: "/img/user1.jpg",
	},
	{
		name: "Sarah Smith",
		comment: "Loved the quality of the products. Highly recommended!",
		image: "/img/user2.jpg",
	},
	{
		name: "Michael Johnson",
		comment: "Superb service and easy returns. Will shop again!",
		image: "/img/user3.jpg",
	},
];

const sliderImages = [
	{ src: "/img/banner1.jpg", alt: "Banner 1" },
	{ src: "/img/banner2.jpg", alt: "Banner 2" },
	{ src: "/img/banner3.jpg", alt: "Banner 3" },
];

function HomeSlider() {
	const [current, setCurrent] = useState(0);

	const nextSlide = () =>
		setCurrent((prev) => (prev + 1) % sliderImages.length);
	const prevSlide = () =>
		setCurrent((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);

	return (
		<div className="relative w-full max-w-4xl mx-auto mt-8 mb-12 rounded-xl overflow-hidden shadow-lg">
			<Image
				src={sliderImages[current].src}
				alt={sliderImages[current].alt}
				width={1200}
				height={400}
				style={{ width: "100%", height: "auto", objectFit: "cover" }}
				className="w-full h-64 object-cover"
				priority
			/>
			{/* دکمه‌های قبلی و بعدی */}
			<button
				onClick={prevSlide}
				className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[#002AB3] rounded-full p-2 shadow transition"
				aria-label="Previous"
			>
				&#8592;
			</button>
			<button
				onClick={nextSlide}
				className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-[#002AB3] rounded-full p-2 shadow transition"
				aria-label="Next"
			>
				&#8594;
			</button>
			{/* نقاط پایین اسلایدر */}
			<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
				{sliderImages.map((_, idx) => (
					<button
						key={idx}
						onClick={() => setCurrent(idx)}
						className={`w-3 h-3 rounded-full ${
							current === idx
								? "bg-[#002AB3]"
								: "bg-white border border-[#002AB3]"
						}`}
						aria-label={`Go to slide ${idx + 1}`}
					/>
				))}
			</div>
		</div>
	);
}

export default function Home() {
	return (
		<main className="bg-gray-50 flex flex-col items-center text-center min-h-screen">
			<HomeSlider />

			{/* دسته‌بندی‌ها */}
			<h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-12 mb-6">
				Shop by Category
			</h2>
			<div className="flex flex-wrap justify-center gap-6 w-full mb-12 p-0">
				{categories.map((category) => (
					<Link
						key={category.name}
						href={`/products?category=${category.name.toLowerCase()}`}
						className="w-40 bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center"
					>
						<Image
							src={category.image}
							alt={category.name}
							width={120}
							height={80}
							style={{ width: "120px", height: "80px", objectFit: "cover" }}
							className="rounded mb-2"
						/>
						<h3 className="text-lg font-semibold text-gray-700">
							{category.name}
						</h3>
					</Link>
				))}
			</div>

			{/* مزایا */}
			<h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
				Why Shop With Us?
			</h2>
			<div className="flex flex-wrap justify-center gap-6 w-full mb-12">
				{benefits.map((benefit, idx) => (
					<div
						key={idx}
						className="w-52 bg-white rounded-lg shadow p-6 flex flex-col items-center hover:scale-105 transition"
					>
						<span className="text-4xl mb-2 grayscale hover:grayscale-0 transition">
							{benefit.icon}
						</span>
						<h3 className="text-lg font-semibold text-gray-700 mb-1">
							{benefit.title}
						</h3>
						<p className="text-gray-500 text-sm">{benefit.desc}</p>
					</div>
				))}
			</div>

			{/* نظرات مشتریان */}
			<h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
				Customer Reviews
			</h2>
			<div className="flex flex-wrap justify-center gap-6 w-full mb-16">
				{reviews.map((review, idx) => (
					<div
						key={idx}
						className="w-72 bg-white rounded-lg shadow p-6 flex flex-col items-center"
					>
						<Image
							src={review.image}
							alt={review.name}
							width={60}
							height={60}
							style={{ width: "60px", height: "60px", objectFit: "cover" }}
							className="rounded-full mb-2"
						/>
						<h3 className="text-base font-semibold text-gray-700 mb-1">
							{review.name}
						</h3>
						<p className="text-gray-500 italic text-sm">
							"{review.comment}"
						</p>
					</div>
				))}
			</div>
		</main>
	);
}
