import PropTypes from "prop-types";



export default function CircleSpinner({
    size = 1
}) {
  return (
    <div 
        className={`border-t-2 border-r-2 border-t-[#fff] border-r-[#fff] rounded-full animate-spin`} 
        style={{width: `${size}em`, height: `${size}em`}}
    >
      
    </div>
  )
}


CircleSpinner.propTypes = {
    size: PropTypes.number
}