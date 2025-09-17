
"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const BASEURL = process.env.NEXT_PUBLIC_BASE_URL || "https://api.silksew.com"
const ITEMS_PER_PAGE = 9

const ReturnOrderList = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedActions, setSelectedActions] = useState({})

  useEffect(() => {
    fetchReturnOrders()
    const savedActions = localStorage.getItem("selectedActions")
    if (savedActions) {
      setSelectedActions(JSON.parse(savedActions))
    }
  }, [])

  const fetchReturnOrders = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setError("Unauthorized: No token found")
        setLoading(false)
        return
      }

      const response = await axios.get(`${BASEURL}/api/orders/return-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
console.log("return product",response)
      const sortedOrders = response.data.sort((a, b) => {
        if (a.returnStatus && !b.returnStatus) return 1
        if (!a.returnStatus && b.returnStatus) return -1
        return 0
      })

      console.log("Sample order structure:", sortedOrders[0]) // Log the first order

      setOrders(sortedOrders)
      setLoading(false)
    } catch (err) {
      console.error("Error details:", err)
      setError(err.response?.data?.message || "Failed to fetch orders")
      setLoading(false)
    }
  }

  const handleReturnDecision = async (action, _id, productId) => {
    console.log("handleReturnDecision called with:", { action, _id, productId })
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        setError("Unauthorized: No token found")
        return
      }
      if (!action) {
        setError("Action is required")
        return
      }
      if (!productId) {
        console.error("Product ID is missing:", { action, _id, productId })
        setError("Product ID is missing")
        return
      }

      await axios.post(
        `${BASEURL}/api/orders/update-return-status/${_id}/${productId}`,
        { action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )

      setSelectedActions((prev) => {
        const newActions = { ...prev, [`${_id}-${productId}`]: action }
        localStorage.setItem("selectedActions", JSON.stringify(newActions))
        return newActions
      })

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === _id && order.productId === productId ? { ...order, returnStatus: action } : order,
        ),
      )
    } catch (err) {
      console.error("Error in handleReturnDecision:", err)
      setError(err.response?.data?.message || "Failed to update return status")
    }
  }

  if (loading) return <div className="loading">Loading...</div>
  if (error) return <div className="error">{error}</div>

  const pageCount = Math.ceil(orders.length / ITEMS_PER_PAGE)
  const displayedOrders = orders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  return (
    <div className="return-order-list">
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>Return Orders</h2>
      {orders.length === 0 ? (
        <p style={{ color: "gray" }}>No return requests found.</p>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ccc" }}>
            <thead>
              <tr style={{ backgroundColor: "#f0f0f0" }}>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Product Name</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Address</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Contact</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Total Amount</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Payment Method</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Return Reason</th>
                <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {displayedOrders.map((order) => (
                <tr key={`${order._id}-${order.productId}`} style={{ ":hover": { backgroundColor: "#f5f5f5" } }}>
                  <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{order.productId}</td>
                  <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                    {order.street}, {order.city}, {order.state}, {order.zipcode}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                    <strong>Contact : </strong>{order.phone}
                    <br />
                    <strong>Email: </strong>{order.email}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Rs {order.totalAmount}</td>
                  <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{order.paymentMethod}</td>
                  <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{order.returnReason || "N/A"}</td>
                  <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                    {selectedActions[`${order._id}-${order.productId}`] || order.returnStatus ? (
                      <span
                        style={{
                          display: "block",
                          fontSize: "0.9rem",
                          fontWeight: "bold",
                          textTransform: "capitalize",
                          color: "green",
                        }}
                      >
                        {selectedActions[`${order._id}-${order.productId}`] || order.returnStatus}
                      </span>
                    ) : order.productId ? (
                      <select
                        onChange={(event) => handleReturnDecision(event.target.value, order._id, order.productId)}
                        value=""
                        style={{ width: "100%", padding: "0.25rem" }}
                      >
                        <option value="">Select action</option>
                        <option value="accepted">Accept</option>
                        <option value="rejected">Reject</option>
                      </select>
                    ) : (
                      <span style={{ color: "red" }}>No product ID available</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              style={{ padding: "0.5rem 1rem", backgroundColor: "#f0f0f0", border: "1px solid #ccc" }}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {pageCount}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
              disabled={currentPage === pageCount}
              style={{ padding: "0.5rem 1rem", backgroundColor: "#f0f0f0", border: "1px solid #ccc" }}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ReturnOrderList

