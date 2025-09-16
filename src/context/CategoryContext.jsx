"use client"

import { createContext, useContext, useState } from "react"

/**
 * @typedef {Object} CategoryContextType
 * @property {string} selectedCategory
 * @property {function(string): void} setSelectedCategory
 * @property {Array} categoryProducts
 * @property {function(Array): void} setCategoryProducts
 * @property {boolean} isShowingCategory
 * @property {function(boolean): void} setIsShowingCategory
 * @property {boolean} loading
 * @property {function(boolean): void} setLoading
 */

const CategoryContext = createContext(undefined)

export const useCategoryContext = () => {
  const context = useContext(CategoryContext)
  if (!context) {
    throw new Error("useCategoryContext must be used within a CategoryProvider")
  }
  return context
}

export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [categoryProducts, setCategoryProducts] = useState([])
  const [isShowingCategory, setIsShowingCategory] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <CategoryContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        categoryProducts,
        setCategoryProducts,
        isShowingCategory,
        setIsShowingCategory,
        loading,
        setLoading,
      }}
    >
      {children}
    </CategoryContext.Provider>
  )
}
