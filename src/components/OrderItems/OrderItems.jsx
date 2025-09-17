// "use client"

// import { useContext, useEffect, useState } from "react"
// import "./OrderItems.css"
// import { ShopContext } from "../../context/ShopContext"
// import { useNavigate } from "react-router-dom"
// import { BASEURL } from "../../config"
// import moment from "moment"
// import axios from "axios"

// const OrderItems = () => {
//   const { products } = useContext(ShopContext)
//   const navigate = useNavigate()
//   const [orderData, setOrderData] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [showPopup, setShowPopup] = useState(false)
//   const [selectedReason, setSelectedReason] = useState("")
//   const [currentOrder, setCurrentOrder] = useState(null)
//   const [currentProduct, setCurrentProduct] = useState(null)

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1)
//   const [itemsPerPage] = useState(4)

//   // Load order data
//   useEffect(() => {
//     const loadOrderData = async () => {
//       try {
//         const token = localStorage.getItem("token")
//         if (!token) {
//           console.warn("No token found, redirecting to login.")
//           navigate("/login")
//           return
//         }

//         const response = await axios.get(BASEURL + "/api/orders/myorders", {
//           headers: { Authorization: `Bearer ${token}` },
//         })

//         if (response && response.data) {
//           setOrderData(response.data)
//         } else {
//           setOrderData([])
//         }
//       } catch (error) {
//         console.error("Error fetching order data:", error)
//       }
//     }

//     loadOrderData()
//   }, [navigate])

//   // Function to handle return request
  // const requestReturn = async (e) => {
  //   e.preventDefault()
  //   setLoading(true)
  //   setError("")

  //   if (!currentOrder || !currentProduct || !selectedReason) {
  //     setError("Please select a reason and ensure a valid order and product are selected.")
  //     setLoading(false)
  //     return
  //   }

  //   try {
  //     const returnUrl = `${BASEURL}/api/orders/request-return/${currentOrder}/${currentProduct}`
  //     await axios.post(
  //       returnUrl,
  //       { reason: selectedReason },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           "Content-Type": "application/json",
  //         },
  //       },
  //     )

  //     const saveReasonUrl = `${BASEURL}/api/orders/save-reason`
  //     await axios.post(
  //       saveReasonUrl,
  //       {
  //         orderId: currentOrder,
  //         productId: currentProduct,
  //         reason: selectedReason,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           "Content-Type": "application/json",
  //         },
  //       },
  //     )

  //     alert("Return request submitted and reason saved successfully!")
  //     setShowPopup(false)

  //     // Update local state
  //     setOrderData((prevOrderData) =>
  //       prevOrderData.map((order) =>
  //         order._id === currentOrder
  //           ? {
  //               ...order,
  //               items: order.items.map((item) =>
  //                 item.productId === currentProduct
  //                   ? {
  //                       ...item,
  //                       returnRequested: true,
  //                       returnReason: selectedReason,
  //                     }
  //                   : item,
  //               ),
  //             }
  //           : order,
  //       ),
  //     )
  //   } catch (err) {
  //     setError(err.response ? `Error: ${err.response.status} - ${err.response.data.message}` : "Something went wrong")
  //   } finally {
  //     setLoading(false)
  //   }
  // }

//   const openPopup = (orderId, productId) => {
//     setCurrentOrder(orderId)
//     setCurrentProduct(productId)
//     setShowPopup(true)
//   }

//   const isReturnEligible = (orderDate) => {
//     if (!orderDate) return true
//     const orderTime = new Date(orderDate).getTime()
//     if (isNaN(orderTime)) return true
//     const currentTime = new Date().getTime()
//     const threeDays = 3 * 24 * 60 * 60 * 1000
//     return currentTime - orderTime <= threeDays
//   }

