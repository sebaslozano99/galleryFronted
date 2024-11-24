import PropTypes from "prop-types";


export default function LoadingPage({children}) {
  return (
    <div className="flex justify-center items-center w-full min-h-[92vh]" >
        { children }
    </div>
  )
}

LoadingPage.propTypes = {
    children: PropTypes.node
}