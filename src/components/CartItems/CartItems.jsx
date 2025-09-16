
// import { useContext, useState } from "react";
// import "./CartItems.css";
// import { ShopContext } from "../../context/ShopContext";
// import { useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";

// const CartItems = () => {
//   const { cartItems, removeFromCart, getTotalCartAmount, products } = useContext(ShopContext);

//   const [offerCode, setOfferCode] = useState("");
//   const [discountedTotal, setDiscountedTotal] = useState(null);

//   const navigate = useNavigate();
//   const location = useLocation();

//   if (!products || products.length === 0) {
//     return <div>Loading products...</div>;
//   }

//   const getImage = (images, color) => {
//     if (images && images.length > 0) {
//       try {
//         const parsedImages = JSON.parse(images[0]);
//         if (parsedImages[color] && parsedImages[color].length > 0) {
//           return parsedImages[color][0];
//         }
//         const firstAvailableColor = Object.keys(parsedImages)[0];
//         if (parsedImages[firstAvailableColor] && parsedImages[firstAvailableColor].length > 0) {
//           return parsedImages[firstAvailableColor][0];
//         }
//       } catch (error) {
//         console.error("Error parsing image JSON:", error);
//       }
//     }
//     return "/placeholder.svg";
//   };

//   return (
//     <div className="cartitems">
//       <div className="cartitems-header">
//         <p>Product</p>
//         <p>Title</p>
//         <p>Price</p>
//         <p>Color</p>
//         <p>Quantity</p>
//         <p>Size</p>
//         <p>Total</p>
//         <p>Remove</p>
//       </div>
//       <hr />
//       {cartItems.length === 0 && <p>Your cart is empty.</p>}
//       {cartItems.map((cartItem) => {
//         const { productId, quantity, size, color } = cartItem;
//         const product = products.find((p) => String(p._id) === String(productId));

//         if (!product) {
//           return (
//             <div key={`${productId}-${size}-${color}`} >
//             </div>
//           );
//         }

//         const imageUrl = getImage(product?.images, color);
//         const displayColor = color || "Default";

//         return (
//           <div key={`${productId}-${size}-${color}`} className="cartitem">
//             <img src={imageUrl} alt={product.name} />
//             <p>{product.name}</p>
//             <p>Rs {product.price}</p>
//             <p>{displayColor}</p>
//             <p>{quantity}</p>
//             <p>{size}</p>
//             <p>Rs {quantity * product.price}</p>
//             <button onClick={() => removeFromCart(productId, size, color)}>Remove</button>
//           </div>
//         );
//       })}
//       <hr />
//       {location.pathname === "/cart" && (
//         <div className="cartitems-down">
//           <div className="cartitems-total">
//             <h1>Cart Totals</h1>
//             <div>
//               <div className="cartitems-total-item">
//                 <p>Subtotal</p>
//                 <p>Rs.{getTotalCartAmount()}</p>
//               </div>
//               <hr />
//               <div className="cartitems-total-item">
//                 <p>Shipping Fee</p>
//                 <p>Free</p>
//               </div>
//               <hr />
//               <div className="cartitems-total-item">
//                 <h3>Total</h3>
//                 <h3>Rs.{getTotalCartAmount()}</h3>
//               </div>
//             </div>
//             <button
//               onClick={() => {
//                 if (cartItems.length === 0) {
//                   toast.error("Your cart is empty!", {
//                     position: "top-center",
//                     autoClose: 2000,
//                   });
//                   return;
//                 }
//                 navigate("/checkout", { state: { offerCode }});
//               }}
//               style={{ marginTop: "12px" }}
//             >
//               PROCEED TO CHECKOUT
//             </button>
//           </div>
//           <div className="cartitems-promocode">
//             <p>If you have a promo code, enter it here</p>
//             <div className="cartitems-promobox" style={{ marginTop: "20px" }}>
//               <input
//                 type="text"
//                 placeholder="Promo code"
//                 value={offerCode}
//                 onChange={(e) => setOfferCode(e.target.value)}
//               />
//               <button>Apply</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartItems;