//   const getImage = (images, color) => {
//     if (images && images.length > 0) {
//       try {
//         const parsedImages = JSON.parse(images[0])
//         if (parsedImages[color] && parsedImages[color].length > 0) {
//           return parsedImages[color][0]
//         }
//         const firstAvailableColor = Object.keys(parsedImages)[0]
//         if (parsedImages[firstAvailableColor] && parsedImages[firstAvailableColor].length > 0) {
//           return parsedImages[firstAvailableColor][0]
//         }
//       } catch (error) {
//         console.error("Error parsing image JSON:", error)
//       }
//     }
//     return "/logo.png"
//   }

//   const flattenedItems = orderData.flatMap((order) =>
//     order.items
//       .map((item) => ({
//         ...item,
//         orderId: order._id,
//         createdAt: order.createdAt,
//         tentativeDeliveryDate: order.tentativeDeliveryDate,
//       }))
//       .filter((item) => {
//         const product = products.find((p) => p._id === item.productId)
//         return product !== undefined
//       }),
//   )

//   const indexOfLastItem = currentPage * itemsPerPage
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage
//   const currentItems = flattenedItems.slice(indexOfFirstItem, indexOfLastItem)

//   const totalPages = Math.ceil(flattenedItems.length / itemsPerPage)

//   const nextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1)
//   }

//   const prevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1)
//   }

//   useEffect(() => {
//     setCurrentPage(1)
//   }, [orderData])

//   return (
//     <div className="order-items-wrapper">
//       {/* Blur only the background content */}
//       <div className={`cartitems ${showPopup ? "blur-background" : ""}`}>
//         <div className="cartitems-header">
//           <p>Product</p>
//           <p>Title</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Size</p>
//           <p>Total</p>
//           <p>Action</p>
//         </div>
//         <hr />

//         {currentItems.length === 0 ? (
//           <div className="no-orders">
//             <p>No orders found</p>
//           </div>
//         ) : (
//           <>
//             {currentItems.map((item, index) => {
//               const { productId, quantity, size, returnRequested, returnApproved, orderId, createdAt } = item
//               const product = products.find((p) => p._id === productId)

//               if (!product) return null
//               let requestStatus = ""

//               if (item.action === "Select" && returnRequested && !returnApproved) {
//                 requestStatus = "Return requested"
//               }
//               if (item.action === "accepted" && returnRequested && returnApproved) {
//                 requestStatus = "Return Approved"
//               }
//               if (item.action === "rejected" && returnRequested && !returnApproved) {
//                 requestStatus = "Return Rejected"
//               }

//               const isEligible = isReturnEligible(createdAt)

//               return (
//                 <div key={`${orderId}-${index}`} className="cartitem">
//                   <img src={getImage(product.images) || "/logo.png"} alt={product.name} />
//                   <p>{product.name}</p>
//                   <p>Rs {product.price}</p>
//                   <p>{quantity}</p>
//                   <p>{size}</p>
//                   <p>Rs {quantity * product.price}</p>
//                   {!returnRequested && (isEligible || !createdAt) && (
//                     <button onClick={() => openPopup(orderId, productId)} disabled={loading}>
//                       {loading ? "Requesting Return..." : "Return"}
//                     </button>
//                   )}
//                   {!returnRequested && createdAt && !isEligible && <span>Return period expired</span>}
//                   {requestStatus && <span>{requestStatus}</span>}
//                 </div>
//               )
//             })}

