// import { useState, useEffect, useContext, useCallback } from "react"
// import axios from "axios"
// import { AuthContext } from "../context/AuthContext"
// import { ToastContainer, toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import "../pages/CSS/AdminProductlist.css"
// import { Form, Input, Select, InputNumber, Button, Upload, Modal, Image } from "antd"
// import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons"

// const { TextArea } = Input
// const { Option } = Select

// function AdminProductlist({ updateTotalProducts, updateLowStockProducts }) {
//   const { token } = useContext(AuthContext)
//   const [products, setProducts] = useState([])
//   const [currentPage, setCurrentPage] = useState(1)
//   const [productsPerPage] = useState(3)
//   const [editingProduct, setEditingProduct] = useState(null)
//   const [isAdding, setIsAdding] = useState(false)
//   const [form] = Form.useForm()
//   const [selectedCategory, setSelectedCategory] = useState(null)
//   const [colorImages, setColorImages] = useState({})
//   const [sizeData, setSizeData] = useState({})
//   const [previewVisible, setPreviewVisible] = useState(false)
//   const [previewImage, setPreviewImage] = useState("")
//   const [previewTitle, setPreviewTitle] = useState("")
//   const [showWarningModal, setShowWarningModal] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [previousSizes, setPreviousSizes] = useState([])

//   const categories = ["men", "women", "kid"]

//   const subcategories = {
//     men: [
//       "Traditional Wear",
//       "Casual Wear",
//       "Formal Wear",
//       "Ethnic Wear",
//       "Street Style",
//       "Smart Casuals",
//       "Athleisure",
//       "Summer Wear",
//       "Winter Wear",
//       "Party Wear",
//       "Wedding Wear",
//       "Indo-Western",
//       "Loungewear",
//       "Vacation Wear",
//       "Festive Wear",
//     ],
//     women: [
//       "Saree",
//       "Lehenga",
//       "Salwar Kameez",
//       "Anarkali Dress",
//       "Kurti",
//       "Churidar",
//       "Palazzo Pants",
//       "Indo-Western",
//       "Tunic",
//       "Maxi Dress",
//       "Dress (Western)",
//       "Skirt and Top",
//       "Peplum Top",
//       "Straight Cut Kurti",
//       "Ethnic Gown",
//       "Kaftan",
//       "Jumpsuit (Western)",
//       "Trousers and Blouse",
//       "Palazzo and Kurti",
//       "Sharara Suit",
//       "Dhoti Pants and Kurti",
//     ],
//     kid: [
//       "Traditional Wear",
//       "Western Wear",
//       "Casual Wear",
//       "Party Wear",
//       "Ethnic Wear",
//       "Festive Wear",
//       "Sportswear",
//       "Loungewear",
//       "Smart Casuals",
//       "T-shirts and Jeans",
//       "Shorts and Tops",
//       "Dresses and Skirts",
//       "Kurta and Pajama",
//       "Lehenga Choli",
//       "Sherwani",
//       "Rompers and Jumpsuits",
//     ],
//   }

//   const colorOptions = [
//     { name: "AliceBlue" },
//     { name: "AntiqueWhite" },
//     { name: "Aqua" },
//     { name: "Aquamarine" },
//     { name: "Azure" },
//     { name: "Beige" },
//     { name: "Bisque" },
//     { name: "Black" },
//     { name: "BlanchedAlmond" },
//     { name: "Blue" },
//     { name: "BlueViolet" },
//     { name: "Brown" },
//     { name: "Burlywood" },
//     { name: "CadetBlue" },
//     { name: "Chartreuse" },
//     { name: "Chocolate" },
//     { name: "Coral" },
//     { name: "CornflowerBlue" },
//     { name: "Cornsilk" },
//     { name: "Crimson" },
//     { name: "Cyan" },
//     { name: "DarkBlue" },
//     { name: "DarkCyan" },
//     { name: "DarkGoldenrod" },
//     { name: "DarkGray" },
//     { name: "DarkGreen" },
//     { name: "DarkKhaki" },
//     { name: "DarkMagenta" },
//     { name: "DarkOliveGreen" },
//     { name: "DarkOrange" },
//     { name: "DarkOrchid" },
//     { name: "DarkRed" },
//     { name: "DarkSalmon" },
//     { name: "DarkSeagreen" },
//     { name: "DarkSlateBlue" },
//     { name: "DarkSlateGray" },
//     { name: "DarkTurquoise" },
//     { name: "DarkViolet" },
//     { name: "DeepPink" },
//     { name: "DeepSkyBlue" },
//     { name: "DimGray" },
//     { name: "DodgerBlue" },
//     { name: "Firebrick" },
//     { name: "FloralWhite" },
//     { name: "ForestGreen" },
//     { name: "Fuchsia" },
//     { name: "Gainsboro" },
//     { name: "GhostWhite" },
//     { name: "Gold" },
//     { name: "Goldenrod" },
//     { name: "Gray" },
//     { name: "Green" },
//     { name: "GreenYellow" },
//     { name: "Honeydew" },
//     { name: "HotPink" },
//     { name: "IndianRed" },
//     { name: "Indigo" },
//     { name: "Ivory" },
//     { name: "Khaki" },
//     { name: "Lavender" },
//     { name: "LavenderBlush" },
//     { name: "LawnGreen" },
//     { name: "LemonChiffon" },
//     { name: "LightBlue" },
//     { name: "LightCoral" },
//     { name: "LightCyan" },
//     { name: "LightGoldenrodYellow" },
//     { name: "LightGreen" },
//     { name: "LightGrey" },
//     { name: "LightPink" },
//     { name: "LightSalmon" },
//     { name: "LightSeaGreen" },
//     { name: "LightSkyBlue" },
//     { name: "LightSlateGray" },
//     { name: "LightSteelBlue" },
//     { name: "LightYellow" },
//     { name: "Lime" },
//     { name: "LimeGreen" },
//     { name: "Linen" },
//     { name: "Magenta" },
//     { name: "Maroon" },
//     { name: "MediumAquamarine" },
//     { name: "MediumBlue" },
//     { name: "MediumOrchid" },
//     { name: "MediumPurple" },
//     { name: "MediumSeaGreen" },
//     { name: "MediumSlateBlue" },
//     { name: "MediumSpringGreen" },
//     { name: "MediumTurquoise" },
//     { name: "MediumVioletRed" },
//     { name: "MidnightBlue" },
//     { name: "MintCream" },
//     { name: "MistyRose" },
//     { name: "Moccasin" },
//     { name: "NavajoWhite" },
//     { name: "Navy" },
//     { name: "OldLace" },
//     { name: "OliveDrab" },
//     { name: "Orange" },
//     { name: "OrangeRed" },
//     { name: "Orchid" },
//     { name: "PaleGoldenrod" },
//     { name: "PaleGreen" },
//     { name: "PaleTurquoise" },
//     { name: "PaleVioletRed" },
//     { name: "PapayaWhip" },
//     { name: "PeachPuff" },
//     { name: "Peru" },
//     { name: "Pink" },
//     { name: "Plum" },
//     { name: "PowderBlue" },
//     { name: "Purple" },
//     { name: "Red" },
//     { name: "RosyBrown" },
//     { name: "RoyalBlue" },
//     { name: "SaddleBrown" },
//     { name: "Salmon" },
//     { name: "SandyBrown" },
//     { name: "SeaGreen" },
//     { name: "SeaShell" },
//     { name: "Sienna" },
//     { name: "Silver" },
//     { name: "SkyBlue" },
//     { name: "SlateBlue" },
//     { name: "Snow" },
//     { name: "SpringGreen" },
//     { name: "SteelBlue" },
//     { name: "Tan" },
//     { name: "Thistle" },
//     { name: "Teal" },
//     { name: "Tomato" },
//     { name: "Turquoise" },
//     { name: "Violet" },
//     { name: "Wheat" },
//     { name: "White" },
//     { name: "Whitesmoke" },
//     { name: "Yellow" },
//     { name: "YellowGreen" },
//   ]

//   const fetchProducts = useCallback(async () => {
//     try {
//       const response = await axios.get("https://api.silksew.com/api/products", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       const data = Array.isArray(response.data) ? response.data : response.data.products || []
//       setProducts(data)
//       if (typeof updateTotalProducts === "function") {
//         updateTotalProducts(data.length)
//       }
//       // Filter products with stock <= 5 and pass to parent
//       const lowStockProducts = data.filter(product => product.availableStock <= 5)
//       if (typeof updateLowStockProducts === "function") {
//         updateLowStockProducts(lowStockProducts)
//       }
//       console.log("data", data)
//     } catch (error) {
//       console.error("Error fetching products:", error)
//       toast.error("Failed to fetch products.")
//     }
//   }, [token, updateTotalProducts, updateLowStockProducts])

//   useEffect(() => {
//     fetchProducts()
//   }, [fetchProducts])

//   const handleDeleteProduct = async (id) => {
//     try {
//       const response = await axios.delete(`https://api.silksew.com/api/products/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })

//       if (response) {
//         toast.success("Product deleted successfully!")
//         fetchProducts()
//       }
//     } catch (error) {
//       console.error("Error deleting product:", error)
//       toast.error("Failed to delete product.")
//     }
//   }

//   const getImage = (images, availableColors) => {
//     if (images && images.length > 0 && availableColors && availableColors.length > 0) {
//       try {
//         const parsedImages = JSON.parse(images[0])
//         for (const color of availableColors) {
//           if (parsedImages[color.name] && parsedImages[color.name].length > 0) {
//             return parsedImages[color.name][0]
//           }
//         }
//         const firstAvailableColor = Object.keys(parsedImages)[0]
//         if (parsedImages[firstAvailableColor] && parsedImages[firstAvailableColor].length > 0) {
//           return parsedImages[firstAvailableColor][0]
//         }
//       } catch (error) {
//         console.error("Error parsing image JSON:", error)
//       }
//     }
//     return "https://via.placeholder.com/150"
//   }

//   const handleEditProduct = (product) => {
//     setEditingProduct(product)
//     setIsAdding(false)
//     setSelectedCategory(product.category[0])

//     // Parse sizes properly
//     let sizes = []
//     if (Array.isArray(product.availableSizes)) {
//       sizes = product.availableSizes
//     } else if (typeof product.availableSizes === "string") {
//       try {
//         sizes = JSON.parse(product.availableSizes)
//       } catch {
//         sizes = product.availableSizes.split(",").map((size) => size.trim())
//       }
//     }
//     setPreviousSizes([])

//     let colors = []
//     if (Array.isArray(product.availableColors)) {
//       colors = product.availableColors.flatMap((color) => {
//         if (typeof color === "string") {
//           try {
//             return JSON.parse(color).map((c) => c.name)
//           } catch {
//             return color
//           }
//         } else if (color.name) {
//           return color.name
//         }
//         return []
//       })
//     } else if (typeof product.availableColors === "string") {
//       try {
//         const parsedColors = JSON.parse(product.availableColors)
//         colors = parsedColors.flatMap((color) => {
//           if (typeof color === "string") {
//             return color
//           } else if (color.name) {
//             return color.name
//           }
//           return []
//         })
//       } catch {
//         colors = [product.availableColors]
//       }
//     }

//     form.setFieldsValue({
//       ...product,
//       category: product.category[0],
//       subcategory: product.subcategory[0],
//       colors: colors,
//       stock: product.availableStock,
//     })
//     form.setFieldValue("sizes", undefined)

//     const initialColorImages = {}
//     if (product.images && product.images.length > 0) {
//       try {
//         const parsedImages = JSON.parse(product.images[0])
//         Object.entries(parsedImages).forEach(([color, urls]) => {
//           initialColorImages[color] = urls.map((url, index) => ({
//             uid: `-${index}`,
//             name: `${color}-image-${index}`,
//             status: "done",
//             url: url,
//           }))
//         })
//       } catch (error) {
//         console.error("Error parsing product images:", error)
//       }
//     }
//     setColorImages(initialColorImages)
//   }

//   const handleAddProduct = () => {
//     setEditingProduct(null)
//     setIsAdding(true)
//     setSelectedCategory(null)
//     form.resetFields()
//     setColorImages({})
//     setSizeData({})
//   }

//   const handleCategoryChange = (value) => {
//     setSelectedCategory(value)
//     form.setFieldsValue({
//       subcategory: undefined,
//       sizes: undefined,
//     })
//   }

//   const handleColorChange = (selectedColors) => {
//     const newColorImages = { ...colorImages }
//     selectedColors.forEach((color) => {
//       if (!newColorImages[color]) {
//         newColorImages[color] = []
//       }
//     })
//     Object.keys(newColorImages).forEach((color) => {
//       if (!selectedColors.includes(color)) {
//         delete newColorImages[color]
//       }
//     })
//     setColorImages(newColorImages)
//   }

//   const handleSizeChange = (selectedSizes) => {
//     const newSizeData = { ...sizeData }
//     selectedSizes.forEach((size) => {
//       if (!newSizeData[size]) {
//         newSizeData[size] = { stock: 0 }
//       }
//     })
//     Object.keys(newSizeData).forEach((size) => {
//       if (!selectedSizes.includes(size)) {
//         delete newSizeData[size]
//       }
//     })
//     setSizeData(newSizeData)
//     setPreviousSizes(selectedSizes)
//     form.setFieldsValue({ sizes: selectedSizes })
//   }

//   const handleImageChange = (color, { fileList }) => {
//     setColorImages((prev) => ({
//       ...prev,
//       [color]: fileList,
//     }))
//   }

//   const handlePreview = async (file) => {
//     if (!file.url && !file.preview) {
//       file.preview = await getBase64(file.originFileObj)
//     }

//     setPreviewImage(file.url || file.preview)
//     setPreviewVisible(true)
//     setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1))
//   }

//   const getBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader()
//       reader.readAsDataURL(file)
//       reader.onload = () => resolve(reader.result)
//       reader.onerror = (error) => reject(error)
//     })
//   }

//   // const handleSubmitProduct = async (values) => {
//   //   if (!isAdding) {
//   //     const originalSizes = editingProduct.availableSizes || []
//   //     const originalColors = (editingProduct.availableColors || []).map((c) => c.name || c)
//   //     const newSizes = values.sizes || previousSizes
//   //     const newColors = values.colors || []

//   //     const sizesChanged = JSON.stringify(originalSizes) !== JSON.stringify(newSizes)
//   //     const colorsChanged = JSON.stringify(originalColors) !== JSON.stringify(newColors)

//   //     if (!sizesChanged && !colorsChanged) {
//   //       setShowWarningModal(true)
//   //       return
//   //     }
//   //   }

//   //   submitProductData({ ...values, sizes: values.sizes || previousSizes })
//   // }

//    const handleSubmitProduct = async (values) => {
//     if (!isAdding) {
//       const originalSizes = editingProduct.availableSizes || []
//       const originalColors = (editingProduct.availableColors || []).map((c) => c.name || c)
//       const newSizes = values.sizes || previousSizes
//       const newColors = values.colors || []

//       const sizesChanged = JSON.stringify(originalSizes) !== JSON.stringify(newSizes)
//       const colorsChanged = JSON.stringify(originalColors) !== JSON.stringify(newColors)

//       if (!sizesChanged && !colorsChanged) {
//         setShowWarningModal(true)
//         return
//       }
//     }

//     submitProductData({ ...values, sizes: values.sizes || previousSizes })
//   }

//   const handleWarningConfirm = () => {
//     setShowWarningModal(false)
//     const formValues = form.getFieldsValue()
//     submitProductData(formValues)
//   }

//   const submitProductData = async (values) => {
//     try {
//       const productData = new FormData()
//       productData.append("name", values.name)
//       productData.append("description", values.description)
//       productData.append("price", values.price)

//       productData.append("oldPrice", values.oldPrice)
//       productData.append("category", values.category)
//       productData.append("subcategory", values.subcategory)
//       productData.append("availableStock", values.stock)

//       const sizes = values.sizes || previousSizes
//       productData.append("availableSizes", JSON.stringify(sizes))

//       const colors = values.colors || []
//       const formattedColors = colors.map((color) => ({ name: color }))
//       productData.append("availableColors", JSON.stringify(formattedColors))

//       const uploadedImagesByColor = {}
//       for (const color of colors) {
//         if (colorImages[color]) {
//           const uploadedImages = await Promise.all(
//             colorImages[color].map(async (file) => {
//               if (file.url) {
//                 return file.url
//               }
//               const data = new FormData()
//               data.append("file", file.originFileObj)
//               data.append("upload_preset", "Silksew")
//               data.append("cloud_name", "dvpk4sbzi")

//               const res = await fetch("https://api.cloudinary.com/v1_1/dvpk4sbzi/image/upload", {
//                 method: "POST",
//                 body: data,
//               })

//               if (!res.ok) {
//                 throw new Error("Image upload failed")
//               }

//               const uploadedImage = await res.json()
//               return uploadedImage.secure_url
//             }),
//           )
//           uploadedImagesByColor[color] = uploadedImages
//         }
//       }

//       productData.append("images", JSON.stringify(uploadedImagesByColor))

//       let response
//       if (isAdding) {
//         response = await axios.post("https://api.silksew.com/api/products", productData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         })
//       } else {
//         response = await axios.put(`https://api.silksew.com/api/products/${editingProduct._id}`, productData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         })
//       }

//       if (response.data) {
//         toast.success(isAdding ? "Product added successfully!" : "Product updated successfully!")
//         setEditingProduct(null)
//         setIsAdding(false)
//         setColorImages({})
//         setSizeData({})
//         fetchProducts()
//       }
//     } catch (error) {
//       console.error("Error submitting product:", error)
//       toast.error(`Failed to ${isAdding ? "add" : "update"} product. ${error.response?.data?.message || ""}`)
//     }
//   }

//   const handleCancelEdit = () => {
//     setEditingProduct(null)
//     setIsAdding(false)
//     setColorImages({})
//     setSizeData({})
//     form.resetFields()
//   }

//   const getFilteredProducts = useCallback(() => {
//     return products.filter((product) => {
//       const searchRegex = new RegExp(searchTerm, "i")
//       return (
//         searchRegex.test(product.name) ||
//         searchRegex.test(product.category.join(", ")) ||
//         searchRegex.test(product.subcategory.join(", ")) ||
//         searchRegex.test(product.availableColors.map((c) => c.name || c).join(", ")) ||
//         searchRegex.test(product.availableSizes.join(", ")) ||
//         searchRegex.test(product.price.toString()) ||
//         searchRegex.test(product.oldPrice ? product.oldPrice.toString() : "") ||
//         searchRegex.test(product.availableStock.toString())
//       )
//     })
//   }, [products, searchTerm])

//   const filteredProducts = getFilteredProducts()
//   const indexOfLastProduct = currentPage * productsPerPage
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage
//   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage)

//   const paginate = (pageNumber) => setCurrentPage(pageNumber)

//   const renderSearchSection = () => (
//     <div className="search-section">
//       <Input
//         placeholder="Search products..."
//         prefix={<SearchOutlined />}
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         allowClear
//       />
//     </div>
//   )

//   const renderProductTable = () => (
//     <>
//       <h2>Admin Product List</h2>
//       {renderSearchSection()}
//       <table className="product-table">
//         <thead>
//           <tr>
//             <th>Sr. No</th>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Category</th>
//             <th>Sub Category</th>
//             <th>Colors</th>
//             <th>Sizes</th>
//             <th>Price</th>
//             <th>Old Price</th>
//             <th>Stock</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentProducts.map((product, index) => {
//             // Process colors
//             let displayColors = [];
//             if (typeof product.availableColors === "string") {
//               try {
//                 const parsedColors = JSON.parse(product.availableColors);
//                 displayColors = parsedColors.map((color) =>
//                   typeof color === "string" ? color : color.name
//                 );
//               } catch {
//                 displayColors = [product.availableColors];
//               }
//             } else if (Array.isArray(product.availableColors)) {
//               displayColors = product.availableColors.map((color) =>
//                 typeof color === "string" ? color : color.name
//               );
//             }

//             // Process sizes
//             let displaySizes = [];
//             if (typeof product.availableSizes === "string") {
//               try {
//                 displaySizes = JSON.parse(product.availableSizes);
//               } catch {
//                 displaySizes = product.availableSizes.split(",").map((size) => size.trim());
//               }
//             } else if (Array.isArray(product.availableSizes)) {
//               displaySizes = product.availableSizes;
//             }

//             return (
//               <tr key={product._id}>
//                 <td data-label="Sr. No">{(currentPage - 1) * 3 + index + 1}</td>
//                 <td data-label="Image">
//                   <Image
//                     src={getImage(product.images, product.availableColors) || "/placeholder.svg"}
//                     alt={product.name}
//                     width={50}
//                     height={50}
//                   />
//                 </td>
//                 <td data-label="Name">{product.name}</td>
//                 <td data-label="Category">{product.category.join(", ")}</td>
//                 <td data-label="Sub Category">{product.subcategory.join(", ")}</td>
//                 <td data-label="Colors">{displayColors.join(", ") || "N/A"}</td>
//                 <td data-label="Sizes">{displaySizes.join(", ") || "N/A"}</td>
//                 <td data-label="Price">Rs.{product.price}</td>
//                 <td data-label="Old Price">{product.oldPrice ? `Rs.${product.oldPrice}` : "N/A"}</td>
//                 <td data-label="Stock">{product.availableStock}</td>
//                 <td data-label="Actions">
//                   <Button
//                     type="primary"
//                     icon={<EditOutlined />}
//                     onClick={() => handleEditProduct(product)}
//                     className="edit-btn"
//                   />
//                   <Button
//                     type="primary"
//                     danger
//                     icon={<DeleteOutlined />}
//                     onClick={() => handleDeleteProduct(product._id)}
//                     className="delete-btn"
//                   />
//                 </td>
//               </tr>
//             )
//           })}
//         </tbody>
//       </table>
//     </>
//   )