// import { useContext, useState } from "react";
// import "./CartItems.css";
// import { ShopContext } from "../../context/ShopContext";
// import { useNavigate, useLocation } from "react-router-dom";
// import { toast } from "react-toastify";

// const CartItems = () => {
//   const {
//     cartItems,
//     removeFromCart,
//     getTotalCartAmount,
//     products,
//     token,
//     loading,
//     cartLoading,
//   } = useContext(ShopContext);

//   const [offerCode, setOfferCode] = useState("");
//   const navigate = useNavigate();
//   const location = useLocation();

//   const getImage = (images, color) => {
//     if (images && images.length > 0) {
//       try {
//         const parsedImages = JSON.parse(images[0]);
//         if (parsedImages[color] && parsedImages[color].length > 0) {
//           return parsedImages[color][0];
//         }
//         const firstAvailableColor = Object.keys(parsedImages)[0];
//         if (
//           parsedImages[firstAvailableColor] &&
//           parsedImages[firstAvailableColor].length > 0
//         ) {
//           return parsedImages[firstAvailableColor][0];
//         }
//       } catch (error) {
//         console.error("Error parsing image JSON:", error);
//       }
//     }
//     return "/placeholder.svg";
//   };

//   // -------------------- Render Logic --------------------

//   if (loading) {
//     return <div className="cart-loading">Loading...</div>;
//   }

//   if (!token) {
//     return (
//       <div className="cart-login-message" style={{ textAlign: "center", justifyContent: "center", marginTop: "80px", alignItems: "center" }}>
//         <p>Please login to view your cart.</p>
//       </div>
//     );
//   }

//   // if (cartLoading) {
//   //   return <div className="cart-loading">Loading your cart...</div>;
//   // }

//   if (!cartItems || cartItems.length === 0) {
//     return (
//       <div className="cart-empty" style={{ textAlign: "center", marginTop: "40px" }}>
//         <p>🛒 Your cart is empty.</p>
//       </div>
//     );
//   }

//   // -------------------- If Items Exist --------------------

//   return (
//     <div className="cartitems">
//       <div className="cartitems-header">
//         <p>Product</p>
//         <p>Title</p>
//         <p>Price</p>
//         <p>Color</p>
//         <p>Quantity</p>
//         <p>Size</p>
//         <p>Total</p>
//         <p>Remove</p>
//       </div>
//       <hr />

//       {cartItems.map((cartItem) => {
//         const { productId, quantity, size, color } = cartItem;
//         const product = products.find((p) => String(p._id) === String(productId));

//         if (!product) {
//           return null;
//         }

//         const imageUrl = getImage(product?.images, color);
//         const displayColor = color || "Default";

//         return (
//           <div key={`${productId}-${size}-${color}`} className="cartitem">
//             <img src={imageUrl} alt={product.name} />
//             <p>{product.name}</p>
//             <p>Rs {product.price}</p>
//             <p>{displayColor}</p>
//             <p>{quantity}</p>
//             <p>{size}</p>
//             <p>Rs {quantity * product.price}</p>
//             <button onClick={() => removeFromCart(productId, size, color)}>Remove</button>
//           </div>
//         );
//       })}
//       <hr />

//       {location.pathname === "/cart" && (
//         <div className="cartitems-down">
//           <div className="cartitems-total">
//             <h1 style={{"color":"black"}}>Cart Totals</h1>
//             <div>
//               <div className="cartitems-total-item">
//                 <p>Subtotal</p>
//                 <p>Rs.{getTotalCartAmount()}</p>
//               </div>
//               <hr />
//               <div className="cartitems-total-item">
//                 <p>Shipping Fee</p>
//                 <p>Free</p>
//               </div>
//               <hr />
//               <div className="cartitems-total-item">
//                 <h3>Total</h3>
//                 <h3>Rs.{getTotalCartAmount()}</h3>
//               </div>
//             </div>
//             <button
//               onClick={() => {
//                 if (cartItems.length === 0) {
//                   toast.error("Your cart is empty!", {
//                     position: "top-center",
//                     autoClose: 2000,
//                   });
//                   return;
//                 }
//                 navigate("/checkout", { state: { offerCode } });
//               }}
//               style={{ marginTop: "12px", backgroundColor:"black" }}
//             >
//               PROCEED TO CHECKOUT
//             </button>
//           </div>
//           <div className="cartitems-promocode">
//             <p>If you have a promo code, enter it here</p>
//             <div className="cartitems-promobox" style={{ marginTop: "20px" }}>
//               <input
//                 type="text"
//                 placeholder="Promo code"
//                 value={offerCode}
//                 onChange={(e) => setOfferCode(e.target.value)}
//               />
//               <button style={{backgroundColor:"black"}}>Apply</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartItems;


import { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const CartItems = () => {
  const {
    cartItems,
    removeFromCart,
    getTotalCartAmount,
    products,
    token,
    loading,
    cartLoading,
  } = useContext(ShopContext);

  const [offerCode, setOfferCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const getImage = (images, color) => {
    if (images && images.length > 0) {
      try {
        const parsedImages = JSON.parse(images[0]);
        if (parsedImages[color] && parsedImages[color].length > 0) {
          return parsedImages[color][0];
        }
        const firstAvailableColor = Object.keys(parsedImages)[0];
        if (
          parsedImages[firstAvailableColor] &&
          parsedImages[firstAvailableColor].length > 0
        ) {
          return parsedImages[firstAvailableColor][0];
        }
      } catch (error) {
        console.error("Error parsing image JSON:", error);
      }
    }
    return "/placeholder.svg";
  };

  // -------------------- Render Logic --------------------

  if (loading) {
    return <div className="cart-loading">Loading...</div>;
  }

  if (!token) {
    return (
      <div
        className="cart-login-message"
        style={{
          textAlign: "center",
          justifyContent: "center",
          marginTop: "80px",
          alignItems: "center",
        }}
      >
        <p>Please login to view your cart.</p>
      </div>
    );
  }

  // ✅ Prevent empty cart flicker until cart is actually loaded
  if (cartLoading) {
    return <div className="cart-loading">Loading your cart...</div>;
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div
        className="cart-empty"
        style={{ textAlign: "center", marginTop: "40px" }}
      >
        <p>🛒 Your cart is empty.</p>
      </div>
    );
  }

  // -------------------- If Items Exist --------------------

  return (
    <div className="cartitems">
      <div className="cartitems-header">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Color</p>
        <p>Quantity</p>
        <p>Size</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {cartItems.map((cartItem) => {
        const { productId, quantity, size, color } = cartItem;
        const product = products.find(
          (p) => String(p._id) === String(productId)
        );

        if (!product) {
          return null;
        }

        const imageUrl = getImage(product?.images, color);
        const displayColor = color || "Default";

        return (
          <div
            key={`${productId}-${size}-${color}`}
            className="cartitem"
          >
            <img src={imageUrl} alt={product.name} />
            <p>{product.name}</p>
            <p>Rs {product.price}</p>
            <p>{displayColor}</p>
            <p>{quantity}</p>
            <p>{size}</p>
            <p>Rs {quantity * product.price}</p>
            <button
              onClick={() => removeFromCart(productId, size, color)}
            >
              Remove
            </button>
          </div>
        );
      })}
      <hr />

      {location.pathname === "/cart" && (
        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>Rs.{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Shipping Fee</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>Rs.{getTotalCartAmount()}</h3>
              </div>
            </div>
            <button
              onClick={() => {
                if (cartItems.length === 0) {
                  toast.error("Your cart is empty!", {
                    position: "top-center",
                    autoClose: 2000,
                  });
                  return;
                }
                navigate("/checkout", { state: { offerCode } });
              }}
              style={{ marginTop: "12px", backgroundColor:"black" }}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
          <div className="cartitems-promocode">
            <p>If you have a promo code, enter it here</p>
            <div
              className="cartitems-promobox"
              style={{ marginTop: "20px" }}
            >
              <input
                type="text"
                placeholder="Promo code"
                value={offerCode}
                onChange={(e) => setOfferCode(e.target.value)}
              />
              <button style={{backgroundColor:"black"}}>Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItems;
