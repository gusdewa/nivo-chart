/* eslint-disable import/no-unresolved */
import { isString, sumBy, reduce } from "lodash";
import {
  concat,
  flow,
  filter,
  groupBy,
  get,
  includes,
  map,
  merge,
  sortBy
} from "lodash/fp";
import moment from "moment";
import {
  JOURNEY_DEFAULT,
  JOURNEY_HOME_ALT_UPLOAD_LAST_PAGE,
  JOURNEY_HOME_ALT_KREDIVO_LAST_PAGE,
  JOURNEY_HOME_ALT_SIMPLIFIED
} from "constants/journeyKeys";

export const formOptionsInitialValue = {
  risk: [
    {
      label: "Select Risk",
      value: ""
    },
    {
      label: "1",
      value: "1"
    },
    {
      label: "2",
      value: "2"
    },
    {
      label: "3",
      value: "3"
    },
    {
      label: "4",
      value: "4"
    }
  ],
  altJourney: [
    {
      label: "Select Journey",
      value: ""
    },
    {
      label: JOURNEY_DEFAULT,
      value: JOURNEY_DEFAULT
    },
    {
      label: JOURNEY_HOME_ALT_UPLOAD_LAST_PAGE,
      value: JOURNEY_HOME_ALT_UPLOAD_LAST_PAGE
    },
    {
      label: JOURNEY_HOME_ALT_KREDIVO_LAST_PAGE,
      value: JOURNEY_HOME_ALT_KREDIVO_LAST_PAGE
    },
    {
      label: JOURNEY_HOME_ALT_SIMPLIFIED,
      value: JOURNEY_HOME_ALT_SIMPLIFIED
    }
  ],
  segment: [
    {
      label: "Select Segment",
      value: ""
    },
    {
      label: "Low",
      value: "low"
    },
    {
      label: "High",
      value: "high"
    }
  ],
  propensity: [
    {
      label: "Select Propensity",
      value: ""
    },
    {
      label: "1",
      value: "1"
    },
    {
      label: "2",
      value: "2"
    },
    {
      label: "3",
      value: "3"
    },
    {
      label: "4",
      value: "4"
    }
  ]
};

export const funnelIdFormat = text => text.replace(/ /g, "_").toLowerCase();

export const funnelLabelFormat = text => (isString(text) ? text : "");

export const filterInputHandler = (name, value) => {
  const updatedFormValue = {
    [name]: value
  };
  if (includes("Date")(name)) {
    updatedFormValue[name] = moment(value).format("YYYY-MM-DD");
  }
  return updatedFormValue;
};

export const SHOWN_PROCESS_NAMES = {
  "OTP Validation": "OTP Validation",
  "Upload Documents": "e-KYC",
  "Employment Detail": "Completed the form",
  "Kredivo Total Submission": "Passed to Kredivo",
  "Combined Approved": "Approved"
};

export const SHOWN_PROCESS_NAMES_SEGMENT = SHOWN_PROCESS_NAMES;

export const LEGEND_COLORS_FUNNEL = [
  "#e8c1a0",
  "#f47560",
  "#f1e15b",
  "#e8a838",
  "#5BCDBB"
];

export const LEGEND_BAR_CHART_LOW = ["low_q1", "low_q2", "low_q3", "low_q4"];

export const LEGEND_BAR_CHART_HIGH = [
  "high_q1",
  "high_q2",
  "high_q3",
  "high_q4"
];

export const LEGEND_BAR_CHART_ALL = concat(LEGEND_BAR_CHART_LOW)(
  LEGEND_BAR_CHART_HIGH
);

const percentageReducer = arr =>
  reduce(
    arr,
    (acc, cur, ix) =>
      concat({
        ...cur,
        percentage: `${Number(
          (cur.value / (get(`[${ix - 1}].value`)(arr) || cur.value)) * 100
        ).toFixed(2)}%`
      })(acc),
    []
  );

export const formatFunnelData = datas => shownProcessNames =>
  flow(
    groupBy("process_name"),
    item => Object.entries(item),
    map(([key, obj]) => ({
      process_name: key,
      value: sumBy(obj, "value"),
      order: get("[0].order")(obj)
    })),
    // Only show specific steps for simplification
    filter(item => includes(item.process_name)(Object.keys(shownProcessNames))),
    arr => percentageReducer(arr),
    // Map to Nivo data
    map(item => ({
      id: funnelIdFormat(item.process_name),
      value: Number(item.value),
      label: funnelLabelFormat(get(item.process_name)(shownProcessNames)),
      ...item
    })),
    sortBy(["order"])
  )(datas);

