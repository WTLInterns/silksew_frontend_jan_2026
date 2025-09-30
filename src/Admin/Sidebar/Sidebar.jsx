
// import "../Sidebar/Sidebar.css"

// const menuItems = [
//   { title: "Dashboard", icon: "🏠" },
//   { title: "Add Product", icon: "➕" },
//   { title: "List Products", icon: "📋" },
//   { title: "Orders", icon: "🛒" },
//   { title: "Return Request", icon: "↩️" },
//   { title: "Shipped Orders", icon: "🚚" },
//   { title: "Confirmed Order", icon: "✅" },
//   { title: "Complaints", icon: "💬" },
// ]

// const Sidebar = ({ isOpen, onToggle, onSelectOption }) => {
//   return (
//     <div className={`sidebar ${isOpen ? "open" : ""}`}>
//       <div className="sidebar-header">
//         <h2>🛍️ SILKSEW</h2>
//         <button className="close-btn" onClick={onToggle}>
//           ×
//         </button>
//       </div>

//       {/* scrollable menu */}
//       <nav className="menu">
//         {menuItems.map((item) => (
//           <button
//             key={item.title}
//             className="nav-item"
//             onClick={() => onSelectOption(item.title)}
//           >
//             <span className="icon">{item.icon}</span>
//             {item.title}
//           </button>
//         ))}
//       </nav>

//       {/* fixed logout button (outside nav) */}
//       <div className="logout-container">
//         <button className="logout-btn">
//           <span className="icon">🚪</span>
//           Logout
//         </button>
//       </div>
//     </div>
//   )
// }

// export default Sidebar



import { useState, useEffect } from "react";

const Sidebar = ({ isOpen, onToggle, onSelectOption }) => {
  const [isMobile, setIsMobile] = useState(false);

  const menuItems = [
    { title: "Dashboard", icon: "🏠" },
    { title: "Add Product", icon: "➕" },
    { title: "List Products", icon: "📋" },
    { title: "Orders", icon: "🛒" },
    { title: "Return Request", icon: "↩️" },
    { title: "Shipped Orders", icon: "🚚" },
    { title: "Confirmed Order", icon: "✅" },
    { title: "Complaints", icon: "💬" },
    { title: "Subscriptions", icon: "🏅" },  // ✅ Added Subscription tab


  ];

  // Check if mobile view
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const styles = {
    // Main container to handle layout
    mainContainer: {
      position: "relative",
    },

    // Mobile header with menu icon and logo
    mobileHeader: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      height: "60px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      display: isMobile ? "flex" : "none",
      alignItems: "center",
      padding: "0 15px",
      zIndex: 1100,
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },

    menuIcon: {
      background: "none",
      border: "none",
      color: "white",
      fontSize: "24px",
      cursor: "pointer",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "5px",
      marginRight: "15px",
    },

    mobileLogo: {
      color: "white",
      fontSize: "20px",
      fontWeight: "bold",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },

    // Overlay for mobile
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 998,
      display: isMobile && isOpen ? "block" : "none",
    },

    // Sidebar styles
    sidebar: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      width: isMobile ? "280px" : "250px",
      height: "100vh",
      padding: "20px",
      transition: "transform 0.3s ease-in-out",
      position: "fixed",
      left: 0,
      top: isMobile ? "60px" : "0", // Push down by header height on mobile
      zIndex: 999,
      display: "flex",
      flexDirection: "column",
      transform: isMobile ? 
        (isOpen ? "translateX(0)" : "translateX(-100%)") : 
        "translateX(0)",
    },

    sidebarHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
      display: isMobile ? "none" : "flex", // Hide on mobile since we have mobile header
    },

    closeBtn: {
      background: "none",
      border: "none",
      color: "white",
      fontSize: "28px",
      cursor: "pointer",
      width: "40px",
      height: "40px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "5px",
    },

    nav: {
      flex: 1,
      overflowY: "auto",
      marginBottom: "20px",
    },

    navItem: {
      display: "flex",
      alignItems: "center",
      padding: "12px 15px",
      color: "white",
      textDecoration: "none",
      transition: "all 0.3s ease",
      border: "none",
      background: "none",
      width: "100%",
      textAlign: "left",
      cursor: "pointer",
      marginBottom: "8px",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "500",
    },

    icon: {
      marginRight: "12px",
      fontSize: "20px",
      width: "24px",
      textAlign: "center",
    },

    logoutBtn: {
      padding: "12px 15px",
      background: "rgba(255, 255, 255, 0.15)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "16px",
      fontWeight: "500",
      transition: "all 0.3s ease",
      marginTop: "auto",
    },
  };

  return (
    <div style={styles.mainContainer}>
      {/* Mobile Header with Menu Icon and Logo */}
      {isMobile && (
        <div style={styles.mobileHeader}>
          <button 
            style={styles.menuIcon}
            onClick={onToggle}
            aria-label="Toggle menu"
            onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255,255,255,0.1)"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
          >
            ☰
          </button>
          <div style={styles.mobileLogo}>
            🛍️ SILKSEW
          </div>
        </div>
      )}

      {/* Overlay for mobile */}
      {isMobile && (
        <div 
          style={styles.overlay} 
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div style={styles.sidebar}>
        {/* Desktop Header (hidden on mobile) */}
        <div style={styles.sidebarHeader}>
          <h2 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>
            🛍️ SILKSEW
          </h2>
          {!isMobile && (
            <button 
              style={styles.closeBtn} 
              onClick={onToggle}
              aria-label="Close menu"
              onMouseEnter={(e) => e.target.style.backgroundColor = "rgba(255,255,255,0.1)"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
            >
              ×
            </button>
          )}
        </div>

        {/* Scrollable menu */}
        <nav style={styles.nav}>
          {menuItems.map((item) => (
            <button
              key={item.title}
              style={styles.navItem}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.transform = "translateX(5px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.transform = "translateX(0)";
                }
              }}
              onClick={() => {
                onSelectOption(item.title);
                if (isMobile) onToggle();
              }}
            >
              <span style={styles.icon}>{item.icon}</span>
              {item.title}
            </button>
          ))}
        </nav>

        {/* Logout button */}
        <button 
          style={styles.logoutBtn}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
              e.target.style.transform = "scale(1.02)";
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
              e.target.style.transform = "scale(1)";
            }
          }}
          onClick={() => {
            console.log("Logout clicked");
            if (isMobile) onToggle();
          }}
        >
          <span style={styles.icon}>🚪</span>
          Logout
        </button>
      </div>

      <style jsx>{`
        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .sidebar {
            width: 280px !important;
            max-width: 85vw;
            top: 60px !important;
            height: calc(100vh - 60px) !important;
          }
        }
        
        @media (max-width: 480px) {
          .sidebar {
            width: 100% !important;
            max-width: 100vw;
            padding: 15px;
          }
          
          .mobile-header {
            height: 50px !important;
            padding: 0 10px !important;
          }
          
          .menu-icon {
            width: 35px !important;
            height: 35px !important;
            font-size: 20px !important;
            margin-right: 10px !important;
          }
          
          .mobile-logo {
            font-size: 18px !important;
          }
        }
        
        /* Scrollbar styling */
        nav::-webkit-scrollbar {
          width: 4px;
        }
        
        nav::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        
        nav::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;