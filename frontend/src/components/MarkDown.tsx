// components/Markdown.tsx
import React from 'react'
import ReactMarkdown, { Components }  from 'react-markdown'
import { StyledH1, StyledParagraph, StyledUl, StyledLi, StyledAnchor } from './MarkDownElements';

interface MarkDownProps {
    content: string
}

const MarkDown: React.FC<MarkDownProps> = ({ content }) => {
    const components: Components = {
        h1: ({ node, ...props }) => <StyledH1 {...props} />,
        p: ({ node, ...props }) => <StyledParagraph {...props} />,
        ul: ({ node, ...props }) => <StyledUl {...props} />,
        li: ({ node, ...props }) => <StyledLi {...props} />,
        a: ({ node, ...props }) => <StyledAnchor {...props} />,
      }
    return <ReactMarkdown components={components}>{content}</ReactMarkdown>
}

export default MarkDown