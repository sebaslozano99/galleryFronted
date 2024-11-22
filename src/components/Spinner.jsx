import PropTypes from "prop-types";


export default function Spinner({size = 1, color = "#fff"}) {
  return (
    <div 
        className={`border-t-2 border-r-2 border-transparent rounded-full animate-spin`} 
        style={{width: `${size}em`, height: `${size}em`, borderTopColor: `${color},`, borderRightColor: `${color}`}}
    >
      
    </div>
  )
}


Spinner.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
}