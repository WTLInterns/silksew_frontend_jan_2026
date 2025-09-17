// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const OfferForm = () => {
//   const [formData, setFormData] = useState({
//     code: "",
//     offerType: "percentage",
//     value: "",
//     description: "",
//     startDate: "",
//     endDate: "",
//     eligibleProducts: "",
//     active: true,
//   });
//   const [submissionError, setSubmissionError] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmissionError(false);
//     try {
//       await axios.post("http://localhost:5001/api/offer/create-offer", formData);
//       toast.success("Offer Created Successfully!");
//       setFormData({
//         code: "",
//         offerType: "percentage",
//         value: "",
//         description: "",
//         startDate: "",
//         endDate: "",
//         eligibleProducts: "",
//         active: true,
//       });
//     } catch (error) {
//       console.error("Error creating offer", error);
//       setSubmissionError(true);
//       toast.error("Failed to create offer. Please try again.");
//       setTimeout(() => setSubmissionError(false), 500); // Reset shake after animation
//     }
//   };

//   return (
//     <>
//       <style>
//         {`
//           .offer-form-container {
//            margin-top: 20;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             min-height: 100vh;
//             background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
//             padding: 48px 32px 24px;
//             font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//           }

//           .offer-form {
//             background-color: #ffffff;
//             padding: 2rem;
//             border-radius: 8px;
//             box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
//             width: 100%;
//             max-width: 500px;
//             animation: fadeInScale 0.5s ease-out;
//           }

//           .offer-form.shake {
//             animation: shake 0.4s ease-in-out;
//           }

//           @keyframes fadeInScale {
//             from {
//               opacity: 0;
//               transform: scale(0.95);
//             }
//             to {
//               opacity: 1;
//               transform: scale(1);
//             }
//           }

//           @keyframes shake {
//             0%, 100% { transform: translateX(0); }
//             20%, 60% { transform: translateX(-8px); }
//             40%, 80% { transform: translateX(8px); }
//           }

//           .offer-form:hover {
//             transform: translateY(-4px);
//             box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
//           }

//           .offer-form h2 {
//             text-align: center;
//             color: #4f46e5;
//             margin-bottom: 1.5rem;
//             font-size: 1.8rem;
//             font-weight: 600;
//           }

//           .offer-form form {
//             display: flex;
//             flex-direction: column;
//             gap: 1rem;
//           }

//           .offer-form label {
//             font-size: 0.95rem;
//             color: #1f2937;
//             font-weight: 500;
//             margin-bottom: 0.3rem;
//             display: block;
//             transition: transform 0.2s ease, color 0.2s ease;
//           }

//           .offer-form label:hover {
//             transform: translateY(-2px);
//             color: #4f46e5;
//           }

//           .offer-form input[type="text"],
//           .offer-form input[type="number"],
//           .offer-form input[type="date"],
//           .offer-form select {
//             width: 100%;
//             padding: 0.75rem;
//             border: 1px solid #d1d5db;
//             border-radius: 8px;
//             font-size: 0.95rem;
//             color: #1f2937;
//             background: #f9fafb;
//             transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
//           }

//           .offer-form input[type="text"]:focus,
//           .offer-form input[type="number"]:focus,
//           .offer-form input[type="date"]:focus,
//           .offer-form select:focus {
//             outline: none;
//             border-color: #4f46e5;
//             box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
//             transform: scale(1.02);
//             animation: glow 1s infinite alternate;
//           }

//           @keyframes glow {
//             from {
//               box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
//             }
//             to {
//               box-shadow: 0 0 0 5px rgba(79, 70, 229, 0.2);
//             }
//           }

//           .offer-form input[type="checkbox"] {
//             margin-left: 0.5rem;
//             accent-color: #4f46e5;
//             width: 1.2rem;
//             height: 1.2rem;
//             vertical-align: middle;
//             transition: transform 0.2s ease;
//           }

//           .offer-form input[type="checkbox"]:checked {
//             transform: scale(1.2);
//             animation: checkScale 0.3s ease;
//           }

//           @keyframes checkScale {
//             0% { transform: scale(1); }
//             50% { transform: scale(1.3); }
//             100% { transform: scale(1.2); }
//           }

//           .offer-form .checkbox-label {
//             display: flex;
//             align-items: center;
//             gap: 0.5rem;
//             font-size: 0.95rem;
//             color: #1f2937;
//           }