//   return (
//     <div className="product-list" style={{ padding: "24px 32px" }}>
//       {editingProduct || isAdding ? (
//         <div className="product-form" style={{ maxHeight: "80vh", overflowY: "auto" }}>
//           <h2>{isAdding ? "Add New Product" : "Edit Product"}</h2>
//           <Form form={form} layout="vertical" onFinish={handleSubmitProduct}>
//             <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
//               <Input placeholder="Enter product name" />
//             </Form.Item>

//             <Form.Item name="category" label="Category" rules={[{ required: true }]}>
//               <Select placeholder="Select category" onChange={handleCategoryChange}>
//                 {categories.map((cat) => (
//                   <Option key={cat} value={cat}>
//                     {cat}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             {selectedCategory && (
//               <Form.Item name="subcategory" label="Subcategory" rules={[{ required: true }]}>
//                 <Select placeholder="Select subcategory">
//                   {subcategories[selectedCategory].map((sub) => (
//                     <Option key={sub} value={sub}>
//                       {sub}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             )}

//             <Form.Item name="description" label="Description" rules={[{ required: true }]}>
//               <TextArea rows={4} placeholder="Enter product description" />
//             </Form.Item>

//             <Form.Item name="price" label="Price" rules={[{ required: true }]}>
//               <InputNumber style={{ width: "100%" }} min={0} placeholder="Enter price" />
//             </Form.Item>

//             <Form.Item name="oldPrice" label="Old Price">
//               <InputNumber style={{ width: "100%" }} min={0} placeholder="Enter old price" />
//             </Form.Item>

//             <Form.Item name="stock" label="Available Stock" rules={[{ required: true }]}>
//               <InputNumber style={{ width: "100%" }} min={0} placeholder="Enter available stock" />
//             </Form.Item>

//             <Form.Item
//               name="sizes"
//               label="Available Sizes"
//               rules={[{ required: true, message: "Please select at least one size" }]}
//             >
//               <Select
//                 mode="multiple"
//                 placeholder="Select available sizes"
//                 style={{ width: "100%" }}
//                 onChange={handleSizeChange}
//                 value={previousSizes}
//               >
//                 {["XS", "S", "M", "L", "XL", "XXL", "2T", "3T", "4T", "5", "6", "7", "8"].map((size) => (
//                   <Option key={size} value={size}>
//                     {size}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item name="colors" label="Colors" rules={[{ required: true }]}>
//               <Select mode="multiple" placeholder="Select colors" onChange={handleColorChange}>
//                 {colorOptions.map(({ name }) => (
//                   <Option key={name} value={name}>
//                     {name}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             {form.getFieldValue("colors")?.map((color) => (
//               <Form.Item key={color} label={`Images for ${color}`}>
//                 <Upload
//                   listType="picture-card"
//                   fileList={colorImages[color] || []}
//                   onPreview={handlePreview}
//                   onChange={(info) => handleImageChange(color, info)}
//                   beforeUpload={() => false}
//                   multiple={true}
//                 >
//                   {(colorImages[color]?.length || 0) < 5 && (
//                     <div>
//                       <PlusOutlined />
//                       <div style={{ marginTop: 8 }}>Upload</div>
//                     </div>
//                   )}
//                 </Upload>
//               </Form.Item>
//             ))}

//             <Form.Item>
//               <Button type="primary" htmlType="submit">
//                 {isAdding ? "Add Product" : "Update Product"}
//               </Button>
//               <Button onClick={handleCancelEdit} style={{ marginLeft: 8 }}>
//                 Cancel
//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       ) : (
//         <div>
//           {renderProductTable()}
//           <div className="pagination">
//             <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
//               Prev
//             </Button>
//             {totalPages <= 5 ? (
//               [...Array(totalPages)].map((_, index) => (
//                 <Button
//                   key={index}
//                   onClick={() => paginate(index + 1)}
//                   type={currentPage === index + 1 ? "primary" : "default"}
//                 >
//                   {index + 1}
//                 </Button>
//               ))
//             ) : (
//               <>
//                 {currentPage > 2 && (
//                   <>
//                     <Button onClick={() => paginate(1)}>1</Button>
//                     {currentPage > 3 && <span>...</span>}
//                   </>
//                 )}
//                 {[...Array(5)].map((_, index) => {
//                   const pageNumber = Math.min(Math.max(currentPage - 2 + index, 1), totalPages)
//                   return (
//                     <Button
//                       key={pageNumber}
//                       onClick={() => paginate(pageNumber)}
//                       type={currentPage === pageNumber ? "primary" : "default"}
//                     >
//                       {pageNumber}
//                     </Button>
//                   )
//                 })}
//                 {currentPage < totalPages - 1 && (
//                   <>
//                     {currentPage < totalPages - 2 && <span>...</span>}
//                     <Button onClick={() => paginate(totalPages)}>{totalPages}</Button>
//                   </>
//                 )}
//               </>
//             )}
//             <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
//               Next
//             </Button>
//           </div>
//         </div>
//       )}

//       <Modal
//         visible={showWarningModal}
//         title="Warning"
//         onOk={handleWarningConfirm}
//         onCancel={() => setShowWarningModal(false)}
//       >
//         <p>You haven't made any changes to the sizes or colors. Are you sure you want to update the product?</p>
//       </Modal>

//       <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={() => setPreviewVisible(false)}>
//         <img alt="example" style={{ width: "100%" }} src={previewImage || "/placeholder.svg"} />
//       </Modal>

//       <ToastContainer />
//     </div>
//   )
// }

// export default AdminProductlist



// "use client"

// import { useState, useEffect, useContext, useCallback, useMemo } from "react"
// import axios from "axios"
// import { AuthContext } from "../context/AuthContext"
// import { ToastContainer, toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import "../pages/CSS/AdminProductlist.css"
// import { Form, Input, Select, InputNumber, Button, Upload, Modal } from "antd"
// import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons"
// import { debounce } from "lodash" // Ensure lodash is installed: `npm install lodash`
// import React from "react"

// const { TextArea } = Input
// const { Option } = Select

// // Custom hook for debouncing
// const useDebounce = (value, delay) => {
//   const [debouncedValue, setDebouncedValue] = useState(value)

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value)
//     }, delay)

//     return () => {
//       clearTimeout(handler)
//     }
//   }, [value, delay])

//   return debouncedValue
// }

// // Memoized ProductImage component to prevent unnecessary re-renders
// const ProductImage = React.memo(({ src, alt, width = 50, height = 50 }) => {
//   const [imgSrc, setImgSrc] = useState(src)
//   const [hasError, setHasError] = useState(false)

//   useEffect(() => {
//     setImgSrc(src)
//     setHasError(false)
//   }, [src])

//   const handleError = useCallback(() => {
//     if (!hasError) {
//       setHasError(true)
//       setImgSrc("https://via.placeholder.com/150x150/cccccc/666666?text=No+Image")
//     }
//   }, [hasError])

//   return (
//     <img
//       src={imgSrc || "/placeholder.svg"}
//       alt={alt}
//       width={width}
//       height={height}
//       style={{
//         objectFit: "cover",
//         border: "1px solid #d9d9d9",
//         borderRadius: "4px",
//         backgroundColor: "#f5f5f5",
//       }}
//       onError={handleError}
//     />
//   )
// })

// function AdminProductlist({ updateTotalProducts, updateLowStockProducts }) {
//   const { token } = useContext(AuthContext)
//   const [products, setProducts] = useState([])
//   const [currentPage, setCurrentPage] = useState(1)
//   const [productsPerPage] = useState(3)
//   const [editingProduct, setEditingProduct] = useState(null)
//   const [isAdding, setIsAdding] = useState(false)
//   const [form] = Form.useForm()
//   const [selectedCategory, setSelectedCategory] = useState(null)
//   const [colorImages, setColorImages] = useState({})
//   const [sizeData, setSizeData] = useState({})
//   const [previewVisible, setPreviewVisible] = useState(false)
//   const [previewImage, setPreviewImage] = useState("")
//   const [previewTitle, setPreviewTitle] = useState("")
//   const [showWarningModal, setShowWarningModal] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [previousSizes, setPreviousSizes] = useState([])

//   const debouncedSearchTerm = useDebounce(searchTerm, 300)

//   const categories = ["men", "women", "kid"]

//   const subcategories = {
//     men: [
//       "Traditional Wear",
//       "Casual Wear",
//       "Formal Wear",
//       "Ethnic Wear",
//       "Street Style",
//       "Smart Casuals",
//       "Athleisure",
//       "Summer Wear",
//       "Winter Wear",
//       "Party Wear",
//       "Wedding Wear",
//       "Indo-Western",
//       "Loungewear",
//       "Vacation Wear",
//       "Festive Wear",
//     ],
//     women: [
//       "Saree",
//       "Lehenga",
//       "Salwar Kameez",
//       "Anarkali Dress",
//       "Kurti",
//       "Churidar",
//       "Palazzo Pants",
//       "Indo-Western",
//       "Tunic",
//       "Maxi Dress",
//       "Dress (Western)",
//       "Skirt and Top",
//       "Peplum Top",
//       "Straight Cut Kurti",
//       "Ethnic Gown",
//       "Kaftan",
//       "Jumpsuit (Western)",
//       "Trousers and Blouse",
//       "Palazzo and Kurti",
//       "Sharara Suit",
//       "Dhoti Pants and Kurti",
//     ],
//     kid: [
//       "Traditional Wear",
//       "Western Wear",
//       "Casual Wear",
//       "Party Wear",
//       "Ethnic Wear",
//       "Festive Wear",
//       "Sportswear",
//       "Loungewear",
//       "Smart Casuals",
//       "T-shirts and Jeans",
//       "Shorts and Tops",
//       "Dresses and Skirts",
//       "Kurta and Pajama",
//       "Lehenga Choli",
//       "Sherwani",
//       "Rompers and Jumpsuits",
//     ],
//   }

//  const colorOptions = [
//     { name: "AliceBlue" },
//     { name: "AntiqueWhite" },
//     { name: "Aqua" },
//     { name: "Aquamarine" },
//     { name: "Azure" },
//     { name: "Beige" },
//     { name: "Bisque" },
//     { name: "BlanchedAlmond" },
//     { name: "Blue" },
//     { name: "BlueViolet" },
//     { name: "Brown" },
//     { name: "Burlywood" },
//     { name: "CadetBlue" },
//     { name: "Chartreuse" },
//     { name: "Chocolate" },
//     { name: "Ángel" },
//     { name: "CornflowerBlue" },
//     { name: "Cornsilk" },
//     { name: "Crimson" },
//     { name: "Cyan" },
//     { name: "DarkBlue" },
//     { name: "DarkCyan" },
//     { name: "DarkGoldenrod" },
//     { name: "DarkGray" },
//     { name: "DarkGreen" },
//     { name: "DarkKhaki" },
//     { name: "DarkMagenta" },
//     { name: "DarkOliveGreen" },
//     { name: "DarkOrange" },
//     { name: "DarkOrchid" },
//     { name: "DarkRed" },
//     { name: "DarkSalmon" },
//     { name: "DarkSeagreen" },
//     { name: "DarkSlateBlue" },
//     { name: "DarkSlateGray" },
//     { name: "DarkTurquoise" },
//     { name: "DarkViolet" },
//     { name: "DeepPink" },
//     { name: "DeepSkyBlue" },
//     { name: "DimGray" },
//     { name: "DodgerBlue" },
//     { name: "Firebrick" },
//     { name: "FloralWhite" },
//     { name: "ForestGreen" },
//     { name: "Fuchsia" },
//     { name: "Gainsboro" },
//     { name: "GhostWhite" },
//     { name: "Gold" },
//     { name: "Goldenrod" },
//     { name: "Gray" },
//     { name: "Green" },
//     { name: "GreenYellow" },
//     { name: "Honeydew" },
//     { name: "HotPink" },
//     { name: "IndianRed" },
//     { name: "Indigo" },
//     { name: "Ivory" },
//     { name: "Khaki" },
//     { name: "Lavender" },
//     { name: "LavenderBlush" },
//     { name: "LawnGreen" },
//     { name: "LemonChiffon" },
//     { name: "LightBlue" },
//     { name: "LightCoral" },
//     { name: "LightCyan" },
//     { name: "LightGoldenrodYellow" },
//     { name: "LightGreen" },
//     { name: "LightGrey" },
//     { name: "LightPink" },
//     { name: "LightSalmon" },
//     { name: "LightSeaGreen" },
//     { name: "LightSkyBlue" },
//     { name: "LightSlateGray" },
//     { name: "LightSteelBlue" },
//     { name: "LightYellow" },
//     { name: "Lime" },
//     { name: "LimeGreen" },
//     { name: "Linen" },
//     { name: "Magenta" },
//     { name: "Maroon" },
//     { name: "MediumAquamarine" },
//     { name: "MediumBlue" },
//     { name: "MediumOrchid" },
//     { name: "MediumPurple" },
//     { name: "MediumSeaGreen" },
//     { name: "MediumSlateBlue" },
//     { name: "MediumSpringGreen" },
//     { name: "MediumTurquoise" },
//     { name: "MediumVioletRed" },
//     { name: "MidnightBlue" },
//     { name: "MintCream" },
//     { name: "MistyRose" },
//     { name: "Moccasin" },
//     { name: "NavajoWhite" },
//     { name: "Navy" },
//     { name: "OldLace" },
//     { name: "OliveDrab" },
//     { name: "Orange" },
//     { name: "OrangeRed" },
//     { name: "Orchid" },
//     { name: "PaleGoldenrod" },
//     { name: "PaleGreen" },
//     { name: "PaleTurquoise" },
//     { name: "PaleVioletRed" },
//     { name: "PapayaWhip" },
//     { name: "PeachPuff" },
//     { name: "Peru" },
//     { name: "Pink" },
//     { name: "Plum" },
//     { name: "PowderBlue" },
//     { name: "Purple" },
//     { name: "Red" },
//     { name: "RosyBrown" },
//     { name: "RoyalBlue" },
//     { name: "SaddleBrown" },
//     { name: "Salmon" },
//     { name: "SandyBrown" },
//     { name: "SeaGreen" },
//     { name: "SeaShell" },
//     { name: "Sienna" },
//     { name: "Silver" },
//     { name: "SkyBlue" },
//     { name: "SlateBlue" },
//     { name: "Snow" },
//     { name: "SpringGreen" },
//     { name: "SteelBlue" },
//     { name: "Tan" },
//     { name: "Thistle" },
//     { name: "Teal" },
//     { name: "Tomato" },
//     { name: "Turquoise" },
//     { name: "Violet" },
//     { name: "Wheat" },
//     { name: "White" },
//     { name: "Whitesmoke" },
//     { name: "Yellow" },
//     { name: "YellowGreen" },
//   ];

//   const fetchProducts = useCallback(async () => {
//     try {
//       const response = await axios.get("https://api.silksew.com/api/products", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       console.log(response.data)
//       const data = Array.isArray(response.data) ? response.data : response.data.products || []
//       setProducts(data)
//       updateTotalProducts?.(data.length)
//       const lowStockProducts = data.filter((product) => product.availableStock <= 5)
//       updateLowStockProducts?.(lowStockProducts)
//     } catch (error) {
//       console.error("Error fetching products:", error.message)
//       toast.error("Failed to fetch products.")
//     }
//   }, [token, updateTotalProducts, updateLowStockProducts])

//   useEffect(() => {
//     let mounted = true
//     fetchProducts().then(() => {
//       if (!mounted) return
//     })
//     return () => {
//       mounted = false
//     }
//   }, [fetchProducts])

//   const handleDeleteProduct = useCallback(async (id) => {
//     try {
//       await axios.delete(`https://api.silksew.com/api/products/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       toast.success("Product deleted successfully!")
//       fetchProducts()
//     } catch (error) {
//       console.error("Error deleting product:", error.message)
//       toast.error("Failed to delete product.")
//     }
//   }, [token, fetchProducts])

//   const getImage = useCallback((images, availableColors) => {
//     const defaultImage = "https://via.placeholder.com/150x150/cccccc/666666?text=No+Image"
//     if (!images || !Array.isArray(images) || images.length === 0) {
//       return defaultImage
//     }

//     try {
//       let imageData = images[0]
//       if (typeof imageData === "string") {
//         imageData = JSON.parse(imageData)
//       }
//       if (!imageData || typeof imageData !== "object") {
//         return defaultImage
//       }

//       if (availableColors && Array.isArray(availableColors)) {
//         for (const color of availableColors) {
//           const colorName = typeof color === "string" ? color : color?.name || ""
//           if (colorName && imageData[colorName] && Array.isArray(imageData[colorName]) && imageData[colorName].length > 0) {
//             const imageUrl = imageData[colorName][0]
//             if (imageUrl && typeof imageUrl === "string" && imageUrl.trim()) {
//               return imageUrl
//             }
//           }
//         }
//       }

//       const colorKeys = Object.keys(imageData)
//       for (const colorKey of colorKeys) {
//         if (imageData[colorKey] && Array.isArray(imageData[colorKey]) && imageData[colorKey].length > 0) {
//           const imageUrl = imageData[colorKey][0]
//           if (imageUrl && typeof imageUrl === "string" && imageUrl.trim()) {
//             return imageUrl
//           }
//         }
//       }
//       return defaultImage
//     } catch (error) {
//       console.warn("Error processing image data:", error.message)
//       return defaultImage
//     }
//   }, [])

//   const handleEditProduct = useCallback((product) => {
//     setEditingProduct(product)
//     setIsAdding(false)
//     setSelectedCategory(product.category[0])

//     let sizes = []
//     if (Array.isArray(product.availableSizes)) {
//       sizes = product.availableSizes
//     } else if (typeof product.availableSizes === "string") {
//       try {
//         sizes = JSON.parse(product.availableSizes)
//       } catch {
//         sizes = product.availableSizes.split(",").map((size) => size.trim())
//       }
//     }
//     setPreviousSizes(sizes)

//     let colors = []
//     if (Array.isArray(product.availableColors)) {
//       colors = product.availableColors.flatMap((color) =>
//         typeof color === "string" ? JSON.parse(color).map((c) => c.name) : color.name ? [color.name] : []
//       )
//     } else if (typeof product.availableColors === "string") {
//       try {
//         colors = JSON.parse(product.availableColors).flatMap((color) =>
//           typeof color === "string" ? [color] : color.name ? [color.name] : []
//         )
//       } catch {
//         colors = [product.availableColors]
//       }
//     }

//     form.setFieldsValue({
//       ...product,
//       category: product.category[0],
//       subcategory: product.subcategory[0],
//       colors,
//       stock: product.availableStock,
//       sizes,
//     })

//     const initialColorImages = {}
//     if (product.images?.length > 0) {
//       try {
//         const parsedImages = JSON.parse(product.images[0])
//         Object.entries(parsedImages).forEach(([color, urls]) => {
//           initialColorImages[color] = urls.map((url, index) => ({
//             uid: `${color}-${index}`,
//             name: `${color}-image-${index}`,
//             status: "done",
//             url,
//           }))
//         })
//       } catch (error) {
//         console.warn("Error parsing product images:", error.message)
//       }
//     }
//     setColorImages(initialColorImages)
//   }, [form])

//   const handleAddProduct = useCallback(() => {
//     setEditingProduct(null)
//     setIsAdding(true)
//     setSelectedCategory(null)
//     form.resetFields()
//     setColorImages({})
//     setSizeData({})
//     setPreviousSizes([])
//   }, [form])

//   const handleCategoryChange = useCallback((value) => {
//     setSelectedCategory(value)
//     form.setFieldsValue({
//       subcategory: undefined,
//       sizes: undefined,
//     })
//   }, [form])

//   const handleColorChange = useCallback((selectedColors) => {
//     setColorImages((prev) => {
//       const newColorImages = { ...prev }
//       selectedColors.forEach((color) => {
//         if (!newColorImages[color]) {
//           newColorImages[color] = []
//         }
//       })
//       Object.keys(newColorImages).forEach((color) => {
//         if (!selectedColors.includes(color)) {
//           delete newColorImages[color]
//         }
//       })
//       return newColorImages
//     })
//   }, [])

//   const handleSizeChange = useCallback((selectedSizes) => {
//     setSizeData((prev) => {
//       const newSizeData = { ...prev }
//       selectedSizes.forEach((size) => {
//         if (!newSizeData[size]) {
//           newSizeData[size] = { stock: 0 }
//         }
//       })
//       Object.keys(newSizeData).forEach((size) => {
//         if (!selectedSizes.includes(size)) {
//           delete newSizeData[size]
//         }
//       })
//       return newSizeData
//     })
//     setPreviousSizes(selectedSizes)
//     form.setFieldsValue({ sizes: selectedSizes })
//   }, [form])

//   const handleImageChange = useCallback((color, { fileList }) => {
//     setColorImages((prev) => ({
//       ...prev,
//       [color]: fileList,
//     }))
//   }, [])

//   const handlePreview = useCallback(async (file) => {
//     if (!file.url && !file.preview) {
//       try {
//         file.preview = await new Promise((resolve, reject) => {
//           const reader = new FileReader()
//           reader.readAsDataURL(file.originFileObj)
//           reader.onload = () => resolve(reader.result)
//           reader.onerror = (error) => reject(error)
//         })
//       } catch (error) {
//         console.warn("Error generating image preview:", error.message)
//         return
//       }
//     }
//     setPreviewImage(file.url || file.preview)
//     setPreviewVisible(true)
//     setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1))
//   }, [])

//   const handleSubmitProduct = useCallback(async (values) => {
//     if (!isAdding) {
//       const originalSizes = editingProduct.availableSizes || []
//       const originalColors = (editingProduct.availableColors || []).map((c) => c.name || c)
//       const newSizes = values.sizes || previousSizes
//       const newColors = values.colors || []

//       if (JSON.stringify(originalSizes) === JSON.stringify(newSizes) && JSON.stringify(originalColors) === JSON.stringify(newColors)) {
//         setShowWarningModal(true)
//         return
//       }
//     }
//     await submitProductData({ ...values, sizes: values.sizes || previousSizes })
//   }, [isAdding, editingProduct, previousSizes])

