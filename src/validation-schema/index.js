import * as Yup from "yup";

export const groupSchema = Yup.object({
    name: Yup.string().required('Group name is required'),
    description: Yup.string().required('Group description is required')
});

