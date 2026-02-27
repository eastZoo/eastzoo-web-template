type Unit = "days" | "months";
type ValidationResult = { isValid: boolean; message?: string };

/**
 * 날짜 범위 검증
 * @param startDate 시작날짜
 * @param endDate 종료날짜
 * @param maxValue 최대값
 * @param unit 단위 (days/months)
 */
export const validateDateRange = (
  startDate: string | null,
  endDate: string | null,
  maxValue: number,
  unit: Unit = "months",
  userName?: string
): ValidationResult => {
  if (!startDate || !endDate) return { isValid: true };

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) {
    return { isValid: false, message: "올바른 날짜를 입력해주세요." };
  }

  const diff =
    unit === "days"
      ? Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
      : (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());

  /* 부장님 날짜 범위 제한 해제 */
  if (userName === "김광준") {
    return { isValid: true };
  }

  return diff > maxValue
    ? {
        isValid: false,
        message: `기간은 ${maxValue}${
          unit === "days" ? "일" : "개월"
        }을 초과할 수 없습니다.`,
      }
    : { isValid: true };
};

// 편의 함수
export const validateDays = (
  start: string | null,
  end: string | null,
  maxDays: number
) => validateDateRange(start, end, maxDays, "days");

export const validateMonths = (
  start: string | null,
  end: string | null,
  maxMonths: number
) => validateDateRange(start, end, maxMonths, "months");
