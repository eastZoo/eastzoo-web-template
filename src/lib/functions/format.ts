import dayjs from "dayjs";

export const formatDisplay = (value?: string | number) => {
  if (!value) {
    return "0";
  }

  if (typeof value === "number") {
    return parseFloat(value.toFixed(2)).toString();
  }

  const num = parseFloat(value);
  if (!isNaN(num)) {
    return parseFloat(num.toFixed(2)).toString();
  }

  return value.toString();
};

export const formatGaugeValue = (value?: string | number) => {
  if (value === undefined || value === null || value === "") {
    return 0;
  }

  if (typeof value === "number") {
    return parseFloat(value.toFixed(2));
  }

  const num = parseFloat(value);
  if (!isNaN(num)) {
    return parseFloat(num.toFixed(2));
  }

  return 0;
};

export const formatTime = (time?: Date) => {
  if (!time) {
    return "00:00:00";
  }

  return dayjs(time).format("HH:mm:ss");
};

export const formatFixedPoint = (value?: string | number) => {
  if (!value) {
    return "0";
  } else if (typeof value === "string") {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return value.toLocaleString();
};
