import { space } from 'postcss/lib/list'
import React from 'react'

const DocsCard = ({title, space_filled, last_update, icon, iconBgColor}) => {
  return (
    <div className="relative w-56 h-60">
      {/* SVG Mask */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 224 240" preserveAspectRatio="none">
        <defs>
          <mask id="inwardCurveMask">
            <rect width="100%" height="100%" fill="white" />
            {/* <!-- Inward curve --> */}
            <circle cx="0" cy="0" r="60" fill="black" />
          </mask>
        </defs>
        <rect width="100%" height="100%" rx="20" ry="20" fill="white" mask="url(#inwardCurveMask)" />
      </svg>

      {/* Content Layer (positioned on top) */}
      <div className="absolute inset-0 p-4 pt-16 text-center text-gray-800">
        {/* Icon circle */}
        <div className={`absolute -top-4 -left-2 w-12 h-12 ${iconBgColor} rounded-full flex items-center justify-center shadow-md`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            {icon}
          </svg>
        </div>

        {/* Top right label */}
        <div className="absolute top-4 right-4 font-semibold text-sm">{space_filled}</div>

        {/* Title and info */}
        <div className="text-lg font-semibold mt-2">{title}</div>
        <div className="text-xs text-gray-400 mt-1">
          Last update<br />
          {last_update}
        </div>
      </div>
    </div>
  )
}

export default DocsCard
