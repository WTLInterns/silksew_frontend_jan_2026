// "use client"

// import { useState, useContext, useEffect } from "react"
// import { useLocation, useNavigate, useParams } from "react-router-dom"
// import "./ProductDisplay.css"
// import { ShopContext } from "../../context/ShopContext"
// import { AuthContext } from "../../context/AuthContext"
// import { toast, ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import RelatedProducts from "../RelatedProducts/RelatedProducts"
// import axios from "axios"
// import { BASEURL } from "../../config"
// import FavoriteButton from "../common/FavoriteButton"
// import StarRating from "./StarRating"
// import FeedBack from "./FeedBack"

// const ProductDisplay = () => {
//   const { state } = useLocation()
//   const { productId } = useParams()
//   const [product, setProduct] = useState(null)
//   const [review, setReviews] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [filterReview, setFilterReview] = useState([])

//   const shopContext = useContext(ShopContext)
//   const { addToCart, products } = shopContext
//   const { token } = useContext(AuthContext)

//   const [selectedSize, setSelectedSize] = useState("")
//   const [selectedColor, setSelectedColor] = useState("")
//   const [mainImage, setMainImage] = useState("")
//   const [activeTab, setActiveTab] = useState("description")
//   const [showLoginModal, setShowLoginModal] = useState(false)

//   const navigate = useNavigate()

//   // Function to clean and validate image URLs
//   const cleanImageUrl = (url) => {
//     if (!url) return "/placeholder.svg"

//     // Remove trailing backslashes and clean the URL
//     let cleanUrl = url.toString().trim().replace(/\\+$/, "").replace(/\\/g, "")

//     // Ensure it's a valid Cloudinary URL
//     if (cleanUrl.includes("cloudinary.com")) {
//       // Fix any double slashes (except after http:// or https://)
//       cleanUrl = cleanUrl.replace(/([^:]\/)\/+/g, "$1")

//       // Ensure the URL starts with https://
//       if (!cleanUrl.startsWith("http")) {
//         cleanUrl = "https://" + cleanUrl
//       }

//       console.log("Cleaned image URL:", cleanUrl)
//       return cleanUrl
//     }

//     return "/placeholder.svg"
//   }

//   // Enhanced parsing function for colors and sizes
//   const parseProductArray = (data, fieldName = "unknown") => {
//     console.log(`Parsing ${fieldName}:`, data)

//     if (!data) {
//       console.log(`No ${fieldName} data found`)
//       return []
//     }

//     // If it's already an array of strings/objects, return it
//     if (Array.isArray(data) && data.length > 0) {
//       // Check if first element is a string (direct array)
//       if (typeof data[0] === "string") {
//         console.log(`${fieldName} is direct string array:`, data)
//         return data
//       }

//       // Check if first element is an array (nested array)
//       if (Array.isArray(data[0])) {
//         console.log(`${fieldName} is nested array:`, data[0])
//         return data[0]
//       }

//       // Check if first element is an object
//       if (typeof data[0] === "object") {
//         console.log(`${fieldName} is object array:`, data)
//         return data
//       }

//       // Try to parse if it's a JSON string
//       try {
//         const parsed = JSON.parse(data[0])
//         console.log(`${fieldName} parsed from JSON:`, parsed)
//         return Array.isArray(parsed) ? parsed : [parsed]
//       } catch (e) {
//         console.error(`Error parsing ${fieldName}:`, e)
//         return []
//       }
//     }

//     console.log(`${fieldName} format not recognized, returning empty array`)
//     return []
//   }

//     // Handle favorite toggle
//   const handleFavoriteClick = (e) => {
//     if (!token) {
//       e.preventDefault();
//       toast.warn("Log in to add to favorites.", {
//         position: "top-right",
//         autoClose: 1000,
//       })
//       navigate("/login")
//     }
//   }

//   useEffect(() => {
//     console.log("ProductDisplay mounted with productId:", productId)
//     const fetchProduct = async () => {
//       setLoading(true)
//       setError(null)
//       try {
//         console.log("Fetching product data for ID:", productId)
//         // First, try to find the product in the context
//         let productData = null

