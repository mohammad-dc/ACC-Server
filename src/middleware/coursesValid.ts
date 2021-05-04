import * as yup from "yup";

export const CoursesSchema = yup.object().shape({
    name: yup.string().required(),
    type: yup.string().required(),
    exams_url: yup.string(),
    summaries_url: yup.string(),
    course: yup.string(),
    videos: yup.array().of(yup.string())
});

