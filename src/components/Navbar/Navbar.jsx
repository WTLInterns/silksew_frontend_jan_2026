
import { useState, useRef, useEffect, useContext } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Search, User, Heart, ShoppingBag, ChevronDown, X, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { useFavorites } from "../../context/FavoritesContext"
import { ShopContext } from "../../context/ShopContext"
import FavoriteButton from '../common/FavoriteButton';
import logo from "../../components/Assets/siksewmodified.png"
import "./Header.css"

const Navbar = () => {
  const { products, calculateTotalCartItems } = useContext(ShopContext)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [subcategoryProducts, setSubcategoryProducts] = useState([])
  const [selectedSubcategory, setSelectedSubcategory] = useState("")
  const [loading, setLoading] = useState(false)
  const [showOnlyProducts, setShowOnlyProducts] = useState(false)
  const mobileNavRef = useRef(null)
  const { favorites } = useFavorites()
  const navigate = useNavigate()
  const location = useLocation()
  const favoritesCount = Array.isArray(favorites) ? favorites.length : 0

  const cartCount = calculateTotalCartItems()

  // Navigation menu structure matching the image
  const navigationMenu = {
    "All Products": [],
    "Indian & Fusion Wear": [
      "Ethnic Wear",
      "Kurtis",
      "Tops & Tunics",
      "Wedding Wear",
      "Sarees",
      "Lehengas",
      "Salwar Suits",
      "Indo-Western"
    ],
    "Western Wear": [
      "Casual Wear",
      "Formal Wear",
      "Street Style",
      "Smart Casuals",
      "Athleisure",
      "Summer Wear",
      "Winter Wear",
      "Party Wear"
    ],
    "Formal Wear": [
      "Office Wear",
      "Business Casual",
      "Blazers",
      "Formal Dresses",
      "Work Wear"
    ],
    "New Arrivals": []
  }

  // Function to clear subcategory when logo is clicked
  const handleLogoClick = () => {
    setSelectedSubcategory(""); // Clear the selected subcategory
    setSubcategoryProducts([]); // Clear the products
    setShowOnlyProducts(false); // Show homepage content again
    navigate("/"); // Navigate to home
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target)) {
        setShowMobileMenu(false)
        setActiveDropdown(null)
      }
    }
    if (showMobileMenu || activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showMobileMenu, activeDropdown])

  const handleSearch = (e) => {
    const query = e.target.value.trim().toLowerCase();
    setSearchQuery(query);

    if (query === "") {
      setSearchResults([]);
      return;
    }

    let matchedSubcategory = null;

    // 1️⃣ Check for exact match first
    Object.entries(navigationMenu).forEach(([menu, subs]) => {
      if (menu.toLowerCase() === query) {
        matchedSubcategory = menu;
      }
      subs.forEach((sub) => {
        if (sub.toLowerCase() === query) {
          matchedSubcategory = sub;
        }
      });
    });

    // 2️⃣ If no exact match, check for partial match (prioritize shortest one)
    if (!matchedSubcategory) {
      let possibleMatches = [];
      Object.entries(navigationMenu).forEach(([menu, subs]) => {
        if (menu.toLowerCase().includes(query)) {
          possibleMatches.push(menu);
        }
        subs.forEach((sub) => {
          if (sub.toLowerCase().includes(query)) {
            possibleMatches.push(sub);
          }
        });
      });

      if (possibleMatches.length > 0) {
        // Choose the shortest/closest match (so "Casual Wear" wins over "Business Casual")
        possibleMatches.sort((a, b) => a.length - b.length);
        matchedSubcategory = possibleMatches[0];
      }
    }

    if (matchedSubcategory) {
      fetchProductsBySubcategory(matchedSubcategory);
      setSearchResults([]);
      return;
    }

    // 3️⃣ Otherwise, search by product name
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setSearchResults(results);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (searchResults.length > 0) {
        navigate(`/product/${searchResults[0]._id}`);
        setSearchQuery("");
        setSearchResults([]);
        return;
      }

      let matchedSubcategory = null;

      // Exact match first
      Object.entries(navigationMenu).forEach(([menu, subs]) => {
        if (menu.toLowerCase() === searchQuery.toLowerCase()) {
          matchedSubcategory = menu;
        }
        subs.forEach((sub) => {
          if (sub.toLowerCase() === searchQuery.toLowerCase()) {
            matchedSubcategory = sub;
          }
        });
      });

      // Partial match if no exact match
      if (!matchedSubcategory) {
        let possibleMatches = [];
        Object.entries(navigationMenu).forEach(([menu, subs]) => {
          if (menu.toLowerCase().includes(searchQuery.toLowerCase())) {
            possibleMatches.push(menu);
          }
          subs.forEach((sub) => {
            if (sub.toLowerCase().includes(searchQuery.toLowerCase())) {
              possibleMatches.push(sub);
            }
          });
        });
        if (possibleMatches.length > 0) {
          possibleMatches.sort((a, b) => a.length - b.length);
          matchedSubcategory = possibleMatches[0];
        }
      }

      if (matchedSubcategory) {
        fetchProductsBySubcategory(matchedSubcategory);
        setSearchQuery("");
      }
    }
  };

  const handleSelectProduct = (productId) => {
    navigate(`/product/${productId}`)
    setSearchQuery("")
    setSearchResults([])
  }

  const handleDropdownHover = (menuItem) => {
    setActiveDropdown(menuItem)
  }

  const handleDropdownLeave = () => {
    setActiveDropdown(null)
  }

  // Function to fetch products by subcategory from API
  const fetchProductsBySubcategory = async (subcategory) => {
    setLoading(true)
    setSelectedSubcategory(subcategory)
    setShowOnlyProducts(true) // Set to show only products

    try {
      if (subcategory === "All Products" || subcategory === "New Arrivals") {
        // ✅ Fetch all products (or New Arrivals if backend supports filtering)
        const response = await fetch("http://localhost:5001/api/products")
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setSubcategoryProducts(data.products) // ✅ must use .products
          } else {
            console.error("API returned error:", data.message)
            setSubcategoryProducts([])
          }
        } else {
          console.error("Failed to fetch all products")
          setSubcategoryProducts(products)
        }
      } else {
        // Fetch by subcategory
        const response = await fetch(
          `http://localhost:5001/api/products/by-subcategory?subcategory=${encodeURIComponent(subcategory)}`
        )
        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setSubcategoryProducts(data.products)
          } else {
            console.error("API returned error:", data.message)
            const filteredProducts = products.filter(product =>
              product.subcategory && Array.isArray(product.subcategory) &&
              product.subcategory.some(sub => sub.toLowerCase().includes(subcategory.toLowerCase()))
            )
            setSubcategoryProducts(filteredProducts)
          }
        } else {
          console.error("Failed to fetch products from API")
          const filteredProducts = products.filter(product =>
            product.subcategory && Array.isArray(product.subcategory) &&
            product.subcategory.some(sub => sub.toLowerCase().includes(subcategory.toLowerCase()))
          )
          setSubcategoryProducts(filteredProducts)
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      const filteredProducts = products.filter(product =>
        product.subcategory && Array.isArray(product.subcategory) &&
        product.subcategory.some(sub => sub.toLowerCase().includes(subcategory.toLowerCase()))
      )
      setSubcategoryProducts(filteredProducts)
    }

    setLoading(false)
  }

  // Function to get the first valid image URL from a product
  const getProductImage = (product) => {
    const { images } = product;
    if (!images || images.length === 0) return "/placeholder-image.jpg";

    // Case 1: If it's already a plain string URL
    if (typeof images[0] === "string") {
      try {
        // Try parsing it (in case it's a JSON stringified object)
        const parsed = JSON.parse(images[0]);
        const firstKey = Object.keys(parsed)[0]; // e.g. "Pink"
        return parsed[firstKey][0]; // first image inside that color
      } catch {
        return images[0]; // not JSON, just a URL string
      }
    }

    // Case 2: If it's an object with .url
    if (images[0]?.url) {
      return images[0].url;
    }

    return "/placeholder-image.jpg";
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Red Promotional Banner */}
      <div style={{
        backgroundColor: "#dc2626",
        color: "#fff",
        padding: "8px 0",
        fontSize: "14px",
        fontWeight: "500",
        textAlign: "center"
      }}>
        WOMEN'S FASHION SALE! 40% OFF EVERYTHING USE CODE: SILKSEW40 | Free Shipping Above ₹999
      </div>

      {/* Main Header - Fixed at the top */}
      <div style={{ 
        backgroundColor: "#fff", 
        borderBottom: "1px solid #e5e7eb",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: "100%"
      }}>
        <div style={{
          maxWidth: "100%",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          height: "70px",
          gap: "20px"
        }}>

          {/* Logo and Brand Name - UPDATED WITH onClick */}
          <div style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <Link
              to="/"
              style={{ display: "flex", alignItems: "center", textDecoration: "none" }}
              onClick={handleLogoClick} // Add this onClick handler
            >
              <img
                src={logo}
                alt="SilkSew"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%"
                }}
              />
              <div style={{ marginLeft: "8px" }}>
                <h1 style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#000",
                  margin: "0",
                  lineHeight: "1"
                }}>
                  SilkSew
                </h1>
                <p style={{
                  fontSize: "11px",
                  color: "#6b7280",
                  margin: "0",
                  fontWeight: "400"
                }}>
                  Women's Fashion
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav style={{ display: "flex", alignItems: "center", flex: 1 }}>
            {Object.keys(navigationMenu).map((menuItem) => (
              <div
                key={menuItem}
                style={{ position: "relative" }}
                onMouseEnter={() => handleDropdownHover(menuItem)}
                onMouseLeave={handleDropdownLeave}
              >
                <Link
                  to="#"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "0 16px",
                    height: "70px",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    whiteSpace: "nowrap"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = "#d97706"
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = "#374151"
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    fetchProductsBySubcategory(menuItem);
                  }}
                >
                  <span>
                    {menuItem}
                  </span>
                  {navigationMenu[menuItem].length > 0 && (
                    <ChevronDown size={14} />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {activeDropdown === menuItem && navigationMenu[menuItem].length > 0 && (
                  <div style={{
                    position: "absolute",
                    top: "100%",
                    left: "0",
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                    zIndex: 50,
                    minWidth: "200px",
                    padding: "8px 0"
                  }}>
                    {navigationMenu[menuItem].map((subItem) => (
                      <div
                        key={subItem}
                        style={{
                          display: "block",
                          padding: "12px 20px",
                          fontSize: "14px",
                          color: "#374151",
                          textDecoration: "none",
                          transition: "background-color 0.2s ease",
                          cursor: "pointer"
                        }}
                        onClick={() => fetchProductsBySubcategory(subItem)}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#f3f4f6"
                          e.target.style.color = "#d97706"
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "transparent"
                          e.target.style.color = "#374151"
                        }}
                      >
                        {subItem}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar and Icons */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexShrink: 0 }}>

            {/* Search Bar */}
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearch}
                onKeyPress={handleKeyPress}
                style={{
                  width: "250px",
                  padding: "10px 40px 10px 15px",
                  border: "1px solid #d1d5db",
                  borderRadius: "25px",
                  fontSize: "14px",
                  outline: "none"
                }}
                onFocus={(e) => e.target.style.borderColor = "#d97706"}
                onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
              />
              <Search
                size={18}
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#6b7280"
                }}
              />

              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div style={{
                  position: "absolute",
                  top: "45px",
                  left: 0,
                  right: 0,
                  backgroundColor: "#fff",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  zIndex: 50,
                  maxHeight: "300px",
                  overflowY: "auto"
                }}>
                  {searchResults.map((product) => (
                    <div
                      key={product._id}
                      style={{
                        padding: "12px 15px",
                        cursor: "pointer",
                        borderBottom: "1px solid #f3f4f6"
                      }}
                      onClick={() => handleSelectProduct(product._id)}
                      onMouseOver={(e) => e.target.style.backgroundColor = "#f3f4f6"}
                      onMouseOut={(e) => e.target.style.backgroundColor = "transparent"
                      }
                    >
                      <div style={{ fontSize: "14px", color: "#374151" }}>
                        {product.name}
                      </div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>
                        ₹{product.price}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* User Icons */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <Link
                to="/profile"
                style={{ color: "#374151" }}
                onMouseOver={(e) => e.target.style.color = "#d97706"}
                onMouseOut={(e) => e.target.style.color = "#374151"}
              >
                <User size={22} />
              </Link>

              <Link
                to="/favorites"
                style={{ position: "relative", color: "#374151" }}
                onMouseOver={(e) => e.target.style.color = "#d97706"}
                onMouseOut={(e) => e.target.style.color = "#374151"}
              >
                <Heart size={22} />
                {favoritesCount > 0 && (
                  <span style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    backgroundColor: "#dc2626",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "10px",
                    fontWeight: "600",
                    minWidth: "18px",
                    height: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {favoritesCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                style={{ position: "relative", color: "#374151" }}
                onMouseOver={(e) => e.target.style.color = "#d97706"}
                onMouseOut={(e) => e.target.style.color = "#374151"}
              >
                <ShoppingBag size={22} />
                {cartCount > 0 && (
                  <span style={{
                    position: "absolute",
                    top: "-8px",
                    right: "-8px",
                    backgroundColor: "#dc2626",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 6px",
                    fontSize: "10px",
                    fontWeight: "600",
                    minWidth: "18px",
                    height: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Add padding to the top of the main content to account for fixed navbar */}
      <div style={{ paddingTop: "70px" }}>
        {/* Your main page content goes here */}
      </div>

      {/* Subcategory Products Display - Fixed overlay positioned higher */}
       {selectedSubcategory && showOnlyProducts && 
        !location.pathname.startsWith("/admin") &&
        selectedSubcategory && showOnlyProducts && (
          <div style={{
            position: 'fixed',
            top: '70px', // Positioned right below the navbar
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(249, 250, 251, 0.98)",
            backdropFilter: "blur(5px)",
            padding: "30px 20px 0",
            overflowY: "auto",
            zIndex: 999,
            animation: "fadeIn 0.3s ease-in-out",
            display: "flex",
            flexDirection: "column"
          }}>
            <div style={{ 
              maxWidth: "1400px", 
              margin: "0 auto",
              position: "relative",
              flex: "1"
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '30px',
                padding: "0 10px"
              }}>
                <h2 style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#1f2937",
                  margin: 0,
                  textTransform: "capitalize"
                }}>
                  {selectedSubcategory} <span style={{ fontSize: "18px", color: "#6b7280", fontWeight: "500" }}>({subcategoryProducts.length} products)</span>
                </h2>
                <button 
                  onClick={() => {
                    setSelectedSubcategory("");
                    setShowOnlyProducts(false);
                  }}
                  style={{
                    padding: "10px 18px",
                    // backgroundColor: "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontWeight: "500",
                    transition: "all 0.2s ease"
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#b91c1c";
                    e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#dc2626";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  {/* <X size={18} />
                  Close */}
                </button>
              </div>

              {loading ? (
                <div style={{ textAlign: "center", padding: "60px" }}>
                  <div style={{
                    display: "inline-block",
                    width: "40px",
                    height: "40px",
                    border: "3px solid #f3f3f3",
                    borderTop: "3px solid #d97706",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                  }}></div>
                  <p style={{ marginTop: "20px", color: "#6b7280", fontSize: "16px" }}>Loading products...</p>
                </div>
              ) : subcategoryProducts.length > 0 ? (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: "25px",
                  paddingBottom: "30px"
                }}>
                  {subcategoryProducts.map((product) => (
                    <div key={product._id} style={{
                      backgroundColor: "#fff",
                      borderRadius: "12px",
                      padding: "16px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden"
                    }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = "translateY(-6px)";
                        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                      }}
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      <div style={{
                        position: "absolute",
                        top: "12px",
                        right: "12px",
                        zIndex: 2
                      }}>
                        <FavoriteButton productId={product._id} size={20} />
                      </div>
                      
                      <div style={{
                        width: "100%",
                        height: "220px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        marginBottom: "14px",
                        position: "relative"
                      }}>
                        <img
                          src={getProductImage(product)}
                          alt={product.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.3s ease"
                          }}
                          onMouseOver={(e) => {
                            e.target.style.transform = "scale(1.05)";
                          }}
                          onMouseOut={(e) => {
                            e.target.style.transform = "scale(1)";
                          }}
                          onError={(e) => {
                            e.target.src = "/placeholder-image.jpg"
                          }}
                        />
                      </div>
                      
                      <h3 style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        margin: "0 0 8px 0",
                        color: "#1f2937",
                        lineHeight: "1.4",
                        height: "44px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: "2",
                        WebkitBoxOrient: "vertical"
                      }}>
                        {product.name}
                      </h3>
                      
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}>
                        <p style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          color: "#dc2626",
                          margin: "0"
                        }}>
                          ₹{product.price}
                        </p>
                        
                        {product.originalPrice && product.originalPrice > product.price && (
                          <p style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#6b7280",
                            margin: "0",
                            textDecoration: "line-through"
                          }}>
                            ₹{product.originalPrice}
                          </p>
                        )}
                      </div>
                      
                      {product.originalPrice && (
                        <div style={{
                          marginTop: "6px",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "#dc2626"
                        }}>
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: "center", padding: "60px" }}>
                  <div style={{
                    fontSize: "60px",
                    color: "#e5e7eb",
                    marginBottom: "20px"
                  }}>😔</div>
                  <p style={{ color: "#6b7280", fontSize: "18px", marginBottom: "30px" }}>
                    No products found in "{selectedSubcategory}" category.
                  </p>
                  <button 
                    onClick={() => {
                      setSelectedSubcategory("");
                      setShowOnlyProducts(false);
                    }}
                    style={{
                      padding: "12px 24px",
                      backgroundColor: "#d97706",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "500",
                      fontSize: "16px",
                      transition: "all 0.2s ease"
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = "#b45309";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "#d97706";
                    }}
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Footer inside the product container */}
            <div style={{
              backgroundColor: "#1f2937",
              color: "white",
              padding: "40px 20px",
              marginTop: "auto"
            }}>
              <div style={{
                maxWidth: "1200px",
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "40px"
              }}>
                {/* Company Info */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                    <img
                      src={logo}
                      alt="SilkSew"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        marginRight: "12px"
                      }}
                    />
                    <h3 style={{ fontSize: "20px", fontWeight: "700", margin: 0 }}>SilkSew</h3>
                  </div>
                  <p style={{ color: "#d1d5db", lineHeight: "1.6", marginBottom: "20px" }}>
                    Premium women's fashion brand offering the latest trends in ethnic, western, and fusion wear.
                  </p>
                  <div style={{ display: "flex", gap: "16px" }}>
                    <a href="#" style={{ color: "#d1d5db", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "white"} onMouseOut={(e) => e.target.style.color = "#d1d5db"}>
                      <Facebook size={20} />
                    </a>
                    <a href="#" style={{ color: "#d1d5db", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "white"} onMouseOut={(e) => e.target.style.color = "#d1d5db"}>
                      <Twitter size={20} />
                    </a>
                    <a href="#" style={{ color: "#d1d5db", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "white"} onMouseOut={(e) => e.target.style.color = "#d1d5db"}>
                      <Instagram size={20} />
                    </a>
                    <a href="#" style={{ color: "#d1d5db", transition: "color 0.2s" }} onMouseOver={(e) => e.target.style.color = "white"} onMouseOut={(e) => e.target.style.color = "#d1d5db"}>
                      <Youtube size={20} />
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>Quick Links</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {["About Us", "Contact Us", "Privacy Policy", "Terms & Conditions", "Return Policy", "Shipping Info"].map((item) => (
                      <li key={item} style={{ marginBottom: "12px" }}>
                        <a href="#" style={{ 
                          color: "#d1d5db", 
                          textDecoration: "none",
                          transition: "color 0.2s",
                          display: "block"
                        }} onMouseOver={(e) => e.target.style.color = "white"} onMouseOut={(e) => e.target.style.color = "#d1d5db"}>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Categories */}
                <div>
                  <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>Categories</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {["Ethnic Wear", "Western Wear", "Formal Wear", "Casual Wear", "Party Wear", "New Arrivals"].map((item) => (
                      <li key={item} style={{ marginBottom: "12px" }}>
                        <a href="#" style={{ 
                          color: "#d1d5db", 
                          textDecoration: "none",
                          transition: "color 0.2s",
                          display: "block",
                          cursor: "pointer"
                        }} 
                        onMouseOver={(e) => e.target.style.color = "white"} 
                        onMouseOut={(e) => e.target.style.color = "#d1d5db"}
                        onClick={(e) => {
                          e.preventDefault();
                          fetchProductsBySubcategory(item);
                        }}>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "20px" }}>Contact Info</h4>
                  <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
                    <MapPin size={18} style={{ marginRight: "12px", flexShrink: 0 }} />
                    <span style={{ color: "#d1d5db" }}>123 Fashion Street, Mumbai, India</span>
                  </div>
                  <div style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
                    <Phone size={18} style={{ marginRight: "12px", flexShrink: 0 }} />
                    <span style={{ color: "#d1d5db" }}>+91 98765 43210</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Mail size={18} style={{ marginRight: "12px", flexShrink: 0 }} />
                    <span style={{ color: "#d1d5db" }}>info@silksew.com</span>
                  </div>
                </div>
              </div>

              {/* Copyright */}
              <div style={{ 
                borderTop: "1px solid #374151", 
                marginTop: "40px", 
                paddingTop: "20px", 
                textAlign: "center",
                color: "#9ca3af"
              }}>
                <p style={{ margin: 0 }}>© {new Date().getFullYear()} SilkSew. All rights reserved.</p>
              </div>
            </div>
          </div>
        )}

      {/* CSS animations */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </div>
  )
}

export default Navbar