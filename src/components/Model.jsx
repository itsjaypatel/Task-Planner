

function Modal({ open=false, onClose, children }) {

  
  return (
    // backdrop
    <div
      className={`
        fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/80" : "invisible"}
      `}
    >
      {/* model */}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`
          bg-white rounded-xl shadow-lg p-6 transition-shadow
          ${open ? "scale-100 opacity-100 w-1/2" : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
        >
          <i className="fa-solid fa-xmark fa-xl"></i>
        </button>
        {children}
      </div>
    </div>
  )
}
export default Modal;