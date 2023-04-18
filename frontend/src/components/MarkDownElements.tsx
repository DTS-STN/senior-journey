// components/MarkdownElements.tsx
import styled from '@emotion/styled'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

type StyledH1Props = DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
type StyledParagraphProps = DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>
type StyledUlProps = DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>
type StyledLiProps = DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>
type StyledAnchorProps = DetailedHTMLProps<HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>

export const StyledH1 = styled.h1<StyledH1Props>`
  color: black;
  font-size: 2rem;
`
export const StyledParagraph = styled.p<StyledParagraphProps>`
  color: black;
  font-size: 1.0rem;
`
export const StyledUl = styled.ul<StyledUlProps>`
  list-style-type: disc;
  padding-left: 1.0rem;
`

export const StyledLi = styled.li<StyledLiProps>`
  line-height: 1.0;
  margin-bottom: 0.5em;
`
export const StyledAnchor = styled.a<StyledAnchorProps>`
  color: blue;
  text-decoration: underline;
`


// Add more styled components for other Markdown elements as needed.