//   const handleWarningConfirm = useCallback(() => {
//     setShowWarningModal(false)
//     const formValues = form.getFieldsValue()
//     submitProductData(formValues)
//   }, [form])

//   const submitProductData = useCallback(async (values) => {
//     try {
//       const productData = new FormData()
//       productData.append("name", values.name)
//       productData.append("description", values.description)
//       productData.append("price", values.price)
//       productData.append("oldPrice", values.oldPrice || "")
//       productData.append("category", values.category)
//       productData.append("subcategory", values.subcategory)
//       productData.append("availableStock", values.stock)

//       const sizes = values.sizes || previousSizes
//       productData.append("availableSizes", JSON.stringify(sizes))

//       const colors = values.colors || []
//       const formattedColors = colors.map((color) => ({ name: color }))
//       productData.append("availableColors", JSON.stringify(formattedColors))

//       const uploadedImagesByColor = {}
//       for (const color of colors) {
//         if (colorImages[color]) {
//           const uploadedImages = await Promise.all(
//             colorImages[color].map(async (file) => {
//               if (file.url) {
//                 return file.url
//               }
//               const data = new FormData()
//               data.append("file", file.originFileObj)
//               data.append("upload_preset", "Silksew")
//               data.append("cloud_name", "dvpk4sbzi")

//               const res = await fetch("https://api.cloudinary.com/v1_1/dvpk4sbzi/image/upload", {
//                 method: "POST",
//                 body: data,
//               })

//               if (!res.ok) {
//                 throw new Error("Image upload failed")
//               }

//               const uploadedImage = await res.json()
//               return uploadedImage.secure_url
//             })
//           )
//           uploadedImagesByColor[color] = uploadedImages
//         }
//       }

//       productData.append("images", JSON.stringify(uploadedImagesByColor))

//       const response = isAdding
//         ? await axios.post("https://api.silksew.com/api/products", productData, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "multipart/form-data",
//             },
//           })
//         : await axios.put(`https://api.silksew.com/api/products/${editingProduct._id}`, productData, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "multipart/form-data",
//             },
//           })

//       if (response.data) {
//         toast.success(isAdding ? "Product added successfully!" : "Product updated successfully!")
//         setEditingProduct(null)
//         setIsAdding(false)
//         setColorImages({})
//         setSizeData({})
//         setPreviousSizes([])
//         form.resetFields()
//         fetchProducts()
//       }
//     } catch (error) {
//       console.error("Error submitting product:", error.message)
//       toast.error(`Failed to ${isAdding ? "add" : "update"} product. ${error.response?.data?.message || ""}`)
//     }
//   }, [isAdding, editingProduct, token, fetchProducts, form, colorImages, previousSizes])

//   const handleCancelEdit = useCallback(() => {
//     setEditingProduct(null)
//     setIsAdding(false)
//     setColorImages({})
//     setSizeData({})
//     setPreviousSizes([])
//     form.resetFields()
//   }, [form])

//   const getFilteredProducts = useMemo(() => {
//     return products.filter((product) => {
//       const searchRegex = new RegExp(debouncedSearchTerm, "i")
//       return (
//         searchRegex.test(product.name) ||
//         searchRegex.test(product.category.join(", ")) ||
//         searchRegex.test(product.subcategory.join(", ")) ||
//         searchRegex.test(product.availableColors.map((c) => c.name || c).join(", ")) ||
//         searchRegex.test(product.availableSizes.join(", ")) ||
//         searchRegex.test(product.price.toString()) ||
//         searchRegex.test(product.oldPrice ? product.oldPrice.toString() : "") ||
//         searchRegex.test(product.availableStock.toString())
//       )
//     })
//   }, [products, debouncedSearchTerm])

//   const indexOfLastProduct = currentPage * productsPerPage
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage
//   const currentProducts = useMemo(() => getFilteredProducts.slice(indexOfFirstProduct, indexOfLastProduct), [
//     getFilteredProducts,
//     indexOfFirstProduct,
//     indexOfLastProduct,
//   ])
//   const totalPages = Math.ceil(getFilteredProducts.length / productsPerPage)

//   const paginate = useCallback((pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber)
//     }
//   }, [totalPages])

//   const renderSearchSection = useCallback(() => (
//     <div className="search-section">
//       <Input
//         placeholder="Search products..."
//         prefix={<SearchOutlined />}
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         allowClear
//       />
//     </div>
//   ), [searchTerm])

//   const renderProductTable = useCallback(() => (
//     <>
//       <h2>Admin Product List</h2>
//       {renderSearchSection()}
//       <table className="product-table">
//         <thead>
//           <tr>
//             <th>Sr. No</th>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Category</th>
//             <th>Sub Category</th>
//             <th>Colors</th>
//             <th>Sizes</th>
//             <th>Price</th>
//             <th>Old Price</th>
//             <th>Stock</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentProducts.map((product, index) => {
//             let displayColors = []
//             if (typeof product.availableColors === "string") {
//               try {
//                 displayColors = JSON.parse(product.availableColors).map((color) => (typeof color === "string" ? color : color.name))
//               } catch {
//                 displayColors = [product.availableColors]
//               }
//             } else if (Array.isArray(product.availableColors)) {
//               displayColors = product.availableColors.map((color) => (typeof color === "string" ? color : color.name))
//             }

//             let displaySizes = []
//             if (typeof product.availableSizes === "string") {
//               try {
//                 displaySizes = JSON.parse(product.availableSizes)
//               } catch {
//                 displaySizes = product.availableSizes.split(",").map((size) => size.trim())
//               }
//             } else if (Array.isArray(product.availableSizes)) {
//               displaySizes = product.availableSizes
//             }

//             const productImageUrl = getImage(product.images, product.availableColors)

//             return (
//               <tr key={product._id}>
//                 <td data-label="Sr. No">{(currentPage - 1) * productsPerPage + index + 1}</td>
//                 <td data-label="Image">
//                   <ProductImage src={productImageUrl} alt={product.name || "Product image"} width={50} height={50} />
//                 </td>
//                 <td data-label="Name">{product.name}</td>
//                 <td data-label="Category">{product.category.join(", ")}</td>
//                 <td data-label="Sub Category">{product.subcategory.join(", ")}</td>
//                 <td data-label="Colors">{displayColors.join(", ") || "N/A"}</td>
//                 <td data-label="Sizes">{displaySizes.join(", ") || "N/A"}</td>
//                 <td data-label="Price">Rs.{product.price}</td>
//                 <td data-label="Old Price">{product.oldPrice ? `Rs.${product.oldPrice}` : "N/A"}</td>
//                 <td data-label="Stock">{product.availableStock}</td>
//                 <td data-label="Actions">
//                   <Button
//                     type="primary"
//                     icon={<EditOutlined />}
//                     onClick={() => handleEditProduct(product)}
//                     className="edit-btn"
//                   />
//                   <Button
//                     type="primary"
//                     danger
//                     icon={<DeleteOutlined />}
//                     onClick={() => handleDeleteProduct(product._id)}
//                     className="delete-btn"
//                   />
//                 </td>
//               </tr>
//             )
//           })}
//         </tbody>
//       </table>
//     </>
//   ), [currentProducts, currentPage, productsPerPage, getImage, handleEditProduct, handleDeleteProduct, renderSearchSection])

//   const renderPagination = useCallback(() => {
//     const pageNumbers = []
//     const maxPagesToShow = 5
//     let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
//     let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

//     if (endPage - startPage + 1 < maxPagesToShow) {
//       startPage = Math.max(1, endPage - maxPagesToShow + 1)
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i)
//     }

//     return (
//       <div className="pagination">
//         <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
//           Prev
//         </Button>
//         {startPage > 1 && (
//           <>
//             <Button onClick={() => paginate(1)}>1</Button>
//             {startPage > 2 && <span>...</span>}
//           </>
//         )}
//         {pageNumbers.map((pageNumber) => (
//           <Button
//             key={pageNumber}
//             onClick={() => paginate(pageNumber)}
//             type={currentPage === pageNumber ? "primary" : "default"}
//           >
//             {pageNumber}
//           </Button>
//         ))}
//         {endPage < totalPages && (
//           <>
//             {endPage < totalPages - 1 && <span>...</span>}
//             <Button onClick={() => paginate(totalPages)}>{totalPages}</Button>
//           </>
//         )}
//         <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
//           Next
//         </Button>
//       </div>
//     )
//   }, [currentPage, totalPages, paginate])

//   return (
//     <div className="product-list" style={{ padding: "24px 32px" }}>
//       {editingProduct || isAdding ? (
//         <div className="product-form" style={{ maxHeight: "80vh", overflowY: "auto" }}>
//           <h2>{isAdding ? "Add New Product" : "Edit Product"}</h2>
//           <Form form={form} layout="vertical" onFinish={handleSubmitProduct}>
//             <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
//               <Input placeholder="Enter product name" />
//             </Form.Item>

//             <Form.Item name="category" label="Category" rules={[{ required: true }]}>
//               <Select placeholder="Select category" onChange={handleCategoryChange}>
//                 {categories.map((cat) => (
//                   <Option key={cat} value={cat}>
//                     {cat}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             {selectedCategory && (
//               <Form.Item name="subcategory" label="Subcategory" rules={[{ required: true }]}>
//                 <Select placeholder="Select subcategory">
//                   {subcategories[selectedCategory].map((sub) => (
//                     <Option key={sub} value={sub}>
//                       {sub}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             )}

//             <Form.Item name="description" label="Description" rules={[{ required: true }]}>
//               <TextArea rows={4} placeholder="Enter product description" />
//             </Form.Item>

//             <Form.Item name="price" label="Price" rules={[{ required: true }]}>
//               <InputNumber style={{ width: "100%" }} min={0} placeholder="Enter price" />
//             </Form.Item>

//             <Form.Item name="oldPrice" label="Old Price">
//               <InputNumber style={{ width: "100%" }} min={0} placeholder="Enter old price" />
//             </Form.Item>

//             <Form.Item name="stock" label="Available Stock" rules={[{ required: true }]}>
//               <InputNumber style={{ width: "100%" }} min={0} placeholder="Enter available stock" />
//             </Form.Item>

//             <Form.Item
//               name="sizes"
//               label="Available Sizes"
//               rules={[{ required: true, message: "Please select at least one size" }]}
//             >
//               <Select
//                 mode="multiple"
//                 placeholder="Select available sizes"
//                 style={{ width: "100%" }}
//                 onChange={handleSizeChange}
//                 value={previousSizes}
//               >
//                 {["XS", "S", "M", "L", "XL", "XXL", "2T", "3T", "4T", "5", "6", "7", "8"].map((size) => (
//                   <Option key={size} value={size}>
//                     {size}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item name="colors" label="Colors" rules={[{ required: true }]}>
//               <Select mode="multiple" placeholder="Select colors" onChange={handleColorChange}>
//                 {colorOptions.map(({ name }) => (
//                   <Option key={name} value={name}>
//                     {name}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             {form.getFieldValue("colors")?.map((color) => (
//               <Form.Item key={color} label={`Images for ${color}`}>
//                 <Upload
//                   listType="picture-card"
//                   fileList={colorImages[color] || []}
//                   onPreview={handlePreview}
//                   onChange={(info) => handleImageChange(color, info)}
//                   beforeUpload={() => false}
//                   multiple={true}
//                 >
//                   {(colorImages[color]?.length || 0) < 5 && (
//                     <div>
//                       <PlusOutlined />
//                       <div style={{ marginTop: 8 }}>Upload</div>
//                     </div>
//                   )}
//                 </Upload>
//               </Form.Item>
//             ))}

//             <Form.Item>
//               <Button type="primary" htmlType="submit">
//                 {isAdding ? "Add Product" : "Update Product"}
//               </Button>
//               <Button onClick={handleCancelEdit} style={{ marginLeft: 8 }}>
//                 Cancel
//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       ) : (
//         <div>
//           <Button type="primary" onClick={handleAddProduct} style={{ marginBottom: 16 }}>
//             <PlusOutlined /> Add New Product
//           </Button>
//           {renderProductTable()}
//           {renderPagination()}
//         </div>
//       )}

//       <Modal
//         visible={showWarningModal}
//         title="Warning"
//         onOk={handleWarningConfirm}
//         onCancel={() => setShowWarningModal(false)}
//       >
//         <p>You haven't made any changes to the sizes or colors. Are you sure you want to update the product?</p>
//       </Modal>

//       <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={() => setPreviewVisible(false)}>
//         <img
//           alt="example"
//           style={{ width: "100%" }}
//           src={previewImage || "https://via.placeholder.com/400x400/cccccc/666666?text=No+Image"}
//         />
//       </Modal>

//       <ToastContainer />
//     </div>
//   )
// }

// export default React.memo(AdminProductlist)   



// "use client"

// import { useState, useEffect, useContext, useCallback, useMemo } from "react"
// import axios from "axios"
// import { AuthContext } from "../context/AuthContext"
// import { ToastContainer, toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import "../pages/CSS/AdminProductlist.css"
// import { Form, Input, Select, InputNumber, Button, Upload, Modal } from "antd"
// import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons"
// import { debounce } from "lodash"
// import React from "react"

// const { TextArea } = Input
// const { Option } = Select

// // Custom hook for debouncing
// const useDebounce = (value, delay) => {
//   const [debouncedValue, setDebouncedValue] = useState(value)

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value)
//     }, delay)

//     return () => {
//       clearTimeout(handler)
//     }
//   }, [value, delay])

//   return debouncedValue
// }

// // Memoized ProductImage component to prevent unnecessary re-renders
// const ProductImage = React.memo(({ src, alt, width = 50, height = 50 }) => {
//   const [imgSrc, setImgSrc] = useState(src)
//   const [hasError, setHasError] = useState(false)

//   useEffect(() => {
//     setImgSrc(src)
//     setHasError(false)
//   }, [src])

//   const handleError = useCallback(() => {
//     if (!hasError) {
//       setHasError(true)
//       setImgSrc("https://via.placeholder.com/150x150/cccccc/666666?text=No+Image")
//     }
//   }, [hasError])

//   return (
//     <img
//       src={imgSrc || "/placeholder.svg"}
//       alt={alt}
//       width={width}
//       height={height}
//       style={{
//         objectFit: "cover",
//         border: "1px solid #d9d9d9",
//         borderRadius: "4px",
//         backgroundColor: "#f5f5f5",
//       }}
//       onError={handleError}
//     />
//   )
// })

// function AdminProductlist({ updateTotalProducts, updateLowStockProducts }) {
//   const { token } = useContext(AuthContext)
//   const [products, setProducts] = useState([])
//   const [currentPage, setCurrentPage] = useState(1)
//   const [productsPerPage] = useState(3)
//   const [editingProduct, setEditingProduct] = useState(null)
//   const [isAdding, setIsAdding] = useState(false)
//   const [form] = Form.useForm()
//   const [selectedCategory, setSelectedCategory] = useState(null)
//   const [colorImages, setColorImages] = useState({})
//   const [sizeData, setSizeData] = useState({})
//   const [previewVisible, setPreviewVisible] = useState(false)
//   const [previewImage, setPreviewImage] = useState("")
//   const [previewTitle, setPreviewTitle] = useState("")
//   const [showWarningModal, setShowWarningModal] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [previousSizes, setPreviousSizes] = useState([])

//   const debouncedSearchTerm = useDebounce(searchTerm, 300)

//   const categories = ["men", "women", "kid"]

//   const subcategories = {
//     men: [
//       "Traditional Wear",
//       "Casual Wear",
//       "Formal Wear",
//       "Ethnic Wear",
//       "Street Style",
//       "Smart Casuals",
//       "Athleisure",
//       "Summer Wear",
//       "Winter Wear",
//       "Party Wear",
//       "Wedding Wear",
//       "Indo-Western",
//       "Loungewear",
//       "Vacation Wear",
//       "Festive Wear",
//     ],
//     women: [
//       "Saree",
//       "Lehenga",
//       "Salwar Kameez",
//       "Anarkali Dress",
//       "Kurti",
//       "Churidar",
//       "Palazzo Pants",
//       "Indo-Western",
//       "Tunic",
//       "Maxi Dress",
//       "Dress (Western)",
//       "Skirt and Top",
//       "Peplum Top",
//       "Straight Cut Kurti",
//       "Ethnic Gown",
//       "Kaftan",
//       "Jumpsuit (Western)",
//       "Trousers and Blouse",
//       "Palazzo and Kurti",
//       "Sharara Suit",
//       "Dhoti Pants and Kurti",
//     ],
//     kid: [
//       "Traditional Wear",
//       "Western Wear",
//       "Casual Wear",
//       "Party Wear",
//       "Ethnic Wear",
//       "Festive Wear",
//       "Sportswear",
//       "Loungewear",
//       "Smart Casuals",
//       "T-shirts and Jeans",
//       "Shorts and Tops",
//       "Dresses and Skirts",
//       "Kurta and Pajama",
//       "Lehenga Choli",
//       "Sherwani",
//       "Rompers and Jumpsuits",
//     ],
//   }

//   const colorOptions = [
//     { name: "AliceBlue" },
//     { name: "AntiqueWhite" },
//     { name: "Aqua" },
//     { name: "Aquamarine" },
//     { name: "Azure" },
//     { name: "Beige" },
//     { name: "Bisque" },
//     { name: "BlanchedAlmond" },
//     { name: "Blue" },
//     { name: "BlueViolet" },
//     { name: "Brown" },
//     { name: "Burlywood" },
//     { name: "CadetBlue" },
//     { name: "Chartreuse" },
//     { name: "Chocolate" },
//     { name: "Angel" },
//     { name: "CornflowerBlue" },
//     { name: "Cornsilk" },
//     { name: "Crimson" },
//     { name: "Cyan" },
//     { name: "DarkBlue" },
//     { name: "DarkCyan" },
//     { name: "DarkGoldenrod" },
//     { name: "DarkGray" },
//     { name: "DarkGreen" },
//     { name: "DarkKhaki" },
//     { name: "DarkMagenta" },
//     { name: "DarkOliveGreen" },
//     { name: "DarkOrange" },
//     { name: "DarkOrchid" },
//     { name: "DarkRed" },
//     { name: "DarkSalmon" },
//     { name: "DarkSeagreen" },
//     { name: "DarkSlateBlue" },
//     { name: "DarkSlateGray" },
//     { name: "DarkTurquoise" },
//     { name: "DarkViolet" },
//     { name: "DeepPink" },
//     { name: "DeepSkyBlue" },
//     { name: "DimGray" },
//     { name: "DodgerBlue" },
//     { name: "Firebrick" },
//     { name: "FloralWhite" },
//     { name: "ForestGreen" },
//     { name: "Fuchsia" },
//     { name: "Gainsboro" },
//     { name: "GhostWhite" },
//     { name: "Gold" },
//     { name: "Goldenrod" },
//     { name: "Gray" },
//     { name: "Green" },
//     { name: "GreenYellow" },
//     { name: "Honeydew" },
//     { name: "HotPink" },
//     { name: "IndianRed" },
//     { name: "Indigo" },
//     { name: "Ivory" },
//     { name: "Khaki" },
//     { name: "Lavender" },
//     { name: "LavenderBlush" },
//     { name: "LawnGreen" },
//     { name: "LemonChiffon" },
//     { name: "LightBlue" },
//     { name: "LightCoral" },
//     { name: "LightCyan" },
//     { name: "LightGoldenrodYellow" },
//     { name: "LightGreen" },
//     { name: "LightGrey" },
//     { name: "LightPink" },
//     { name: "LightSalmon" },
//     { name: "LightSeaGreen" },
//     { name: "LightSkyBlue" },
//     { name: "LightSlateGray" },
//     { name: "LightSteelBlue" },
//     { name: "LightYellow" },
//     { name: "Lime" },
//     { name: "LimeGreen" },
//     { name: "Linen" },
//     { name: "Magenta" },
//     { name: "Maroon" },
//     { name: "MediumAquamarine" },
//     { name: "MediumBlue" },
//     { name: "MediumOrchid" },
//     { name: "MediumPurple" },
//     { name: "MediumSeaGreen" },
//     { name: "MediumSlateBlue" },
//     { name: "MediumSpringGreen" },
//     { name: "MediumTurquoise" },
//     { name: "MediumVioletRed" },
//     { name: "MidnightBlue" },
//     { name: "MintCream" },
//     { name: "MistyRose" },
//     { name: "Moccasin" },
//     { name: "NavajoWhite" },
//     { name: "Navy" },
//     { name: "OldLace" },
//     { name: "OliveDrab" },
//     { name: "Orange" },
//     { name: "OrangeRed" },
//     { name: "Orchid" },
//     { name: "PaleGoldenrod" },
//     { name: "PaleGreen" },
//     { name: "PaleTurquoise" },
//     { name: "PaleVioletRed" },
//     { name: "PapayaWhip" },
//     { name: "PeachPuff" },
//     { name: "Peru" },
//     { name: "Pink" },
//     { name: "Plum" },
//     { name: "PowderBlue" },
//     { name: "Purple" },
//     { name: "Red" },
//     { name: "RosyBrown" },
//     { name: "RoyalBlue" },
//     { name: "SaddleBrown" },
//     { name: "Salmon" },
//     { name: "SandyBrown" },
//     { name: "SeaGreen" },
//     { name: "SeaShell" },
//     { name: "Sienna" },
//     { name: "Silver" },
//     { name: "SkyBlue" },
//     { name: "SlateBlue" },
//     { name: "Snow" },
//     { name: "SpringGreen" },
//     { name: "SteelBlue" },
//     { name: "Tan" },
//     { name: "Thistle" },
//     { name: "Teal" },
//     { name: "Tomato" },
//     { name: "Turquoise" },
//     { name: "Violet" },
//     { name: "Wheat" },
//     { name: "White" },
//     { name: "Whitesmoke" },
//     { name: "Yellow" },
//     { name: "YellowGreen" },
//   ]

