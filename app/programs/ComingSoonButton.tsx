'use client'

import { useState } from 'react'

export default function ComingSoonButton() {
  const [show, setShow] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="border border-[#00386c] text-[#00386c] font-semibold px-6 py-2 rounded hover:bg-[#00386c] hover:text-white transition"
      >
        Syllabus
      </button>
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-sm rounded whitespace-nowrap">
          Coming soon
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" />
        </div>
      )}
    </div>
  )
}
