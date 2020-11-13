import styled from "styled-components";

export const Wrapper = styled.div`
  height: 80vh;
  margin: 0 20px 20px 0;
  padding: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const Legend = styled.ul`
  list-style: none;
  font-size: smaller;

  li {
    float: left;
    margin-right: 10px;
  }
`;

export const LegendSpan = styled.span`
  background-color: ${props => props.backgroundColor};
  border: 1px solid #ccc;
  float: left;
  width: 12px;
  height: 12px;
  margin: 2px;
  padding: 10px 0;
`;