//         // Check if we have products in the context
//         if (products && products.length > 0) {
//           console.log("Looking for product in context products array:", products.length, "products")
//           productData = products.find((p) => p._id === productId)
//           if (productData) {
//             console.log("Found product in context:", productData.name)
//           }
//         }

//         // If not found in context, check if it was passed in state
//         if (!productData && state?.product) {
//           console.log("Found product in route state")
//           productData = state.product
//         }

//         // If still not found, check localStorage
//         if (!productData) {
//           const storedProduct = localStorage.getItem(`product_${productId}`)
//           if (storedProduct) {
//             console.log("Found product in localStorage")
//             productData = JSON.parse(storedProduct)
//           }
//         }

//         // If still not found, fetch from API
//         if (!productData && productId) {
//           console.log("Fetching product from API")
//           const response = await axios.get(`${BASEURL}/api/products/${productId}`)
//           if (response.status === 200) {
//             console.log("API response successful:", response.data)
//             productData = response.data
//             localStorage.setItem(`product_${productId}`, JSON.stringify(productData))
//           } else {
//             throw new Error("Failed to fetch product data")
//           }
//         }

//         if (productData) {
//           console.log("Setting product data:", productData)
//           console.log("Raw availableColors:", productData.availableColors)
//           console.log("Raw availableSizes:", productData.availableSizes)
//           console.log("Raw images:", productData.images)

//           setProduct(productData)

//           // Handle images properly
//           try {
//             // Handle images
//             let parsedImages = {}
//             if (productData.images && Array.isArray(productData.images) && productData.images.length > 0) {
//               // Check if it's already a parsed object
//               if (typeof productData.images[0] === "object") {
//                 parsedImages = productData.images[0]
//               } else {
//                 parsedImages = JSON.parse(productData.images[0])
//               }
//             }

//             // Clean all image URLs in the parsed images
//             Object.keys(parsedImages).forEach((color) => {
//               if (Array.isArray(parsedImages[color])) {
//                 parsedImages[color] = parsedImages[color].map((url) => cleanImageUrl(url))
//               }
//             })

//             // Handle available colors with enhanced parsing
//             const parsedColors = parseProductArray(productData.availableColors, "colors")
//             console.log("Parsed colors:", parsedColors)

//             // Determine default color - try to get from parsed colors or image keys
//             let defaultColor = ""
//             if (parsedColors.length > 0) {
//               // If colors are objects with name property
//               if (typeof parsedColors[0] === "object" && parsedColors[0].name) {
//                 defaultColor = parsedColors[0].name
//               } else if (typeof parsedColors[0] === "string") {
//                 // If colors are just strings
//                 defaultColor = parsedColors[0]
//               }
//             } else {
//               // Fallback to first image color key
//               defaultColor = Object.keys(parsedImages)[0] || "Black"
//             }

//             console.log("Default color set to:", defaultColor)
//             setSelectedColor(defaultColor)

//             // Set main image based on selected color
//             if (parsedImages[defaultColor] && parsedImages[defaultColor].length > 0) {
//               const cleanedMainImage = cleanImageUrl(parsedImages[defaultColor][0])
//               setMainImage(cleanedMainImage)
//               console.log("Set main image:", cleanedMainImage)
//             } else {
//               console.warn("No images found for color:", defaultColor)
//               setMainImage("/placeholder.svg")
//             }
//           } catch (parseError) {
//             console.error("Error parsing product data:", parseError)
//             setMainImage("/placeholder.svg")
//           }
//         } else {
//           throw new Error("No product data available")
//         }
//       } catch (error) {
//         console.error("Error fetching product:", error)
//         setError("Failed to load product details. Please try again later.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchProduct()
//     window.scrollTo(0, 0)
//   }, [productId, state, products])

