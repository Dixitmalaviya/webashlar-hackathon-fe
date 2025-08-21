const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  isLoading = false,
  disabled = false,
  variant = 'primary',
  className = ''
}) => {
  const baseClasses = "w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center";
  const variantClasses = variant === 'primary'
    ? "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-400"
    : "bg-gray-100 hover:bg-gray-200 text-gray-700 disabled:bg-gray-50";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {isLoading ? (
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;