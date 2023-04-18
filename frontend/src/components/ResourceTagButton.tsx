// components/Button.tsx
import React from 'react'

interface ButtonProps {
  children: React.ReactNode
}

const ResourceTagButton: React.FC<ButtonProps> = ({ children }) => {
  const buttonClasses = "bg-gray-100 rounded-md px-4 py-2 mr-2 mt-2"

  return (
    <button className={buttonClasses}>
      {children}
    </button>
  )
}

export default ResourceTagButton
