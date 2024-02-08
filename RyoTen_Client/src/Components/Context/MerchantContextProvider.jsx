import React, {useState} from 'react'

import MerchantContext from './MerchantContext'

const MerchantContextProvider = ({children}) => {
    const [merchant, setMerchant] = useState("Grant PLC")
    return (
        <MerchantContext.Provider value={{merchant, setMerchant}}>
            {children}
        </MerchantContext.Provider>
    )

}

export default MerchantContextProvider;