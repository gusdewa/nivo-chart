import React from "react";
import Funnel from "./Funnel";
import ReportDailyBarChart from "./Bar";
import { get, map } from "lodash/fp";

import data from "./dummy-summary";
import {
  formatFunnelData,
  SHOWN_PROCESS_NAMES,
  mapProcessToBarChart
} from "./helpers";

export default function App() {
  const getSummaryData = () => get("data.summaryReport")(data);

  const mappedFunnelData = formatFunnelData(getSummaryData())(
    SHOWN_PROCESS_NAMES
  );

  const mappedBarData = mapProcessToBarChart(getSummaryData())(
    SHOWN_PROCESS_NAMES
  );

  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <br />
    </div>
  );
}