//   // Update localStorage when product changes
//   useEffect(() => {
//     if (product) {
//       localStorage.setItem(`product_${product._id}`, JSON.stringify(product))
//     }
//   }, [product])

//   // Fetch reviews
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const res = await axios.get(`${BASEURL}/api/review`)
//         console.log("Fetched reviews:", res.data.data.length)
//         setReviews(res.data.data)
//       } catch (error) {
//         console.error("Error fetching reviews:", error)
//       }
//     }

//     fetchReviews()
//   }, [])

//   // Filter reviews for this product
//   useEffect(() => {
//     if (productId && review.length > 0) {
//       const filterData = review.filter((r) => r.productId === productId)
//       console.log("Filtered reviews for product:", filterData.length)
//       setFilterReview(filterData)
//     }
//   }, [review, productId])

//   if (loading) {
//     return <div className="loading-container">Loading product details...</div>
//   }

//   if (error) {
//     return <div className="error-container">{error}</div>
//   }

//   if (!product) {
//     return <div className="not-found-container">Product not found.</div>
//   }

//   // Parse product data safely
//   const parseProductData = (data, defaultValue = []) => {
//     if (!data || !Array.isArray(data) || data.length === 0) return defaultValue

//     try {
//       if (typeof data[0] === "object") return data[0]
//       return JSON.parse(data[0])
//     } catch (e) {
//       console.error("Error parsing data:", e)
//       return defaultValue
//     }
//   }

//   // Parse product data with enhanced parsing
//   const rawImages = parseProductData(product.images, {})
//   // Clean all image URLs
//   const images = {}
//   Object.keys(rawImages).forEach((color) => {
//     if (Array.isArray(rawImages[color])) {
//       images[color] = rawImages[color].map((url) => cleanImageUrl(url))
//     }
//   })

//   // Use enhanced parsing for colors and sizes
//   const availableSizes = parseProductArray(product.availableSizes, "sizes")
//   const availableColors = parseProductArray(product.availableColors, "colors")

//   console.log("Final parsed sizes:", availableSizes)
//   console.log("Final parsed colors:", availableColors)

//   const handleAddToCart = () => {
//     if (!token) {
//       setShowLoginModal(true)
//       return
//     }

//     if (!selectedSize) {
//       toast.error("Select a size.", { position: "top-right", autoClose: 1000 })
//       return
//     }

//     if (!selectedColor) {
//       toast.error("Select a color.", {
//         position: "top-right",
//         autoClose: 1000,
//       })
//       return
//     }

//     console.log("Adding to cart:", {
//       productId: product._id,
//       size: selectedSize,
//       color: selectedColor,
//     })

//     addToCart(product._id, selectedSize, selectedColor)
//     toast.success("Added to cart!", { position: "top-right", autoClose: 1000 })
//     setTimeout(() => navigate("/cart"), 1000)
//   }

//   const handleColorChange = (color) => {
//     console.log("Changing color to:", color)
//     setSelectedColor(color)
//     if (images[color] && images[color].length > 0) {
//       const cleanedImage = cleanImageUrl(images[color][0])
//       setMainImage(cleanedImage)
//       console.log("Changed main image to:", cleanedImage)
//     }
//   }

//   const handleNewFeedback = (newFeedback) => {
//     setFilterReview((prevReviews) => [...prevReviews, newFeedback])
//   }

//   // Handle image load error
//   const handleImageError = (e) => {
//     console.error("Image failed to load:", e.target.src)
//     e.target.src = "/placeholder.svg"
//   }

//   // Function to get color name from color data
//   const getColorName = (colorData) => {
//     if (typeof colorData === "string") {
//       return colorData
//     }
//     if (typeof colorData === "object" && colorData.name) {
//       return colorData.name
//     }
//     return colorData
//   }