//   const fetchProducts = useCallback(async () => {
//     try {
//       const response = await axios.get("https://api.silksew.com/api/products", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       const data = Array.isArray(response.data) ? response.data : response.data.products || []
//       setProducts(data)
//       updateTotalProducts?.(data.length)
//       const lowStockProducts = data.filter((product) => product.availableStock <= 5)
//       updateLowStockProducts?.(lowStockProducts)
//     } catch (error) {
//       console.error("Error fetching products:", error.message)
//       toast.error("Failed to fetch products.")
//     }
//   }, [token, updateTotalProducts, updateLowStockProducts])

//   useEffect(() => {
//     let mounted = true
//     fetchProducts().then(() => {
//       if (!mounted) return
//     })
//     return () => {
//       mounted = false
//     }
//   }, [fetchProducts])

//   const handleDeleteProduct = useCallback(async (id) => {
//     try {
//       await axios.delete(`https://api.silksew.com/api/products/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       toast.success("Product deleted successfully!")
//       fetchProducts()
//     } catch (error) {
//       console.error("Error deleting product:", error.message)
//       toast.error("Failed to delete product.")
//     }
//   }, [token, fetchProducts])

//   const getImage = useCallback((images, availableColors) => {
//     const defaultImage = "https://via.placeholder.com/150x150/cccccc/666666?text=No+Image"
//     if (!images || !Array.isArray(images) || images.length === 0) {
//       return defaultImage
//     }

//     try {
//       let imageData = images[0]
//       if (typeof imageData === "string") {
//         imageData = JSON.parse(imageData)
//       }
//       if (!imageData || typeof imageData !== "object") {
//         return defaultImage
//       }

//       if (availableColors && Array.isArray(availableColors)) {
//         for (const color of availableColors) {
//           const colorName = typeof color === "string" ? color : color?.name || ""
//           if (colorName && imageData[colorName] && Array.isArray(imageData[colorName]) && imageData[colorName].length > 0) {
//             const imageUrl = imageData[colorName][0]
//             if (imageUrl && typeof imageUrl === "string" && imageUrl.trim()) {
//               return imageUrl
//             }
//           }
//         }
//       }

//       const colorKeys = Object.keys(imageData)
//       for (const colorKey of colorKeys) {
//         if (imageData[colorKey] && Array.isArray(imageData[colorKey]) && imageData[colorKey].length > 0) {
//           const imageUrl = imageData[colorKey][0]
//           if (imageUrl && typeof imageUrl === "string" && imageUrl.trim()) {
//             return imageUrl
//           }
//         }
//       }
//       return defaultImage
//     } catch (error) {
//       console.warn("Error processing image data:", error.message)
//       return defaultImage
//     }
//   }, [])

//   // const handleEditProduct = useCallback((product) => {
//   //   setEditingProduct(product)
//   //   setIsAdding(false)
//   //   setSelectedCategory(product.category[0])

//   //   let sizes = []
//   //   if (Array.isArray(product.availableSizes)) {
//   //     sizes = product.availableSizes
//   //   } else if (typeof product.availableSizes === "string") {
//   //     try {
//   //       sizes = JSON.parse(product.availableSizes)
//   //     } catch {
//   //       sizes = product.availableSizes.split(",").map((size) => size.trim())
//   //     }
//   //   }
//   //   setPreviousSizes(sizes)

//   //   let colors = []
//   //   if (Array.isArray(product.availableColors)) {
//   //     colors = product.availableColors.flatMap((color) => {
//   //       if (typeof color === "string") {
//   //         // If it's a plain string (e.g., "Red"), use it directly
//   //         if (!color.startsWith("{") && !color.startsWith("[")) {
//   //           return [color]
//   //         }
//   //         try {
//   //           // If it's a JSON string (e.g., "{\"name\": \"Red\"}"), parse it
//   //           const parsed = JSON.parse(color)
//   //           return Array.isArray(parsed)
//   //             ? parsed.map((c) => c.name || c)
//   //             : [parsed.name || parsed]
//   //         } catch {
//   //           // If parsing fails, use the string as is
//   //           return [color]
//   //         }
//   //       } else if (color && color.name) {
//   //         // If it's an object (e.g., {name: "Red"}), use the name
//   //         return [color.name]
//   //       }
//   //       return []
//   //     })
//   //   } else if (typeof product.availableColors === "string") {
//   //     try {
//   //       // If availableColors is a JSON string (e.g., "[{\"name\": \"Red\"}]")
//   //       colors = JSON.parse(product.availableColors).flatMap((color) =>
//   //         typeof color === "string" ? [color] : color.name ? [color.name] : []
//   //       )
//   //     } catch {
//   //       // If parsing fails, treat it as a single color string
//   //       colors = [product.availableColors]
//   //     }
//   //   }

//   //   form.setFieldsValue({
//   //     ...product,
//   //     category: product.category[0],
//   //     subcategory: product.subcategory[0],
//   //     colors,
//   //     stock: product.availableStock,
//   //     sizes,
//   //   })

//   //   const initialColorImages = {}
//   //   if (product.images?.length > 0) {
//   //     try {
//   //       const parsedImages = JSON.parse(product.images[0])
//   //       Object.entries(parsedImages).forEach(([color, urls]) => {
//   //         initialColorImages[color] = urls.map((url, index) => ({
//   //           uid: `${color}-${index}`,
//   //           name: `${color}-image-${index}`,
//   //           status: "done",
//   //           url,
//   //         }))
//   //       })
//   //     } catch (error) {
//   //       console.warn("Error parsing product images:", error.message)
//   //     }
//   //   }
//   //   setColorImages(initialColorImages)
//   // }, [form])

// const handleEditProduct = useCallback((product) => {
//   setEditingProduct(product);
//   setIsAdding(false);
//   setSelectedCategory(product.category[0]);

//   // Parse sizes
//   let sizes = [];
//   if (Array.isArray(product.availableSizes)) {
//     sizes = product.availableSizes;
//   } else if (typeof product.availableSizes === "string") {
//     try {
//       sizes = JSON.parse(product.availableSizes);
//     } catch {
//       sizes = product.availableSizes.split(",").map((size) => size.trim());
//     }
//   }
//   setPreviousSizes([...sizes]); // your original state

//   // Parse colors
//   let colors = [];
//   if (Array.isArray(product.availableColors)) {
//     colors = product.availableColors.flatMap((color) => {
//       if (typeof color === "string") {
//         if (!color.startsWith("{") && !color.startsWith("[")) return [color];
//         try {
//           const parsed = JSON.parse(color);
//           return Array.isArray(parsed)
//             ? parsed.map((c) => c.name || c)
//             : [parsed.name || parsed];
//         } catch {
//           return [color];
//         }
//       } else if (color && color.name) {
//         return [color.name];
//       }
//       return [];
//     });
//   } else if (typeof product.availableColors === "string") {
//     try {
//       const parsed = JSON.parse(product.availableColors);
//       colors = Array.isArray(parsed)
//         ? parsed.flatMap((color) =>
//             typeof color === "string"
//               ? [color]
//               : color.name
//               ? [color.name]
//               : []
//           )
//         : [];
//     } catch {
//       colors = [product.availableColors];
//     }
//   }

//   // Set form fields
//   form.setFieldsValue({
//     ...product,
//     category: product.category?.[0],
//     subcategory: product.subcategory?.[0],
//     colors,
//     stock: product.availableStock,
//     sizes,
//   });

//   // Images grouped by color
//   const initialColorImages = {};
//   if (product.images?.length > 0) {
//     try {
//       const parsedImages = JSON.parse(product.images[0]);
//       Object.entries(parsedImages).forEach(([color, urls]) => {
//         initialColorImages[color] = urls.map((url, index) => ({
//           uid: `${color}-${index}`,
//           name: `${color}-image-${index}`,
//           status: "done",
//           url,
//         }));
//       });
//     } catch (error) {
//       console.warn("Error parsing product images:", error.message);
//     }
//   }

//   setColorImages(initialColorImages); // your original state
// }, [form]);



//   const handleAddProduct = useCallback(() => {
//     setEditingProduct(null)
//     setIsAdding(true)
//     setSelectedCategory(null)
//     form.resetFields()
//     setColorImages({})
//     setSizeData({})
//     setPreviousSizes([])
//   }, [form])

//   const handleCategoryChange = useCallback((value) => {
//     setSelectedCategory(value)
//     form.setFieldsValue({
//       subcategory: undefined,
//       sizes: undefined,
//     })
//   }, [form])

//   const handleColorChange = useCallback((selectedColors) => {
//     setColorImages((prev) => {
//       const newColorImages = { ...prev }
//       selectedColors.forEach((color) => {
//         if (!newColorImages[color]) {
//           newColorImages[color] = []
//         }
//       })
//       Object.keys(newColorImages).forEach((color) => {
//         if (!selectedColors.includes(color)) {
//           delete newColorImages[color]
//         }
//       })
//       return newColorImages
//     })
//   }, [])

//   const handleSizeChange = useCallback((selectedSizes) => {
//     setSizeData((prev) => {
//       const newSizeData = { ...prev }
//       selectedSizes.forEach((size) => {
//         if (!newSizeData[size]) {
//           newSizeData[size] = { stock: 0 }
//         }
//       })
//       Object.keys(newSizeData).forEach((size) => {
//         if (!selectedSizes.includes(size)) {
//           delete newSizeData[size]
//         }
//       })
//       return newSizeData
//     })
//     setPreviousSizes(selectedSizes)
//     form.setFieldsValue({ sizes: selectedSizes })
//   }, [form])

//   const handleImageChange = useCallback((color, { fileList }) => {
//     setColorImages((prev) => ({
//       ...prev,
//       [color]: fileList,
//     }))
//   }, [])

//   const handlePreview = useCallback(async (file) => {
//     if (!file.url && !file.preview) {
//       try {
//         file.preview = await new Promise((resolve, reject) => {
//           const reader = new FileReader()
//           reader.readAsDataURL(file.originFileObj)
//           reader.onload = () => resolve(reader.result)
//           reader.onerror = (error) => reject(error)
//         })
//       } catch (error) {
//         console.warn("Error generating image preview:", error.message)
//         return
//       }
//     }
//     setPreviewImage(file.url || file.preview)
//     setPreviewVisible(true)
//     setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1))
//   }, [])

//   const handleSubmitProduct = useCallback(async (values) => {
//     if (!isAdding) {
//       const originalSizes = editingProduct.availableSizes || []
//       const originalColors = (editingProduct.availableColors || []).map((c) => c.name || c)
//       const newSizes = values.sizes || previousSizes
//       const newColors = values.colors || []

//       if (JSON.stringify(originalSizes) === JSON.stringify(newSizes) && JSON.stringify(originalColors) === JSON.stringify(newColors)) {
//         setShowWarningModal(true)
//         return
//       }
//     }
//     await submitProductData({ ...values, sizes: values.sizes || previousSizes })
//   }, [isAdding, editingProduct, previousSizes])

//   const handleWarningConfirm = useCallback(() => {
//     setShowWarningModal(false)
//     const formValues = form.getFieldsValue()
//     submitProductData(formValues)
//   }, [form])

//   const submitProductData = useCallback(async (values) => {
//     try {
//       const productData = new FormData()
//       productData.append("name", values.name)
//       productData.append("description", values.description)
//       productData.append("price", values.price)
//       productData.append("oldPrice", values.oldPrice || "")
//       productData.append("category", values.category)
//       productData.append("subcategory", values.subcategory)
//       productData.append("availableStock", values.stock)

//       const sizes = values.sizes || previousSizes
//       productData.append("availableSizes", JSON.stringify(sizes))

//       const colors = values.colors || []
//       colors.forEach((color) => {
//         productData.append("availableColors[]", color)
//       })

//       const uploadedImagesByColor = {}
//       for (const color of colors) {
//         if (colorImages[color]) {
//           const uploadedImages = await Promise.all(
//             colorImages[color].map(async (file) => {
//               if (file.url) {
//                 return file.url
//               }
//               const data = new FormData()
//               data.append("file", file.originFileObj)
//               data.append("upload_preset", "Silksew")
//               data.append("cloud_name", "dejdni8vi")
//               data.append("folder", "products")

//               const res = await fetch("https://api.cloudinary.com/v1_1/dejdni8vi/image/upload", {
//                 method: "POST",
//                 body: data,
//               })

//               if (!res.ok) {
//                 throw new Error("Image upload failed")
//               }

//               const uploadedImage = await res.json()
//               return uploadedImage.secure_url
//             })
//           )
//           uploadedImagesByColor[color] = uploadedImages
//         }
//       }

//       productData.append("images", JSON.stringify(uploadedImagesByColor))

//       const response = isAdding
//         ? await axios.post("https://api.silksew.com/api/products", productData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         })
//         : await axios.put(`https://api.silksew.com/api/products/${editingProduct._id}`, productData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         })

//       if (response.data) {
//         toast.success(isAdding ? "Product added successfully!" : "Product updated successfully!")
//         setEditingProduct(null)
//         setIsAdding(false)
//         setColorImages({})
//         setSizeData({})
//         setPreviousSizes([])
//         form.resetFields()
//         fetchProducts()
//       }
//     } catch (error) {
//       console.error("Error submitting product:", error.message)
//       toast.error(`Failed to ${isAdding ? "add" : "update"} product. ${error.response?.data?.message || ""}`)
//     }
//   }, [isAdding, editingProduct, token, fetchProducts, form, colorImages, previousSizes])

//   const handleCancelEdit = useCallback(() => {
//     setEditingProduct(null)
//     setIsAdding(false)
//     setColorImages({})
//     setSizeData({})
//     setPreviousSizes([])
//     form.resetFields()
//   }, [form])

//   const getFilteredProducts = useMemo(() => {
//     return products.filter((product) => {
//       const searchRegex = new RegExp(debouncedSearchTerm, "i")
//       return (
//         searchRegex.test(product.name) ||
//         searchRegex.test(product.category.join(", ")) ||
//         searchRegex.test(product.subcategory.join(", ")) ||
//         searchRegex.test(product.availableColors.map((c) => c.name || c).join(", ")) ||
//         searchRegex.test(product.availableSizes.join(", ")) ||
//         searchRegex.test(product.price.toString()) ||
//         searchRegex.test(product.oldPrice ? product.oldPrice.toString() : "") ||
//         searchRegex.test(product.availableStock.toString())
//       )
//     })
//   }, [products, debouncedSearchTerm])

//   const indexOfLastProduct = currentPage * productsPerPage
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage
//   const currentProducts = useMemo(() => getFilteredProducts.slice(indexOfFirstProduct, indexOfLastProduct), [
//     getFilteredProducts,
//     indexOfFirstProduct,
//     indexOfLastProduct,
//   ])
//   const totalPages = Math.ceil(getFilteredProducts.length / productsPerPage)

//   const paginate = useCallback((pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber)
//     }
//   }, [totalPages])

//   const renderSearchSection = useCallback(() => (
//     <div className="search-section">
//       <Input
//         placeholder="Search products..."
//         prefix={<SearchOutlined />}
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         allowClear
//       />
//     </div>
//   ), [searchTerm])

//   const renderProductTable = useCallback(() => (
//     <>
//       <h2>Admin Product List</h2>
//       {renderSearchSection()}
//       <table className="product-table">
//         <thead>
//           <tr>
//             <th>Sr. No</th>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Category</th>
//             <th>Sub Category</th>
//             <th>Colors</th>
//             <th>Sizes</th>
//             <th>Price</th>
//             <th>Old Price</th>
//             <th>Stock</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentProducts.map((product, index) => {
//             let displayColors = []
//             if (typeof product.availableColors === "string") {
//               try {
//                 displayColors = JSON.parse(product.availableColors).map((color) => (typeof color === "string" ? color : color.name))
//               } catch {
//                 displayColors = [product.availableColors]
//               }
//             } else if (Array.isArray(product.availableColors)) {
//               displayColors = product.availableColors.map((color) => (typeof color === "string" ? color : color.name))
//             }

//             let displaySizes = []
//             if (typeof product.availableSizes === "string") {
//               try {
//                 displaySizes = JSON.parse(product.availableSizes)
//               } catch {
//                 displaySizes = product.availableSizes.split(",").map((size) => size.trim())
//               }
//             } else if (Array.isArray(product.availableSizes)) {
//               displaySizes = product.availableSizes
//             }

//             const productImageUrl = getImage(product.images, product.availableColors)

//             return (
//               <tr key={product._id}>
//                 <td data-label="Sr. No">{(currentPage - 1) * productsPerPage + index + 1}</td>
//                 <td data-label="Image">
//                   <ProductImage src={productImageUrl} alt={product.name || "Product image"} width={50} height={50} />
//                 </td>
//                 <td data-label="Name">{product.name}</td>
//                 <td data-label="Category">{product.category.join(", ")}</td>
//                 <td data-label="Sub Category">{product.subcategory.join(", ")}</td>
//                 <td data-label="Colors">{displayColors.join(", ") || "N/A"}</td>
//                 <td data-label="Sizes">{displaySizes.join(", ") || "N/A"}</td>
//                 <td data-label="Price">Rs.{product.price}</td>
//                 <td data-label="Old Price">{product.oldPrice ? `Rs.${product.oldPrice}` : "N/A"}</td>
//                 <td data-label="Stock">{product.availableStock}</td>
//                 <td data-label="Actions">
//                   <Button
//                     type="primary"
//                     icon={<EditOutlined />}
//                     onClick={() => handleEditProduct(product)}
//                     className="edit-btn"
//                   />
//                   <Button
//                     type="primary"
//                     danger
//                     icon={<DeleteOutlined />}
//                     onClick={() => handleDeleteProduct(product._id)}
//                     className="delete-btn"
//                   />
//                 </td>
//               </tr>
//             )
//           })}
//         </tbody>
//       </table>
//     </>
//   ), [currentProducts, currentPage, productsPerPage, getImage, handleEditProduct, handleDeleteProduct, renderSearchSection])

//   const renderPagination = useCallback(() => {
//     const pageNumbers = []
//     const maxPagesToShow = 5
//     let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
//     let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

//     if (endPage - startPage + 1 < maxPagesToShow) {
//       startPage = Math.max(1, endPage - maxPagesToShow + 1)
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i)
//     }

//     return (
//       <div className="pagination">
//         <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
//           Prev
//         </Button>
//         {startPage > 1 && (
//           <>
//             <Button onClick={() => paginate(1)}>1</Button>
//             {startPage > 2 && <span>...</span>}
//           </>
//         )}
//         {pageNumbers.map((pageNumber) => (
//           <Button
//             key={pageNumber}
//             onClick={() => paginate(pageNumber)}
//             type={currentPage === pageNumber ? "primary" : "default"}
//           >
//             {pageNumber}
//           </Button>
//         ))}
//         {endPage < totalPages && (
//           <>
//             {endPage < totalPages - 1 && <span>...</span>}
//             <Button onClick={() => paginate(totalPages)}>{totalPages}</Button>
//           </>
//         )}
//         <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
//           Next
//         </Button>
//       </div>
//     )
//   }, [currentPage, totalPages, paginate])

//   return (
//     <div className="product-list" style={{ padding: "24px 32px" }}>
//       {editingProduct || isAdding ? (
//         <div className="product-form" style={{ maxHeight: "80vh", overflowY: "auto" }}>
//           <h2>{isAdding ? "Add New Product" : "Edit Product"}</h2>
//           <Form form={form} layout="vertical" onFinish={handleSubmitProduct}>
//             <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
//               <Input placeholder="Enter product name" />
//             </Form.Item>

//             <Form.Item name="category" label="Category" rules={[{ required: true }]}>
//               <Select placeholder="Select category" onChange={handleCategoryChange}>
//                 {categories.map((cat) => (
//                   <Option key={cat} value={cat}>
//                     {cat}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             {selectedCategory && (
//               <Form.Item name="subcategory" label="Subcategory" rules={[{ required: true }]}>
//                 <Select placeholder="Select subcategory">
//                   {subcategories[selectedCategory].map((sub) => (
//                     <Option key={sub} value={sub}>
//                       {sub}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             )}

//             <Form.Item name="description" label="Description" rules={[{ required: true }]}>
//               <TextArea rows={4} placeholder="Enter product description" />
//             </Form.Item>

//             <Form.Item
//               name="price"
//               label="Price"
//               rules={[
//                 { required: true, message: "Please enter price" },
//                 {
//                   validator: (_, value) =>
//                     value > 0 ? Promise.resolve() : Promise.reject(new Error("Price must be greater than 0")),
//                 },
//               ]}
//             >
//               <InputNumber style={{ width: "100%" }} min={0.01} step={0.01} placeholder="Enter price" />
//             </Form.Item>

//             <Form.Item name="oldPrice" label="Old Price">
//               <InputNumber style={{ width: "100%" }} min={0} placeholder="Enter old price" />
//             </Form.Item>

//             <Form.Item
//               name="stock"
//               label="Available Stock"
//               rules={[{ required: true, message: "Please enter available stock" }]}
//             >
//               <InputNumber style={{ width: "100%" }} min={0} placeholder="Enter available stock" />
//             </Form.Item>

//             <Form.Item
//               name="sizes"
//               label="Available Sizes"
//               rules={[{ required: true, message: "Please select at least one size" }]}
//             >
//               <Select
//                 mode="multiple"
//                 placeholder="Select available sizes"
//                 style={{ width: "100%" }}
//                 onChange={handleSizeChange}
//                 value={previousSizes}
//               >
//                 {["XS", "S", "M", "L", "XL", "XXL", "2T", "3T", "4T", "5", "6", "7", "8"].map((size) => (
//                   <Option key={size} value={size}>
//                     {size}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item
//               name="colors"
//               label="Colors"
//               rules={[{ required: true, message: "Please select at least one color" }]}
//             >
//               <Select mode="multiple" placeholder="Select colors" onChange={handleColorChange}>
//                 {colorOptions.map(({ name }) => (
//                   <Option key={name} value={name}>
//                     {name}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             {form.getFieldValue("colors")?.map((color) => (
//               <Form.Item key={color} label={`Images for ${color}`}>
//                 <Upload
//                   listType="picture-card"
//                   fileList={colorImages[color] || []}
//                   onPreview={handlePreview}
//                   onChange={(info) => handleImageChange(color, info)}
//                   beforeUpload={() => false}
//                   multiple={true}
//                 >
//                   {(colorImages[color]?.length || 0) < 5 && (
//                     <div>
//                       <PlusOutlined />
//                       <div style={{ marginTop: 8 }}>Upload</div>
//                     </div>
//                   )}
//                 </Upload>
//               </Form.Item>
//             ))}

