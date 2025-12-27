import { diff, Diff } from "deep-diff";

export function compareResponses(res1: any, res2: any) {
  const differences = diff(res1, res2) || [];

  return differences.map(d => {
    const dd = d as any; // ✅ single safe cast

    return {
      field: d.path?.join(".") || "root",
      changeType:
        d.kind === "E" ? "Value Changed" :
        d.kind === "N" ? "New Field Added" :
        d.kind === "D" ? "Field Removed" :
        "Array Change",
      api1Value: dd.lhs ?? dd.item?.lhs,
      api2Value: dd.rhs ?? dd.item?.rhs
    };
  });
}