//             <hr />
//             {totalPages > 1 && (
//               <div className="pagination">
//                 <button onClick={prevPage} disabled={currentPage === 1} className="pagination-btn">
//                   Previous
//                 </button>
//                 <span className="page-info">
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <button onClick={nextPage} disabled={currentPage === totalPages} className="pagination-btn">
//                   Next
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Return Reason Popup */}
//       {showPopup && (
//         <div className="popup-overlay">
//           <div className="popup-box">
//             <h2>Select Return Reason</h2>
//             {error && <p className="error-message">{error}</p>}
//             <form onSubmit={requestReturn}>
//               <div className="radio-group">
//                 <label className="radio-option">
//                   <input
//                     type="radio"
//                     name="returnReason"
//                     value="Received wrong product"
//                     onChange={(e) => setSelectedReason(e.target.value)}
//                   />
//                   <span className="radio-label">Received wrong product</span>
//                 </label>
//                 <label className="radio-option">
//                   <input
//                     type="radio"
//                     name="returnReason"
//                     value="Product is defective"
//                     onChange={(e) => setSelectedReason(e.target.value)}
//                   />
//                   <span className="radio-label">Product is defective</span>
//                 </label>
//                 <label className="radio-option">
//                   <input
//                     type="radio"
//                     name="returnReason"
//                     value="Quality not as expected"
//                     onChange={(e) => setSelectedReason(e.target.value)}
//                   />
//                   <span className="radio-label">Quality not as expected</span>
//                 </label>
//                 <label className="radio-option">
//                   <input
//                     type="radio"
//                     name="returnReason"
//                     value="Changed my mind"
//                     onChange={(e) => setSelectedReason(e.target.value)}
//                   />
//                   <span className="radio-label">Changed my mind</span>
//                 </label>
//               </div>
//               <div className="popup-buttons">
//                 <button type="submit" disabled={!selectedReason || loading}>
//                   {loading ? "Submitting..." : "Submit"}
//                 </button>
//                 <button type="button" onClick={() => setShowPopup(false)}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default OrderItems


"use client"

import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../../context/ShopContext"
import { useNavigate } from "react-router-dom"
import { BASEURL } from "../../config"
import axios from "axios"