//             <Form.Item>
//               <Button type="primary" htmlType="submit">
//                 {isAdding ? "Add Product" : "Update Product"}
//               </Button>
//               <Button onClick={handleCancelEdit} style={{ marginLeft: 8 }}>
//                 Cancel
//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       ) : (
//         <div>
//           <Button type="primary" onClick={handleAddProduct} style={{ marginBottom: 16 }}>
//             <PlusOutlined /> Add New Product
//           </Button>
//           {renderProductTable()}
//           {renderPagination()}
//         </div>
//       )}

//       <Modal
//         visible={showWarningModal}
//         title="Warning"
//         onOk={handleWarningConfirm}
//         onCancel={() => setShowWarningModal(false)}
//       >
//         <p>You haven't made any changes to the sizes or colors. Are you sure you want to update the product?</p>
//       </Modal>

//       <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={() => setPreviewVisible(false)}>
//         <img
//           alt="example"
//           style={{ width: "100%" }}
//           src={previewImage || "https://via.placeholder.com/400x400/cccccc/666666?text=No+Image"}
//         />
//       </Modal>

//       <ToastContainer />
//     </div>
//   )
// }

// export default React.memo(AdminProductlist)   



// "use client"

// import { useState, useEffect, useContext, useCallback, useMemo } from "react"
// import axios from "axios"
// import { AuthContext } from "../context/AuthContext"
// import { ToastContainer, toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import "../pages/CSS/AdminProductlist.css"
// import { Form, Input, Select, InputNumber, Button, Upload, Modal } from "antd"
// import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons"
// import { debounce } from "lodash"
// import React from "react"

// const { TextArea } = Input
// const { Option } = Select

// // Custom hook for debouncing
// const useDebounce = (value, delay) => {
//   const [debouncedValue, setDebouncedValue] = useState(value)

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value)
//     }, delay)

//     return () => {
//       clearTimeout(handler)
//     }
//   }, [value, delay])

//   return debouncedValue
// }

// // Memoized ProductImage component to prevent unnecessary re-renders
// const ProductImage = React.memo(({ src, alt, width = 50, height = 50 }) => {
//   const [imgSrc, setImgSrc] = useState(src)
//   const [hasError, setHasError] = useState(false)

//   useEffect(() => {
//     setImgSrc(src)
//     setHasError(false)
//   }, [src])

//   const handleError = useCallback(() => {
//     if (!hasError) {
//       setHasError(true)
//       setImgSrc("https://via.placeholder.com/150x150/cccccc/666666?text=No+Image")
//     }
//   }, [hasError])

//   return (
//     <img
//       src={imgSrc || "/placeholder.svg"}
//       alt={alt}
//       width={width}
//       height={height}
//       style={{
//         objectFit: "cover",
//         border: "1px solid #d9d9d9",
//         borderRadius: "4px",
//         backgroundColor: "#f5f5f5",
//       }}
//       onError={handleError}
//     />
//   )
// })

// function AdminProductlist({ updateTotalProducts, updateLowStockProducts }) {
//   const { token } = useContext(AuthContext)
//   const [products, setProducts] = useState([])
//   const [currentPage, setCurrentPage] = useState(1)
//   const [productsPerPage] = useState(3)
//   const [editingProduct, setEditingProduct] = useState(null)
//   const [isAdding, setIsAdding] = useState(false)
//   const [form] = Form.useForm()
//   const [selectedCategory, setSelectedCategory] = useState(null)
//   const [colorImages, setColorImages] = useState({})
//   const [sizeData, setSizeData] = useState({})
//   const [previewVisible, setPreviewVisible] = useState(false)
//   const [previewImage, setPreviewImage] = useState("")
//   const [previewTitle, setPreviewTitle] = useState("")
//   const [showWarningModal, setShowWarningModal] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [previousSizes, setPreviousSizes] = useState([])

//   const debouncedSearchTerm = useDebounce(searchTerm, 300)

//   const categories = ["men", "women", "kid"]

//   const subcategories = {
//     men: [
//       "Traditional Wear",
//       "Casual Wear",
//       "Formal Wear",
//       "Ethnic Wear",
//       "Street Style",
//       "Smart Casuals",
//       "Athleisure",
//       "Summer Wear",
//       "Winter Wear",
//       "Party Wear",
//       "Wedding Wear",
//       "Indo-Western",
//       "Loungewear",
//       "Vacation Wear",
//       "Festive Wear",
//     ],
//     women: [
//       "Saree",
//       "Lehenga",
//       "Salwar Kameez",
//       "Anarkali Dress",
//       "Kurti",
//       "Churidar",
//       "Palazzo Pants",
//       "Indo-Western",
//       "Tunic",
//       "Maxi Dress",
//       "Dress (Western)",
//       "Skirt and Top",
//       "Peplum Top",
//       "Straight Cut Kurti",
//       "Ethnic Gown",
//       "Kaftan",
//       "Jumpsuit (Western)",
//       "Trousers and Blouse",
//       "Palazzo and Kurti",
//       "Sharara Suit",
//       "Dhoti Pants and Kurti",
//     ],
//     kid: [
//       "Traditional Wear",
//       "Western Wear",
//       "Casual Wear",
//       "Party Wear",
//       "Ethnic Wear",
//       "Festive Wear",
//       "Sportswear",
//       "Loungewear",
//       "Smart Casuals",
//       "T-shirts and Jeans",
//       "Shorts and Tops",
//       "Dresses and Skirts",
//       "Kurta and Pajama",
//       "Lehenga Choli",
//       "Sherwani",
//       "Rompers and Jumpsuits",
//     ],
//   }

//   const colorOptions = [
//     { name: "AliceBlue" },
//     { name: "AntiqueWhite" },
//     { name: "Aqua" },
//     { name: "Aquamarine" },
//     { name: "Azure" },
//     { name: "Beige" },
//     { name: "Bisque" },
//     { name: "BlanchedAlmond" },
//     { name: "Blue" },
//     { name: "BlueViolet" },
//     { name: "Brown" },
//     { name: "Burlywood" },
//     { name: "CadetBlue" },
//     { name: "Chartreuse" },
//     { name: "Chocolate" },
//     { name: "Angel" },
//     { name: "CornflowerBlue" },
//     { name: "Cornsilk" },
//     { name: "Crimson" },
//     { name: "Cyan" },
//     { name: "DarkBlue" },
//     { name: "DarkCyan" },
//     { name: "DarkGoldenrod" },
//     { name: "DarkGray" },
//     { name: "DarkGreen" },
//     { name: "DarkKhaki" },
//     { name: "DarkMagenta" },
//     { name: "DarkOliveGreen" },
//     { name: "DarkOrange" },
//     { name: "DarkOrchid" },
//     { name: "DarkRed" },
//     { name: "DarkSalmon" },
//     { name: "DarkSeagreen" },
//     { name: "DarkSlateBlue" },
//     { name: "DarkSlateGray" },
//     { name: "DarkTurquoise" },
//     { name: "DarkViolet" },
//     { name: "DeepPink" },
//     { name: "DeepSkyBlue" },
//     { name: "DimGray" },
//     { name: "DodgerBlue" },
//     { name: "Firebrick" },
//     { name: "FloralWhite" },
//     { name: "ForestGreen" },
//     { name: "Fuchsia" },
//     { name: "Gainsboro" },
//     { name: "GhostWhite" },
//     { name: "Gold" },
//     { name: "Goldenrod" },
//     { name: "Gray" },
//     { name: "Green" },
//     { name: "GreenYellow" },
//     { name: "Honeydew" },
//     { name: "HotPink" },
//     { name: "IndianRed" },
//     { name: "Indigo" },
//     { name: "Ivory" },
//     { name: "Khaki" },
//     { name: "Lavender" },
//     { name: "LavenderBlush" },
//     { name: "LawnGreen" },
//     { name: "LemonChiffon" },
//     { name: "LightBlue" },
//     { name: "LightCoral" },
//     { name: "LightCyan" },
//     { name: "LightGoldenrodYellow" },
//     { name: "LightGreen" },
//     { name: "LightGrey" },
//     { name: "LightPink" },
//     { name: "LightSalmon" },
//     { name: "LightSeaGreen" },
//     { name: "LightSkyBlue" },
//     { name: "LightSlateGray" },
//     { name: "LightSteelBlue" },
//     { name: "LightYellow" },
//     { name: "Lime" },
//     { name: "LimeGreen" },
//     { name: "Linen" },
//     { name: "Magenta" },
//     { name: "Maroon" },
//     { name: "MediumAquamarine" },
//     { name: "MediumBlue" },
//     { name: "MediumOrchid" },
//     { name: "MediumPurple" },
//     { name: "MediumSeaGreen" },
//     { name: "MediumSlateBlue" },
//     { name: "MediumSpringGreen" },
//     { name: "MediumTurquoise" },
//     { name: "MediumVioletRed" },
//     { name: "MidnightBlue" },
//     { name: "MintCream" },
//     { name: "MistyRose" },
//     { name: "Moccasin" },
//     { name: "NavajoWhite" },
//     { name: "Navy" },
//     { name: "OldLace" },
//     { name: "OliveDrab" },
//     { name: "Orange" },
//     { name: "OrangeRed" },
//     { name: "Orchid" },
//     { name: "PaleGoldenrod" },
//     { name: "PaleGreen" },
//     { name: "PaleTurquoise" },
//     { name: "PaleVioletRed" },
//     { name: "PapayaWhip" },
//     { name: "PeachPuff" },
//     { name: "Peru" },
//     { name: "Pink" },
//     { name: "Plum" },
//     { name: "PowderBlue" },
//     { name: "Purple" },
//     { name: "Red" },
//     { name: "RosyBrown" },
//     { name: "RoyalBlue" },
//     { name: "SaddleBrown" },
//     { name: "Salmon" },
//     { name: "SandyBrown" },
//     { name: "SeaGreen" },
//     { name: "SeaShell" },
//     { name: "Sienna" },
//     { name: "Silver" },
//     { name: "SkyBlue" },
//     { name: "SlateBlue" },
//     { name: "Snow" },
//     { name: "SpringGreen" },
//     { name: "SteelBlue" },
//     { name: "Tan" },
//     { name: "Thistle" },
//     { name: "Teal" },
//     { name: "Tomato" },
//     { name: "Turquoise" },
//     { name: "Violet" },
//     { name: "Wheat" },
//     { name: "White" },
//     { name: "Whitesmoke" },
//     { name: "Yellow" },
//     { name: "YellowGreen" },
//   ]

//   const fetchProducts = useCallback(async () => {
//     try {
//       const response = await axios.get("https://api.silksew.com/api/products", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       const data = Array.isArray(response.data) ? response.data : response.data.products || []
//       setProducts(data)
//       updateTotalProducts?.(data.length)
//       const lowStockProducts = data.filter((product) => product.availableStock <= 5)
//       updateLowStockProducts?.(lowStockProducts)
//     } catch (error) {
//       console.error("Error fetching products:", error.message)
//       toast.error("Failed to fetch products.")
//     }
//   }, [token, updateTotalProducts, updateLowStockProducts])

//   useEffect(() => {
//     let mounted = true
//     fetchProducts().then(() => {
//       if (!mounted) return
//     })
//     return () => {
//       mounted = false
//     }
//   }, [fetchProducts])

//   const handleDeleteProduct = useCallback(async (id) => {
//     try {
//       await axios.delete(`https://api.silksew.com/api/products/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       toast.success("Product deleted successfully!")
//       fetchProducts()
//     } catch (error) {
//       console.error("Error deleting product:", error.message)
//       toast.error("Failed to delete product.")
//     }
//   }, [token, fetchProducts])

//   const getImage = useCallback((images, availableColors) => {
//     const defaultImage = "https://via.placeholder.com/150x150/cccccc/666666?text=No+Image"
//     if (!images || !Array.isArray(images) || images.length === 0) {
//       return defaultImage
//     }

//     try {
//       let imageData = images[0]
//       if (typeof imageData === "string") {
//         imageData = JSON.parse(imageData)
//       }
//       if (!imageData || typeof imageData !== "object") {
//         return defaultImage
//       }

//       if (availableColors && Array.isArray(availableColors)) {
//         for (const color of availableColors) {
//           const colorName = typeof color === "string" ? color : color?.name || ""
//           if (colorName && imageData[colorName] && Array.isArray(imageData[colorName]) && imageData[colorName].length > 0) {
//             const imageUrl = imageData[colorName][0]
//             if (imageUrl && typeof imageUrl === "string" && imageUrl.trim()) {
//               return imageUrl
//             }
//           }
//         }
//       }

//       const colorKeys = Object.keys(imageData)
//       for (const colorKey of colorKeys) {
//         if (imageData[colorKey] && Array.isArray(imageData[colorKey]) && imageData[colorKey].length > 0) {
//           const imageUrl = imageData[colorKey][0]
//           if (imageUrl && typeof imageUrl === "string" && imageUrl.trim()) {
//             return imageUrl
//           }
//         }
//       }
//       return defaultImage
//     } catch (error) {
//       console.warn("Error processing image data:", error.message)
//       return defaultImage
//     }
//   }, [])

//   const handleEditProduct = useCallback((product) => {
//     setEditingProduct(product);
//     setIsAdding(false);
//     setSelectedCategory(product.category[0]);

//     // Parse sizes
//     let sizes = [];
//     if (Array.isArray(product.availableSizes)) {
//       sizes = product.availableSizes;
//     } else if (typeof product.availableSizes === "string") {
//       try {
//         sizes = JSON.parse(product.availableSizes);
//       } catch {
//         sizes = product.availableSizes.split(",").map((size) => size.trim());
//       }
//     }
//     setPreviousSizes([...sizes]);

//     // Parse colors
//     let colors = [];
//     if (Array.isArray(product.availableColors)) {
//       colors = product.availableColors.flatMap((color) => {
//         if (typeof color === "string") {
//           if (!color.startsWith("{") && !color.startsWith("[")) return [color];
//           try {
//             const parsed = JSON.parse(color);
//             return Array.isArray(parsed)
//               ? parsed.map((c) => c.name || c)
//               : [parsed.name || parsed];
//           } catch {
//             return [color];
//           }
//         } else if (color && color.name) {
//           return [color.name];
//         }
//         return [];
//       });
//     } else if (typeof product.availableColors === "string") {
//       try {
//         const parsed = JSON.parse(product.availableColors);
//         colors = Array.isArray(parsed)
//           ? parsed.flatMap((color) =>
//               typeof color === "string"
//                 ? [color]
//                 : color.name
//                 ? [color.name]
//                 : []
//             )
//           : [];
//       } catch {
//         colors = [product.availableColors];
//       }
//     }

//     // Set form fields
//     form.setFieldsValue({
//       ...product,
//       category: product.category?.[0],
//       subcategory: product.subcategory?.[0],
//       colors,
//       stock: product.availableStock,
//       sizes,
//     });

//     // Images grouped by color
//     const initialColorImages = {};
//     if (product.images?.length > 0) {
//       try {
//         const parsedImages = JSON.parse(product.images[0]);
//         Object.entries(parsedImages).forEach(([color, urls]) => {
//           initialColorImages[color] = urls.map((url, index) => ({
//             uid: `${color}-${index}`,
//             name: `${color}-image-${index}`,
//             status: "done",
//             url,
//           }));
//         });
//       } catch (error) {
//         console.warn("Error parsing product images:", error.message);
//       }
//     }

//     setColorImages(initialColorImages);
//   }, [form])

//   const handleAddProduct = useCallback(() => {
//     setEditingProduct(null)
//     setIsAdding(true)
//     setSelectedCategory(null)
//     form.resetFields()
//     setColorImages({})
//     setSizeData({})
//     setPreviousSizes([])
//   }, [form])

//   const handleCategoryChange = useCallback((value) => {
//     setSelectedCategory(value)
//     form.setFieldsValue({
//       subcategory: undefined,
//       sizes: undefined,
//     })
//   }, [form])

//   const handleColorChange = useCallback((selectedColors) => {
//     setColorImages((prev) => {
//       const newColorImages = { ...prev }
//       selectedColors.forEach((color) => {
//         if (!newColorImages[color]) {
//           newColorImages[color] = []
//         }
//       })
//       Object.keys(newColorImages).forEach((color) => {
//         if (!selectedColors.includes(color)) {
//           delete newColorImages[color]
//         }
//       })
//       return newColorImages
//     })
//   }, [])

//   const handleSizeChange = useCallback((selectedSizes) => {
//     setSizeData((prev) => {
//       const newSizeData = { ...prev }
//       selectedSizes.forEach((size) => {
//         if (!newSizeData[size]) {
//           newSizeData[size] = { stock: 0 }
//         }
//       })
//       Object.keys(newSizeData).forEach((size) => {
//         if (!selectedSizes.includes(size)) {
//           delete newSizeData[size]
//         }
//       })
//       return newSizeData
//     })
//     setPreviousSizes(selectedSizes)
//     form.setFieldsValue({ sizes: selectedSizes })
//   }, [form])

//   const handleImageChange = useCallback((color, { fileList }) => {
//     setColorImages((prev) => ({
//       ...prev,
//       [color]: fileList,
//     }))
//   }, [])

//   const handlePreview = useCallback(async (file) => {
//     if (!file.url && !file.preview) {
//       try {
//         file.preview = await new Promise((resolve, reject) => {
//           const reader = new FileReader()
//           reader.readAsDataURL(file.originFileObj)
//           reader.onload = () => resolve(reader.result)
//           reader.onerror = (error) => reject(error)
//         })
//       } catch (error) {
//         console.warn("Error generating image preview:", error.message)
//         return
//       }
//     }
//     setPreviewImage(file.url || file.preview)
//     setPreviewVisible(true)
//     setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1))
//   }, [])

//   const handleSubmitProduct = useCallback(async (values) => {
//     await submitProductData({ ...values, sizes: values.sizes || previousSizes })
//   }, [previousSizes])

//   const handleWarningConfirm = useCallback(() => {
//     setShowWarningModal(false)
//     const formValues = form.getFieldsValue()
//     submitProductData(formValues)
//   }, [form])

//   const submitProductData = useCallback(async (values) => {
//     try {
//       const productData = new FormData()
//       productData.append("name", values.name)
//       productData.append("description", values.description)
//       productData.append("price", values.price)
//       productData.append("oldPrice", values.oldPrice || "")
//       productData.append("category", values.category)
//       productData.append("subcategory", values.subcategory)
//       productData.append("availableStock", values.stock)

//       const sizes = values.sizes || previousSizes
//       productData.append("availableSizes", JSON.stringify(sizes))

//       const colors = values.colors || []
//       colors.forEach((color) => {
//         productData.append("availableColors[]", color)
//       })

//       const uploadedImagesByColor = {}
//       for (const color of colors) {
//         if (colorImages[color]) {
//           const uploadedImages = await Promise.all(
//             colorImages[color].map(async (file) => {
//               if (file.url) {
//                 return file.url
//               }
//               const data = new FormData()
//               data.append("file", file.originFileObj)
//               data.append("upload_preset", "Silksew")
//               data.append("cloud_name", "dejdni8vi")
//               data.append("folder", "products")

//               const res = await fetch("https://api.cloudinary.com/v1_1/dejdni8vi/image/upload", {
//                 method: "POST",
//                 body: data,
//               })

//               if (!res.ok) {
//                 throw new Error("Image upload failed")
//               }

//               const uploadedImage = await res.json()
//               return uploadedImage.secure_url
//             })
//           )
//           uploadedImagesByColor[color] = uploadedImages
//         }
//       }

//       productData.append("images", JSON.stringify(uploadedImagesByColor))

//       const response = isAdding
//         ? await axios.post("https://api.silksew.com/api/products", productData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         })
//         : await axios.put(`https://api.silksew.com/api/products/${editingProduct._id}`, productData, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         })

//       if (response.data) {
//         toast.success(isAdding ? "Product added successfully!" : "Product updated successfully!")
//         setEditingProduct(null)
//         setIsAdding(false)
//         setColorImages({})
//         setSizeData({})
//         setPreviousSizes([])
//         form.resetFields()
//         fetchProducts()
//       }
//     } catch (error) {
//       console.error("Error submitting product:", error.message)
//       toast.error(`Failed to ${isAdding ? "add" : "update"} product. ${error.response?.data?.message || ""}`)
//     }
//   }, [isAdding, editingProduct, token, fetchProducts, form, colorImages, previousSizes])

//   const handleCancelEdit = useCallback(() => {
//     setEditingProduct(null)
//     setIsAdding(false)
//     setColorImages({})
//     setSizeData({})
//     setPreviousSizes([])
//     form.resetFields()
//   }, [form])

//   const getFilteredProducts = useMemo(() => {
//     return products.filter((product) => {
//       const searchRegex = new RegExp(debouncedSearchTerm, "i")
//       return (
//         searchRegex.test(product.name) ||
//         searchRegex.test(product.category.join(", ")) ||
//         searchRegex.test(product.subcategory.join(", ")) ||
//         searchRegex.test(product.availableColors.map((c) => c.name || c).join(", ")) ||
//         searchRegex.test(product.availableSizes.join(", ")) ||
//         searchRegex.test(product.price.toString()) ||
//         searchRegex.test(product.oldPrice ? product.oldPrice.toString() : "") ||
//         searchRegex.test(product.availableStock.toString())
//       )
//     })
//   }, [products, debouncedSearchTerm])

