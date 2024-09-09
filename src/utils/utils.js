import Ajv from "ajv";
const ajv = new Ajv();

export const setUri = (uri, id) => uri.replace("{id}", id);

export const validateJson = (schema, data) => {
  const validate = ajv.compile(schema);
  const valid = validate(data);
  if (!valid) console.log(validate.errors);
  return valid;
};
