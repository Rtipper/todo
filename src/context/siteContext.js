import React, { createContext, useState, useMemo } from 'react';

export const SortContext = createContext()

function SiteContext(props) {
  const [sort, setSort] = useState("")
  const providerSort = useMemo(() => ({ sort, setSort }), [sort, setSort])

  return (
      <SortContext.Provider value={providerSort}>
        {props.children}
      </SortContext.Provider>
  )
}

export default SiteContext;