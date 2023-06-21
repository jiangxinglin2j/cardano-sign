import React from "react";
import styled from 'styled-components';

const LayoutCon = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 10px 0;
  display: flex;
  flex-direction: column;
`;

function Layout(props) {
  return (
    <LayoutCon>
      {
        props.children
      }
    </LayoutCon>
  )
};

export default Layout;