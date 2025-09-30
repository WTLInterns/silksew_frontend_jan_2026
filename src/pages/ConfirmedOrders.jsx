
// import { useContext, useEffect, useState, useCallback } from "react"
// import axios from "axios"
// import { ShopContext } from "../context/ShopContext"
// import { BASEURL } from "../config"
// import "../pages/CSS/AdminUser.css"
// import moment from "moment"
// import { ToastContainer, toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import { ChevronLeft, ChevronRight } from "lucide-react"

// function ConfirmedOrder({ updateTotalOrders }) {
//   const [addresses, setAddresses] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [currentPage, setCurrentPage] = useState(1)
//   const [tentativeDeliveryDates, setTentativeDeliveryDates] = useState({})
//   const itemsPerPage = 3
//   // eslint-disable-next-line no-unused-vars
//   const { token } = useContext(ShopContext)

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value)
//     setCurrentPage(1)
//   }

//   const statusHandler = async (event, _id) => {
//     const tentativeDeliveryDate = tentativeDeliveryDates[_id]
//     if (!tentativeDeliveryDate) {
//       toast.error("Please select a tentative delivery date before confirming the order.")
//       return
//     }

//     try {
//       await axios.post(BASEURL + "/api/updateOrderStatus/order-status", {
//         _id,
//         status: "ConfirmedOrder",
//         tentativeDeliveryDate: tentativeDeliveryDate,
//       })
//       await fetchUserDetails()
//       toast.success("Your order has been confirmed!")
//     } catch (error) {
//       console.error("Error updating order status:", error)
//       toast.error("Failed to update order status. Please try again.")
//     }
//   }

