import React from 'react'

type props = {
    title: string
}

const Mousehover = ({ title }: props) => {
    return (
        <div className="absolute top-8 left-[-10px] bg-[#1c1b1b] px-2 py-1 text-white z-[1000] text-[10px]">
            {title}
        </div>
    )
}

export default Mousehover;