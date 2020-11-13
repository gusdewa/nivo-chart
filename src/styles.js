import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  grid-template-areas: "funnel bar bar bar";
`;

export const FunnelContainer = styled.div`
  grid-area: funnel;
`;

export const BarContainer = styled.div`
  grid-area: bar;
`;

export const FlexGrid = styled.div`
  @media (max-width: 1000px) {
    flex-direction: column;
  }

  display: flex;

  div:last-child {
    margin-right: 0;
  }

  h2 {
    margin: -15px -15px 15px -15px;
    padding: 12px 15px;
    font-size: 14px;
    font-weight: 400;
    border-bottom: 1px solid #ddd;
  }
`;

export const FlexGridDiv = styled.div`
  flex: 1;
  margin: 0 5px 5px 0;
  padding: 15px;
  ${props => !props.noBorder && "border: 1px solid #ddd"};
  background: #fff;

  @media (max-width: 1000px) {
    margin-right: 0;
  }
`;

export const LoaderWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const ChartDiv = styled.div`
  height: 30vh;
`;

export const InfoText = styled.h2`
  margin: 0 0 5px 0;
`;
