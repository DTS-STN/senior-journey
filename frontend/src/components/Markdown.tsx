import React, { FC, PropsWithChildren } from 'react'

import { Link } from '@mui/material'
import ReactMarkdown, { MarkdownToJSX } from 'markdown-to-jsx'

const OrderedList: FC<PropsWithChildren> = ({ children, ...props }) => (
  <ol {...props} className="mb-4 list-decimal space-y-2 pl-7">
    {children}
  </ol>
)

const Paragraph: FC<PropsWithChildren> = ({ children, ...props }) => <p {...props}>{children}</p>

const UnorderedList: FC<PropsWithChildren> = ({ children, ...props }) => (
  <ul {...props} className="mb-4 list-disc space-y-2 pl-7">
    {children}
  </ul>
)

const markdownOptions: MarkdownToJSX.Options = {
  wrapper: React.Fragment,
  overrides: {
    a: {
      component: Link,
    },
    ol: {
      component: OrderedList,
    },
    ul: {
      component: UnorderedList,
    },
    span: {
      component: Paragraph,
    },
  },
}

interface MarkdownProps extends Record<string, unknown> {
  children: string
}

const Markdown: FC<MarkdownProps> = (props) => {
  return <ReactMarkdown {...props} options={markdownOptions} />
}

export default Markdown