//   return (
//     <>
//       <div className="productdisplay">
//         <ToastContainer />
//         <div className="productdisplay-left">
//           <div className="productdisplay-img-list">
//             {images[selectedColor]?.map((img, i) => (
//               <img
//                 key={i}
//                 src={cleanImageUrl(img) || "/placeholder.svg"}
//                 alt={`Product ${i + 1}`}
//                 onClick={() => setMainImage(cleanImageUrl(img))}
//                 className={mainImage === cleanImageUrl(img) ? "active" : ""}
//                 onError={handleImageError}
//                 onLoad={() => console.log("Thumbnail loaded successfully:", img)}
//               />
//             ))}
//           </div>
//           <div className="productdisplay-img">
//             <img
//               className="productdisplay-main-img"
//               src={cleanImageUrl(mainImage) || "/placeholder.svg"}
//               alt={product.name}
//               onError={handleImageError}
//               onLoad={() => console.log("Main image loaded successfully:", mainImage)}
//             />
//           </div>
//         </div>
//         <div className="productdisplay-right">
//           <h2>{product.name}</h2>
//           <p className="description" style={{ textAlign: "justify" }}>
//             {product.description}
//           </p>
//           <div className="productdisplay-right-prices">
//             <div className="productdisplay-right-price-new">Rs {product.price}</div>
//             {product.oldPrice && <div className="productdisplay-right-price-old">Rs {product.oldPrice}</div>}
//           </div>
//           <div className="productdisplay-right-colors">
//             <h3>Generic Name</h3>
//             <div className="color-options">{product.subcategory}</div>
//           </div>
//           <div className="productdisplay-right-colors">
//             <h3>Available Colors</h3>
//             <div className="color-options">
//               {availableColors && availableColors.length > 0 ? (
//                 availableColors.map((colorData, i) => {
//                   const colorName = getColorName(colorData)
//                   return (
//                     <div
//                       key={i}
//                       className={`color-circle ${selectedColor === colorName ? "selected" : ""}`}
//                       style={{ backgroundColor: colorName.toLowerCase() }}
//                       onClick={() => handleColorChange(colorName)}
//                       title={colorName}
//                     />
//                   )
//                 })
//               ) : (
//                 <p>No colors available</p>
//               )}
//             </div>
//           </div>
//           <div className="productdisplay-right-sizes">
//             <h3>Available Size</h3>
//             <div className="size-options">
//               {availableSizes && availableSizes.length > 0 ? (
//                 availableSizes.map((size, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setSelectedSize(size)}
//                     className={`size-box ${selectedSize === size ? "selected" : ""}`}
//                   >
//                     {size}
//                   </button>
//                 ))
//               ) : (
//                 <p>No sizes available</p>
//               )}
//             </div>
//           </div>
//           <button className="add-to-cart-btn" onClick={handleAddToCart}>
//             Add to Cart
//           </button>
//         </div>
//       </div>
      
//       {/* Glassy Login Modal */}
//       {showLoginModal && (
//         <div className="modal-overlay">
//           <div className="modal-content glass-modal">
//             <div className="modal-header">
//               <h3>Login Required</h3>
//               <button 
//                 className="modal-close-btn"
//                 onClick={() => setShowLoginModal(false)}
//               >
//                 &times;
//               </button>
//             </div>
//             <div className="modal-body">
//               <p>You need to login first to add items to your cart.</p>
//             </div>
//             <div className="modal-footer">
//               <button 
//                 className="modal-btn modal-btn-login"
//                 onClick={() => navigate("/login")}
//               >
//                 Login
//               </button>
//               <button 
//                 className="modal-btn modal-btn-signup"
//                 onClick={() => navigate("/signup")}
//               >
//                 Sign Up
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
      
