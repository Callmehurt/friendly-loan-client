import * as Yup from "yup";

export const userRegistrationSchema = Yup.object({
    profile: Yup.mixed(),
    fullname: Yup.string().required('Fullname is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    address: Yup.string().required('Address is required'),
    phone: Yup.string().required('Phone number is required'),   
});

export const groupSchema = Yup.object({
    thumbnail: Yup.mixed(),
    name: Yup.string().required('Group name is required'),
    description: Yup.string().required('Group description is required')
});


export const loanApplicationSchem = Yup.object({
    groupId: Yup.string().required('Group selection is required'),
    principalAmount: Yup.number().required('Principal amount is required')
})


export const passwordChangeSchema = Yup.object({
    currentPassword: Yup.string().required('Current Password is required'),
    newPassword: Yup.string().required('New Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null]).required('Password Confirmation is required'),
})