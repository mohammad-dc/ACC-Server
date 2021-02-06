import * as yup from "yup";

export const VideosSchema = yup.object().shape({
    course_id: yup.number().required(), 
    url: yup.string().url().required()
});
