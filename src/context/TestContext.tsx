import React, { createContext, useState } from 'react'
export const SampleContext = createContext({} as any)
const TestContextProvider = (props: any) => {
    const [haschange, setHasChange] = useState(true)
    return (
         <SampleContext.Provider 
            value={{
                haschange,
             }}>
                {props.children}
         </SampleContext.Provider>
    )
}
export default TestContextProvider;