// import React, { useState, useEffect } from 'react';
// import './Home.css';

// const Home = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
  
//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   return (
//     <div className="home">
       
          
//       {/* Shop by Category Section */}
//       <section className="shop-by-category">
//         <div className="container">
//           <h2 className="category-title">SHOP BY CATEGORY</h2>
//           <div className="category-layout">
//             {/* Large Dresses Card on Left */}
//             <div className="category-item large">
//               <div className="category-image-wrapper">
//                 <img src="/dresses.jpg" alt="Dresses" className="category-image" />
//                 <div className="category-overlay">
//                   <h3 className="category-name">Dresses</h3>
//                 </div>
//               </div>
//             </div>

//             {/* Right Side Grid - 3x2 */}
//             <div className="category-grid-right">
//               <div className="category-item">
//                 <div className="category-image-wrapper">
//                   <img src="/top.jpg" alt="Tops" className="category-image" />
//                   <div className="category-overlay">
//                     <h3 className="category-name">Tops</h3>
//                   </div>
//                 </div>
//               </div>
//               <div className="category-item">
//                 <div className="category-image-wrapper">
//                   <img src="/saree.jpg" alt="Sarees" className="category-image" />
//                   <div className="category-overlay">
//                     <h3 className="category-name">Sarees</h3>
//                   </div>
//                 </div>
//               </div>
//               <div className="category-item">
//                 <div className="category-image-wrapper">
//                   <img src="/kurti.jpg" alt="Kurtis" className="category-image" />
//                   <div className="category-overlay">
//                     <h3 className="category-name">Kurtis</h3>
//                   </div>
//                 </div>
//               </div>
//               <div className="category-item">
//                 <div className="category-image-wrapper">
//                   <img src="/sleepwear.jpg" alt="Sleepwear" className="category-image" />
//                   <div className="category-overlay">
//                     <h3 className="category-name">Sleepwear</h3>
//                   </div>
//                 </div>
//               </div>
//               <div className="category-item">
//                 <div className="category-image-wrapper">
//                   <img src="/maternity.jpg" alt="Maternity" className="category-image" />
//                   <div className="category-overlay">
//                     <h3 className="category-name">Maternity</h3>
//                   </div>
//                 </div>
//               </div>
//               <div className="category-item">
//                 <div className="category-image-wrapper">
//                   <img src="/workwear.jpg" alt="Workwear" className="category-image" />
//                   <div className="category-overlay">
//                     <h3 className="category-name">Workwear</h3>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Promotional Banner Section */}
//       <section className="promotional-banner">
//         <div className="banner-content">
//           <p className="banner-subtitle">NEW STYLES ADDED</p>
//           <h2 className="banner-title">60-80% OFF SALE</h2>
//           <button className="banner-button">SHOP NOW</button>
//         </div>
//       </section>

//       {/* Quote Section */}
//       <section className="quote-section">
//         <div className="quote-container">
//           <div className="quote-image-wrapper">
//             <img src="/qoute.jpg" alt="SilkSew Collection" className="quote-bg-image" />
//             <div className="quote-overlay">
//               <div className="quote-content">
//                 <h2 className="quote-title">SilkSew has arrived</h2>
//                 <p className="quote-subtitle">Presenting the exquisite winter collection</p>
//                 <button className="quote-shop-btn">Shop now</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Home;


// import React from 'react'

// // Categories data (using images directly from public folder)
// const categories = [
//   {
//     name: "Indian & Fusion Wear",
//     description: "Ethnic elegance with contemporary charm",
//     image: "/traditional-indian-wear-elegant-woman-saree-kurta.jpg",
//     itemCount: "200+ Items",
//   },
//   {
//     name: "Western Wear",
//     description: "Modern styles for the contemporary woman",
//     image: "/casual-wear-comfortable-stylish-woman-jeans-top.jpg",
//     itemCount: "150+ Items",
//   },
//   {
//     name: "Formal Wear",
//     description: "Professional sophistication redefined",
//     image: "/formal-wear-business-professional-woman-suit-blaze.jpg",
//     itemCount: "95+ Items",
//   },
//   {
//     name: "Wedding Wear",
//     description: "Bridal elegance for your special day",
//     image: "/wedding-wear-bridal-lehenga-elegant-woman-traditio.jpg",
//     itemCount: "80+ Items",
//   },
//   {
//     name: "Kurtas & Kurties",
//     description: "Versatile pieces for every occasion",
//     image: "/ethnic-wear-festive-traditional-woman-lehenga-anar.jpg",
//     itemCount: "120+ Items",
//   },
//   {
//     name: "Party Wear",
//     description: "Glamorous pieces for special occasions",
//     image: "/party-wear-glamorous-evening-dress-woman-cocktail.jpg",
//     itemCount: "75+ Items",
//   },
// ]

// // Card Component
// const Card = ({ children, className, onClick, style }) => {
//   return (
//     <div 
//       className={className}
//       onClick={onClick}
//       style={{
//         backgroundColor: '#fff',
//         borderRadius: '12px',
//         overflow: 'hidden',
//         ...style
//       }}
//     >
//       {children}
//     </div>
//   )
// }

