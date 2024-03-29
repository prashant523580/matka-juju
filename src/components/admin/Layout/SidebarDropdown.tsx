import React from 'react'

interface PropsTypes{
    children: React.ReactNode,
    open:boolean
}
function SidebarDropdown({children,open} : PropsTypes) {
  return (
    <div 
        style={{
            height: !open  ?  React.Children.count(children) * 45 : 0 
        }}
    className={` overflow-hidden duration-100 my-2 transition-all space-y-2 `}>
        {children}
    </div>
  )
}

export default SidebarDropdown