//           .offer-form button {
//             width: 100%;
//             padding: 0.85rem;
//             background: #4f46e5;
//             color: #ffffff;
//             border: none;
//             border-radius: 8px;
//             font-size: 1rem;
//             font-weight: 500;
//             cursor: pointer;
//             margin-top: 1rem;
//             transition: background 0.2s ease, transform 0.2s ease;
//           }

//           .offer-form button:hover {
//             background: #4338ca;
//             transform: translateY(-2px);
//             animation: pulse 0.6s infinite;
//           }

//           .offer-form button:active {
//             transform: scale(0.95);
//           }

//           @keyframes pulse {
//             0% { transform: translateY(-2px) scale(1); }
//             50% { transform: translateY(-2px) scale(1.05); }
//             100% { transform: translateY(-2px) scale(1); }
//           }

//           @media (max-width: 480px) {
//             .offer-form-container {
//               padding: 32px 16px 16px;
//             }

//             .offer-form {
//               padding: 1.5rem;
//             }

//             .offer-form h2 {
//               font-size: 1.5rem;
//             }

//             .offer-form input[type="text"]:focus,
//             .offer-form input[type="number"]:focus,
//             .offer-form input[type="date"]:focus,
//             .offer-form select:focus {
//               animation: none; /* Disable glow on mobile for performance */
//             }

//             .offer-form button:hover {
//               animation: none; /* Disable pulse on mobile */
//             }
//           }
//         `}
//       </style>
//       <div className="offer-form-container">
//         <div className={`offer-form ${submissionError ? "shake" : ""}`}>
//           <h2>Create Offer</h2>
//           <form onSubmit={handleSubmit}>
//             <label>Code:</label>
//             <input
//               type="text"
//               name="code"
//               value={formData.code}
//               onChange={handleChange}
//               required
//             />

//             <label>Offer Type:</label>
//             <select
//               name="offerType"
//               value={formData.offerType}
//               onChange={handleChange}
//               required
//             >
//               <option value="percentage">Percentage</option>
//               <option value="flat">Flat</option>
//             </select>

//             <label>Value:</label>
//             <input
//               type="number"
//               name="value"
//               value={formData.value}
//               onChange={handleChange}
//               required
//             />

//             <label>Description:</label>
//             <input
//               type="text"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//             />

//             <label>Start Date:</label>
//             <input
//               type="date"
//               name="startDate"
//               value={formData.startDate}
//               onChange={handleChange}
//             />

//             <label>End Date:</label>
//             <input
//               type="date"
//               name="endDate"
//               value={formData.endDate}
//               onChange={handleChange}
//             />

//             <label className="checkbox-label">
//               Active:
//               <input
//                 type="checkbox"
//                 name="active"
//                 checked={formData.active}
//                 onChange={() =>
//                   setFormData({ ...formData, active: !formData.active })
//                 }
//               />
//             </label>

//             <button type="submit">Create Offer</button>
//           </form>
//         </div>
//       </div>
//       <ToastContainer style={{marginTop:50}} />
//     </>
//   );
// };

// export default OfferForm;



