"use client"

import { useState, useEffect, useContext } from "react"
import ReactDOM from "react-dom"
import { Heart, X } from "lucide-react"
import { useFavorites } from "../../context/FavoritesContext"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import "./FavoriteButton.css"

const FavoriteButton = ({ product, productId, size = "md" }) => {
  const { isFavorited, toggleFavorite, favoritesLoading } = useFavorites()
  const { token } = useContext(AuthContext)
  const navigate = useNavigate()

  const [isFavorite, setIsFavorite] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const id = product?._id || productId

  // check current favorite status
  useEffect(() => {
    if (id) {
      setIsFavorite(isFavorited(id))
    }
  }, [id, isFavorited])

  const handleFavoriteClick = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!id) return

    if (!token) {
      setShowLoginModal(true)
      return
    }

    try {
      await toggleFavorite(id)
      const nowFav = !isFavorite
      setIsFavorite(nowFav)
      toast[nowFav ? "success" : "info"](nowFav ? "Added to favorites" : "Removed from favorites")
    } catch (error) {
      console.error("Error updating favorite:", error)
      toast.error(error.message || "Failed to update favorites")
    }
  }

  const handleLogin = () => {
    setShowLoginModal(false)
    navigate("/login")
  }

  const handleSignup = () => {
    setShowLoginModal(false)
    navigate("/signup")
  }

  const handleCloseModal = () => {
    setShowLoginModal(false)
  }

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  }

  const isLoading = id ? !!favoritesLoading[id] : false

  return (
    <>
      <button
        onClick={handleFavoriteClick}
        disabled={isLoading}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        className={`favorite-btn ${sizeClasses[size] || sizeClasses.md}`}
      >
        <Heart
          className={`transition-colors duration-200 ${isFavorite ? "text-red-500 fill-current" : "text-gray-400"}`}
          size={iconSizes[size] || 20}
        />
        {isLoading && (
          <div className="favorite-spinner">
            <div></div>
          </div>
        )}
      </button>

      {/* Modal rendered via Portal */}
      {showLoginModal &&
        ReactDOM.createPortal(
          <div className="favorite-modal-overlay">
            <div className="favorite-modal-content">
              <button onClick={handleCloseModal} className="favorite-modal-close">
                <X size={20} />
              </button>

              <div className="favorite-modal-icon">
                <div className="favorite-modal-icon-inner">
                  <Heart className="h-6 w-6 text-red-600" />
                </div>
              </div>

              <h3 className="favorite-modal-title">Login Required</h3>

              <p className="favorite-modal-description">You need to be logged in to add items to your favorites.</p>

              <div className="favorite-modal-buttons">
                <button onClick={handleLogin} className="favorite-modal-button login">
                  Log In
                </button>
                <button onClick={handleSignup} className="favorite-modal-button signup">
                  Sign Up
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  )
}

export default FavoriteButton
