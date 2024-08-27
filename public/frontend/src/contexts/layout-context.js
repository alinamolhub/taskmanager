import React, { useContext, useState, useEffect } from "react";
const LayoutContext = React.createContext({});
export const LayoutProvider = ( {children} )=>{
    const [sidebarShow,setSidebarShow] = useState(true);
    const [unfoldable,setUnfoldable] = useState(false);
    return <LayoutContext.Provider value={{sidebarShow,setSidebarShow,unfoldable,setUnfoldable}}>{children}</LayoutContext.Provider>;
};
export const useLayoutContext =()=>{
    return useContext(LayoutContext); 
}