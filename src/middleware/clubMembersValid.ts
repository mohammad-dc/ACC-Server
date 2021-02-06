import * as yup from "yup";

export const ClubMembersSchema = yup.object().shape({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    image: yup.mixed(),
    rank: yup.string().required()
});
