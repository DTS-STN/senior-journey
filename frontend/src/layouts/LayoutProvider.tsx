import type { FC, ReactNode } from 'react'
import React, { createContext, useContext, useMemo, useState } from 'react'

import DefaultLayout from './default/DefaultLayout'
import ErrorLayout from './error/ErrorLayout'

/**
 * The type of layout to be used by a component.
 */
export type Layout = 'default' | 'error' | 'none'

/**
 * The context object for managing the layout of a component.
 */
export interface LayoutContext {
  /**
   * The current layout of the component.
   */
  layout: Layout

  /**
   * A function to set the layout of the component.
   *
   * @param {Layout} layout - The new layout for the component.
   * @returns {void}
   */
  setLayout: (layout: Layout) => void
}

/**
 * Props for the LayoutProvider component.
 */
export interface LayoutProviderProps {
  /**
   * The children of the LayoutProvider component.
   */
  children: ReactNode
}

/**
 * Sets the layout state value of the LayoutProvider context to the specified layout value.
 *
 * @param {Layout} layout - The layout value to set.
 * @returns {void}
 */
export function useLayout(layout: Layout) {
  const { setLayout } = useContext(Context)
  setLayout(layout)
}

/**
 * The layout context object used by the LayoutProvider component.
 */
const Context = createContext<LayoutContext>({
  layout: 'default',
  setLayout: () => {},
})

/**
 * Provides the layout context for a component and renders the appropriate layout based on the current layout state.
 *
 * @param {LayoutProviderProps} props - The props for the LayoutProvider component.
 * @returns {ReactNode} - The rendered component.
 */
const LayoutProvider: FC<LayoutProviderProps> = ({ children }) => {
  const [layout, setLayout] = useState<Layout>('default')
  const context = useMemo(() => ({ layout, setLayout }), [layout, setLayout])

  const layouts: Record<Layout, ReactNode> = {
    default: <DefaultLayout>{children}</DefaultLayout>,
    error: <ErrorLayout>{children}</ErrorLayout>,
    none: <>{children}</>,
  }

  return (
    <Context.Provider value={context}>{layouts[layout]}</Context.Provider>
  )
}

export default LayoutProvider
