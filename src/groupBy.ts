export const groupBy = <T>(
  items: T[],
  getGroup: (item: T, i: number) => string
) =>
  Object.values(
    items.reduce<Record<string, T[]>>(
      (result, item, i) => ({
        ...result,
        [getGroup(item, i)]: [...(result[getGroup(item, i)] || []), item],
      }),
      {}
    )
  );
