/**
 *
 * ReportDailyBarChart
 * Component documentation goes here
 */

import React from "react";
import PropTypes from "prop-types";
import { ResponsiveBar } from "@nivo/bar";
//

function ReportDailyBarChart({ data, showLegend, keys, indexBy }) {
  return (
    <ResponsiveBar
      data={data}
      keys={keys || ["value"]}
      indexBy={indexBy || "label"}
      colors={{ scheme: "nivo" }}
      margin={{ top: 25, right: showLegend ? 100 : 25, bottom: 25, left: 60 }}
      padding={0.3}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={
        showLegend && [
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]
      }
    />
  );
}

ReportDailyBarChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      value: PropTypes.number,
      label: PropTypes.string
    })
  ),
  showLegend: PropTypes.bool,
  keys: PropTypes.array,
  indexBy: PropTypes.string
};

export default ReportDailyBarChart;