//   const indexOfLastProduct = currentPage * productsPerPage
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage
//   const currentProducts = useMemo(() => getFilteredProducts.slice(indexOfFirstProduct, indexOfLastProduct), [
//     getFilteredProducts,
//     indexOfFirstProduct,
//     indexOfLastProduct,
//   ])
//   const totalPages = Math.ceil(getFilteredProducts.length / productsPerPage)

//   const paginate = useCallback((pageNumber) => {
//     if (pageNumber >= 1 && pageNumber <= totalPages) {
//       setCurrentPage(pageNumber)
//     }
//   }, [totalPages])

//   const renderSearchSection = useCallback(() => (
//     <div className="search-section">
//       <Input
//         placeholder="Search products..."
//         prefix={<SearchOutlined />}
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         allowClear
//       />
//     </div>
//   ), [searchTerm])

//   const renderProductTable = useCallback(() => (
//     <>
//       <h2>Admin Product List</h2>
//       {renderSearchSection()}
//       <table className="product-table">
//         <thead>
//           <tr>
//             <th>Sr. No</th>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Category</th>
//             <th>Sub Category</th>
//             <th>Colors</th>
//             <th>Sizes</th>
//             <th>Price</th>
//             <th>Old Price</th>
//             <th>Stock</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentProducts.map((product, index) => {
//             let displayColors = []
//             if (typeof product.availableColors === "string") {
//               try {
//                 displayColors = JSON.parse(product.availableColors).map((color) => (typeof color === "string" ? color : color.name))
//               } catch {
//                 displayColors = [product.availableColors]
//               }
//             } else if (Array.isArray(product.availableColors)) {
//               displayColors = product.availableColors.map((color) => (typeof color === "string" ? color : color.name))
//             }

//             let displaySizes = []
//             if (typeof product.availableSizes === "string") {
//               try {
//                 displaySizes = JSON.parse(product.availableSizes)
//               } catch {
//                 displaySizes = product.availableSizes.split(",").map((size) => size.trim())
//               }
//             } else if (Array.isArray(product.availableSizes)) {
//               displaySizes = product.availableSizes
//             }

//             const productImageUrl = getImage(product.images, product.availableColors)

//             return (
//               <tr key={product._id}>
//                 <td data-label="Sr. No">{(currentPage - 1) * productsPerPage + index + 1}</td>
//                 <td data-label="Image">
//                   <ProductImage src={productImageUrl} alt={product.name || "Product image"} width={50} height={50} />
//                 </td>
//                 <td data-label="Name">{product.name}</td>
//                 <td data-label="Category">{product.category.join(", ")}</td>
//                 <td data-label="Sub Category">{product.subcategory.join(", ")}</td>
//                 <td data-label="Colors">{displayColors.join(", ") || "N/A"}</td>
//                 <td data-label="Sizes">{displaySizes.join(", ") || "N/A"}</td>
//                 <td data-label="Price">Rs.{product.price}</td>
//                 <td data-label="Old Price">{product.oldPrice ? `Rs.${product.oldPrice}` : "N/A"}</td>
//                 <td data-label="Stock">{product.availableStock}</td>
//                 <td data-label="Actions">
//                   <Button
//                     type="primary"
//                     icon={<EditOutlined />}
//                     onClick={() => handleEditProduct(product)}
//                     className="edit-btn"
//                   />
//                   <Button
//                     type="primary"
//                     danger
//                     icon={<DeleteOutlined />}
//                     onClick={() => handleDeleteProduct(product._id)}
//                     className="delete-btn"
//                   />
//                 </td>
//               </tr>
//             )
//           })}
//         </tbody>
//       </table>
//     </>
//   ), [currentProducts, currentPage, productsPerPage, getImage, handleEditProduct, handleDeleteProduct, renderSearchSection])

//   const renderPagination = useCallback(() => {
//     const pageNumbers = []
//     const maxPagesToShow = 5
//     let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
//     let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

//     if (endPage - startPage + 1 < maxPagesToShow) {
//       startPage = Math.max(1, endPage - maxPagesToShow + 1)
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i)
//     }

//     return (
//       <div className="pagination">
//         <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
//           Prev
//         </Button>
//         {startPage > 1 && (
//           <>
//             <Button onClick={() => paginate(1)}>1</Button>
//             {startPage > 2 && <span>...</span>}
//           </>
//         )}
//         {pageNumbers.map((pageNumber) => (
//           <Button
//             key={pageNumber}
//             onClick={() => paginate(pageNumber)}
//             type={currentPage === pageNumber ? "primary" : "default"}
//           >
//             {pageNumber}
//           </Button>
//         ))}
//         {endPage < totalPages && (
//           <>
//             {endPage < totalPages - 1 && <span>...</span>}
//             <Button onClick={() => paginate(totalPages)}>{totalPages}</Button>
//           </>
//         )}
//         <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
//           Next
//         </Button>
//       </div>
//     )
//   }, [currentPage, totalPages, paginate])

//   return (
//     <div className="product-list" style={{ padding: "24px 32px" }}>
//       {editingProduct || isAdding ? (
//         <div className="product-form" style={{ maxHeight: "80vh", overflowY: "auto" }}>
//           <h2>{isAdding ? "Add New Product" : "Edit Product"}</h2>
//           <Form form={form} layout="vertical" onFinish={handleSubmitProduct}>
//             <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
//               <Input placeholder="Enter product name" />
//             </Form.Item>

//             <Form.Item name="category" label="Category" rules={[{ required: true }]}>
//               <Select placeholder="Select category" onChange={handleCategoryChange}>
//                 {categories.map((cat) => (
//                   <Option key={cat} value={cat}>
//                     {cat}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             {selectedCategory && (
//               <Form.Item name="subcategory" label="Subcategory" rules={[{ required: true }]}>
//                 <Select placeholder="Select subcategory">
//                   {subcategories[selectedCategory].map((sub) => (
//                     <Option key={sub} value={sub}>
//                       {sub}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             )}

//             <Form.Item name="description" label="Description" rules={[{ required: true }]}>
//               <TextArea rows={4} placeholder="Enter product description" />
//             </Form.Item>

//             <Form.Item
//               name="price"
//               label="Price"
//               rules={[
//                 { required: true, message: "Please enter price" },
//                 {
//                   validator: (_, value) =>
//                     value > 0 ? Promise.resolve() : Promise.reject(new Error("Price must be greater than 0")),
//                 },
//               ]}
//             >
//               <InputNumber style={{ width: "100%" }} min={0.01} step={0.01} placeholder="Enter price" />
//             </Form.Item>

//             <Form.Item name="oldPrice" label="Old Price">
//               <InputNumber style={{ width: "100%" }} min={0} placeholder="Enter old price" />
//             </Form.Item>

//             <Form.Item
//               name="stock"
//               label="Available Stock"
//               rules={[{ required: true, message: "Please enter available stock" }]}
//             >
//               <InputNumber style={{ width: "100%" }} min={0} placeholder="Enter available stock" />
//             </Form.Item>

//             <Form.Item
//               name="sizes"
//               label="Available Sizes"
//               rules={[{ required: true, message: "Please select at least one size" }]}
//             >
//               <Select
//                 mode="multiple"
//                 placeholder="Select available sizes"
//                 style={{ width: "100%" }}
//                 onChange={handleSizeChange}
//                 value={previousSizes}
//               >
//                 {["XS", "S", "M", "L", "XL", "XXL", "2T", "3T", "4T", "5", "6", "7", "8"].map((size) => (
//                   <Option key={size} value={size}>
//                     {size}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item
//               name="colors"
//               label="Colors"
//               rules={[{ required: true, message: "Please select at least one color" }]}
//             >
//               <Select mode="multiple" placeholder="Select colors" onChange={handleColorChange}>
//                 {colorOptions.map(({ name }) => (
//                   <Option key={name} value={name}>
//                     {name}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             {form.getFieldValue("colors")?.map((color) => (
//               <Form.Item key={color} label={`Images for ${color}`}>
//                 <Upload
//                   listType="picture-card"
//                   fileList={colorImages[color] || []}
//                   onPreview={handlePreview}
//                   onChange={(info) => handleImageChange(color, info)}
//                   beforeUpload={() => false}
//                   multiple={true}
//                 >
//                   {(colorImages[color]?.length || 0) < 5 && (
//                     <div>
//                       <PlusOutlined />
//                       <div style={{ marginTop: 8 }}>Upload</div>
//                     </div>
//                   )}
//                 </Upload>
//               </Form.Item>
//             ))}

//             <Form.Item>
//               <Button type="primary" htmlType="submit">
//                 {isAdding ? "Add Product" : "Update Product"}
//               </Button>
//               <Button onClick={handleCancelEdit} style={{ marginLeft: 8 }}>
//                 Cancel
//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       ) : (
//         <div>
//           <Button type="primary" onClick={handleAddProduct} style={{ marginBottom: 16 }}>
//             <PlusOutlined /> Add New Product
//           </Button>
//           {renderProductTable()}
//           {renderPagination()}
//         </div>
//       )}

//       <Modal
//         visible={showWarningModal}
//         title="Warning"
//         onOk={handleWarningConfirm}
//         onCancel={() => setShowWarningModal(false)}
//       >
//         <p>You haven't made any changes to the sizes or colors. Are you sure you want to update the product?</p>
//       </Modal>

//       <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={() => setPreviewVisible(false)}>
//         <img
//           alt="example"
//           style={{ width: "100%" }}
//           src={previewImage || "https://via.placeholder.com/400x400/cccccc/666666?text=No+Image"}
//         />
//       </Modal>

//       <ToastContainer />
//     </div>
//   )
// }

// export default React.memo(AdminProductlist)



// "use client"

// import { useState, useEffect, useContext, useCallback, useMemo } from "react"
// import axios from "axios"
// import { AuthContext } from "../context/AuthContext"
// import { ToastContainer, toast } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import "../pages/CSS/AdminProductlist.css"
// import { Form, Input, Select, InputNumber, Button, Upload, Modal } from "antd"
// import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons"
// import React from "react"

// const { TextArea } = Input
// const { Option } = Select

// // Custom hook for debouncing
// const useDebounce = (value, delay) => {
//   const [debouncedValue, setDebouncedValue] = useState(value)

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value)
//     }, delay)

//     return () => {
//       clearTimeout(handler)
//     }
//   }, [value, delay])

//   return debouncedValue
// }

// // Memoized ProductImage component to prevent unnecessary re-renders
// const ProductImage = React.memo(({ src, alt, width = 50, height = 50 }) => {
//   const [imgSrc, setImgSrc] = useState(src)
//   const [hasError, setHasError] = useState(false)

//   useEffect(() => {
//     setImgSrc(src)
//     setHasError(false)
//   }, [src])

//   const handleError = useCallback(() => {
//     if (!hasError) {
//       setHasError(true)
//       setImgSrc("https://via.placeholder.com/150x150/cccccc/666666?text=No+Image")
//     }
//   }, [hasError])

//   return (
//     <img
//       src={imgSrc || "/placeholder.svg"}
//       alt={alt}
//       width={width}
//       height={height}
//       style={{
//         objectFit: "cover",
//         border: "1px solid #d9d9d9",
//         borderRadius: "4px",
//         backgroundColor: "#f5f5f5",
//       }}
//       onError={handleError}
//     />
//   )
// })

// function AdminProductlist({ updateTotalProducts, updateLowStockProducts }) {
//   const { token } = useContext(AuthContext)
//   const [products, setProducts] = useState([])
//   const [currentPage, setCurrentPage] = useState(1)
//   const [productsPerPage] = useState(3)
//   const [editingProduct, setEditingProduct] = useState(null)
//   const [isAdding, setIsAdding] = useState(false)
//   const [form] = Form.useForm()
//   const [selectedCategory, setSelectedCategory] = useState(null)
//   const [colorImages, setColorImages] = useState({})
//   const [sizeData, setSizeData] = useState({})
//   const [previewVisible, setPreviewVisible] = useState(false)
//   const [previewImage, setPreviewImage] = useState("")
//   const [previewTitle, setPreviewTitle] = useState("")
//   const [showWarningModal, setShowWarningModal] = useState(false)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [previousSizes, setPreviousSizes] = useState([])

//   const debouncedSearchTerm = useDebounce(searchTerm, 300)

//   const categories = ["men", "women", "kid"]

//   const subcategories = {
//     men: [
//       "Traditional Wear",
//       "Casual Wear",
//       "Formal Wear",
//       "Ethnic Wear",
//       "Street Style",
//       "Smart Casuals",
//       "Athleisure",
//       "Summer Wear",
//       "Winter Wear",
//       "Party Wear",
//       "Wedding Wear",
//       "Indo-Western",
//       "Loungewear",
//       "Vacation Wear",
//       "Festive Wear",
//     ],
//     women: [
//       "Saree",
//       "Lehenga",
//       "Salwar Kameez",
//       "Anarkali Dress",
//       "Kurti",
//       "Churidar",
//       "Palazzo Pants",
//       "Indo-Western",
//       "Tunic",
//       "Maxi Dress",
//       "Dress (Western)",
//       "Skirt and Top",
//       "Peplum Top",
//       "Straight Cut Kurti",
//       "Ethnic Gown",
//       "Kaftan",
//       "Jumpsuit (Western)",
//       "Trousers and Blouse",
//       "Palazzo and Kurti",
//       "Sharara Suit",
//       "Dhoti Pants and Kurti",
//     ],
//     kid: [
//       "Traditional Wear",
//       "Western Wear",
//       "Casual Wear",
//       "Party Wear",
//       "Ethnic Wear",
//       "Festive Wear",
//       "Sportswear",
//       "Loungewear",
//       "Smart Casuals",
//       "T-shirts and Jeans",
//       "Shorts and Tops",
//       "Dresses and Skirts",
//       "Kurta and Pajama",
//       "Lehenga Choli",
//       "Sherwani",
//       "Rompers and Jumpsuits",
//     ],
//   }

//   const colorOptions = [
//     { name: "AliceBlue" },
//     { name: "AntiqueWhite" },
//     { name: "Aqua" },
//     { name: "Aquamarine" },
//     { name: "Azure" },
//     { name: "Beige" },
//     { name: "Bisque" },
//     { name: "BlanchedAlmond" },
//     { name: "Blue" },
//     { name: "BlueViolet" },
//     { name: "Brown" },
//     { name: "Burlywood" },
//     { name: "CadetBlue" },
//     { name: "Chartreuse" },
//     { name: "Chocolate" },
//     { name: "Angel" },
//     { name: "CornflowerBlue" },
//     { name: "Cornsilk" },
//     { name: "Crimson" },
//     { name: "Cyan" },
//     { name: "DarkBlue" },
//     { name: "DarkCyan" },
//     { name: "DarkGoldenrod" },
//     { name: "DarkGray" },
//     { name: "DarkGreen" },
//     { name: "DarkKhaki" },
//     { name: "DarkMagenta" },
//     { name: "DarkOliveGreen" },
//     { name: "DarkOrange" },
//     { name: "DarkOrchid" },
//     { name: "DarkRed" },
//     { name: "DarkSalmon" },
//     { name: "DarkSeagreen" },
//     { name: "DarkSlateBlue" },
//     { name: "DarkSlateGray" },
//     { name: "DarkTurquoise" },
//     { name: "DarkViolet" },
//     { name: "DeepPink" },
//     { name: "DeepSkyBlue" },
//     { name: "DimGray" },
//     { name: "DodgerBlue" },
//     { name: "Firebrick" },
//     { name: "FloralWhite" },
//     { name: "ForestGreen" },
//     { name: "Fuchsia" },
//     { name: "Gainsboro" },
//     { name: "GhostWhite" },
//     { name: "Gold" },
//     { name: "Goldenrod" },
//     { name: "Gray" },
//     { name: "Green" },
//     { name: "GreenYellow" },
//     { name: "Honeydew" },
//     { name: "HotPink" },
//     { name: "IndianRed" },
//     { name: "Indigo" },
//     { name: "Ivory" },
//     { name: "Khaki" },
//     { name: "Lavender" },
//     { name: "LavenderBlush" },
//     { name: "LawnGreen" },
//     { name: "LemonChiffon" },
//     { name: "LightBlue" },
//     { name: "LightCoral" },
//     { name: "LightCyan" },
//     { name: "LightGoldenrodYellow" },
//     { name: "LightGreen" },
//     { name: "LightGrey" },
//     { name: "LightPink" },
//     { name: "LightSalmon" },
//     { name: "LightSeaGreen" },
//     { name: "LightSkyBlue" },
//     { name: "LightSlateGray" },
//     { name: "LightSteelBlue" },
//     { name: "LightYellow" },
//     { name: "Lime" },
//     { name: "LimeGreen" },
//     { name: "Linen" },
//     { name: "Magenta" },
//     { name: "Maroon" },
//     { name: "MediumAquamarine" },
//     { name: "MediumBlue" },
//     { name: "MediumOrchid" },
//     { name: "MediumPurple" },
//     { name: "MediumSeaGreen" },
//     { name: "MediumSlateBlue" },
//     { name: "MediumSpringGreen" },
//     { name: "MediumTurquoise" },
//     { name: "MediumVioletRed" },
//     { name: "MidnightBlue" },
//     { name: "MintCream" },
//     { name: "MistyRose" },
//     { name: "Moccasin" },
//     { name: "NavajoWhite" },
//     { name: "Navy" },
//     { name: "OldLace" },
//     { name: "OliveDrab" },
//     { name: "Orange" },
//     { name: "OrangeRed" },
//     { name: "Orchid" },
//     { name: "PaleGoldenrod" },
//     { name: "PaleGreen" },
//     { name: "PaleTurquoise" },
//     { name: "PaleVioletRed" },
//     { name: "PapayaWhip" },
//     { name: "PeachPuff" },
//     { name: "Peru" },
//     { name: "Pink" },
//     { name: "Plum" },
//     { name: "PowderBlue" },
//     { name: "Purple" },
//     { name: "Red" },
//     { name: "RosyBrown" },
//     { name: "RoyalBlue" },
//     { name: "SaddleBrown" },
//     { name: "Salmon" },
//     { name: "SandyBrown" },
//     { name: "SeaGreen" },
//     { name: "SeaShell" },
//     { name: "Sienna" },
//     { name: "Silver" },
//     { name: "SkyBlue" },
//     { name: "SlateBlue" },
//     { name: "Snow" },
//     { name: "SpringGreen" },
//     { name: "SteelBlue" },
//     { name: "Tan" },
//     { name: "Thistle" },
//     { name: "Teal" },
//     { name: "Tomato" },
//     { name: "Turquoise" },
//     { name: "Violet" },
//     { name: "Wheat" },
//     { name: "White" },
//     { name: "Whitesmoke" },
//     { name: "Yellow" },
//     { name: "YellowGreen" },
//   ]

//   const fetchProducts = useCallback(async () => {
//     try {
//       const response = await axios.get("https://api.silksew.com/api/products", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       const data = Array.isArray(response.data) ? response.data : response.data.products || []
//       setProducts(data)
//       updateTotalProducts?.(data.length)
//       const lowStockProducts = data.filter((product) => product.availableStock <= 5)
//       updateLowStockProducts?.(lowStockProducts)
//     } catch (error) {
//       console.error("Error fetching products:", error.message)
//       toast.error("Failed to fetch products.")
//     }
//   }, [token, updateTotalProducts, updateLowStockProducts])

//   useEffect(() => {
//     let mounted = true
//     fetchProducts().then(() => {
//       if (!mounted) return
//     })
//     return () => {
//       mounted = false
//     }
//   }, [fetchProducts])

//   const handleDeleteProduct = useCallback(
//     async (id) => {
//       try {
//         await axios.delete(`https://api.silksew.com/api/products/${id}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         toast.success("Product deleted successfully!")
//         fetchProducts()
//       } catch (error) {
//         console.error("Error deleting product:", error.message)
//         toast.error("Failed to delete product.")
//       }
//     },
//     [token, fetchProducts],
//   )

//   const getImage = useCallback((images, availableColors) => {
//     const defaultImage = "https://via.placeholder.com/150x150/cccccc/666666?text=No+Image"
//     if (!images || !Array.isArray(images) || images.length === 0) {
//       return defaultImage
//     }

//     try {
//       let imageData = images[0]
//       if (typeof imageData === "string") {
//         imageData = JSON.parse(imageData)
//       }
//       if (!imageData || typeof imageData !== "object") {
//         return defaultImage
//       }

//       if (availableColors && Array.isArray(availableColors)) {
//         for (const color of availableColors) {
//           const colorName = typeof color === "string" ? color : color?.name || ""
//           if (
//             colorName &&
//             imageData[colorName] &&
//             Array.isArray(imageData[colorName]) &&
//             imageData[colorName].length > 0
//           ) {
//             const imageUrl = imageData[colorName][0]
//             if (imageUrl && typeof imageUrl === "string" && imageUrl.trim()) {
//               return imageUrl
//             }
//           }
//         }
//       }

//       const colorKeys = Object.keys(imageData)
//       for (const colorKey of colorKeys) {
//         if (imageData[colorKey] && Array.isArray(imageData[colorKey]) && imageData[colorKey].length > 0) {
//           const imageUrl = imageData[colorKey][0]
//           if (imageUrl && typeof imageUrl === "string" && imageUrl.trim()) {
//             return imageUrl
//           }
//         }
//       }
//       return defaultImage
//     } catch (error) {
//       console.warn("Error processing image data:", error.message)
//       return defaultImage
//     }
//   }, [])

//   const handleEditProduct = useCallback(
//     (product) => {
//       setEditingProduct(product)
//       setIsAdding(false)
//       setSelectedCategory(product.category[0])

//       // Parse sizes
//       let sizes = []
//       if (Array.isArray(product.availableSizes)) {
//         sizes = product.availableSizes
//       } else if (typeof product.availableSizes === "string") {
//         try {
//           sizes = JSON.parse(product.availableSizes)
//         } catch {
//           sizes = product.availableSizes.split(",").map((size) => size.trim())
//         }
//       }
//       setPreviousSizes([...sizes])

