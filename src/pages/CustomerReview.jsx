"use client"

import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faUser } from "@fortawesome/free-solid-svg-icons"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const CustomerReview = () => {
  const { token } = useContext(AuthContext)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("https://api.silksew.com/api/review/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setReviews(res.data.data || [])
      } catch (err) {
        console.error("Error fetching reviews:", err)
        toast.error("Failed to fetch reviews")
      } finally {
        setLoading(false)
      }
    }

    if (token) fetchReviews()
  }, [token])

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "4px solid #e5e7eb",
            borderTop: "4px solid #4F46E5",
            borderRadius: "50%",
            margin: "0 auto",
            animation: "spin 1s linear infinite",
          }}
        ></div>
      </div>
    )
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#1e293b",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <FontAwesomeIcon icon={faUser} style={{ color: "#4F46E5" }} />
        Customer Reviews
      </h2>

      {reviews.length === 0 ? (
        <p style={{ textAlign: "center", color: "#64748b" }}>No reviews available</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "white",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <thead style={{ backgroundColor: "#f1f5f9" }}>
              <tr>
                <th style={thStyle}>Customer</th>
                <th style={thStyle}>Rating</th>
                <th style={thStyle}>Feedback</th>
                <th style={thStyle}>Date</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <td style={tdStyle}>{review.name || "Anonymous"}</td>
                  <td style={tdStyle}>
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        style={{
                          color: i < review.rating ? "#fbbf24" : "#d1d5db",
                          marginRight: "2px",
                        }}
                      />
                    ))}
                  </td>
                  <td style={tdStyle}>{review.review || "-"}</td>
                  <td style={tdStyle}>
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ToastContainer />
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}

const thStyle = {
  textAlign: "left",
  padding: "12px",
  fontSize: "0.9rem",
  fontWeight: "600",
  color: "#1e293b",
}

const tdStyle = {
  padding: "12px",
  fontSize: "0.9rem",
  color: "#374151",
}

export default CustomerReview
