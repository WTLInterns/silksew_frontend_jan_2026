// import { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

// function UPdateRemoveoffer() {
//     const [searchTerm, setSearchTerm] = useState("");
//     const [offer, setOffer] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [editingOffer, setEditingOffer] = useState(null);

//     const fetchOffers = async () => {
//         try {
//             const response = await axios.get("https://api.silksew.com/api/offer/get-offer");
//             const fetchedOffer = response.data.offers;
//             console.log("get offer", fetchedOffer);
//             setOffer(Array.isArray(fetchedOffer) ? fetchedOffer : [fetchedOffer]);
//         } catch (error) {
//             console.error("Error fetching offers:", error);
//             toast.error("Failed to fetch offers.");
//         } finally {
//             setLoading(false);
//         }
//     };


//     useEffect(() => {
//         fetchOffers();
//     }, []);

//     const handleEdit = (item) => {
//         setEditingOffer({ ...item }); // Create a shallow copy for editing
//     };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEditingOffer((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(`https://api.silksew.com/api/offer/update-offer/${editingOffer._id}`, editingOffer);
//             toast.success("Offer updated successfully");
//             fetchOffers();
//             setEditingOffer(null);
//         } catch (error) {
//             console.error("Error updating offer:", error);
//             toast.error("Failed to update offer");
//         }
//     };

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`https://api.silksew.com/api/offer/delete-offer/${id}`);
//             toast.success("Offer deleted successfully");
//             fetchOffers();
//         } catch (error) {
//             console.error("Error deleting offer:", error);
//             toast.error("Failed to delete offer");
//         }
//     };

//     const filteredOffers = offer?.filter((item) =>
//         item?.code.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         <div className="p-4 md:p-8">

//             <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Offer Details</h2>

//             <ToastContainer
//                 position="top-center"
//                 style={{ marginTop: 70, zIndex: 9999 }}
//             />

//             {editingOffer ? (
//                 <div className="container mx-auto mt-8 p-6 bg-gray-50 shadow-lg rounded-lg max-w-lg">
//                     <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Update Offer</h2>
//                     <form onSubmit={handleUpdate} className="space-y-4">
//                         <div>
//                             <label className="block font-semibold text-sm text-gray-700 mb-2">Code</label>
//                             <input
//                                 type="text"
//                                 name="code"
//                                 value={editingOffer.code}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-semibold text-sm text-gray-700 mb-2">Value</label>
//                             <input
//                                 type="number"
//                                 name="value"
//                                 value={editingOffer.value}
//                                 onChange={handleChange}
//                                 required
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-semibold text-sm text-gray-700 mb-2">Description</label>
//                             <input
//                                 type="text"
//                                 name="description"
//                                 value={editingOffer.description}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-semibold text-sm text-gray-700 mb-2">Start Date</label>
//                             <input
//                                 type="date"
//                                 name="startDate"
//                                 value={new Date(editingOffer.startDate).toISOString().split("T")[0]}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                             />
//                         </div>

//                         <div>
//                             <label className="block font-semibold text-sm text-gray-700 mb-2">End Date</label>
//                             <input
//                                 type="date"
//                                 name="endDate"
//                                 value={new Date(editingOffer.endDate).toISOString().split("T")[0]}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg"
//                             />
//                         </div>

//                         <button
//                             type="submit"
//                             className="w-full py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
//                         >
//                             Update Offer
//                         </button>
//                     </form>
//                 </div>
//             ) : (
//                 <>
//                     <input
//                         type="text"
//                         placeholder="Search by Offer Code"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="w-full md:w-1/3 mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                     />

//                     <div className="overflow-x-auto shadow border rounded-md">

