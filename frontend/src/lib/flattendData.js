export const flattenFormData = (formDataObj) => {
  const formData = new FormData();

  Object.entries(formDataObj).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        formData.append(`${key}[${index}]`, item);
      });
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};
