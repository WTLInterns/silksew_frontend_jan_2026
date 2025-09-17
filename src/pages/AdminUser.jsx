import { useContext, useEffect, useState, useCallback } from "react"
import axios from "axios"
import { ShopContext } from "../context/ShopContext"
import { BASEURL } from "../config"
import "../pages/CSS/AdminUser.css"
import moment from "moment"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const AdminUser = ({ updateTotalOrders }) => {
  const [addresses, setAddresses] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3
  // eslint-disable-next-line no-unused-vars
  const { token } = useContext(ShopContext)

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const statusHandler = async (event, _id) => {
    const newStatus = event.target.value
    try {
      await axios.post(BASEURL + "/api/updateOrderStatus/order-status", {
        _id,
        status: newStatus,
      })
      await fetchUserDetails()
      toast.success(`Order status has been updated to ${newStatus}!`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } catch (error) {
      console.log(error)
      toast.error("Failed to update order status. Please try again.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
  }

  const paymentStatusHandler = async (event, _id) => {
    try {
      await axios.post(BASEURL + "/api/updatePayment/payment-status", {
        _id,
        payment: event.target.value,
      })
      await fetchUserDetails()
      toast.success("Payment status has been updated!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    } catch (error) {
      console.log(error)
      toast.error("Failed to update payment status. Please try again.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
    }
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
      console.log("order details get",response)
      setAddresses(response.data)
      updateTotalOrders(response.data.length)
    } catch (err) {
      console.error("Error fetching orders:", err)
      toast.error("Failed to fetch orders. Please try again.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })
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
      (order) =>
        order.address.firstName?.toLowerCase().includes(searchTerm?.toLowerCase()) && order.status !== "ConfirmedOrder",
    )
    .sort((a, b) => {
      if (a.status === "Confirmed" && b.status !== "Confirmed") return 1
      if (a.status !== "Confirmed" && b.status === "Confirmed") return -1
      return moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf()
    })

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)

  return (
    <div className="admin-orders p-6">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-7 text-center text-gray-800" style={{ color: "#000" }}>
        Product Orders Details
      </h2>
      <div className="search-container mb-4">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full md:w-1/3 px-4 py-2 mx-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Product Details</th>
              <th>User Details</th>
              <th>Address</th>
              <th>Payment</th>
              <th>Payment Method</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((order, index) => (
                <tr key={order._id} className={order.status === "Confirmed" ? "bg-gray-100" : ""}>
                  <td data-label="Sr. No">{index + 1}</td>
                  <td data-label="Product Details">
                    <div>
                      <p><strong>Product Id:</strong> {order.items[0].productId}</p>
                      {/* <p>Product Color: {order.items[0].color}</p> */}
                      <p><strong>Size:</strong> {order.items[0].size}</p>
                      <p><strong>Quantity:</strong> {order.items[0].quantity}</p>
                    </div>
                  </td>
                  <td data-label="User Details">
                    <div>
                      <p><strong>Name:</strong> {order.address.firstName} {order.address.lastName} </p>
                      {/* <p>Last Name: {order.address.lastName}</p> */}
                      <p><strong>Email:</strong> {order.address.email}</p>
                      <p><strong>Phone:</strong> {order.address.phone}</p>
                    </div>
                  </td>
                  <td data-label="Address">
                    <div>
                      <p><strong>Street:</strong> {order.address.street}</p>
                      <p><strong>City:</strong> {order.address.city}</p>
                      <p><strong>State:</strong> {order.address.state}</p>
                      <p><strong>Landmark:</strong> {order.address.landMark}</p>
                    </div>
                  </td>
                  <td data-label="Payment">
                    <select
                      onChange={(event) => paymentStatusHandler(event, order._id)}
                      value={order.payment}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                  </td>
                  <td data-label="Payment Method">{order.paymentMethod}</td>
                  <td data-label="Total Amount">Rs.{order.totalAmount}</td>
                  <td data-label="Status">
                    {order.status === "Confirmed" ? (
                      <span className="text-green-600 font-semibold">Confirmed</span>
                    ) : (
                      <select
                        onChange={(event) => statusHandler(event, order._id)}
                        value={order.status}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <br />
      <div>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{ backgroundColor: "black",color:"white" }}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        &ensp;
        <span className="text-sm text-black-700">
          Page {currentPage} of {totalPages}
        </span>
        &ensp;
        <button
          onClick={() => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))}
          disabled={currentPage >= totalPages}
          style={{ backgroundColor: "black",color:"white"  }}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default AdminUser

