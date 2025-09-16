"use client"

import { useContext, useEffect, useState } from "react"
import "./OrderItems.css"
import { ShopContext } from "../../context/ShopContext"
import { useNavigate } from "react-router-dom"
import { BASEURL } from "../../config"
import moment from "moment"
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

  // Load order data
  useEffect(() => {
    const loadOrderData = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          console.warn("No token found, redirecting to login.")
          navigate("/login")
          return
        }

        const response = await axios.get(BASEURL + "/api/orders/myorders", {
          headers: { Authorization: `Bearer ${token}` },
        })
        console.log("response-------", response)

        if (response && response.data) {
          setOrderData(response.data)
        } else {
          setOrderData([])
        }
      } catch (error) {
        console.error("Error fetching order data:", error)
      }
    }

    loadOrderData()
  }, [navigate])

  // Function to handle return request
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
      console.log("Sending return request...")
      console.log("Current Order:", currentOrder)
      console.log("Current Product:", currentProduct)
      console.log("Selected Reason:", selectedReason)

      // First API call: request-return
      const returnUrl = `${BASEURL}/api/orders/request-return/${currentOrder}/${currentProduct}`
      console.log("Request URL:", returnUrl)

      const returnResponse = await axios.post(
        returnUrl,
        { reason: selectedReason },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
      )

      console.log("Return Response:", returnResponse.data)

      // Second API call: save-reason
      const saveReasonUrl = `${BASEURL}/api/orders/save-reason`
      const saveReasonResponse = await axios.post(
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

      console.log("Save Reason Response:", saveReasonResponse.data)

      alert("Return request submitted and reason saved successfully!")
      setShowPopup(false)

      // Update the local state to reflect the return request
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
      console.error("Error in requestReturn:", err)
      setError(err.response ? `Error: ${err.response.status} - ${err.response.data.message}` : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  // Open popup
  const openPopup = (orderId, productId) => {
    setCurrentOrder(orderId)
    setCurrentProduct(productId)
    setShowPopup(true)
  }

  // Function to check if 3 days have passed since the order date
  const isReturnEligible = (orderDate) => {
    if (!orderDate) return true // If no date is provided, assume it's a new order
    const orderTime = new Date(orderDate).getTime()
    if (isNaN(orderTime)) return true // If the date is invalid, assume it's a new order
    const currentTime = new Date().getTime()
    const threeDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000
    return currentTime - orderTime <= threeDaysInMilliseconds
  }

  const getImage = (images, color) => {
    if (images && images.length > 0) {
      try {
        const parsedImages = JSON.parse(images[0])
        console.log("image",parsedImages)
        if (parsedImages[color] && parsedImages[color].length > 0) {
          return parsedImages[color][0]
        }
        // Fallback to first available color if selected color not found
        const firstAvailableColor = Object.keys(parsedImages)[0]
        if (parsedImages[firstAvailableColor] && parsedImages[firstAvailableColor].length > 0) {
          return parsedImages[firstAvailableColor][0]
        }
      } catch (error) {
        console.error("Error parsing image JSON:", error)
      }
    }
    return "/logo.png"
  }

  // Flatten order items for pagination and filter out items without products
  const flattenedItems = orderData.flatMap((order) =>
    order.items
      .map((item) => ({
        ...item,
        orderId: order._id,
        createdAt: order.createdAt,
        tentativeDeliveryDate: order.tentativeDeliveryDate,
      }))
      .filter(item => {
        const product = products.find((p) => p._id === item.productId);
        return product !== undefined; // Only include items with valid products
      })
  );

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = flattenedItems.slice(indexOfFirstItem, indexOfLastItem)

  // Calculate total pages based on items with valid products
  const totalPages = Math.ceil(flattenedItems.length / itemsPerPage)

  // Change page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  // Reset to page 1 when orderData changes to avoid empty pages
  useEffect(() => {
    setCurrentPage(1);
  }, [orderData]);

  return (
    <div className={`cartitems ${showPopup ? "blur-background" : ""}`}>
      <div className="cartitems-header">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Size</p>
        <p>Total</p>
        {/* <p>Tentative Delivery Date</p> */}
        <p>Action</p>
      </div>
      <hr />

      {currentItems.length === 0 ? (
        <div className="no-orders">
          <p>No orders found</p>
        </div>
      ) : (
        <>
          {currentItems.map((item, index) => {
            const {
              productId,
              quantity,
              size,
              returnRequested,
              returnApproved,
              orderId,
              createdAt,
              tentativeDeliveryDate,
            } = item
            const product = products.find((p) => p._id === productId)

            if (!product) return null
            let requestStatus = ""

            if (item.action === "Select" && returnRequested && !returnApproved) {
              requestStatus = "Return requested"
            }
            if (item.action === "accepted" && returnRequested && returnApproved) {
              requestStatus = "Return Approved"
            }
            if (item.action === "rejected" && returnRequested && !returnApproved) {
              requestStatus = "Return Rejected"
            }

            const isEligible = isReturnEligible(createdAt)

            return (
              <div key={`${orderId}-${index}`} className="cartitem">
                <img
                  src={getImage(product.images) || "/logo.png"}
                  alt={product.name}
                />
                <p>{product.name}</p>
                <p>Rs {product.price}</p>
                <p>{quantity}</p>
                <p>{size}</p>
                <p>Rs {quantity * product.price}</p>
                {/* <p>{tentativeDeliveryDate ? moment(tentativeDeliveryDate).format("YYYY-MM-DD") : ""}</p> */}
                {!returnRequested && (isEligible || !createdAt) && (
                  <button onClick={() => openPopup(orderId, productId)} disabled={loading}>
                    {loading ? "Requesting Return..." : "Return"}
                  </button>
                )}
                {!returnRequested && createdAt && !isEligible && <span>Return period expired</span>}
                {requestStatus && <span>{requestStatus}</span>}
              </div>
            )
          })}

          <hr />

          {/* Pagination - Only show if there are multiple pages with content */}
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                onClick={prevPage} 
                disabled={currentPage === 1}
                className="pagination-btn"
              >
                Previous
              </button>
              
              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>
              
              <button 
                onClick={nextPage} 
                disabled={currentPage === totalPages}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Return Reason Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h2>Select Return Reason</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={requestReturn}>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="returnReason"
                    value="Received wrong product"
                    onChange={(e) => setSelectedReason(e.target.value)}
                  />
                  Received wrong product
                </label>
                <label>
                  <input
                    type="radio"
                    name="returnReason"
                    value="Product is defective"
                    onChange={(e) => setSelectedReason(e.target.value)}
                  />
                  Product is defective
                </label>
                <label>
                  <input
                    type="radio"
                    name="returnReason"
                    value="Quality not as expected"
                    onChange={(e) => setSelectedReason(e.target.value)}
                  />
                  Quality not as expected
                </label>
                <label>
                  <input
                    type="radio"
                    name="returnReason"
                    value="Changed my mind"
                    onChange={(e) => setSelectedReason(e.target.value)}
                  />
                  Changed my mind
                </label>
              </div>
              <div className="popup-buttons">
                <button type="submit" disabled={!selectedReason || loading}>
                  {loading ? "Submitting..." : "Submit"}
                </button>
                <button type="button" onClick={() => setShowPopup(false)}>
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