//   // eslint-disable-next-line no-unused-vars
//   const paymentStatusHandler = async (event, _id) => {
//     try {
//       await axios.post(BASEURL + "/api/updatePayment/payment-status", {
//         _id,
//         payment: event.target.value,
//       })
//       await fetchUserDetails()
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const handleDateChange = async (date, orderId) => {
//     setTentativeDeliveryDates((prev) => ({ ...prev, [orderId]: date }))
//   }

//   const fetchUserDetails = useCallback(async () => {
//     const localStorageToken = localStorage.getItem("token")

//     if (!localStorageToken) {
//       console.log("Admin token not found in localStorage. Please log in.")
//       return
//     }

//     try {
//       const response = await axios.get(BASEURL + "/api/orders", {
//         headers: {
//           Authorization: `Bearer ${localStorageToken}`,
//         },
//       })
//       setAddresses(response.data)
//       updateTotalOrders(response.data.length)
//       const dates = {}
//       response.data.forEach((order) => {
//         dates[order._id] = order.tentativeDeliveryDate || ""
//       })
//       setTentativeDeliveryDates(dates)
//     } catch (err) {
//       console.error("Error fetching orders:", err)
//     }
//   }, [updateTotalOrders])

//   useEffect(() => {
//     const localStorageToken = localStorage.getItem("token")
//     if (localStorageToken) {
//       fetchUserDetails()
//     }
//   }, [fetchUserDetails])

//   const filteredOrders = addresses
//     .filter(
//       (order) => order.address.firstName?.toLowerCase().includes(searchTerm?.toLowerCase()) && order.status === "Confirmed",
//     )
//     .sort((a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf())

//   const indexOfLastItem = currentPage * itemsPerPage
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage
//   const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem)
//   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

//   return (
//     <div className="admin-orders-container">
//       <ToastContainer position="top-right" autoClose={1000} />

//       <div className="orders-header">
//         <h2 className="orders-title">Confirmed Order Details</h2>
//         <div className="search-container">
//           <input
//             type="text"
//             placeholder="Search by Name"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             className="search-input"
//           />
//         </div>
//       </div>

//       {/* Desktop Table View */}
//       <div className="desktop-table-view">
//         <div className="table-container">
//           <table className="orders-table">
//             <thead className="table-header">
//               <tr>
//                 <th className="table-head">Sr. No</th>
//                 <th className="table-head">Product Details</th>
//                 <th className="table-head">User Details</th>
//                 <th className="table-head">Address</th>
//                 <th className="table-head">Payment Method</th>
//                 <th className="table-head">Total Amount</th>
//                 <th className="table-head">Tentative Delivery Date</th>
//                 <th className="table-head">Status</th>
//               </tr>
//             </thead>
//             <tbody className="table-body">
//               {currentItems.length > 0 ? (
//                 currentItems.map((order, index) => (
//                   <tr key={order._id} className="table-row">
//                     <td className="table-cell" data-label="Sr. No">
//                       {indexOfFirstItem + index + 1}
//                     </td>
//                     <td className="table-cell" data-label="Product Details">
//                       <div className="product-details">
//                         <p><strong>Product Id:</strong> {order.items[0]._id}</p>
//                         <p><strong>Size:</strong> {order.items[0].size}</p>
//                         <p><strong>Quantity:</strong> {order.items[0].quantity}</p>
//                       </div>
//                     </td>
//                     <td className="table-cell" data-label="User Details">
//                       <div className="user-details">
//                         <p><strong>Name:</strong> {order.address.firstName} {order.address.lastName}</p>
//                         <p><strong>Email:</strong> {order.address.email}</p>
//                         <p><strong>Phone:</strong> {order.address.phone}</p>
//                       </div>
//                     </td>
//                     <td className="table-cell" data-label="Address">
//                       <div className="address-details">
//                         <p><strong>Street:</strong> {order.address.street}</p>
//                         <p><strong>City:</strong> {order.address.city}</p>
//                         <p><strong>State:</strong> {order.address.state}</p>
//                         <p><strong>Landmark:</strong> {order.address.landMark}</p>
//                       </div>
//                     </td>
//                     <td className="table-cell" data-label="Payment Method">
//                       {order.paymentMethod}
//                     </td>
//                     <td className="table-cell" data-label="Total Amount">
//                       <strong>Rs.{order.totalAmount}</strong>
//                     </td>
//                     <td className="table-cell" data-label="Tentative Delivery Date">
//                       <input
//                         type="date"
//                         value={tentativeDeliveryDates[order._id] || ""}
//                         onChange={(e) => handleDateChange(e.target.value, order._id)}
//                         className="date-input"
//                       />
//                     </td>
//                     <td className="table-cell" data-label="Status">
//                       <button
//                         onClick={() => statusHandler({ target: { value: "ConfirmedOrder" } }, order._id)}
//                         disabled={!tentativeDeliveryDates[order._id]}
//                         className="confirm-btn"
//                       >
//                         Confirm Order
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="no-orders">
//                     No orders found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Mobile Card View */}
//       <div className="mobile-card-view">
//         {currentItems.length > 0 ? (
//           currentItems.map((order, index) => (
//             <div key={order._id} className="order-card">
//               <div className="card-section">
//                 <h3 className="card-title">Order #{indexOfFirstItem + index + 1}</h3>
//               </div>
              
//               <div className="card-section">
//                 <h4 className="section-title">Product Details</h4>
//                 <div className="card-content">
//                   <p><strong>Product Id:</strong> {order.items[0]._id}</p>
//                   <p><strong>Size:</strong> {order.items[0].size}</p>
//                   <p><strong>Quantity:</strong> {order.items[0].quantity}</p>
//                 </div>
//               </div>

//               <div className="card-section">
//                 <h4 className="section-title">User Details</h4>
//                 <div className="card-content">
//                   <p><strong>Name:</strong> {order.address.firstName} {order.address.lastName}</p>
//                   <p><strong>Email:</strong> {order.address.email}</p>
//                   <p><strong>Phone:</strong> {order.address.phone}</p>
//                 </div>
//               </div>

//               <div className="card-section">
//                 <h4 className="section-title">Address</h4>
//                 <div className="card-content">
//                   <p><strong>Street:</strong> {order.address.street}</p>
//                   <p><strong>City:</strong> {order.address.city}</p>
//                   <p><strong>State:</strong> {order.address.state}</p>
//                   <p><strong>Landmark:</strong> {order.address.landMark}</p>
//                 </div>
//               </div>

//               <div className="card-section">
//                 <div className="card-row">
//                   <div className="card-item">
//                     <strong>Payment Method:</strong>
//                     <span>{order.paymentMethod}</span>
//                   </div>
//                   <div className="card-item">
//                     <strong>Total Amount:</strong>
//                     <span>Rs.{order.totalAmount}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="card-section">
//                 <h4 className="section-title">Tentative Delivery Date</h4>
//                 <input
//                   type="date"
//                   value={tentativeDeliveryDates[order._id] || ""}
//                   onChange={(e) => handleDateChange(e.target.value, order._id)}
//                   className="date-input mobile-date-input"
//                 />
//               </div>

//               <div className="card-section">
//                 <button
//                   onClick={() => statusHandler({ target: { value: "ConfirmedOrder" } }, order._id)}
//                   disabled={!tentativeDeliveryDates[order._id]}
//                   className="confirm-btn mobile-confirm-btn"
//                 >
//                   Confirm Order
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="no-orders-mobile">
//             No orders found.
//           </div>
//         )}
//       </div>

//       {/* Pagination */}
//       {filteredOrders.length > 0 && (
//         <div className="pagination-container">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="pagination-btn"
//           >
//             <ChevronLeft size={18} />
//             <span className="pagination-text">Previous</span>
//           </button>
          
//           <span className="page-info">
//             Page {currentPage} of {totalPages}
//           </span>
          
//           <button
//             onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
//             disabled={currentPage >= totalPages}
//             className="pagination-btn"
//           >
//             <span className="pagination-text">Next</span>
//             <ChevronRight size={18} />
//           </button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default ConfirmedOrder




import { useContext, useEffect, useState, useCallback } from "react"
import axios from "axios"
import { ShopContext } from "../context/ShopContext"
import { BASEURL } from "../config"
import moment from "moment"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { ChevronLeft, ChevronRight } from "lucide-react"

function ConfirmedOrder({ updateTotalOrders }) {
  const [addresses, setAddresses] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [tentativeDeliveryDates, setTentativeDeliveryDates] = useState({})
  const itemsPerPage = 3
  // eslint-disable-next-line no-unused-vars
  const { token } = useContext(ShopContext)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const statusHandler = async (event, _id) => {
    const tentativeDeliveryDate = tentativeDeliveryDates[_id]
    if (!tentativeDeliveryDate) {
      toast.error("Please select a tentative delivery date before confirming the order.")
      return
    }

    try {
      await axios.post(BASEURL + "/api/updateOrderStatus/order-status", {
        _id,
        status: "ConfirmedOrder",
        tentativeDeliveryDate: tentativeDeliveryDate,
      })
      await fetchUserDetails()
      toast.success("Your order has been confirmed!")
    } catch (error) {
      console.error("Error updating order status:", error)
      toast.error("Failed to update order status. Please try again.")
    }
  }

  // eslint-disable-next-line no-unused-vars
  const paymentStatusHandler = async (event, _id) => {
    try {
      await axios.post(BASEURL + "/api/updatePayment/payment-status", {
        _id,
        payment: event.target.value,
      })
      await fetchUserDetails()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDateChange = async (date, orderId) => {
    setTentativeDeliveryDates((prev) => ({ ...prev, [orderId]: date }))
  }

  const fetchUserDetails = useCallback(async () => {
    const localStorageToken = localStorage.getItem("token")

    if (!localStorageToken) {
      console.log("Admin token not found in localStorage. Please log in.")
      return
    }

    try {
      const response = await axios.get(BASEURL + "/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorageToken}`,
        },
      })
      setAddresses(response.data)
      updateTotalOrders(response.data.length)
      const dates = {}
      response.data.forEach((order) => {
        dates[order._id] = order.tentativeDeliveryDate || ""
      })
      setTentativeDeliveryDates(dates)
    } catch (err) {
      console.error("Error fetching orders:", err)
    }
  }, [updateTotalOrders])

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token")
    if (localStorageToken) {
      fetchUserDetails()
    }
  }, [fetchUserDetails])

  const filteredOrders = addresses
    .filter(
      (order) => order.address.firstName?.toLowerCase().includes(searchTerm?.toLowerCase()) && order.status === "Confirmed",
    )
    .sort((a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf())

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

  return (
    <div className="confirmed-orders-container">
      <style jsx>{`
        .confirmed-orders-container {
          padding: 24px;
          background: #f8f9fa;
          min-height: 100vh;
          max-width: 1400px;
          margin: 0 auto;
        }

        .orders-header {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 24px;
        }

        .orders-title {
          font-size: 28px;
          font-weight: bold;
          color: #1a1a1a;
          text-align: center;
          margin: 0;
        }

        .search-container {
          display: flex;
          justify-content: center;
        }

        .search-input {
          width: 100%;
          max-width: 400px;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        /* Desktop Table Styles */
        .desktop-table-view {
          display: block;
        }

        .table-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          margin-bottom: 24px;
        }

        .orders-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 1200px;
        }

        .table-header {
          background: #1f2937;
        
        }

        .table-head {
          padding: 16px;
          color: black;
          font-weight: 600;
          text-align: left;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border: 1px solid #374151;
        }

        .table-body {
          background: white;
        }

        .table-row {
          transition: background-color 0.2s ease;
        }

        .table-row:hover {
          background: #b7c3c3ff;
        }

        .table-cell {
          padding: 16px;
          border: 1px solid #e5e7eb;
          vertical-align: top;
          font-size: 14px;
          color: #000000ff;
        }

        .product-details,
        .user-details,
        .address-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .product-details p,
        .user-details p,
        .address-details p {
          margin: 0;
          line-height: 1.4;
        }

        .date-input {
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
          outline: none;
          transition: all 0.3s ease;
        }

        .date-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .confirm-btn {
          padding: 8px 16px;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .confirm-btn:hover:not(:disabled) {
          background: #059669;
        }

        .confirm-btn:disabled {
          background: #9ca3af;
          cursor: not-allowed;
          opacity: 0.6;
        }

        .no-orders {
          padding: 40px;
          text-align: center;
          color: #6b7280;
          font-size: 16px;
        }

        /* Mobile Card Styles */
        .mobile-card-view {
          display: none;
        }

        .order-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 16px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .card-section {
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f3f4f6;
        }

        .card-section:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .card-title {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 8px 0;
        }

        .section-title {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin: 0 0 12px 0;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .card-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .card-content p {
          margin: 0;
          line-height: 1.4;
        }

        .card-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .card-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
        }

        .card-item strong {
          color: #374151;
        }

        .card-item span {
          color: #6b7280;
          font-weight: 500;
        }

        .mobile-date-input {
          width: 100%;
          padding: 12px;
          font-size: 16px;
        }

        .mobile-confirm-btn {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          font-weight: 600;
        }

        .no-orders-mobile {
          text-align: center;
          color: #6b7280;
          padding: 40px;
          font-size: 16px;
          background: white;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
        }

        /* Pagination Styles */
        .pagination-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin-top: 24px;
        }

        .pagination-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background: white;
          color: #374151;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .pagination-btn:hover:not(:disabled) {
          background: #f3f4f6;
          border-color: #9ca3af;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-text {
          display: inline-block;
        }

        .page-info {
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 1024px) {
          .confirmed-orders-container {
            padding: 20px;
          }
          
          .orders-table {
            min-width: 1000px;
          }
        }

        @media (max-width: 768px) {
          .confirmed-orders-container {
            padding: 16px;
          }

          .orders-title {
            font-size: 24px;
          }

          .search-input {
            max-width: 100%;
          }

          /* Hide desktop table on mobile */
          .desktop-table-view {
            display: none;
          }

          /* Show mobile cards on mobile */
          .mobile-card-view {
            display: block;
          }

          .order-card {
            padding: 16px;
            margin-bottom: 12px;
          }

          .card-section {
            margin-bottom: 16px;
            padding-bottom: 16px;
          }

          .card-title {
            font-size: 16px;
          }

          .section-title {
            font-size: 13px;
          }

          .card-content p {
            font-size: 14px;
          }

          .card-item {
            font-size: 14px;
          }

          .pagination-container {
            flex-direction: column;
            gap: 16px;
          }

          .pagination-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .confirmed-orders-container {
            padding: 12px;
          }

          .orders-title {
            font-size: 20px;
          }

          .orders-header {
            gap: 16px;
            margin-bottom: 20px;
          }

          .order-card {
            padding: 12px;
            margin-bottom: 8px;
            border-radius: 8px;
          }

          .card-section {
            margin-bottom: 12px;
            padding-bottom: 12px;
          }

          .card-title {
            font-size: 15px;
            margin-bottom: 6px;
          }

          .section-title {
            font-size: 12px;
            margin-bottom: 8px;
          }

          .card-content p {
            font-size: 13px;
          }

          .card-item {
            font-size: 13px;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }

          .mobile-date-input {
            padding: 10px;
            font-size: 14px;
          }

          .mobile-confirm-btn {
            padding: 10px;
            font-size: 14px;
          }

          .page-info {
            font-size: 13px;
          }
        }

        @media (max-width: 360px) {
          .confirmed-orders-container {
            padding: 8px;
          }

          .orders-title {
            font-size: 18px;
          }

          .search-input {
            padding: 10px 14px;
            font-size: 13px;
          }

          .order-card {
            padding: 10px;
          }

          .card-section {
            margin-bottom: 10px;
            padding-bottom: 10px;
          }

          .card-content p {
            font-size: 12px;
          }

          .card-item {
            font-size: 12px;
          }
        }

        /* Scrollbar for table on medium screens */
        .table-container {
          overflow-x: auto;
        }

        .orders-table {
          width: 100%;
        }
      `}</style>

      <ToastContainer position="top-right" autoClose={1000} />

      <div className="orders-header">
        <h2 className="orders-title">Confirmed Order Details</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by Name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="desktop-table-view">
        <div className="table-container">
          <table className="orders-table">
            <thead className="table-header">
              <tr>
                <th className="table-head">Sr. No</th>
                <th className="table-head">Product Details</th>
                <th className="table-head">User Details</th>
                <th className="table-head">Address</th>
                <th className="table-head">Payment Method</th>
                <th className="table-head">Total Amount</th>
                <th className="table-head">Tentative Delivery Date</th>
                <th className="table-head">Status</th>
              </tr>
            </thead>
            <tbody className="table-body">
              {currentItems.length > 0 ? (
                currentItems.map((order, index) => (
                  <tr key={order._id} className="table-row">
                    <td className="table-cell" data-label="Sr. No">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="table-cell" data-label="Product Details">
                      <div className="product-details">
                        <p><strong>Product Id:</strong> {order.items[0]._id}</p>
                        <p><strong>Size:</strong> {order.items[0].size}</p>
                        <p><strong>Quantity:</strong> {order.items[0].quantity}</p>
                      </div>
                    </td>
                    <td className="table-cell" data-label="User Details">
                      <div className="user-details">
                        <p><strong>Name:</strong> {order.address.firstName} {order.address.lastName}</p>
                        <p><strong>Email:</strong> {order.address.email}</p>
                        <p><strong>Phone:</strong> {order.address.phone}</p>
                      </div>
                    </td>
                    <td className="table-cell" data-label="Address">
                      <div className="address-details">
                        <p><strong>Street:</strong> {order.address.street}</p>
                        <p><strong>City:</strong> {order.address.city}</p>
                        <p><strong>State:</strong> {order.address.state}</p>
                        <p><strong>Landmark:</strong> {order.address.landMark}</p>
                      </div>
                    </td>
                    <td className="table-cell" data-label="Payment Method">
                      {order.paymentMethod}
                    </td>
                    <td className="table-cell" data-label="Total Amount">
                      <strong>Rs.{order.totalAmount}</strong>
                    </td>
                    <td className="table-cell" data-label="Tentative Delivery Date">
                      <input
                        type="date"
                        value={tentativeDeliveryDates[order._id] || ""}
                        onChange={(e) => handleDateChange(e.target.value, order._id)}
                        className="date-input"
                      />
                    </td>
                    <td className="table-cell" data-label="Status">
                      <button
                        onClick={() => statusHandler({ target: { value: "ConfirmedOrder" } }, order._id)}
                        disabled={!tentativeDeliveryDates[order._id]}
                        className="confirm-btn"
                      >
                        Confirm Order
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-orders">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="mobile-card-view">
        {currentItems.length > 0 ? (
          currentItems.map((order, index) => (
            <div key={order._id} className="order-card">
              <div className="card-section">
                <h3 className="card-title">Order #{indexOfFirstItem + index + 1}</h3>
              </div>
              
              <div className="card-section">
                <h4 className="section-title">Product Details</h4>
                <div className="card-content">
                  <p><strong>Product Id:</strong> {order.items[0]._id}</p>
                  <p><strong>Size:</strong> {order.items[0].size}</p>
                  <p><strong>Quantity:</strong> {order.items[0].quantity}</p>
                </div>
              </div>

              <div className="card-section">
                <h4 className="section-title">User Details</h4>
                <div className="card-content">
                  <p><strong>Name:</strong> {order.address.firstName} {order.address.lastName}</p>
                  <p><strong>Email:</strong> {order.address.email}</p>
                  <p><strong>Phone:</strong> {order.address.phone}</p>
                </div>
              </div>

              <div className="card-section">
                <h4 className="section-title">Address</h4>
                <div className="card-content">
                  <p><strong>Street:</strong> {order.address.street}</p>
                  <p><strong>City:</strong> {order.address.city}</p>
                  <p><strong>State:</strong> {order.address.state}</p>
                  <p><strong>Landmark:</strong> {order.address.landMark}</p>
                </div>
              </div>

              <div className="card-section">
                <div className="card-row">
                  <div className="card-item">
                    <strong>Payment Method:</strong>
                    <span>{order.paymentMethod}</span>
                  </div>
                  <div className="card-item">
                    <strong>Total Amount:</strong>
                    <span>Rs.{order.totalAmount}</span>
                  </div>
                </div>
              </div>

              <div className="card-section">
                <h4 className="section-title">Tentative Delivery Date</h4>
                <input
                  type="date"
                  value={tentativeDeliveryDates[order._id] || ""}
                  onChange={(e) => handleDateChange(e.target.value, order._id)}
                  className="date-input mobile-date-input"
                />
              </div>

              <div className="card-section">
                <button
                  onClick={() => statusHandler({ target: { value: "ConfirmedOrder" } }, order._id)}
                  disabled={!tentativeDeliveryDates[order._id]}
                  className="confirm-btn mobile-confirm-btn"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-orders-mobile">
            No orders found.
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <div className="pagination-container">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            <ChevronLeft size={18} />
            <span className="pagination-text">Previous</span>
          </button>
          
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
            disabled={currentPage >= totalPages}
            className="pagination-btn"
          >
            <span className="pagination-text">Next</span>
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  )
}

export default ConfirmedOrder