//       // Parse colors
//       let colors = []
//       if (Array.isArray(product.availableColors)) {
//         colors = product.availableColors.flatMap((color) => {
//           if (typeof color === "string") {
//             if (!color.startsWith("{") && !color.startsWith("[")) return [color]
//             try {
//               const parsed = JSON.parse(color)
//               return Array.isArray(parsed) ? parsed.map((c) => c.name || c) : [parsed.name || parsed]
//             } catch {
//               return [color]
//             }
//           } else if (color && color.name) {
//             return [color.name]
//           }
//           return []
//         })
//       } else if (typeof product.availableColors === "string") {
//         try {
//           const parsed = JSON.parse(product.availableColors)
//           colors = Array.isArray(parsed)
//             ? parsed.flatMap((color) => (typeof color === "string" ? [color] : color.name ? [color.name] : []))
//             : []
//         } catch {
//           colors = [product.availableColors]
//         }
//       }

//       // Set form fields
//       form.setFieldsValue({
//         ...product,
//         category: product.category?.[0],
//         subcategory: product.subcategory?.[0],
//         colors,
//         stock: product.availableStock,
//         sizes,
//       })

//       // Images grouped by color
//       const initialColorImages = {}
//       if (product.images?.length > 0) {
//         try {
//           const parsedImages = JSON.parse(product.images[0])
//           Object.entries(parsedImages).forEach(([color, urls]) => {
//             initialColorImages[color] = urls.map((url, index) => ({
//               uid: `${color}-${index}`,
//               name: `${color}-image-${index}`,
//               status: "done",
//               url,
//             }))
//           })
//         } catch (error) {
//           console.warn("Error parsing product images:", error.message)
//         }
//       }

//       setColorImages(initialColorImages)
//     },
//     [form],
//   )

//   const handleAddProduct = useCallback(() => {
//     setEditingProduct(null)
//     setIsAdding(true)
//     setSelectedCategory(null)
//     form.resetFields()
//     setColorImages({})
//     setSizeData({})
//     setPreviousSizes([])
//   }, [form])

//   const handleCategoryChange = useCallback(
//     (value) => {
//       setSelectedCategory(value)
//       form.setFieldsValue({
//         subcategory: undefined,
//         sizes: undefined,
//       })
//     },
//     [form],
//   )

//   const handleColorChange = useCallback((selectedColors) => {
//     setColorImages((prev) => {
//       const newColorImages = { ...prev }
//       selectedColors.forEach((color) => {
//         if (!newColorImages[color]) {
//           newColorImages[color] = []
//         }
//       })
//       Object.keys(newColorImages).forEach((color) => {
//         if (!selectedColors.includes(color)) {
//           delete newColorImages[color]
//         }
//       })
//       return newColorImages
//     })
//   }, [])

//   const handleSizeChange = useCallback(
//     (selectedSizes) => {
//       setSizeData((prev) => {
//         const newSizeData = { ...prev }
//         selectedSizes.forEach((size) => {
//           if (!newSizeData[size]) {
//             newSizeData[size] = { stock: 0 }
//           }
//         })
//         Object.keys(newSizeData).forEach((size) => {
//           if (!selectedSizes.includes(size)) {
//             delete newSizeData[size]
//           }
//         })
//         return newSizeData
//       })
//       setPreviousSizes(selectedSizes)
//       form.setFieldsValue({ sizes: selectedSizes })
//     },
//     [form],
//   )

//   const handleImageChange = useCallback((color, { fileList }) => {
//     setColorImages((prev) => ({
//       ...prev,
//       [color]: fileList,
//     }))
//   }, [])

//   const handlePreview = useCallback(async (file) => {
//     if (!file.url && !file.preview) {
//       try {
//         file.preview = await new Promise((resolve, reject) => {
//           const reader = new FileReader()
//           reader.readAsDataURL(file.originFileObj)
//           reader.onload = () => resolve(reader.result)
//           reader.onerror = (error) => reject(error)
//         })
//       } catch (error) {
//         console.warn("Error generating image preview:", error.message)
//         return
//       }
//     }
//     setPreviewImage(file.url || file.preview)
//     setPreviewVisible(true)
//     setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1))
//   }, [])

//   const handleSubmitProduct = useCallback(
//     async (values) => {
//       await submitProductData({ ...values, sizes: values.sizes || previousSizes })
//     },
//     [previousSizes],
//   )

//   const handleWarningConfirm = useCallback(() => {
//     setShowWarningModal(false)
//     const formValues = form.getFieldsValue()
//     submitProductData(formValues)
//   }, [form])

//   const submitProductData = useCallback(
//     async (values) => {
//       try {
//         const productData = new FormData()
//         productData.append("name", values.name)
//         productData.append("description", values.description)
//         productData.append("price", values.price)
//         productData.append("oldPrice", values.oldPrice || "")
//         productData.append("category", values.category)
//         productData.append("subcategory", values.subcategory)
//         productData.append("availableStock", values.stock)

//         const sizes = values.sizes || previousSizes
//         productData.append("availableSizes", JSON.stringify(sizes))

//         const colors = values.colors || []
//         colors.forEach((color) => {
//           productData.append("availableColors[]", color)
//         })

//         const uploadedImagesByColor = {}
//         for (const color of colors) {
//           if (colorImages[color]) {
//             const uploadedImages = await Promise.all(
//               colorImages[color].map(async (file) => {
//                 if (file.url) {
//                   return file.url
//                 }
//                 const data = new FormData()
//                 data.append("file", file.originFileObj)
//                 data.append("upload_preset", "Silksew")
//                 data.append("cloud_name", "dejdni8vi")
//                 data.append("folder", "products")

//                 const res = await fetch("https://api.cloudinary.com/v1_1/dejdni8vi/image/upload", {
//                   method: "POST",
//                   body: data,
//                 })

//                 if (!res.ok) {
//                   throw new Error("Image upload failed")
//                 }

//                 const uploadedImage = await res.json()
//                 return uploadedImage.secure_url
//               }),
//             )
//             uploadedImagesByColor[color] = uploadedImages
//           }
//         }

//         productData.append("images", JSON.stringify(uploadedImagesByColor))

//         const response = isAdding
//           ? await axios.post("https://api.silksew.com/api/products", productData, {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "multipart/form-data",
//               },
//             })
//           : await axios.put(`https://api.silksew.com/api/products/${editingProduct._id}`, productData, {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "multipart/form-data",
//               },
//             })

//         if (response.data) {
//           toast.success(isAdding ? "Product added successfully!" : "Product updated successfully!")
//           setEditingProduct(null)
//           setIsAdding(false)
//           setColorImages({})
//           setSizeData({})
//           setPreviousSizes([])
//           form.resetFields()
//           fetchProducts()
//         }
//       } catch (error) {
//         console.error("Error submitting product:", error.message)
//         toast.error(`Failed to ${isAdding ? "add" : "update"} product. ${error.response?.data?.message || ""}`)
//       }
//     },
//     [isAdding, editingProduct, token, fetchProducts, form, colorImages, previousSizes],
//   )

//   const handleCancelEdit = useCallback(() => {
//     setEditingProduct(null)
//     setIsAdding(false)
//     setColorImages({})
//     setSizeData({})
//     setPreviousSizes([])
//     form.resetFields()
//   }, [form])

//   const getFilteredProducts = useMemo(() => {
//     return products.filter((product) => {
//       const searchRegex = new RegExp(debouncedSearchTerm, "i")
//       return (
//         searchRegex.test(product.name) ||
//         searchRegex.test(product.category.join(", ")) ||
//         searchRegex.test(product.subcategory.join(", ")) ||
//         searchRegex.test(product.availableColors.map((c) => c.name || c).join(", ")) ||
//         searchRegex.test(product.availableSizes.join(", ")) ||
//         searchRegex.test(product.price.toString()) ||
//         searchRegex.test(product.oldPrice ? product.oldPrice.toString() : "") ||
//         searchRegex.test(product.availableStock.toString())
//       )
//     })
//   }, [products, debouncedSearchTerm])

//   const indexOfLastProduct = currentPage * productsPerPage
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage
//   const currentProducts = useMemo(
//     () => getFilteredProducts.slice(indexOfFirstProduct, indexOfLastProduct),
//     [getFilteredProducts, indexOfFirstProduct, indexOfLastProduct],
//   )
//   const totalPages = Math.ceil(getFilteredProducts.length / productsPerPage)

//   const paginate = useCallback(
//     (pageNumber) => {
//       if (pageNumber >= 1 && pageNumber <= totalPages) {
//         setCurrentPage(pageNumber)
//       }
//     },
//     [totalPages],
//   )

//   const renderSearchSection = useCallback(
//     () => (
//       <div className="search-section">
//         <Input
//           placeholder="Search products..."
//           prefix={<SearchOutlined />}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           allowClear
//         />
//       </div>
//     ),
//     [searchTerm],
//   )

//   const renderProductTable = useCallback(
//     () => (
//       <>
//         <h2>Admin Product List</h2>
//         {renderSearchSection()}
//         <table className="product-table">
//           <thead>
//             <tr>
//               <th>Sr. No</th>
//               <th>Image</th>
//               <th>Name</th>
//               <th>Category</th>
//               <th>Sub Category</th>
//               <th>Colors</th>
//               <th>Sizes</th>
//               <th>Price</th>
//               <th>Old Price</th>
//               <th>Stock</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentProducts.map((product, index) => {
//               let displayColors = []
//               if (typeof product.availableColors === "string") {
//                 try {
//                   displayColors = JSON.parse(product.availableColors).map((color) =>
//                     typeof color === "string" ? color : color.name,
//                   )
//                 } catch {
//                   displayColors = [product.availableColors]
//                 }
//               } else if (Array.isArray(product.availableColors)) {
//                 displayColors = product.availableColors.map((color) => (typeof color === "string" ? color : color.name))
//               }

//               let displaySizes = []
//               if (Array.isArray(product.availableSizes)) {
//                 displaySizes = product.availableSizes
//               } else if (typeof product.availableSizes === "string") {
//                 try {
//                   let parsedSizes = product.availableSizes
//                   // Recursively parse until we get a flat array
//                   while (typeof parsedSizes === "string") {
//                     parsedSizes = JSON.parse(parsedSizes)
//                   }
//                   displaySizes = Array.isArray(parsedSizes) ? parsedSizes.flat(Number.POSITIVE_INFINITY) : [parsedSizes]
//                 } catch {
//                   displaySizes = product.availableSizes.split(",").map((size) => size.trim())
//                 }
//               }

//               // Clean up the sizes display - remove quotes and brackets, show as plain text
//               const cleanSizes = displaySizes
//                 .map((size) => {
//                   // Remove any quotes and extra characters, just keep the size value
//                   return String(size)
//                     .replace(/["[\]]/g, "")
//                     .trim()
//                 })
//                 .filter((size) => size.length > 0)

//               const productImageUrl = getImage(product.images, product.availableColors)

//               return (
//                 <tr key={product._id}>
//                   <td data-label="Sr. No">{(currentPage - 1) * productsPerPage + index + 1}</td>
//                   <td data-label="Image">
//                     <ProductImage src={productImageUrl} alt={product.name || "Product image"} width={50} height={50} />
//                   </td>
//                   <td data-label="Name">{product.name}</td>
//                   <td data-label="Category">{product.category.join(", ")}</td>
//                   <td data-label="Sub Category">{product.subcategory.join(", ")}</td>
//                   <td data-label="Colors">{displayColors.join(", ") || "N/A"}</td>
//                   <td data-label="Sizes">{cleanSizes.join(", ") || "N/A"}</td>
//                   <td data-label="Price">Rs.{product.price}</td>
//                   <td data-label="Old Price">{product.oldPrice ? `Rs.${product.oldPrice}` : "N/A"}</td>
//                   <td data-label="Stock">{product.availableStock}</td>
//                   <td data-label="Actions">
//                     <Button
//                       type="primary"
//                       icon={<EditOutlined />}
//                       onClick={() => handleEditProduct(product)}
//                       className="edit-btn"
//                     />
//                     <Button
//                       type="primary"
//                       danger
//                       icon={<DeleteOutlined />}
//                       onClick={() => handleDeleteProduct(product._id)}
//                       className="delete-btn"
//                     />
//                   </td>
//                 </tr>
//               )
//             })}
//           </tbody>
//         </table>
//       </>
//     ),
//     [
//       currentProducts,
//       currentPage,
//       productsPerPage,
//       getImage,
//       handleEditProduct,
//       handleDeleteProduct,
//       renderSearchSection,
//     ],
//   )

//   const renderPagination = useCallback(() => {
//     const pageNumbers = []
//     const maxPagesToShow = 5
//     let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
//     const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

//     if (endPage - startPage + 1 < maxPagesToShow) {
//       startPage = Math.max(1, endPage - maxPagesToShow + 1)
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i)
//     }

//     return (
//       <div className="pagination">
//         <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
//           Prev
//         </Button>
//         {startPage > 1 && (
//           <>
//             <Button onClick={() => paginate(1)}>1</Button>
//             {startPage > 2 && <span>...</span>}
//           </>
//         )}
//         {pageNumbers.map((pageNumber) => (
//           <Button
//             key={pageNumber}
//             onClick={() => paginate(pageNumber)}
//             type={currentPage === pageNumber ? "primary" : "default"}
//           >
//             {pageNumber}
//           </Button>
//         ))}
//         {endPage < totalPages && (
//           <>
//             {endPage < totalPages - 1 && <span>...</span>}
//             <Button onClick={() => paginate(totalPages)}>{totalPages}</Button>
//           </>
//         )}
//         <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
//           Next
//         </Button>
//       </div>
//     )
//   }, [currentPage, totalPages, paginate])

//   return (
//     <div className="product-list" style={{ padding: "24px 32px" }}>
//       {editingProduct || isAdding ? (
//         <div className="product-form" style={{ maxHeight: "80vh", overflowY: "auto" }}>
//           <h2>{isAdding ? "Add New Product" : "Edit Product"}</h2>
//           <Form form={form} layout="vertical" onFinish={handleSubmitProduct}>
//             <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
//               <Input placeholder="Enter product name" />
//             </Form.Item>

//             <Form.Item name="category" label="Category" rules={[{ required: true }]}>
//               <Select placeholder="Select category" onChange={handleCategoryChange}>
//                 {categories.map((cat) => (
//                   <Option key={cat} value={cat}>
//                     {cat}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             {selectedCategory && (
//               <Form.Item name="subcategory" label="Subcategory" rules={[{ required: true }]}>
//                 <Select placeholder="Select subcategory">
//                   {subcategories[selectedCategory].map((sub) => (
//                     <Option key={sub} value={sub}>
//                       {sub}
//                     </Option>
//                   ))}
//                 </Select>
//               </Form.Item>
//             )}

//             <Form.Item name="description" label="Description" rules={[{ required: true }]}>
//               <TextArea rows={4} placeholder="Enter product description" />
//             </Form.Item>

//             <Form.Item
//               name="price"
//               label="Price"
//               rules={[
//                 { required: true, message: "Please enter price" },
//                 {
//                   validator: (_, value) =>
//                     value > 0 ? Promise.resolve() : Promise.reject(new Error("Price must be greater than 0")),
//                 },
//               ]}
//             >
//               <InputNumber style={{ width: "100%" }} min={0.01} step={0.01} placeholder="Enter price" />
//             </Form.Item>

//             <Form.Item name="oldPrice" label="Old Price">
//               <InputNumber style={{ width: "100%" }} min={0} placeholder="Enter old price" />
//             </Form.Item>

//             <Form.Item
//               name="stock"
//               label="Available Stock"
//               rules={[{ required: true, message: "Please enter available stock" }]}
//             >
//               <InputNumber style={{ width: "100%" }} min={0} placeholder="Enter available stock" />
//             </Form.Item>

//             <Form.Item
//               name="sizes"
//               label="Available Sizes"
//               rules={[{ required: true, message: "Please select at least one size" }]}
//             >
//               <Select
//                 mode="multiple"
//                 placeholder="Select available sizes"
//                 style={{ width: "100%" }}
//                 onChange={handleSizeChange}
//                 value={previousSizes}
//               >
//                 {["XS", "S", "M", "L", "XL", "XXL", "2T", "3T", "4T", "5", "6", "7", "8"].map((size) => (
//                   <Option key={size} value={size}>
//                     {size}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             <Form.Item
//               name="colors"
//               label="Colors"
//               rules={[{ required: true, message: "Please select at least one color" }]}
//             >
//               <Select mode="multiple" placeholder="Select colors" onChange={handleColorChange}>
//                 {colorOptions.map(({ name }) => (
//                   <Option key={name} value={name}>
//                     {name}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>

//             {form.getFieldValue("colors")?.map((color) => (
//               <Form.Item key={color} label={`Images for ${color}`}>
//                 <Upload
//                   listType="picture-card"
//                   fileList={colorImages[color] || []}
//                   onPreview={handlePreview}
//                   onChange={(info) => handleImageChange(color, info)}
//                   beforeUpload={() => false}
//                   multiple={true}
//                 >
//                   {(colorImages[color]?.length || 0) < 5 && (
//                     <div>
//                       <PlusOutlined />
//                       <div style={{ marginTop: 8 }}>Upload</div>
//                     </div>
//                   )}
//                 </Upload>
//               </Form.Item>
//             ))}

//             <Form.Item>
//               <Button type="primary" htmlType="submit">
//                 {isAdding ? "Add Product" : "Update Product"}
//               </Button>
//               <Button onClick={handleCancelEdit} style={{ marginLeft: 8 }}>
//                 Cancel
//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       ) : (
//         <div>
//           <Button type="primary" onClick={handleAddProduct} style={{ marginBottom: 16 }}>
//             <PlusOutlined /> Add New Product
//           </Button>
//           {renderProductTable()}
//           {renderPagination()}
//         </div>
//       )}

//       <Modal
//         visible={showWarningModal}
//         title="Warning"
//         onOk={handleWarningConfirm}
//         onCancel={() => setShowWarningModal(false)}
//       >
//         <p>You haven't made any changes to the sizes or colors. Are you sure you want to update the product?</p>
//       </Modal>

//       <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={() => setPreviewVisible(false)}>
//         <img
//           alt="example"
//           style={{ width: "100%" }}
//           src={previewImage || "https://via.placeholder.com/400x400/cccccc/666666?text=No+Image"}
//         />
//       </Modal>

//       <ToastContainer />
//     </div>
//   )
// }

// export default React.memo(AdminProductlist)



"use client"

import { useState, useEffect, useContext, useCallback, useMemo } from "react"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../pages/CSS/AdminProductlist.css"
import { Form, Input, Select, InputNumber, Button, Upload, Modal } from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons"
import React from "react"

const { TextArea } = Input
const { Option } = Select

// Custom hook for debouncing
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Memoized ProductImage component to prevent unnecessary re-renders
const ProductImage = React.memo(({ src, alt, width = 50, height = 50 }) => {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setImgSrc(src)
    setHasError(false)
  }, [src])

  const handleError = useCallback(() => {
    if (!hasError) {
      setHasError(true)
      setImgSrc("https://via.placeholder.com/150x150/cccccc/666666?text=No+Image")
    }
  }, [hasError])

  return (
    <img
      src={imgSrc || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      style={{
        objectFit: "cover",
        border: "1px solid #d9d9d9",
        borderRadius: "4px",
        backgroundColor: "#f5f5f5",
      }}
      onError={handleError}
    />
  )
})