//       <div className="descriptionbox">
//         <div className="descriptionbox-navigator">
//           <button
//             className={`descriptionbox-nav-box ${activeTab === "description" ? "active" : ""}`}
//             onClick={() => setActiveTab("description")}
//           >
//             Description
//           </button>
//           &ensp;&ensp;
//           <button
//             className={`descriptionbox-nav-box ${activeTab === "reviews" ? "active" : ""}`}
//             onClick={() => setActiveTab("reviews")}
//           >
//             Reviews ({filterReview.length})
//           </button>
//         </div>
//         <div className="descriptionbox-description" style={{ textAlign: "justify" }}>
//           {activeTab === "description" ? (
//             <p>{product.description}</p>
//           ) : (
//             <>
//               <div className="flex">
//                 <div className="feedback-container">
//                   <FeedBack productId={productId} onNewFeedback={handleNewFeedback} />
//                 </div>
//                 <div className="review-box">
//                   <h3 className="customer">Customer Reviews</h3>
//                   <div className="review-list-container">
//                     {filterReview.length > 0 ? (
//                       <ul className="review-list">
//                         {filterReview.map((review) => (
//                           <li key={review._id} className="review-item">
//                             <div className="review-header">
//                               <h4 className="review-name">{review.name}</h4>
//                               <StarRating star={review.rating} className="star-rating" />
//                             </div>
//                             <p className="review-text">{review.review}</p>
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <p className="no-reviews">No reviews yet.</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//       <RelatedProducts subcategory={product.subcategory} currentProductId={product._id} />
//     </>
//   )
// }

// export default ProductDisplay




"use client"

