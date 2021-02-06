import * as yup from "yup";

export const NewsSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    image: yup.mixed()
});