// // CardContent Component
// const CardContent = ({ children, style }) => {
//   return (
//     <div style={style}>
//       {children}
//     </div>
//   )
// }

// export function CategoryGrid() {
//   const cardStyles = {
//     group: {
//       cursor: 'pointer',
//       overflow: 'hidden',
//       border: 'none',
//       boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
//       transition: 'all 0.3s ease'
//     },
//     imageContainer: {
//       position: 'relative',
//       overflow: 'hidden'
//     },
//     image: {
//       width: '100%',
//       height: '256px',
//       objectFit: 'cover',
//       transition: 'transform 0.5s ease'
//     },
//     imageHover: {
//       transform: 'scale(1.05)'
//     },
//     overlay: {
//       position: 'absolute',
//       inset: '0',
//       background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%, transparent 100%)'
//     },
//     cardContent: {
//       position: 'absolute',
//       bottom: '0',
//       left: '0',
//       right: '0',
//       padding: '24px',
//       color: '#fff'
//     },
//     itemCount: {
//       fontSize: '14px',
//       fontWeight: '500',
//       color: '#fbbf24',
//       marginBottom: '8px'
//     },
//     categoryName: {
//       fontSize: '24px',
//       fontWeight: 'bold',
//       marginBottom: '8px',
//       fontFamily: 'serif'
//     },
//     description: {
//       color: 'rgba(255,255,255,0.9)',
//       fontSize: '14px'
//     }
//   }

//   const sectionStyles = {
//     section: {
//       paddingTop: '80px',
//       paddingBottom: '80px',
//       backgroundColor: 'rgba(243, 244, 246, 0.3)'
//     },
//     container: {
//       maxWidth: '1200px',
//       margin: '0 auto',
//       padding: '0 16px'
//     },
//     textCenter: {
//       textAlign: 'center',
//       marginBottom: '64px'
//     },
//     title: {
//       fontSize: '48px',
//       fontWeight: 'bold',
//       marginBottom: '16px',
//       fontFamily: 'serif',
//       lineHeight: '1.2'
//     },
//     subtitle: {
//       fontSize: '18px',
//       color: '#6b7280',
//       maxWidth: '672px',
//       margin: '0 auto'
//     },
//     grid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(1, 1fr)',
//       gap: '32px'
//     }
//   }

//   const [hoveredIndex, setHoveredIndex] = React.useState(null)

//   const getGridColumns = () => {
//     if (typeof window !== 'undefined') {
//       if (window.innerWidth >= 1024) {
//         return 'repeat(3, 1fr)'
//       } else if (window.innerWidth >= 768) {
//         return 'repeat(2, 1fr)'
//       }
//     }
//     return 'repeat(1, 1fr)'
//   }

//   const [gridColumns, setGridColumns] = React.useState(getGridColumns())

//   React.useEffect(() => {
//     const handleResize = () => {
//       setGridColumns(getGridColumns())
//     }
//     if (typeof window !== 'undefined') {
//       window.addEventListener('resize', handleResize)
//       return () => window.removeEventListener('resize', handleResize)
//     }
//   }, [])

//   return (
//     <section style={sectionStyles.section}>
//       <div style={sectionStyles.container}>
//         <div style={sectionStyles.textCenter}>
//           <h2 style={sectionStyles.title}>
//             Shop Women's Fashion
//           </h2>
//           <p style={sectionStyles.subtitle}>
//             Discover our curated collection of women's clothing, from traditional Indian wear to contemporary Western
//             styles, designed for every woman's unique taste.
//           </p>
//         </div>
        
//         <div style={{
//           ...sectionStyles.grid,
//           gridTemplateColumns: gridColumns
//         }}>
//           {categories.map((category, index) => (
//             <Card
//               key={category.name}
//               className="group"
//               style={{
//                 ...cardStyles.group,
//                 ...(hoveredIndex === index ? { boxShadow: '0 20px 40px rgba(0,0,0,0.15)' } : {})
//               }}
//               onMouseEnter={() => setHoveredIndex(index)}
//               onMouseLeave={() => setHoveredIndex(null)}
//             >
//               <div style={cardStyles.imageContainer}>
//                 <img
//                   src={category.image}
//                   alt={category.name}
//                   style={{
//                     ...cardStyles.image,
//                     ...(hoveredIndex === index ? cardStyles.imageHover : {})
//                   }}
//                   onError={(e) => {
//                     e.target.src = "https://via.placeholder.com/400x256/cccccc/666666?text=" + encodeURIComponent(category.name)
//                   }}
//                 />
//                 <div style={cardStyles.overlay} />
//                 <CardContent style={cardStyles.cardContent}>
//                   <div style={{ marginBottom: '8px' }}>
//                     <span style={cardStyles.itemCount}>{category.itemCount}</span>
//                   </div>
//                   <h3 style={cardStyles.categoryName}>
//                     {category.name}
//                   </h3>
//                   <p style={cardStyles.description}>{category.description}</p>
//                 </CardContent>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default CategoryGrid




import React from 'react'

