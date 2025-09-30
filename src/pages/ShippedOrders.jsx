
// import { useContext, useEffect, useState, useCallback } from "react"
// import axios from "axios"
// import { ShopContext } from "../context/ShopContext"
// import { BASEURL } from "../config"
// import "../pages/CSS/AdminUser.css"
// import moment from "moment"
// import { ChevronLeft, ChevronRight } from "lucide-react" // icons

// function ShippedOrders({ updateTotalOrders, updateTotalSales }) {
//   const [addresses, setAddresses] = useState([])
//   const [searchTerm, setSearchTerm] = useState("")
//   const [currentPage, setCurrentPage] = useState(1)
//   const [tentativeDeliveryDates, setTentativeDeliveryDates] = useState({})
//   const [totalConfirmedOrders, setTotalConfirmedOrders] = useState(0)
//   const [totalSalesAmount, setTotalSalesAmount] = useState(0)
//   const itemsPerPage = 3
//   const { token } = useContext(ShopContext)

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value)
//     setCurrentPage(1)
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
//       let totalSales = 0
//       let confirmedOrdersCount = 0
//       response.data.forEach((order) => {
//         dates[order._id] = order.tentativeDeliveryDate || ""
//         if (order.status === "ConfirmedOrder") {
//           totalSales += order.totalAmount
//           confirmedOrdersCount++
//         }
//       })
//       setTentativeDeliveryDates(dates)
//       setTotalConfirmedOrders(confirmedOrdersCount)
//       setTotalSalesAmount(totalSales)
//       updateTotalSales(totalSales)
//     } catch (err) {
//       console.error("Error fetching orders:", err)
//     }
//   }, [updateTotalOrders, updateTotalSales])

//   useEffect(() => {
//     const localStorageToken = localStorage.getItem("token")
//     if (localStorageToken) {
//       fetchUserDetails()
//     }
//   }, [fetchUserDetails])

//   const filteredOrders = addresses
//     .filter(
//       (order) =>
//         order.address.firstName?.toLowerCase().includes(searchTerm?.toLowerCase()) &&
//         order.status === "ConfirmedOrder",
//     )
//     .sort((a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf())

//   const totalItems = filteredOrders.length
//   const indexOfLastItem = currentPage * itemsPerPage
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage
//   const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem)
//   const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

//   return (
//     <div className="admin-orders p-6">
//       {/* Title + Search Bar */}
//       <div className="flex justify-between items-center mt-7">
//         <h2 className="text-2xl font-bold text-gray-900">
//           Shipped Orders Details
//         </h2>
//         <input
//           type="text"
//           placeholder="Search by Name"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-black text-black">
//             <tr>
//               <th className="px-4 py-2 text-left text-sm font-semibold">Sr. No</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold">Product Details</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold">User Details</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold">Address</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold">Payment Method</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold">Total Amount</th>
//               <th className="px-4 py-2 text-left text-sm font-semibold">Tentative Delivery Date</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100 bg-white">
//             {currentItems.length > 0 ? (
//               currentItems.map((order, index) => (
//                 <tr key={order._id} className="hover:bg-gray-50">
//                   <td className="px-4 py-3">{totalItems - (indexOfFirstItem + index)}</td>
//                   <td className="px-4 py-3">
//                     <p><strong>Product Id:</strong> {order.items[0].productId}</p>
//                     <p><strong>Size:</strong> {order.items[0].size}</p>
//                     <p><strong>Quantity:</strong> {order.items[0].quantity}</p>
//                   </td>
//                   <td className="px-4 py-3">
//                     <p><strong>Name:</strong> {order.address.firstName} {order.address.lastName}</p>
//                     <p><strong>Email:</strong> {order.address.email}</p>
//                     <p><strong>Phone:</strong> {order.address.phone}</p>
//                   </td>
//                   <td className="px-4 py-3">
//                     <p><strong>Street:</strong> {order.address.street}</p>
//                     <p><strong>City:</strong> {order.address.city}</p>
//                     <p><strong>State:</strong> {order.address.state}</p>
//                     <p><strong>Landmark:</strong> {order.address.landMark}</p>
//                   </td>
//                   <td className="px-4 py-3">{order.paymentMethod}</td>
//                   <td className="px-4 py-3 font-semibold">Rs.{order.totalAmount}</td>
//                   <td className="px-4 py-3">
//                     {order.tentativeDeliveryDate
//                       ? moment(order.tentativeDeliveryDate).format("YYYY-MM-DD")
//                       : ""}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8" className="text-center py-4 text-gray-500">
//                   No orders found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-end items-center mt-4 space-x-4">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className="p-2 bg-black text-white rounded disabled:opacity-50"
//         >
//           <ChevronLeft className="w-5 h-5" />
//         </button>

//         <span className="text-sm text-gray-700">
//           Page {currentPage} of {totalPages}
//         </span>

//         <button
//           onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
//           disabled={currentPage >= totalPages}
//           className="p-2 bg-black text-white rounded disabled:opacity-50"
//         >
//           <ChevronRight className="w-5 h-5" />
//         </button>
//       </div>
//     </div>
//   )
// }

// export default ShippedOrders




import { useContext, useEffect, useState, useCallback } from "react"
import axios from "axios"
import { ShopContext } from "../context/ShopContext"
import { BASEURL } from "../config"
import moment from "moment"
import { ChevronLeft, ChevronRight } from "lucide-react"

