
"use client"

import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

function StockAlarm({ lowStockProducts }) {
  const { token } = useContext(AuthContext)

  // Function to get the first image for display
  const getImage = (images, availableColors) => {
    if (images && images.length > 0 && availableColors && availableColors.length > 0) {
      try {
        const parsedImages = JSON.parse(images[0])
        for (const color of availableColors) {
          if (parsedImages[color.name] && parsedImages[color.name].length > 0) {
            return parsedImages[color.name][0]
          }
        }
        const firstAvailableColor = Object.keys(parsedImages)[0]
        if (parsedImages[firstAvailableColor] && parsedImages[firstAvailableColor].length > 0) {
          return parsedImages[firstAvailableColor][0]
        }
      } catch (error) {
        console.error("Error parsing image JSON:", error)
      }
    }
    return "https://via.placeholder.com/150"
  }

  // Enhanced function to process sizes and convert to plain text
  const processSizes = (availableSizes) => {
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

    // Clean up the sizes array - remove any brackets or quotes
    return sizes
      .map((size) => {
        if (typeof size === "string") {
          // Remove any remaining brackets and quotes
          return size.replace(/[[\]"']/g, "").trim()
        }
        return String(size).trim()
      })
      .filter((size) => size) // Remove empty strings
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Low Stock Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Sr. No</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Image</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Name</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Category</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Subcategory</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Colors</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Sizes</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Price</th>
              <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Stock</th>
            </tr>
          </thead>
          <tbody>
            {lowStockProducts.map((product, index) => {
              // Process colors
              let displayColors = []
              if (typeof product.availableColors === "string") {
                try {
                  const parsedColors = JSON.parse(product.availableColors)
                  displayColors = parsedColors.map((color) => (typeof color === "string" ? color : color.name))
                } catch {
                  displayColors = [product.availableColors]
                }
              } else if (Array.isArray(product.availableColors)) {
                displayColors = product.availableColors.map((color) => (typeof color === "string" ? color : color.name))
              }

              // Process sizes using the enhanced function
              const displaySizes = processSizes(product.availableSizes)

              return (
                <tr key={product._id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">{index + 1}</td>
                  <td className="py-3 px-4">
                    <img
                      src={getImage(product.images, product.availableColors) || "/placeholder.svg"}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">{product.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{product.category.join(", ")}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{product.subcategory.join(", ")}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{displayColors.join(", ") || "N/A"}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{displaySizes.join(", ") || "N/A"}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">Rs.{product.price}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{product.availableStock}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default StockAlarm