import { useState, useContext, useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import "./ProductDisplay.css"
import { ShopContext } from "../../context/ShopContext"
import { AuthContext } from "../../context/AuthContext"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import RelatedProducts from "../RelatedProducts/RelatedProducts"
import axios from "axios"
import { BASEURL } from "../../config"
import FavoriteButton from "../common/FavoriteButton"
import StarRating from "./StarRating"
import FeedBack from "./FeedBack"

const ProductDisplay = () => {
  const { state } = useLocation()
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [review, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterReview, setFilterReview] = useState([])

  const shopContext = useContext(ShopContext)
  const { addToCart, products } = shopContext
  const { token } = useContext(AuthContext)

  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [mainImage, setMainImage] = useState("")
  const [activeTab, setActiveTab] = useState("description")
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)

  const navigate = useNavigate()

  // Function to clean and validate image URLs
  const cleanImageUrl = (url) => {
    if (!url) return "/placeholder.svg"

    // Remove trailing backslashes and clean the URL
    let cleanUrl = url.toString().trim().replace(/\\+$/, "").replace(/\\/g, "")

    // Ensure it's a valid Cloudinary URL
    if (cleanUrl.includes("cloudinary.com")) {
      // Fix any double slashes (except after http:// or https://)
      cleanUrl = cleanUrl.replace(/([^:]\/)\/+/g, "$1")

      // Ensure the URL starts with https://
      if (!cleanUrl.startsWith("http")) {
        cleanUrl = "https://" + cleanUrl
      }

      console.log("Cleaned image URL:", cleanUrl)
      return cleanUrl
    }

    return "/placeholder.svg"
  }

  // Enhanced parsing function for colors and sizes
  const parseProductArray = (data, fieldName = "unknown") => {
    console.log(`Parsing ${fieldName}:`, data)

    if (!data) {
      console.log(`No ${fieldName} data found`)
      return []
    }

    // If it's already an array of strings/objects, return it
    if (Array.isArray(data) && data.length > 0) {
      // Check if first element is a string (direct array)
      if (typeof data[0] === "string") {
        console.log(`${fieldName} is direct string array:`, data)
        return data
      }

      // Check if first element is an array (nested array)
      if (Array.isArray(data[0])) {
        console.log(`${fieldName} is nested array:`, data[0])
        return data[0]
      }

      // Check if first element is an object
      if (typeof data[0] === "object") {
        console.log(`${fieldName} is object array:`, data)
        return data
      }

      // Try to parse if it's a JSON string
      try {
        const parsed = JSON.parse(data[0])
        console.log(`${fieldName} parsed from JSON:`, parsed)
        return Array.isArray(parsed) ? parsed : [parsed]
      } catch (e) {
        console.error(`Error parsing ${fieldName}:`, e)
        return []
      }
    }

    console.log(`${fieldName} format not recognized, returning empty array`)
    return []
  }

  // Handle favorite toggle
  const handleFavoriteClick = (e) => {
    if (!token) {
      e.preventDefault();
      toast.warn("Log in to add to favorites.", {
        position: "top-right",
        autoClose: 1000,
      })
      navigate("/login")
    }
  }

  useEffect(() => {
    console.log("ProductDisplay mounted with productId:", productId)
    const fetchProduct = async () => {
      setLoading(true)
      setError(null)
      try {
        console.log("Fetching product data for ID:", productId)
        // First, try to find the product in the context
        let productData = null

        // Check if we have products in the context
        if (products && products.length > 0) {
          console.log("Looking for product in context products array:", products.length, "products")
          productData = products.find((p) => p._id === productId)
          if (productData) {
            console.log("Found product in context:", productData.name)
          }
        }

        // If not found in context, check if it was passed in state
        if (!productData && state?.product) {
          console.log("Found product in route state")
          productData = state.product
        }

        // If still not found, check localStorage
        if (!productData) {
          const storedProduct = localStorage.getItem(`product_${productId}`)
          if (storedProduct) {
            console.log("Found product in localStorage")
            productData = JSON.parse(storedProduct)
          }
        }

        // If still not found, fetch from API
        if (!productData && productId) {
          console.log("Fetching product from API")
          const response = await axios.get(`${BASEURL}/api/products/${productId}`)
          if (response.status === 200) {
            console.log("API response successful:", response.data)
            productData = response.data
            localStorage.setItem(`product_${productId}`, JSON.stringify(productData))
          } else {
            throw new Error("Failed to fetch product data")
          }
        }

        if (productData) {
          console.log("Setting product data:", productData)
          console.log("Raw availableColors:", productData.availableColors)
          console.log("Raw availableSizes:", productData.availableSizes)
          console.log("Raw images:", productData.images)

          setProduct(productData)

          // Handle images properly
          try {
            // Handle images
            let parsedImages = {}
            if (productData.images && Array.isArray(productData.images) && productData.images.length > 0) {
              // Check if it's already a parsed object
              if (typeof productData.images[0] === "object") {
                parsedImages = productData.images[0]
              } else {
                parsedImages = JSON.parse(productData.images[0])
              }
            }

            // Clean all image URLs in the parsed images
            Object.keys(parsedImages).forEach((color) => {
              if (Array.isArray(parsedImages[color])) {
                parsedImages[color] = parsedImages[color].map((url) => cleanImageUrl(url))
              }
            })

            // Handle available colors with enhanced parsing
            const parsedColors = parseProductArray(productData.availableColors, "colors")
            console.log("Parsed colors:", parsedColors)

            // Determine default color - try to get from parsed colors or image keys
            let defaultColor = ""
            if (parsedColors.length > 0) {
              // If colors are objects with name property
              if (typeof parsedColors[0] === "object" && parsedColors[0].name) {
                defaultColor = parsedColors[0].name
              } else if (typeof parsedColors[0] === "string") {
                // If colors are just strings
                defaultColor = parsedColors[0]
              }
            } else {
              // Fallback to first image color key
              defaultColor = Object.keys(parsedImages)[0] || "Black"
            }

            console.log("Default color set to:", defaultColor)
            setSelectedColor(defaultColor)

            // Set main image based on selected color
            if (parsedImages[defaultColor] && parsedImages[defaultColor].length > 0) {
              const cleanedMainImage = cleanImageUrl(parsedImages[defaultColor][0])
              setMainImage(cleanedMainImage)
              console.log("Set main image:", cleanedMainImage)
            } else {
              console.warn("No images found for color:", defaultColor)
              setMainImage("/placeholder.svg")
            }
          } catch (parseError) {
            console.error("Error parsing product data:", parseError)
            setMainImage("/placeholder.svg")
          }
        } else {
          throw new Error("No product data available")
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        setError("Failed to load product details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
    window.scrollTo(0, 0)
  }, [productId, state, products])

  // Update localStorage when product changes
  useEffect(() => {
    if (product) {
      localStorage.setItem(`product_${product._id}`, JSON.stringify(product))
    }
  }, [product])

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`${BASEURL}/api/review`)
        console.log("Fetched reviews:", res.data.data.length)
        setReviews(res.data.data)
      } catch (error) {
        console.error("Error fetching reviews:", error)
      }
    }

    fetchReviews()
  }, [])

  // Filter reviews for this product
  useEffect(() => {
    if (productId && review.length > 0) {
      const filterData = review.filter((r) => r.productId === productId)
      console.log("Filtered reviews for product:", filterData.length)
      setFilterReview(filterData)
    }
  }, [review, productId])

  if (loading) {
    return <div className="loading-container">Loading product details...</div>
  }

  if (error) {
    return <div className="error-container">{error}</div>
  }

  if (!product) {
    return <div className="not-found-container">Product not found.</div>
  }

  // Parse product data safely
  const parseProductData = (data, defaultValue = []) => {
    if (!data || !Array.isArray(data) || data.length === 0) return defaultValue

    try {
      if (typeof data[0] === "object") return data[0]
      return JSON.parse(data[0])
    } catch (e) {
      console.error("Error parsing data:", e)
      return defaultValue
    }
  }

  // Parse product data with enhanced parsing
  const rawImages = parseProductData(product.images, {})
  // Clean all image URLs
  const images = {}
  Object.keys(rawImages).forEach((color) => {
    if (Array.isArray(rawImages[color])) {
      images[color] = rawImages[color].map((url) => cleanImageUrl(url))
    }
  })

  // Use enhanced parsing for colors and sizes
  const availableSizes = parseProductArray(product.availableSizes, "sizes")
  const availableColors = parseProductArray(product.availableColors, "colors")

  console.log("Final parsed sizes:", availableSizes)
  console.log("Final parsed colors:", availableColors)

  const handleAddToCart = () => {
    if (!token) {
      setShowLoginModal(true)
      return
    }

    if (!selectedSize) {
      toast.error("Select a size.", { position: "top-right", autoClose: 1000 })
      return
    }

    if (!selectedColor) {
      toast.error("Select a color.", {
        position: "top-right",
        autoClose: 1000,
      })
      return
    }

    console.log("Adding to cart:", {
      productId: product._id,
      size: selectedSize,
      color: selectedColor,
    })

    addToCart(product._id, selectedSize, selectedColor)
    toast.success("Added to cart!", { position: "top-right", autoClose: 1000 })
    setTimeout(() => navigate("/cart"), 1000)
  }

  const handleColorChange = (color) => {
    console.log("Changing color to:", color)
    setSelectedColor(color)
    if (images[color] && images[color].length > 0) {
      const cleanedImage = cleanImageUrl(images[color][0])
      setMainImage(cleanedImage)
      console.log("Changed main image to:", cleanedImage)
    }
  }

  const handleNewFeedback = (newFeedback) => {
    setFilterReview((prevReviews) => [...prevReviews, newFeedback])
  }

  // Handle image load error
  const handleImageError = (e) => {
    console.error("Image failed to load:", e.target.src)
    e.target.src = "/placeholder.svg"
  }

  // Function to get color name from color data
  const getColorName = (colorData) => {
    if (typeof colorData === "string") {
      return colorData
    }
    if (typeof colorData === "object" && colorData.name) {
      return colorData.name
    }
    return colorData
  }

  // Function to truncate description
  const truncateDescription = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }

  return (
    <>
      <div className="productdisplay">
        <ToastContainer />
        <div className="productdisplay-left">
          <div className="productdisplay-img-list">
            {images[selectedColor]?.map((img, i) => (
              <img
                key={i}
                src={cleanImageUrl(img) || "/placeholder.svg"}
                alt={`Product ${i + 1}`}
                onClick={() => setMainImage(cleanImageUrl(img))}
                className={mainImage === cleanImageUrl(img) ? "active" : ""}
                onError={handleImageError}
                onLoad={() => console.log("Thumbnail loaded successfully:", img)}
              />
            ))}
          </div>
          <div className="productdisplay-img">
            <img
              className="productdisplay-main-img"
              src={cleanImageUrl(mainImage) || "/placeholder.svg"}
              alt={product.name}
              onError={handleImageError}
              onLoad={() => console.log("Main image loaded successfully:", mainImage)}
            />
          </div>
        </div>
        <div className="productdisplay-right">
          <h2>{product.name}</h2>
          <div className="product-description-container">
            <p className="description" style={{ textAlign: "justify" }}>
              {descriptionExpanded ? product.description : truncateDescription(product.description)}
            </p>
            {product.description.length > 150 && (
              <button 
                className="description-toggle"
                onClick={() => setDescriptionExpanded(!descriptionExpanded)}
              >
                {descriptionExpanded ? 'Read Less' : 'Read More'}
              </button>
            )}
          </div>
          <div className="productdisplay-right-prices">
            <div className="productdisplay-right-price-new">Rs {product.price}</div>
            {product.oldPrice && <div className="productdisplay-right-price-old">Rs {product.oldPrice}</div>}
          </div>
          <div className="productdisplay-right-colors">
            <h3>Generic Name</h3>
            <div className="color-options">{product.subcategory}</div>
          </div>
          <div className="productdisplay-right-colors">
            <h3>Available Colors</h3>
            <div className="color-options">
              {availableColors && availableColors.length > 0 ? (
                availableColors.map((colorData, i) => {
                  const colorName = getColorName(colorData)
                  return (
                    <div
                      key={i}
                      className={`color-circle ${selectedColor === colorName ? "selected" : ""}`}
                      style={{ backgroundColor: colorName.toLowerCase() }}
                      onClick={() => handleColorChange(colorName)}
                      title={colorName}
                    />
                  )
                })
              ) : (
                <p>No colors available</p>
              )}
            </div>
          </div>
          <div className="productdisplay-right-sizes">
            <h3>Available Size</h3>
            <div className="size-options">
              {availableSizes && availableSizes.length > 0 ? (
                availableSizes.map((size, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(size)}
                    className={`size-box ${selectedSize === size ? "selected" : ""}`}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <p>No sizes available</p>
              )}
            </div>
          </div>
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
      
      {/* Glassy Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay">
          <div className="modal-content glass-modal">
            <div className="modal-header">
              <h3>Login Required</h3>
              <button 
                className="modal-close-btn"
                onClick={() => setShowLoginModal(false)}
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <p>You need to login first to add items to your cart.</p>
            </div>
            <div className="modal-footer">
              <button 
                className="modal-btn modal-btn-login"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button 
                className="modal-btn modal-btn-signup"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="descriptionbox">
        <div className="descriptionbox-navigator">
          <button
            className={`descriptionbox-nav-box ${activeTab === "description" ? "active" : ""}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          &ensp;&ensp;
          <button
            className={`descriptionbox-nav-box ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({filterReview.length})
          </button>
        </div>
        <div className="descriptionbox-description" style={{ textAlign: "justify" }}>
          {activeTab === "description" ? (
            <p>{product.description}</p>
          ) : (
            <>
              <div className="flex">
                <div className="feedback-container">
                  <FeedBack productId={productId} onNewFeedback={handleNewFeedback} />
                </div>
                <div className="review-box">
                  <h3 className="customer">Customer Reviews</h3>
                  <div className="review-list-container">
                    {filterReview.length > 0 ? (
                      <ul className="review-list">
                        {filterReview.map((review) => (
                          <li key={review._id} className="review-item">
                            <div className="review-header">
                              <h4 className="review-name">{review.name}</h4>
                              <StarRating star={review.rating} className="star-rating" />
                            </div>
                            <p className="review-text">{review.review}</p>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="no-reviews">No reviews yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <RelatedProducts subcategory={product.subcategory} currentProductId={product._id} />
    </>
  )
}

export default ProductDisplay