// Import images from assets folder
import womenBanner2 from './Assets/womenBanner2.jpg'
import Traditional11 from './Assets/Traditional11.jpg'
import Traditional111 from './Assets/Traditional111.jpg'
import Tradi11 from './Assets/Tradi11.jpg'
import Festive1 from './Assets/Festive1.jpg'
import Ethnic111 from './Assets/Ethnic111.jpg'

const categories = [
  {
    name: "Indian & Fusion Wear",
    description: "Ethnic elegance with contemporary charm",
    image: womenBanner2,
    itemCount: "200+ Items",
  },
  {
    name: "Western Wear",
    description: "Modern styles for the contemporary woman",
    image: Traditional11,
    itemCount: "150+ Items",
  },
  {
    name: "Formal Wear",
    description: "Professional sophistication redefined",
    image: Traditional111,
    itemCount: "95+ Items",
  },
  {
    name: "Wedding Wear",
    description: "Bridal elegance for your special day",
    image: Tradi11,
    itemCount: "80+ Items",
  },
  {
    name: "Kurtas & Kurties",
    description: "Versatile pieces for every occasion",
    image: Festive1,
    itemCount: "120+ Items",
  },
  {
    name: "Party Wear",
    description: "Glamorous pieces for special occasions",
    image: Ethnic111,
    itemCount: "75+ Items",
  },
]

// Card Component
const Card = ({ children, className, onClick, style }) => {
  return (
    <div 
      className={className}
      onClick={onClick}
      style={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        ...style
      }}
    >
      {children}
    </div>
  )
}

// CardContent Component
const CardContent = ({ children, style }) => {
  return (
    <div style={style}>
      {children}
    </div>
  )
}

export function CategoryGrid() {
  const cardStyles = {
    group: {
      cursor: 'pointer',
      overflow: 'hidden',
      border: 'none',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      transition: 'all 0.3s ease'
    },
    imageContainer: {
      position: 'relative',
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '256px',
      objectFit: 'cover',
      transition: 'transform 0.5s ease'
    },
    imageHover: {
      transform: 'scale(1.05)'
    },
    overlay: {
      position: 'absolute',
      inset: '0',
      background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%, transparent 100%)'
    },
    cardContent: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      padding: '24px',
      color: '#fff'
    },
    itemCount: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#fbbf24',
      marginBottom: '8px'
    },
    categoryName: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '8px',
      fontFamily: 'serif'
    },
    description: {
      color: 'rgba(255,255,255,0.9)',
      fontSize: '14px'
    }
  }

  const sectionStyles = {
    section: {
      paddingTop: '80px',
      paddingBottom: '80px',
      backgroundColor: 'rgba(243, 244, 246, 0.3)'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 16px'
    },
    textCenter: {
      textAlign: 'center',
      marginBottom: '64px'
    },
    title: {
      fontSize: '48px',
      fontWeight: 'bold',
      marginBottom: '16px',
      fontFamily: 'serif',
      lineHeight: '1.2'
    },
    subtitle: {
      fontSize: '18px',
      color: '#6b7280',
      maxWidth: '672px',
      margin: '0 auto'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(1, 1fr)',
      gap: '32px'
    }
  }

  // State for hover effect
  const [hoveredIndex, setHoveredIndex] = React.useState(null)

  // Dynamic grid columns based on screen size
  const getGridColumns = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) {
        return 'repeat(3, 1fr)'
      } else if (window.innerWidth >= 768) {
        return 'repeat(2, 1fr)'
      }
    }
    return 'repeat(1, 1fr)'
  }

  const [gridColumns, setGridColumns] = React.useState(getGridColumns())

  React.useEffect(() => {
    const handleResize = () => {
      setGridColumns(getGridColumns())
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section style={sectionStyles.section}>
      <div style={sectionStyles.container}>
        <div style={sectionStyles.textCenter}>
          <h2 style={sectionStyles.title}>
            Shop Women's Fashion
          </h2>
          <p style={sectionStyles.subtitle}>
            Discover our curated collection of women's clothing, from traditional Indian wear to contemporary Western
            styles, designed for every woman's unique taste.
          </p>
        </div>
        
        <div style={{
          ...sectionStyles.grid,
          gridTemplateColumns: gridColumns
        }}>
          {categories.map((category, index) => (
            <Card
              key={category.name}
              className="group"
              style={{
                ...cardStyles.group,
                ...(hoveredIndex === index ? { boxShadow: '0 20px 40px rgba(0,0,0,0.15)' } : {})
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div style={cardStyles.imageContainer}>
                <img
                  src={category.image}
                  alt={category.name}
                  style={{
                    ...cardStyles.image,
                    ...(hoveredIndex === index ? cardStyles.imageHover : {})
                  }}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x256/cccccc/666666?text=" + encodeURIComponent(category.name)
                  }}
                />
                <div style={cardStyles.overlay} />
                <CardContent style={cardStyles.cardContent}>
                  <div style={{ marginBottom: '8px' }}>
                    <span style={cardStyles.itemCount}>{category.itemCount}</span>
                  </div>
                  <h3 style={cardStyles.categoryName}>
                    {category.name}
                  </h3>
                  <p style={cardStyles.description}>{category.description}</p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid