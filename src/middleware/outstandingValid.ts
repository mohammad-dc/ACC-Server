import * as yup from "yup";

export const OutStandingStudentsSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  image: yup.mixed(),
  description: yup.string().required()
});

