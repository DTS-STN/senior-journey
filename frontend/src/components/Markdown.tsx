import React, { PropsWithChildren } from 'react'

import { Link } from '@mui/material'
import ReactMarkdown, { MarkdownToJSX } from 'markdown-to-jsx'

const OrderedList = ({ children, ...props }: PropsWithChildren) => (
  <ol {...props} className="mb-4 list-decimal space-y-2 pl-7">
    {children}
  </ol>
)

const Paragraph = ({ children, ...props }: PropsWithChildren) => <p {...props}>{children}</p>

const UnorderedList = ({ children, ...props }: PropsWithChildren) => (
  <ul {...props} className="mb-4 list-disc space-y-1 pl-7">
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

const Markdown = (props: MarkdownProps) => {
  return <ReactMarkdown {...props} options={markdownOptions} />
}

export default Markdown