import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OfferForm = () => {
  const [formData, setFormData] = useState({
    code: "",
    offerType: "percentage",
    value: "",
    description: "",
    startDate: "",
    endDate: "",
    eligibleProducts: "",
    category: "", // ✅ added category
    active: true,
  });
  const [submissionError, setSubmissionError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError(false);
    try {
      await axios.post("http://localhost:5001/api/offer/create-offer", formData);
      toast.success("Offer Created Successfully!");
      setFormData({
        code: "",
        offerType: "percentage",
        value: "",
        description: "",
        startDate: "",
        endDate: "",
        eligibleProducts: "",
        category: "", // reset category
        active: true,
      });
    } catch (error) {
      console.error("Error creating offer", error);
      setSubmissionError(true);
      toast.error("Failed to create offer. Please try again.");
      setTimeout(() => setSubmissionError(false), 500); // Reset shake after animation
    }
  };

  return (
    <>
      <style>
        {`
          .offer-form-container {
            margin-top: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 50%, #e2e8f0 100%);
            padding: 48px 32px 24px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

          .offer-form {
            background-color: #ffffff;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 500px;
            animation: fadeInScale 0.5s ease-out;
          }

          .offer-form.shake {
            animation: shake 0.4s ease-in-out;
          }

          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-8px); }
            40%, 80% { transform: translateX(8px); }
          }

          .offer-form:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
          }

          .offer-form h2 {
            text-align: center;
            color: #4f46e5;
            margin-bottom: 1.5rem;
            font-size: 1.8rem;
            font-weight: 600;
          }

          .offer-form form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }

          .offer-form label {
            font-size: 0.95rem;
            color: #1f2937;
            font-weight: 500;
            margin-bottom: 0.3rem;
            display: block;
            transition: transform 0.2s ease, color 0.2s ease;
          }

          .offer-form label:hover {
            transform: translateY(-2px);
            color: #4f46e5;
          }

          .offer-form input[type="text"],
          .offer-form input[type="number"],
          .offer-form input[type="date"],
          .offer-form select {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 0.95rem;
            color: #1f2937;
            background: #f9fafb;
            transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
          }

          .offer-form input[type="text"]:focus,
          .offer-form input[type="number"]:focus,
          .offer-form input[type="date"]:focus,
          .offer-form select:focus {
            outline: none;
            border-color: #4f46e5;
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
            transform: scale(1.02);
            animation: glow 1s infinite alternate;
          }

          @keyframes glow {
            from {
              box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
            }
            to {
              box-shadow: 0 0 0 5px rgba(79, 70, 229, 0.2);
            }
          }

          .offer-form input[type="checkbox"] {
            margin-left: 0.5rem;
            accent-color: #4f46e5;
            width: 1.2rem;
            height: 1.2rem;
            vertical-align: middle;
            transition: transform 0.2s ease;
          }

          .offer-form input[type="checkbox"]:checked {
            transform: scale(1.2);
            animation: checkScale 0.3s ease;
          }

          @keyframes checkScale {
            0% { transform: scale(1); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1.2); }
          }

          .offer-form .checkbox-label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.95rem;
            color: #1f2937;
          }

          .offer-form button {
            width: 100%;
            padding: 0.85rem;
            background: #4f46e5;
            color: #ffffff;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            margin-top: 1rem;
            transition: background 0.2s ease, transform 0.2s ease;
          }

          .offer-form button:hover {
            background: #4338ca;
            transform: translateY(-2px);
            animation: pulse 0.6s infinite;
          }

          .offer-form button:active {
            transform: scale(0.95);
          }

          @keyframes pulse {
            0% { transform: translateY(-2px) scale(1); }
            50% { transform: translateY(-2px) scale(1.05); }
            100% { transform: translateY(-2px) scale(1); }
          }

          @media (max-width: 480px) {
            .offer-form-container {
              padding: 32px 16px 16px;
            }

            .offer-form {
              padding: 1.5rem;
            }

            .offer-form h2 {
              font-size: 1.5rem;
            }

            .offer-form input[type="text"]:focus,
            .offer-form input[type="number"]:focus,
            .offer-form input[type="date"]:focus,
            .offer-form select:focus {
              animation: none; /* Disable glow on mobile for performance */
            }

            .offer-form button:hover {
              animation: none; /* Disable pulse on mobile */
            }
          }
        `}
      </style>
      <div className="offer-form-container">
        <div className={`offer-form ${submissionError ? "shake" : ""}`}>
          <h2>Create Offer</h2>
          <form onSubmit={handleSubmit}>
            <label>Code:</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
            />

            {/* ✅ New Category Dropdown */}
            <label>Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Category --</option>
              <option value="indian_fusion">Indian & Fusion Wear</option>
              <option value="western">Western Wear</option>
              <option value="formal">Formal Wear</option>
            </select>

            <label>Offer Type:</label>
            <select
              name="offerType"
              value={formData.offerType}
              onChange={handleChange}
              required
            >
              <option value="percentage">Percentage</option>
              <option value="flat">Flat</option>
            </select>

            <label>Value:</label>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              required
            />

            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />

            <label>Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />

            <label>End Date:</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />



            <label className="checkbox-label">
              Active:
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={() =>
                  setFormData({ ...formData, active: !formData.active })
                }
              />
            </label>

            <button type="submit">Create Offer</button>
          </form>
        </div>
      </div>
      <ToastContainer style={{ marginTop: 50 }} />
    </>
  );
};

export default OfferForm;
