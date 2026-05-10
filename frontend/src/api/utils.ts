export const objectToFormData = <T extends object>(object: T): FormData => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(object)) {
    if (value) {
      formData.append(key, value instanceof Blob ? value : String(value));
    }
  }
  return formData;
};
