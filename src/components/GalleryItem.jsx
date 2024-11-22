import PropTypes from "prop-types";



export default function GalleryItem({item}) {
  return (
    <div className="border border-black/50" >
        <img 
          src={`http://localhost:5000/${item.url_path}`} 
          alt={item.name}
          className="w-full h-full object-contain" 
        />
    </div>
  )
}


GalleryItem.propTypes = {
    item: PropTypes.object
}