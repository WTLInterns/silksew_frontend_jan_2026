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
//       <nav>
//         {menuItems.map((item) => (
//           <button key={item.title} className="nav-item" onClick={() => onSelectOption(item.title)}>
//             <span className="icon">{item.icon}</span>
//             {item.title}
//           </button>
//         ))}
//       </nav>
//       <button className="logout-btn">
//         <span className="icon">🚪</span>
//         Logout
//       </button>
//     </div>
//   )
// }

// export default Sidebar



import "../Sidebar/Sidebar.css"

const menuItems = [
  { title: "Dashboard", icon: "🏠" },
  { title: "Add Product", icon: "➕" },
  { title: "List Products", icon: "📋" },
  { title: "Orders", icon: "🛒" },
  { title: "Return Request", icon: "↩️" },
  { title: "Shipped Orders", icon: "🚚" },
  { title: "Confirmed Order", icon: "✅" },
  { title: "Complaints", icon: "💬" },
]

const Sidebar = ({ isOpen, onToggle, onSelectOption }) => {
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>🛍️ SILKSEW</h2>
        <button className="close-btn" onClick={onToggle}>
          ×
        </button>
      </div>

      {/* scrollable menu */}
      <nav className="menu">
        {menuItems.map((item) => (
          <button
            key={item.title}
            className="nav-item"
            onClick={() => onSelectOption(item.title)}
          >
            <span className="icon">{item.icon}</span>
            {item.title}
          </button>
        ))}
      </nav>

      {/* fixed logout button (outside nav) */}
      <div className="logout-container">
        <button className="logout-btn">
          <span className="icon">🚪</span>
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar
