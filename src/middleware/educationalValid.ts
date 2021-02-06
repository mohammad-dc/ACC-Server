import * as yup from "yup";

export const EducationalStaffSchema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    image: yup.mixed(),
    facebook: yup.string().required()
});
