/**
 * API error parsing
 */

export const parseAPIError = (request) => {
  const { response } = (request || {});

  if (response) {
    const { data } = (response || {});

    if (data.error) {
      return data.error.errors || data.error;
    }
  }

  return request;
};