function AdminProductlist({ updateTotalProducts, updateLowStockProducts }) {
  const { token } = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [productsPerPage] = useState(3)
  const [editingProduct, setEditingProduct] = useState(null)
  const [isAdding, setIsAdding] = useState(false)
  const [form] = Form.useForm()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [colorImages, setColorImages] = useState({})
  const [sizeData, setSizeData] = useState({})
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState("")
  const [previewTitle, setPreviewTitle] = useState("")
  const [showWarningModal, setShowWarningModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [previousSizes, setPreviousSizes] = useState([])

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const categories = ["women"]

  const subcategories = {
    women: [
    "Traditional Wear",
    "Casual Wear",
    "Formal Wear",
    "Ethnic Wear",
    "Street Style",
    "Smart Casuals",
    "Athleisure",
    "Summer Wear",
    "Winter Wear",
    "Party Wear",
    "Wedding Wear",
    "Indo-Western",
    "Loungewear",
    "Vacation Wear",
    "Festive Wear",
    ]
  }

  const colorOptions = [
    { name: "AliceBlue" },
    { name: "AntiqueWhite" },
    { name: "Aqua" },
    { name: "Aquamarine" },
    { name: "Azure" },
    { name: "Beige" },
    { name: "Bisque" },
    { name: "BlanchedAlmond" },
    { name: "Blue" },
    { name: "BlueViolet" },
    { name: "Brown" },
    { name: "Burlywood" },
    { name: "CadetBlue" },
    { name: "Chartreuse" },
    { name: "Chocolate" },
    { name: "Angel" },
    { name: "CornflowerBlue" },
    { name: "Cornsilk" },
    { name: "Crimson" },
    { name: "Cyan" },
    { name: "DarkBlue" },
    { name: "DarkCyan" },
    { name: "DarkGoldenrod" },
    { name: "DarkGray" },
    { name: "DarkGreen" },
    { name: "DarkKhaki" },
    { name: "DarkMagenta" },
    { name: "DarkOliveGreen" },
    { name: "DarkOrange" },
    { name: "DarkOrchid" },
    { name: "DarkRed" },
    { name: "DarkSalmon" },
    { name: "DarkSeagreen" },
    { name: "DarkSlateBlue" },
    { name: "DarkSlateGray" },
    { name: "DarkTurquoise" },
    { name: "DarkViolet" },
    { name: "DeepPink" },
    { name: "DeepSkyBlue" },
    { name: "DimGray" },
    { name: "DodgerBlue" },
    { name: "Firebrick" },
    { name: "FloralWhite" },
    { name: "ForestGreen" },
    { name: "Fuchsia" },
    { name: "Gainsboro" },
    { name: "GhostWhite" },
    { name: "Gold" },
    { name: "Goldenrod" },
    { name: "Gray" },
    { name: "Green" },
    { name: "GreenYellow" },
    { name: "Honeydew" },
    { name: "HotPink" },
    { name: "IndianRed" },
    { name: "Indigo" },
    { name: "Ivory" },
    { name: "Khaki" },
    { name: "Lavender" },
    { name: "LavenderBlush" },
    { name: "LawnGreen" },
    { name: "LemonChiffon" },
    { name: "LightBlue" },
    { name: "LightCoral" },
    { name: "LightCyan" },
    { name: "LightGoldenrodYellow" },
    { name: "LightGreen" },
    { name: "LightGrey" },
    { name: "LightPink" },
    { name: "LightSalmon" },
    { name: "LightSeaGreen" },
    { name: "LightSkyBlue" },
    { name: "LightSlateGray" },
    { name: "LightSteelBlue" },
    { name: "LightYellow" },
    { name: "Lime" },
    { name: "LimeGreen" },
    { name: "Linen" },
    { name: "Magenta" },
    { name: "Maroon" },
    { name: "MediumAquamarine" },
    { name: "MediumBlue" },
    { name: "MediumOrchid" },
    { name: "MediumPurple" },
    { name: "MediumSeaGreen" },
    { name: "MediumSlateBlue" },
    { name: "MediumSpringGreen" },
    { name: "MediumTurquoise" },
    { name: "MediumVioletRed" },
    { name: "MidnightBlue" },
    { name: "MintCream" },
    { name: "MistyRose" },
    { name: "Moccasin" },
    { name: "NavajoWhite" },
    { name: "Navy" },
    { name: "OldLace" },
    { name: "OliveDrab" },
    { name: "Orange" },
    { name: "OrangeRed" },
    { name: "Orchid" },
    { name: "PaleGoldenrod" },
    { name: "PaleGreen" },
    { name: "PaleTurquoise" },
    { name: "PaleVioletRed" },
    { name: "PapayaWhip" },
    { name: "PeachPuff" },
    { name: "Peru" },
    { name: "Pink" },
    { name: "Plum" },
    { name: "PowderBlue" },
    { name: "Purple" },
    { name: "Red" },
    { name: "RosyBrown" },
    { name: "RoyalBlue" },
    { name: "SaddleBrown" },
    { name: "Salmon" },
    { name: "SandyBrown" },
    { name: "SeaGreen" },
    { name: "SeaShell" },
    { name: "Sienna" },
    { name: "Silver" },
    { name: "SkyBlue" },
    { name: "SlateBlue" },
    { name: "Snow" },
    { name: "SpringGreen" },
    { name: "SteelBlue" },
    { name: "Tan" },
    { name: "Thistle" },
    { name: "Teal" },
    { name: "Tomato" },
    { name: "Turquoise" },
    { name: "Violet" },
    { name: "Wheat" },
    { name: "White" },
    { name: "Whitesmoke" },
    { name: "Yellow" },
    { name: "YellowGreen" },
  ]

  // Enhanced function to process sizes and ensure plain text format
  const processSizes = useCallback((availableSizes) => {
    if (!availableSizes) return []

    let sizes = []

    // If it's already an array
    if (Array.isArray(availableSizes)) {
      sizes = availableSizes
    }
    // If it's a string
    else if (typeof availableSizes === "string") {
      // Try to parse as JSON first (handles ["S","M"] format)
      try {
        const parsed = JSON.parse(availableSizes)
        if (Array.isArray(parsed)) {
          sizes = parsed
        } else {
          sizes = [parsed]
        }
      } catch {
        // If JSON parsing fails, treat as comma-separated string
        sizes = availableSizes
          .split(",")
          .map((size) => size.trim())
          .filter((size) => size)
      }
    }

    // Clean up the sizes array - remove any brackets, quotes, or escape characters
    return sizes
      .map((size) => {
        if (typeof size === "string") {
          // Remove any brackets, quotes, backslashes, and extra whitespace
          return size.replace(/[[\]"'\\]/g, "").trim()
        }
        return String(size).trim()
      })
      .filter((size) => size && size.length > 0) // Remove empty strings
  }, [])

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get("https://api.silksew.com/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = Array.isArray(response.data) ? response.data : response.data.products || []
      setProducts(data)
      updateTotalProducts?.(data.length)
      const lowStockProducts = data.filter((product) => product.availableStock <= 5)
      updateLowStockProducts?.(lowStockProducts)
    } catch (error) {
      console.error("Error fetching products:", error.message)
      toast.error("Failed to fetch products.")
    }
  }, [token, updateTotalProducts, updateLowStockProducts])

  useEffect(() => {
    let mounted = true
    fetchProducts().then(() => {
      if (!mounted) return
    })
    return () => {
      mounted = false
    }
  }, [fetchProducts])

  const handleDeleteProduct = useCallback(
    async (id) => {
      try {
        await axios.delete(`https://api.silksew.com/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        toast.success("Product deleted successfully!")
        fetchProducts()
      } catch (error) {
        console.error("Error deleting product:", error.message)
        toast.error("Failed to delete product.")
      }
    },
    [token, fetchProducts],
  )

  const getImage = useCallback((images, availableColors) => {
    const defaultImage = "https://via.placeholder.com/150x150/cccccc/666666?text=No+Image"
    if (!images || !Array.isArray(images) || images.length === 0) {
      return defaultImage
    }

    try {
      let imageData = images[0]
      if (typeof imageData === "string") {
        imageData = JSON.parse(imageData)
      }
      if (!imageData || typeof imageData !== "object") {
        return defaultImage
      }

      if (availableColors && Array.isArray(availableColors)) {
        for (const color of availableColors) {
          const colorName = typeof color === "string" ? color : color?.name || ""
          if (
            colorName &&
            imageData[colorName] &&
            Array.isArray(imageData[colorName]) &&
            imageData[colorName].length > 0
          ) {
            const imageUrl = imageData[colorName][0]
            if (imageUrl && typeof imageUrl === "string" && imageUrl.trim()) {
              return imageUrl
            }
          }
        }
      }

      const colorKeys = Object.keys(imageData)
      for (const colorKey of colorKeys) {
        if (imageData[colorKey] && Array.isArray(imageData[colorKey]) && imageData[colorKey].length > 0) {
          const imageUrl = imageData[colorKey][0]
          if (imageUrl && typeof imageUrl === "string" && imageUrl.trim()) {
            return imageUrl
          }
        }
      }
      return defaultImage
    } catch (error) {
      console.warn("Error processing image data:", error.message)
      return defaultImage
    }
  }, [])

  const handleEditProduct = useCallback(
    (product) => {
      setEditingProduct(product)
      setIsAdding(false)
      setSelectedCategory(product.category[0])

      // Parse sizes using the enhanced processSizes function
      const sizes = processSizes(product.availableSizes)
      setPreviousSizes([...sizes])

      // Parse colors
      let colors = []
      if (Array.isArray(product.availableColors)) {
        colors = product.availableColors.flatMap((color) => {
          if (typeof color === "string") {
            if (!color.startsWith("{") && !color.startsWith("[")) return [color]
            try {
              const parsed = JSON.parse(color)
              return Array.isArray(parsed) ? parsed.map((c) => c.name || c) : [parsed.name || parsed]
            } catch {
              return [color]
            }
          } else if (color && color.name) {
            return [color.name]
          }
          return []
        })
      } else if (typeof product.availableColors === "string") {
        try {
          const parsed = JSON.parse(product.availableColors)
          colors = Array.isArray(parsed)
            ? parsed.flatMap((color) => (typeof color === "string" ? [color] : color.name ? [color.name] : []))
            : []
        } catch {
          colors = [product.availableColors]
        }
      }

      // Set form fields
      form.setFieldsValue({
        ...product,
        category: product.category?.[0],
        subcategory: product.subcategory?.[0],
        colors,
        stock: product.availableStock,
        sizes,
      })

      // Images grouped by color
      const initialColorImages = {}
      if (product.images?.length > 0) {
        try {
          const parsedImages = JSON.parse(product.images[0])
          Object.entries(parsedImages).forEach(([color, urls]) => {
            initialColorImages[color] = urls.map((url, index) => ({
              uid: `${color}-${index}`,
              name: `${color}-image-${index}`,
              status: "done",
              url,
            }))
          })
        } catch (error) {
          console.warn("Error parsing product images:", error.message)
        }
      }

      setColorImages(initialColorImages)
    },
    [form, processSizes],
  )

  const handleAddProduct = useCallback(() => {
    setEditingProduct(null)
    setIsAdding(true)
    setSelectedCategory(null)
    form.resetFields()
    setColorImages({})
    setSizeData({})
    setPreviousSizes([])
  }, [form])

  const handleCategoryChange = useCallback(
    (value) => {
      setSelectedCategory(value)
      form.setFieldsValue({
        subcategory: undefined,
        sizes: undefined,
      })
    },
    [form],
  )

  const handleColorChange = useCallback((selectedColors) => {
    setColorImages((prev) => {
      const newColorImages = { ...prev }
      selectedColors.forEach((color) => {
        if (!newColorImages[color]) {
          newColorImages[color] = []
        }
      })
      Object.keys(newColorImages).forEach((color) => {
        if (!selectedColors.includes(color)) {
          delete newColorImages[color]
        }
      })
      return newColorImages
    })
  }, [])

  const handleSizeChange = useCallback(
    (selectedSizes) => {
      setSizeData((prev) => {
        const newSizeData = { ...prev }
        selectedSizes.forEach((size) => {
          if (!newSizeData[size]) {
            newSizeData[size] = { stock: 0 }
          }
        })
        Object.keys(newSizeData).forEach((size) => {
          if (!selectedSizes.includes(size)) {
            delete newSizeData[size]
          }
        })
        return newSizeData
      })
      setPreviousSizes(selectedSizes)
      form.setFieldsValue({ sizes: selectedSizes })
    },
    [form],
  )

  const handleImageChange = useCallback((color, { fileList }) => {
    setColorImages((prev) => ({
      ...prev,
      [color]: fileList,
    }))
  }, [])

  const handlePreview = useCallback(async (file) => {
    if (!file.url && !file.preview) {
      try {
        file.preview = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file.originFileObj)
          reader.onload = () => resolve(reader.result)
          reader.onerror = (error) => reject(error)
        })
      } catch (error) {
        console.warn("Error generating image preview:", error.message)
        return
      }
    }
    setPreviewImage(file.url || file.preview)
    setPreviewVisible(true)
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf("/") + 1))
  }, [])

  const handleSubmitProduct = useCallback(
    async (values) => {
      await submitProductData({ ...values, sizes: values.sizes || previousSizes })
    },
    [previousSizes],
  )

  const handleWarningConfirm = useCallback(() => {
    setShowWarningModal(false)
    const formValues = form.getFieldsValue()
    submitProductData(formValues)
  }, [form])

  const submitProductData = useCallback(
    async (values) => {
      try {
        const productData = new FormData()
        productData.append("name", values.name)
        productData.append("description", values.description)
        productData.append("price", values.price)
        productData.append("oldPrice", values.oldPrice || "")
        productData.append("category", values.category)
        productData.append("subcategory", values.subcategory)
        productData.append("availableStock", values.stock)

        // Process sizes to ensure they are stored as plain text array
        const sizes = values.sizes || previousSizes
        const cleanSizes = sizes
          .map((size) =>
            String(size)
              .replace(/[[\]"'\\]/g, "")
              .trim(),
          )
          .filter((size) => size)

        // Send sizes as individual form data entries instead of JSON string
        cleanSizes.forEach((size) => {
          productData.append("availableSizes[]", size)
        })

        const colors = values.colors || []
        colors.forEach((color) => {
          productData.append("availableColors[]", color)
        })

        const uploadedImagesByColor = {}
        for (const color of colors) {
          if (colorImages[color]) {
            const uploadedImages = await Promise.all(
              colorImages[color].map(async (file) => {
                if (file.url) {
                  return file.url
                }
                const data = new FormData()
                data.append("file", file.originFileObj)
                data.append("upload_preset", "Silksew")
                data.append("cloud_name", "dejdni8vi")
                data.append("folder", "products")

                const res = await fetch("https://api.cloudinary.com/v1_1/dejdni8vi/image/upload", {
                  method: "POST",
                  body: data,
                })

                if (!res.ok) {
                  throw new Error("Image upload failed")
                }

                const uploadedImage = await res.json()
                return uploadedImage.secure_url
              }),
            )
            uploadedImagesByColor[color] = uploadedImages
          }
        }

        productData.append("images", JSON.stringify(uploadedImagesByColor))

        const response = isAdding
          ? await axios.post("https://api.silksew.com/api/products", productData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            })
          : await axios.put(`https://api.silksew.com/api/products/${editingProduct._id}`, productData, {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              },
            })

        if (response.data) {
          toast.success(isAdding ? "Product added successfully!" : "Product updated successfully!")
          setEditingProduct(null)
          setIsAdding(false)
          setColorImages({})
          setSizeData({})
          setPreviousSizes([])
          form.resetFields()
          fetchProducts()
        }
      } catch (error) {
        console.error("Error submitting product:", error.message)
        toast.error(`Failed to ${isAdding ? "add" : "update"} product. ${error.response?.data?.message || ""}`)
      }
    },
    [isAdding, editingProduct, token, fetchProducts, form, colorImages, previousSizes],
  )

  const handleCancelEdit = useCallback(() => {
    setEditingProduct(null)
    setIsAdding(false)
    setColorImages({})
    setSizeData({})
    setPreviousSizes([])
    form.resetFields()
  }, [form])

  const getFilteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchRegex = new RegExp(debouncedSearchTerm, "i")
      return (
        searchRegex.test(product.name) ||
        searchRegex.test(product.category.join(", ")) ||
        searchRegex.test(product.subcategory.join(", ")) ||
        searchRegex.test(product.availableColors.map((c) => c.name || c).join(", ")) ||
        searchRegex.test(product.availableSizes.join(", ")) ||
        searchRegex.test(product.price.toString()) ||
        searchRegex.test(product.oldPrice ? product.oldPrice.toString() : "") ||
        searchRegex.test(product.availableStock.toString())
      )
    })
  }, [products, debouncedSearchTerm])

  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = useMemo(
    () => getFilteredProducts.slice(indexOfFirstProduct, indexOfLastProduct),
    [getFilteredProducts, indexOfFirstProduct, indexOfLastProduct],
  )
  const totalPages = Math.ceil(getFilteredProducts.length / productsPerPage)

  const paginate = useCallback(
    (pageNumber) => {
      if (pageNumber >= 1 && pageNumber <= totalPages) {
        setCurrentPage(pageNumber)
      }
    },
    [totalPages],
  )

  const renderSearchSection = useCallback(
    () => (
      <div className="search-section">
        <Input
          placeholder="Search products..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          allowClear
        />
      </div>
    ),
    [searchTerm],
  )

  const renderProductTable = useCallback(
    () => (
      <>
        <h2>Admin Product List</h2>
        {renderSearchSection()}
        <table className="product-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Colors</th>
              <th>Sizes</th>
              <th>Price</th>
              <th>Old Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => {
              let displayColors = []
              if (typeof product.availableColors === "string") {
                try {
                  displayColors = JSON.parse(product.availableColors).map((color) =>
                    typeof color === "string" ? color : color.name,
                  )
                } catch {
                  displayColors = [product.availableColors]
                }
              } else if (Array.isArray(product.availableColors)) {
                displayColors = product.availableColors.map((color) => (typeof color === "string" ? color : color.name))
              }

              // Use the enhanced processSizes function for consistent size display
              const displaySizes = processSizes(product.availableSizes)

              const productImageUrl = getImage(product.images, product.availableColors)

              return (
                <tr key={product._id}>
                  <td data-label="Sr. No">{(currentPage - 1) * productsPerPage + index + 1}</td>
                  <td data-label="Image">
                    <ProductImage src={productImageUrl} alt={product.name || "Product image"} width={50} height={50} />
                  </td>
                  <td data-label="Name">{product.name}</td>
                  <td data-label="Category">{product.category.join(", ")}</td>
                  <td data-label="Sub Category">{product.subcategory.join(", ")}</td>
                  <td data-label="Colors">{displayColors.join(", ") || "N/A"}</td>
                  <td data-label="Sizes">{displaySizes.join(", ") || "N/A"}</td>
                  <td data-label="Price">Rs.{product.price}</td>
                  <td data-label="Old Price">{product.oldPrice ? `Rs.${product.oldPrice}` : "N/A"}</td>
                  <td data-label="Stock">{product.availableStock}</td>
                  <td data-label="Actions">
                    <Button
                      type="primary"
                      icon={<EditOutlined />}
                      onClick={() => handleEditProduct(product)}
                      className="edit-btn"
                    />
                    <Button
                      type="primary"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteProduct(product._id)}
                      className="delete-btn"
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    ),
    [
      currentProducts,
      currentPage,
      productsPerPage,
      getImage,
      handleEditProduct,
      handleDeleteProduct,
      renderSearchSection,
      processSizes,
    ],
  )

  const renderPagination = useCallback(() => {
    const pageNumbers = []
    const maxPagesToShow = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return (
      <div className="pagination">
        <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </Button>
        {startPage > 1 && (
          <>
            <Button onClick={() => paginate(1)}>1</Button>
            {startPage > 2 && <span>...</span>}
          </>
        )}
        {pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            type={currentPage === pageNumber ? "primary" : "default"}
          >
            {pageNumber}
          </Button>
        ))}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span>...</span>}
            <Button onClick={() => paginate(totalPages)}>{totalPages}</Button>
          </>
        )}
        <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    )
  }, [currentPage, totalPages, paginate])

  return (
    <div className="product-list" style={{ padding: "24px 32px" }}>
      {editingProduct || isAdding ? (
        <div className="product-form" style={{ maxHeight: "80vh", overflowY: "auto" }}>
          <h2>{isAdding ? "Add New Product" : "Edit Product"}</h2>
          <Form form={form} layout="vertical" onFinish={handleSubmitProduct}>
            <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
              <Input placeholder="Enter product name" />
            </Form.Item>

            <Form.Item name="category" label="Category" rules={[{ required: true }]}>
              <Select placeholder="Select category" onChange={handleCategoryChange}>
                {categories.map((cat) => (
                  <Option key={cat} value={cat}>
                    {cat}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {selectedCategory && (
              <Form.Item name="subcategory" label="Subcategory" rules={[{ required: true }]}>
                <Select placeholder="Select subcategory">
                  {subcategories[selectedCategory].map((sub) => (
                    <Option key={sub} value={sub}>
                      {sub}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}

            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
              <TextArea rows={4} placeholder="Enter product description" />
            </Form.Item>

            <Form.Item
              name="price"
              label="Price"
              rules={[
                { required: true, message: "Please enter price" },
                {
                  validator: (_, value) =>
                    value > 0 ? Promise.resolve() : Promise.reject(new Error("Price must be greater than 0")),
                },
              ]}
            >
              <InputNumber style={{ width: "100%" }} min={0.01} step={0.01} placeholder="Enter price" />
            </Form.Item>

            <Form.Item name="oldPrice" label="Old Price">
              <InputNumber style={{ width: "100%" }} min={0} placeholder="Enter old price" />
            </Form.Item>

            <Form.Item
              name="stock"
              label="Available Stock"
              rules={[{ required: true, message: "Please enter available stock" }]}
            >
              <InputNumber style={{ width: "100%" }} min={0} placeholder="Enter available stock" />
            </Form.Item>

            <Form.Item
              name="sizes"
              label="Available Sizes"
              rules={[{ required: true, message: "Please select at least one size" }]}
            >
              <Select
                mode="multiple"
                placeholder="Select available sizes"
                style={{ width: "100%" }}
                onChange={handleSizeChange}
                value={previousSizes}
              >
                {["XS", "S", "M", "L", "XL", "XXL", "2T", "3T", "4T", "5", "6", "7", "8"].map((size) => (
                  <Option key={size} value={size}>
                    {size}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="colors"
              label="Colors"
              rules={[{ required: true, message: "Please select at least one color" }]}
            >
              <Select mode="multiple" placeholder="Select colors" onChange={handleColorChange}>
                {colorOptions.map(({ name }) => (
                  <Option key={name} value={name}>
                    {name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {form.getFieldValue("colors")?.map((color) => (
              <Form.Item key={color} label={`Images for ${color}`}>
                <Upload
                  listType="picture-card"
                  fileList={colorImages[color] || []}
                  onPreview={handlePreview}
                  onChange={(info) => handleImageChange(color, info)}
                  beforeUpload={() => false}
                  multiple={true}
                >
                  {(colorImages[color]?.length || 0) < 5 && (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Upload>
              </Form.Item>
            ))}

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {isAdding ? "Add Product" : "Update Product"}
              </Button>
              <Button onClick={handleCancelEdit} style={{ marginLeft: 8 }}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <div>
          <Button type="primary" onClick={handleAddProduct} style={{ marginBottom: 16 }}>
            <PlusOutlined /> Add New Product
          </Button>
          {renderProductTable()}
          {renderPagination()}
        </div>
      )}

      <Modal
        visible={showWarningModal}
        title="Warning"
        onOk={handleWarningConfirm}
        onCancel={() => setShowWarningModal(false)}
      >
        <p>You haven't made any changes to the sizes or colors. Are you sure you want to update the product?</p>
      </Modal>

      <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={() => setPreviewVisible(false)}>
        <img
          alt="example"
          style={{ width: "100%" }}
          src={previewImage || "https://via.placeholder.com/400x400/cccccc/666666?text=No+Image"}
        />
      </Modal>

      <ToastContainer />
    </div>
  )
}

export default React.memo(AdminProductlist)