export const mapProcessToBarChart = backEndData => shownProcessNames =>
  map(key => ({
    title: get(key)(shownProcessNames),
    data: makeFormatBarData(key)(backEndData)
  }))(Object.keys(shownProcessNames));

export const makeFormatBarData = processName => backEndData =>
  flow(
    // Filter only for the given processName,
    filter(item => get("process_name")(item) === processName),
    groupBy("report_date"),
    item => Object.entries(item),
    map(([key, obj]) => ({
      report_date: key,
      value: sumBy(obj, "value")
    })),
    // Map to Nivo data
    map(item => ({
      id: moment(item.report_date).toISOString(),
      value: Number(item.value),
      label: moment(item.report_date).format("DD-MMM")
    })),
    sortBy("id")
  )(backEndData);

export const mapProcessToStackedBarChart = backEndData => shownProcessNames =>
  map(key => ({
    title: get(key)(shownProcessNames),
    data: makeFormatStackedBarData(key)(backEndData)
  }))(Object.keys(shownProcessNames));

export const makeFormatStackedBarData = processName => backEndData =>
  flow(
    // Filter only for the given processName,
    filter(item => get("process_name")(item) === processName),
    groupBy("report_date"),
    item => Object.entries(item),
    map(([key, obj]) => ({
      report_date: key,
      value: sumBy(obj, "value"),
      ...obj[0]
    })),
    // Map to Nivo stacked bar data
    map(item => ({
      id: moment(item.report_date).toISOString(),
      label: moment(item.report_date).format("DD-MMM"),
      low_q1: Number(item.low_q1),
      low_q2: Number(item.low_q2),
      low_q3: Number(item.low_q3),
      low_q4: Number(item.low_q4),
      high_q1: Number(item.high_q1),
      high_q2: Number(item.high_q2),
      high_q3: Number(item.high_q3),
      high_q4: Number(item.high_q4)
    })),
    sortBy("id")
  )(backEndData);

export const segmentBarChartKeys = filterParams => {
  const segment = get("segment")(filterParams) || "all";
  return get(segment)({
    low: LEGEND_BAR_CHART_LOW,
    high: LEGEND_BAR_CHART_HIGH,
    all: LEGEND_BAR_CHART_ALL
  });
};

/**
 * map and calculated value segments based on filter segment/propensity
 * @param {array} backEndData
 */
export const mapAndCalculateByFilter = backEndData => filterParams =>
  map(item => {
    const filterSegment = get("segment")(filterParams) || "all";
    const filterPropensity = Number(get("propensity")(filterParams)) || 0;
    const { segments } = item;

    let low;
    let high = 0;

    if (filterSegment === "low" && filterPropensity) {
      low = sumBy(get("low")(segments), segment =>
        filterPropensity === Number(segment.propensity)
          ? Number(segment.value)
          : 0
      );
    } else if (filterSegment === "high" && filterPropensity) {
      high = sumBy(get("high")(segments), segment =>
        filterPropensity === Number(segment.propensity)
          ? Number(segment.value)
          : 0
      );
    } else if (filterSegment === "all" && filterPropensity) {
      low = sumBy(get("low")(segments), segment =>
        filterPropensity === Number(segment.propensity)
          ? Number(segment.value)
          : 0
      );
      high = sumBy(get("high")(segments), segment =>
        filterPropensity === Number(segment.propensity)
          ? Number(segment.value)
          : 0
      );
    } else {
      low = sumBy(get("low")(segments), "value");
      high = sumBy(get("high")(segments), "value");
    }

    const value = {
      low,
      high,
      all: low + high
    };

    // simplify data for stacked bar chart for segment report
    const mergedSegments = flow(
      segment => Object.entries(segment),
      map(([key, obj]) =>
        map(segment => ({
          [`${key}_q${segment.propensity}`]: segment.value
        }))(obj)
      ),
      param => Object.assign({}, ...param[0], ...param[1])
    )(segments);

    return merge(item)({
      value: get(filterSegment)(value),
      ...mergedSegments
    });
  })(backEndData);
