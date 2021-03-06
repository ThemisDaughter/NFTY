import { motion } from 'framer-motion';
import styled from 'styled-components';
const InnerCarousel = styled.div`
display: flex;
padding: 1rem 0;
overflow-x: auto;
overflow: -moz-scrollbars-none;
overscroll-behavior-inline: none;
scroll-bahavior: smooth;
&::-webkit-scrollbar { width: 0 !important;}`

const OuterDiv = styled.div`
width: 100%;
overflow: hidden;
`

interface IProps {
  children: React.ReactNode;
  title?: string;
}

const ScrollList = ({ children, title }: IProps) => {
  return (
    <OuterDiv>
      <div>
        <h2>
      { title }
    </h2>
      </div>
    <InnerCarousel>
    {children}
      </InnerCarousel>
    </OuterDiv>)
}
export default ScrollList;