import PropTypes from "prop-types";

// Button variants
// 1. Regular -- rectangular btn
// 2. Rounded -- rounded btn


export default function Button({
    children, 
    paddingY = "py-0",
    paddingX = "px-0",
    bgColor = "bg-slate-500",
    variant = "regular",
    className = "",
    isLoading = false,
    onClick
}) {

  if(variant !== "regular") return (
    <button
        className={`${paddingY} ${paddingX} ${bgColor} rounded-full ${className}`}
        onClick={onClick}
        disabled={isLoading}
    >
        {children}
    </button>
  )


  return (
    <button
        className={`${paddingY} ${paddingX} ${bgColor} ${className}`}
        onClick={onClick}
    >
        {children}
    </button>
  )
}


Button.propTypes = {
    children: PropTypes.node,
    paddingX: PropTypes.string,
    paddingY: PropTypes.string,
    bgColor: PropTypes.string,
    variant: PropTypes.string,
    className: PropTypes.string,
    isLoading: PropTypes.bool,
    onClick: PropTypes.func,
}