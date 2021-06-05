export const constructQueryParams = (params: any) => {
  let output = '';

  Object.entries(params).forEach(([key, val], index) => {
    if (val) {
      output += `${index === 0 ? '?' : '&'}${key}=${val}`;
    }
  });

  return output;
};
