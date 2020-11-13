/* eslint-disable import/no-unresolved */
/**
 *
 * ReportSummary
 * Documentation goes here
 */

import React from "react";
import { map } from "lodash";
import PropTypes from "prop-types";
import { ResponsiveFunnel } from "@nivo/funnel";
import { LEGEND_COLORS_FUNNEL } from "./helpers";
import { Wrapper, Legend, LegendSpan } from "./funnel-styles";

function ReportSummary({ data, showLegend }) {
  return (
    <Wrapper>
      <ResponsiveFunnel
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
        valueFormat=" >-.0f"
        colors={{
          scheme: "nivo"
        }}
        borderWidth={20}
        labelColor={{ from: "color", modifiers: [["darker", 3]] }}
        currentPartSizeExtension={10}
        currentBorderWidth={20}
        motionConfig="wobbly"
      />
      {data.length > 0 && showLegend && (
        <Legend>
          {map(data, (dd, idx) => (
            <li key={dd.label}>
              <LegendSpan backgroundColor={LEGEND_COLORS_FUNNEL[idx]} />
              {`${dd.label}:`} <b>{`${dd.value}`}</b> -{" "}
              <b>{`${dd.percentage}`}</b>
            </li>
          ))}
        </Legend>
      )}
    </Wrapper>
  );
}

ReportSummary.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.number,
      label: PropTypes.string
    })
  ),
  showLegend: PropTypes.bool
};

export default ReportSummary;
