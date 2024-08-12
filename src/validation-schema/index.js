import * as Yup from "yup";

export const groupSchema = Yup.object({
    thumbnail: Yup.mixed(),
    name: Yup.string().required('Group name is required'),
    description: Yup.string().required('Group description is required')
});


export const loanApplicationSchem = Yup.object({
    groupId: Yup.string().required('Group selection is required'),
    principalAmount: Yup.number().required('Principal amount is required')
})