//                         <table className="min-w-full divide-y divide-gray-200 text-sm">
//                             <thead className="bg-gray-100">
//                                 <tr>
//                                     <th className="p-3 text-left">Sr. No</th>
//                                     <th className="p-3 text-left">Offer Code</th>
//                                     <th className="p-3 text-left">Discount</th>
//                                     <th className="p-3 text-left">Description</th>
//                                     <th className="p-3 text-left">From Date</th>
//                                     <th className="p-3 text-left">To Date</th>
//                                     <th className="p-3 text-left">Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="bg-white divide-y divide-gray-200">
//                                 {filteredOffers.length > 0 ? (
//                                     filteredOffers.map((item, index) => (
//                                         <tr key={item._id}>
//                                             <td className="p-3">{index + 1}</td>
//                                             <td className="p-3">{item.code}</td>
//                                             <td className="p-3">{item.value} %</td>
//                                             <td className="p-3">{item.description}</td>
//                                             <td className="p-3">
//                                                 {new Date(item.startDate).toLocaleDateString("en-GB", {
//                                                     day: "2-digit",
//                                                     month: "short",
//                                                     year: "numeric",
//                                                 })}
//                                             </td>
//                                             <td className="p-3">
//                                                 {new Date(item.endDate).toLocaleDateString("en-GB", {
//                                                     day: "2-digit",
//                                                     month: "short",
//                                                     year: "numeric",
//                                                 })}
//                                             </td>
//                                             <td className="p-3">
//                                                 <button
//                                                     onClick={() => handleEdit(item)}
//                                                     className="text-blue-600 hover:text-blue-800 mx-3"
//                                                     title="Edit"
//                                                 >
//                                                     <FontAwesomeIcon icon={faEdit} size="lg" />
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleDelete(item._id)}
//                                                     className="text-red-600 hover:text-red-800"
//                                                     title="Delete"
//                                                 >
//                                                     <FontAwesomeIcon icon={faTrash} size="lg"/>
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ))
//                                 ) : (
//                                     <tr>
//                                         <td colSpan="7" className="text-center py-4">
//                                             No offers found
//                                         </td>
//                                     </tr>
//                                 )}
//                             </tbody>
//                         </table>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// }

// export default UPdateRemoveoffer;




import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

function UpdateRemoveOffer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [offer, setOffer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOffer, setEditingOffer] = useState(null);

  const fetchOffers = async () => {
    try {
      const response = await axios.get(
        "https://api.silksew.com/api/offer/get-offer"
      );
      const fetchedOffer = response.data.offers;
      console.log("get offer", fetchedOffer);
      setOffer(Array.isArray(fetchedOffer) ? fetchedOffer : [fetchedOffer]);
    } catch (error) {
      console.error("Error fetching offers:", error);
      toast.error("Failed to fetch offers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleEdit = (item) => {
    setEditingOffer({ ...item });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingOffer((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://api.silksew.com/api/offer/update-offer/${editingOffer._id}`,
        editingOffer
      );
      toast.success("Offer updated successfully");
      fetchOffers();
      setEditingOffer(null);
    } catch (error) {
      console.error("Error updating offer:", error);
      toast.error("Failed to update offer");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://api.silksew.com/api/offer/delete-offer/${id}`
      );
      toast.success("Offer deleted successfully");
      fetchOffers();
    } catch (error) {
      console.error("Error deleting offer:", error);
      toast.error("Failed to delete offer");
    }
  };

  const filteredOffers = offer?.filter((item) =>
    item?.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Offer Details
      </h2>

      <ToastContainer
        position="top-center"
        style={{ marginTop: 70, zIndex: 9999 }}
      />

      {editingOffer ? (
        <div className="container mx-auto mt-8 p-6 bg-gray-50 shadow-lg rounded-lg max-w-lg">
          <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">
            Update Offer
          </h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block font-semibold text-sm text-gray-700 mb-2">
                Code
              </label>
              <input
                type="text"
                name="code"
                value={editingOffer.code}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-sm text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={editingOffer.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="indian_fusion">Indian Fusion</option>
                <option value="western">Western</option>
                <option value="formal">Formal</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-sm text-gray-700 mb-2">
                Value
              </label>
              <input
                type="number"
                name="value"
                value={editingOffer.value}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-sm text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={editingOffer.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-sm text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={
                  new Date(editingOffer.startDate).toISOString().split("T")[0]
                }
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-semibold text-sm text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={new Date(editingOffer.endDate).toISOString().split("T")[0]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Update Offer
            </button>
          </form>
        </div>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search by Offer Code"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/3 mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="overflow-x-auto shadow border rounded-md">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Sr. No</th>
                  <th className="p-3 text-left">Offer Code</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Discount</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">From Date</th>
                  <th className="p-3 text-left">To Date</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOffers.length > 0 ? (
                  filteredOffers.map((item, index) => (
                    <tr key={item._id}>
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">{item.code}</td>
                      <td className="p-3 capitalize">{item.category}</td>
                      <td className="p-3">{item.value} %</td>
                      <td className="p-3">{item.description}</td>
                      <td className="p-3">
                        {new Date(item.startDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-3">
                        {new Date(item.endDate).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleEdit(item)}
                          className="text-blue-600 hover:text-blue-800 mx-3"
                          title="Edit"
                        >
                          <FontAwesomeIcon icon={faEdit} size="lg" />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <FontAwesomeIcon icon={faTrash} size="lg" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No offers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default UpdateRemoveOffer;