function ShippedOrders({ updateTotalOrders, updateTotalSales }) {
  const [addresses, setAddresses] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [tentativeDeliveryDates, setTentativeDeliveryDates] = useState({})
  const [totalConfirmedOrders, setTotalConfirmedOrders] = useState(0)
  const [totalSalesAmount, setTotalSalesAmount] = useState(0)
  const itemsPerPage = 3
  const { token } = useContext(ShopContext)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
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
      let totalSales = 0
      let confirmedOrdersCount = 0
      response.data.forEach((order) => {
        dates[order._id] = order.tentativeDeliveryDate || ""
        if (order.status === "ConfirmedOrder") {
          totalSales += order.totalAmount
          confirmedOrdersCount++
        }
      })
      setTentativeDeliveryDates(dates)
      setTotalConfirmedOrders(confirmedOrdersCount)
      setTotalSalesAmount(totalSales)
      updateTotalSales(totalSales)
    } catch (err) {
      console.error("Error fetching orders:", err)
    }
  }, [updateTotalOrders, updateTotalSales])

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token")
    if (localStorageToken) {
      fetchUserDetails()
    }
  }, [fetchUserDetails])

  const filteredOrders = addresses
    .filter(
      (order) =>
        order.address.firstName?.toLowerCase().includes(searchTerm?.toLowerCase()) &&
        order.status === "ConfirmedOrder",
    )
    .sort((a, b) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf())

  const totalItems = filteredOrders.length
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

  return (
    <div className="shipped-orders-container">
      <style jsx>{`
        .shipped-orders-container {
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
          margin-top: 28px;
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
          background: #f9fafb;
        }

        .table-cell {
          padding: 16px;
          border: 1px solid #e5e7eb;
          vertical-align: top;
          font-size: 14px;
          color: #374151;
        }

        .detail-section {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .detail-section p {
          margin: 0;
          line-height: 1.4;
        }

        .amount {
          font-weight: 600;
          color: #059669;
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
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background: #000;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .pagination-btn:hover:not(:disabled) {
          background: #374151;
        }

        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .page-info {
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
        }

        /* Mobile Responsive Styles */
        @media (max-width: 1024px) {
          .shipped-orders-container {
            padding: 20px;
          }
          
          .orders-table {
            min-width: 1000px;
          }
        }

        @media (max-width: 768px) {
          .shipped-orders-container {
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
            flex-direction: row;
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .shipped-orders-container {
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

          .page-info {
            font-size: 13px;
          }

          .pagination-btn {
            width: 36px;
            height: 36px;
          }
        }

        @media (max-width: 360px) {
          .shipped-orders-container {
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

          .pagination-btn {
            width: 32px;
            height: 32px;
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

      <div className="orders-header">
        <h2 className="orders-title">Shipped Orders Details</h2>
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
              </tr>
            </thead>
            <tbody className="table-body">
              {currentItems.length > 0 ? (
                currentItems.map((order, index) => (
                  <tr key={order._id} className="table-row">
                    <td className="table-cell" data-label="Sr. No">
                      {totalItems - (indexOfFirstItem + index)}
                    </td>
                    <td className="table-cell" data-label="Product Details">
                      <div className="detail-section">
                        <p><strong>Product Id:</strong> {order.items[0].productId}</p>
                        <p><strong>Size:</strong> {order.items[0].size}</p>
                        <p><strong>Quantity:</strong> {order.items[0].quantity}</p>
                      </div>
                    </td>
                    <td className="table-cell" data-label="User Details">
                      <div className="detail-section">
                        <p><strong>Name:</strong> {order.address.firstName} {order.address.lastName}</p>
                        <p><strong>Email:</strong> {order.address.email}</p>
                        <p><strong>Phone:</strong> {order.address.phone}</p>
                      </div>
                    </td>
                    <td className="table-cell" data-label="Address">
                      <div className="detail-section">
                        <p><strong>Street:</strong> {order.address.street}</p>
                        <p><strong>City:</strong> {order.address.city}</p>
                        <p><strong>State:</strong> {order.address.state}</p>
                        <p><strong>Landmark:</strong> {order.address.landMark}</p>
                      </div>
                    </td>
                    <td className="table-cell" data-label="Payment Method">
                      {order.paymentMethod}
                    </td>
                    <td className="table-cell amount" data-label="Total Amount">
                      Rs.{order.totalAmount}
                    </td>
                    <td className="table-cell" data-label="Tentative Delivery Date">
                      {order.tentativeDeliveryDate
                        ? moment(order.tentativeDeliveryDate).format("YYYY-MM-DD")
                        : ""}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-orders">
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
                <h3 className="card-title">Order #{totalItems - (indexOfFirstItem + index)}</h3>
              </div>
              
              <div className="card-section">
                <h4 className="section-title">Product Details</h4>
                <div className="card-content">
                  <p><strong>Product Id:</strong> {order.items[0].productId}</p>
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
                    <span className="amount">Rs.{order.totalAmount}</span>
                  </div>
                  <div className="card-item">
                    <strong>Delivery Date:</strong>
                    <span>
                      {order.tentativeDeliveryDate
                        ? moment(order.tentativeDeliveryDate).format("YYYY-MM-DD")
                        : "Not set"}
                    </span>
                  </div>
                </div>
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
          </button>

          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
            disabled={currentPage >= totalPages}
            className="pagination-btn"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  )
}

export default ShippedOrders