import React from 'react'

const Loader = () => {
    return (
        <div
            className={`fixed inset-0 flex justify-center items-center transition-colors visible bg-black/80`}
        >
            <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
        </div>

    )
}

export default Loader