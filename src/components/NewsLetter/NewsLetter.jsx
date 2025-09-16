"use client"

import React, { useState } from "react"

// Custom Button Component
const Button = ({ children, size, onClick, ...props }) => {
  const sizeStyles = {
    default: {
      padding: "8px 16px",
      fontSize: "14px",
    },
    lg: {
      padding: "12px 24px",
      fontSize: "16px",
    },
  }

  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "#f59e0b", // amber-500
        color: "#ffffff",
        border: "none",
        borderRadius: "6px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "all 0.2s ease",
        ...sizeStyles[size || "default"],
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor = "#d97706" // amber-600
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor = "#f59e0b"
      }}
      {...props}
    >
      {children}
    </button>
  )
}

// Custom Input Component
const Input = ({ type, placeholder, value, onChange, ...props }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        backgroundColor: "#ffffff",
        color: "#1f2937",
        border: "none",
        borderRadius: "6px",
        padding: "12px 16px",
        fontSize: "16px",
        outline: "none",
        flex: "1",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
      {...props}
    />
  )
}

// Custom Card Components
const Card = ({ children, style }) => {
  return (
    <div
      style={{
        backgroundColor: "#ef4444", // red-500 (lighter red card)
        border: "1px solid rgba(255,255,255,0.2)",
        borderRadius: "8px",
        maxWidth: "896px",
        margin: "0 auto",
        ...style,
      }}
    >
      {children}
    </div>
  )
}

const CardContent = ({ children, style }) => {
  return (
    <div
      style={{
        padding: "48px",
        textAlign: "center",
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function Newsletter() {
  const [email, setEmail] = useState("")

  const handleSubscribe = () => {
    if (email) {
      alert(`Thank you for subscribing with email: ${email}`)
      setEmail("")
    } else {
      alert("Please enter your email address")
    }
  }

  const sectionStyles = {
    padding: "80px 0",
    backgroundColor: "#dc2626", // red-600 (dark red background)
    color: "#ffffff",
  }

  const containerStyles = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 16px",
  }

  const titleStyles = {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "16px",
    fontFamily: "serif",
    lineHeight: "1.2",
  }

  const subtitleStyles = {
    fontSize: "18px",
    marginBottom: "32px",
    color: "#ffffff",
    maxWidth: "512px",
    margin: "0 auto 32px auto",
    lineHeight: "1.6",
  }

  const formStyles = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "384px",
    margin: "0 auto",
  }

  const disclaimerStyles = {
    fontSize: "14px",
    color: "rgba(255, 255, 255, 0.85)",
    marginTop: "16px",
  }

  // Responsive
  const [isMobile, setIsMobile] = useState(false)

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const responsiveFormStyles = {
    ...formStyles,
    flexDirection: isMobile ? "column" : "row",
  }

  const responsiveTitleStyles = {
    ...titleStyles,
    fontSize: isMobile ? "32px" : "48px",
  }

  return (
    <section style={sectionStyles}>
      <div style={containerStyles}>
        <Card>
          <CardContent>
            <h2 style={responsiveTitleStyles}>Stay in Style</h2>
            <p style={subtitleStyles}>
              Be the first to know about new collections, exclusive offers, and style inspiration. Join our community of
              fashion enthusiasts.
            </p>
            <div style={responsiveFormStyles}>
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubscribe()
                  }
                }}
              />
              <Button
                size="lg"
                onClick={handleSubscribe}
                style={{
                  paddingLeft: "32px",
                  paddingRight: "32px",
                }}
              >
                Subscribe
              </Button>
            </div>
            <p style={disclaimerStyles}>By subscribing, you agree to our Privacy Policy and Terms of Service.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default Newsletter
