import React from 'react'

const FormErrorMessage = ({className,message}) => {
  return (
    <snap className={`text-red-700 font-light ${className}`} role="alert">{message}</snap>
  )
}

export default FormErrorMessage