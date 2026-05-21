interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  fullWidth?: boolean
}

function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const base = 'py-3 px-6 rounded-xl font-semibold transition-all duration-200'

  const styles = {
    primary: 'bg-purple-600 hover:bg-purple-500 text-white',
    secondary: 'bg-gray-800 hover:bg-gray-700 text-gray-200',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${base}
        ${styles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {children}
    </button>
  )
}

export default Button