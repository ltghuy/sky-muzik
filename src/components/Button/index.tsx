import React from 'react'

interface ButtonProps {
  classStyle?: string,
  icon?: React.ReactNode,
  text: string,
  handleClick: () => void,
}

const Button: React.FC<ButtonProps> = ({ classStyle, icon, text, handleClick }) => {
  return (
    <div
      className={`button cursor-pointer inline-block rounded-3xl py-2 text-white px-6 bg-[color:var(--primary)] hover:contrast-125 ${classStyle}`}
      onClick={() => handleClick()}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  )
}

export default Button
