"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./Hero.css"
import NewCollections from "../NewCollections/NewCollections"
import bridal from "../Assets/bridal.jpg" // Add your sale image
import background_img from "../Assets/bg_img.png" // Add your background image
const Hero = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  const saleTexts = [
    {
      status: "LIVE NOW",
      title: "Wedding Season Sale",
      collection: "Bridal Collection",
      discount: "Up to 80% OFF",
      description: "Complete your dream wedding look with our designer collection",
      color: "#ff3e6c",
    },
    {
      status: "Sale Ended",
      title: "Festive Collection",
      collection: "Traditional Wear",
      discount: "Up to 70% OFF",
      description: "Celebrate the festival with our exclusive traditional collection",
      color: "#ff9f00",
    },
    {
      status: "COMING SOON",
      title: "Winter Collection",
      collection: "Winter Special",
      discount: "Up to 60% OFF",
      description: "Stay warm and stylish with our winter fashion lineup",
      color: "#00bfff",
    },
  ]

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % saleTexts.length)
    }, 3000)

    return () => {
      clearInterval(textInterval)
    }
  }, [saleTexts.length])

  const currentSale = saleTexts[currentTextIndex]

  return (
    <div className="main-container">
      {/* Your existing hero section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden mb-50">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat  "
          style={{
            backgroundImage: `url(${background_img})`,
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="mb-6">
            <span className="text-sm font-medium tracking-wider uppercase text-secondary">
              Women's Fashion Collection
            </span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-balance"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Elegance Redefined for Every Woman
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto text-pretty">
            From traditional Indian wear to contemporary Western styles, discover fashion that celebrates your
            individuality and empowers your confidence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/products"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-md text-lg font-medium inline-flex items-center"
            >
              Shop Women's Collection
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-4 w-4"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Link>
            <Link
              to="/products"
              className="border border-white text-white hover:bg-white hover:text-black px-8 py-3 rounded-md bg-transparent text-lg font-medium"
            >
              View New Arrivals
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Wedding Season Sale Section */}
      <div className="sale-container">
        <div className="sale-banner" style={{ backgroundColor: currentSale.color }}>
          <div className="sale-content">
            <div className="sale-status">{currentSale.status}</div>
            <h2 className="sale-title">{currentSale.title}</h2>
            <h3 className="sale-collection">{currentSale.collection}</h3>
            <div className="sale-discount">{currentSale.discount}</div>
            <p className="sale-description">{currentSale.description}</p>
            <div className="sale-buttons">
              <a href="https://weedingseasonsales.com" className="sale-button primary">
                Shop Now
              </a>
              <a href="#collection" className="sale-button secondary">
                View Collection
              </a>
            </div>
          </div>
          <div className="sale-image">
            <img src={bridal} alt="Wedding Collection" />
          </div>
        </div>
      </div>

      {/* New Collections Section */}
      <NewCollections />
    </div>
  )
}

export default Hero
