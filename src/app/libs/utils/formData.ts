export const getFormDataToBody = async (formData: FormData) => {
  const payload: Record<string, string> = {};
  formData.forEach((value, key) => {
    payload[key] = value.toString();
  });
  return JSON.stringify(payload);
};