const OrderItems = () => {
  const { products } = useContext(ShopContext)
  const navigate = useNavigate()
  const [orderData, setOrderData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPopup, setShowPopup] = useState(false)
  const [selectedReason, setSelectedReason] = useState("")
  const [currentOrder, setCurrentOrder] = useState(null)
  const [currentProduct, setCurrentProduct] = useState(null)

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(4)

  useEffect(() => {
    const loadOrderData = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          navigate("/login")
          return
        }
        const response = await axios.get(BASEURL + "/api/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setOrderData(response?.data || [])
      } catch (error) {
        console.error("Error fetching order data:", error)
      }
    }
    loadOrderData()
  }, [navigate])

  // const requestReturn = async (e) => {
  //   e.preventDefault()
  //   // keep same logic...
  // }

    const requestReturn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!currentOrder || !currentProduct || !selectedReason) {
      setError("Please select a reason and ensure a valid order and product are selected.")
      setLoading(false)
      return
    }

    try {
      const returnUrl = `${BASEURL}/api/orders/request-return/${currentOrder}/${currentProduct}`
      await axios.post(
        returnUrl,
        { reason: selectedReason },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      )

      const saveReasonUrl = `${BASEURL}/api/orders/save-reason`
      await axios.post(
        saveReasonUrl,
        {
          orderId: currentOrder,
          productId: currentProduct,
          reason: selectedReason,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      )

      alert("Return request submitted and reason saved successfully!")
      setShowPopup(false)

      // Update local state
      setOrderData((prevOrderData) =>
        prevOrderData.map((order) =>
          order._id === currentOrder
            ? {
                ...order,
                items: order.items.map((item) =>
                  item.productId === currentProduct
                    ? {
                        ...item,
                        returnRequested: true,
                        returnReason: selectedReason,
                      }
                    : item,
                ),
              }
            : order,
        ),
      )
    } catch (err) {
      setError(err.response ? `Error: ${err.response.status} - ${err.response.data.message}` : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }


  const openPopup = (orderId, productId) => {
    setCurrentOrder(orderId)
    setCurrentProduct(productId)
    setShowPopup(true)
  }

  const isReturnEligible = (orderDate) => {
    if (!orderDate) return true
    const orderTime = new Date(orderDate).getTime()
    const currentTime = new Date().getTime()
    const threeDays = 3 * 24 * 60 * 60 * 1000
    return currentTime - orderTime <= threeDays
  }

  const getImage = (images, color) => {
    if (images && images.length > 0) {
      try {
        const parsedImages = JSON.parse(images[0])
        if (parsedImages[color] && parsedImages[color].length > 0) {
          return parsedImages[color][0]
        }
        const firstAvailableColor = Object.keys(parsedImages)[0]
        return parsedImages[firstAvailableColor]?.[0]
      } catch (error) {
        console.error("Error parsing image JSON:", error)
      }
    }
    return "/logo.png"
  }

  const flattenedItems = orderData.flatMap((order) =>
    order.items
      .map((item) => ({
        ...item,
        orderId: order._id,
        createdAt: order.createdAt,
        tentativeDeliveryDate: order.tentativeDeliveryDate,
      }))
      .filter((item) => products.find((p) => p._id === item.productId)),
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = flattenedItems.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(flattenedItems.length / itemsPerPage)

  return (
    <div className="w-full p-6">
      <div className={`bg-white rounded-xl shadow-md p-4 ${showPopup ? "blur-sm" : ""}`}>
        <div className="grid grid-cols-7 font-semibold text-gray-700 border-b pb-4 mb-4 mr-50">
          <p>Image</p>
          <p>Title</p>
          <p style={{marginLeft:"50px"}}>Price</p>
          <p>Qty</p>
          <p>Size</p>
          <p>Total</p>
          <p>Action</p>
        </div>

        {currentItems.length === 0 ? (
          <div className="flex justify-center py-10 text-gray-500">No orders found</div>
        ) : (
          <>
            {currentItems.map((item, index) => {
              const { productId, quantity, size, returnRequested, returnApproved, orderId, createdAt } = item
              const product = products.find((p) => p._id === productId)
              if (!product) return null

              let requestStatus = ""
              if (item.action === "Select" && returnRequested && !returnApproved) requestStatus = "Return requested"
              if (item.action === "accepted" && returnRequested && returnApproved) requestStatus = "Return Approved"
              if (item.action === "rejected" && returnRequested && !returnApproved) requestStatus = "Return Rejected"

              const isEligible = isReturnEligible(createdAt)

              return (
                <div
                  key={`${orderId}-${index}`}
                  className="grid grid-cols-7 items-center text-gray-700 border-t py-3"
                >
                  <img
                    src={getImage(product.images) || "/logo.png"}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <p >{product.name}</p>
                  <p style={{marginLeft:"50px"}}>₹{product.price}</p>
                  <p>{quantity}</p>
                  <p>{size}</p>
                  <p>₹{quantity * product.price}</p>
                  <div>
                    {!returnRequested && (isEligible || !createdAt) && (
                      <button
                        onClick={() => openPopup(orderId, productId)}
                        disabled={loading}
                        className="black text-white font-semibold px-5 py-2 rounded-md disabled:opacity-50 bg-black "
                      >
                        {loading ? "Requesting..." : "Return"}
                      </button>
                    )}
                    {!returnRequested && createdAt && !isEligible && (
                      <span className="text-red-500 text-sm">Return expired</span>
                    )}
                    {requestStatus && <span className="text-green-800">{requestStatus}</span>}
                  </div>
                </div>
              )
            })}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-96 p-6">
            <h2 className="text-lg font-semibold mb-4">Select Return Reason</h2>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <form onSubmit={requestReturn} className="space-y-3">
              {["Received wrong product", "Product is defective", "Quality not as expected", "Changed my mind"].map(
                (reason, idx) => (
                  <label key={idx} className="flex items-center gap-2 text-gray-700">
                    <input
                      type="radio"
                      name="returnReason"
                      value={reason}
                      onChange={(e) => setSelectedReason(e.target.value)}
                    />
                    {reason}
                  </label>
                ),
              )}
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="submit"
                  disabled={!selectedReason || loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderItems
