

export const resourcesV1 = {
    // Auth 
    LOGIN: {
        name: 'Login',
        displayName: 'Login',
        parent: 'Auth',
    },

    REGISTER: {
        name: 'Register',
        displayName: 'Register',
        parent: 'Auth',
    },

    REFRESH_TOKEN: {
        name: 'Refresh Token',
        displayName: 'Refresh Token',
        parent: 'Auth',
    },
    CHANGE_PASSWORD: {
        name: 'Change Password',
        displayName: 'Change Password',
        parent: 'Auth',
    },
    // End Auth 


    // User 
    User: {
        root: "Client",
        CREATE_USER: {
            name: 'Create user',
            displayName: 'Create user',
            parent: 'User',
        },
        GET_PROFILE: {
            name: 'Get profile',
            displayName: 'Get profile',
            parent: 'User',
        }
    },
    // End User


    // Admin 
    Admin: {
        root: "Admin",
        CREATE_USER: {
            name: 'Create user',
            displayName: 'Create user',
            parent: 'Account',
        },
        UPDATE_USER: {
            name: 'Update user',
            displayName: 'Update user',
            parent: 'Account',
        },
        GET_ALL_USERS: {
            name: 'Get All User',
            displayName: 'Get All User',
            parent: 'Account',
        },
        GET_DETAIL_USER: {
            name: 'Get Detail User',
            displayName: 'Get Detail User',
            parent: 'Account',
        },
        UPDATE_STATUS_USER: {
            name: 'Change Status User',
            displayName: 'Change status user',
            parent: 'Account',
        },
        DELETE_USER: {
            name: 'Delete User',
            displayName: 'Delete User',
            parent: 'Account',
        },
        IMPORT_STUDENT: {
            name: 'Import Student',
            displayName: 'Import Student',
            parent: 'Student',
        },
        CREATE_STUDENT: {
            name: 'Create Student',
            displayName: 'Create Student',
            parent: 'Student',
        },
        UPDATE_STUDENT: {
            name: 'Update Student',
            displayName: 'Update Student',
            parent: 'Student',
        },
        GET_ALL_STUDENT: {
            name: 'Get All Student',
            displayName: 'Get All Student',
            parent: 'Student',
        },
        GET_DETAIL_STUDENT: {
            name: 'Get Detail Student',
            displayName: 'Get Detail Student',
            parent: 'Student',
        },
    },
    Parent: {
        root: "Parent",
        // HEALTH_PROFILE
        CREATE_HEALTH_PROFILE: {
            name: 'Create Health Profile',
            displayName: 'Create Health Profile',
            parent: 'Health',
        },
        UPDATE_HEALTH_PROFILE: {
            name: 'Update Health Profile',
            displayName: 'Update Health Profile',
            parent: 'Health',
        },
        GET_ALL_HEALTH_PROFILE: {
            name: 'Get All Health Profile',
            displayName: 'Get All Health Profile',
            parent: 'Health',
        },
        GET_DETAIL_HEALTH_PROFILE: {
            name: 'Get Detail Health Profile',
            displayName: 'Get Detail Health Profile',
            parent: 'Health',
        },
        // VACCINATION_EVENT
        GET_ALL_VACCINATION_EVENT: {
            name: 'Get All Vaccination Event',
            displayName: 'Get All Vaccination Event',
            parent: 'Vaccination Event',
        },
        GET_ALL_RESULT_VACCINATION_EVENT: {
            name: 'Get All Result Vaccination Event',
            displayName: 'Get All Result Vaccination Event',
            parent: 'Vaccination Event',
        },
        ACCEPTED_VACCINATION_EVENT: {
            name: 'Accepted Vaccination Event',
            displayName: 'Accepted Vaccination Event',
            parent: 'Vaccination Event',
        },
        DECLIEND_VACCINATION_EVENT: {
            name: 'Declined Vaccination Event',
            displayName: 'Declined Vaccination Event',
            parent: 'Vaccination Event',
        },

        FROM_DATA_HEALTH_PROFILE: {
            name: 'Form Data Health Profile',
            displayName: 'Form Data Health Profile',
            parent: 'Health',
        },
        STUDENT_OF_PARENT: {
            name: 'Student Of Parent',
            displayName: 'Student Of Parent',
            parent: 'Health',
        },
    },
    Nurse: {
        root: "Nurse",
        // Health Profile 
        GET_ALL_HEALTH_PROFILE: {
            name: 'Get All Health Profile',
            displayName: 'Get All Health Profile',
            parent: 'Health',
        },
        GET_DETAIL_HEALTH_PROFILE: {
            name: 'Get Detail Health Profile',
            displayName: 'Get Detail Health Profile',
            parent: 'Health',
        },
        // Vacination Event
        GET_ALL_VACCINATION_EVENT: {
            name: 'Get All Vaccination Event',
            displayName: 'Get All Vaccination Event',
            parent: 'Vaccination Event',
        },
        GET_DETAIL_VACCINATION_EVENT: {
            name: 'Get Detail Vaccination Event',
            displayName: 'Get Detail Vaccination Event',
            parent: 'Vaccination Event',
        },
        RESULT_VACCINATION_EVENT: {
            name: 'Result Vaccination Event',
            displayName: 'Result Vaccination Event',
            parent: 'Vaccination Event',
        },
        GET_DETAIL_RESULT_VACCINATION_EVENT: {
            name: 'Get Detail Result Vaccination Event',
            displayName: 'Get Detail Result Vaccination Event',
            parent: 'Vaccination Event',
        },
        UPDATE_RESULT_VACCINATION_EVENT: {
            name: 'Update Result Vaccination Event',
            displayName: 'Update Result Vaccination Event',
            parent: 'Vaccination Event',
        },
        SEND_NOTIFICATION_RESULT_VACCINATION_EVENT: {
            name: 'Send Notification Result Vaccination Event',
            displayName: 'Send Notification Result Vaccination Event',
            parent: 'Vaccination Event',
        },
        // Medicine 
        GET_ALL_MEDICINE: {
            name: 'Get All Medicine',
            displayName: 'Get All Medicine',
            parent: 'Medicine',
        },
        GET_ALL_MEDICINE_SUPPLY: {
            name: 'Get All Medicine Supply',
            displayName: 'Get All Medicine Supply',
            parent: 'Medicine',
        },
        GET_ALL_MEDICINE_CLASSIFY: {
            name: 'Get All  Medicine Classify ',
            displayName: 'Get All  Medicine Classify',
            parent: 'Medicine',
        },
        SEND_REQUEST_MANAGER: {
            name: 'Send Request Manager ',
            displayName: 'Send Request Manager',
            parent: 'Medicine',
        },
        GET_ALL_SEND_REQUEST_MANAGER: {
            name: 'Get All Send Request Manager ',
            displayName: 'Get All Send Request Manager',
            parent: 'Medicine',
        },
        GET_DETAIL_SEND_REQUEST_MANAGER: {
            name: 'Get Detail Send Request Manager ',
            displayName: 'Get Detail Send Request Manager',
            parent: 'Medicine',
        },
        // Medical Event 
        CREATE_MEDICAL_EVENT: {
            name: 'Create Medical Event',
            displayName: 'Create Medical Event',
            parent: 'Medical Event',
        },
        UPDATE_STATUS_MEDICAL_EVENT: {
            name: 'Update Status Medical Event',
            displayName: 'Update Status Medical Event',
            parent: 'Medical Event',
        },
        GET_ALL_MEDICAL_EVENT: {
            name: 'Get All Medical Event',
            displayName: 'Get All Medical Event',
            parent: 'Medical Event',
        },
        GET_DETAIL_MEDICAL_EVENT: {
            name: 'Get Detail Medical Event',
            displayName: 'Get Detail Medical Event',
            parent: 'Medical Event',
        },
        SEND_NOTIFICATION_MEDICAL_EVENT: {
            name: 'Send Notification Medical Event',
            displayName: 'Send Notification Medical Event',
            parent: 'Medical Event',
        },
    },
    Manager: {
        root: "Manager",
        CREATE_VACCINATION_EVENT: {
            name: 'Create Vaccination Event',
            displayName: 'Create Vaccination Event',
            parent: 'Vaccination Event',
        },
        UPDATE_VACCINATION_EVENT: {
            name: 'Update Vaccination Event',
            displayName: 'Update Vaccination Event',
            parent: 'Vaccination Event',
        },
        DELETE_VACCINATION_EVENT: {
            name: 'Delete Vaccination Event',
            displayName: 'Delete Vaccination Event',
            parent: 'Vaccination Event',
        },
        CONFIRM_VACCINATION_EVENT: {
            name: 'Confirm Vaccination Event',
            displayName: 'Confirm Vaccination Event',
            parent: 'Vaccination Event',
        },
        SUCCESS_VACCINATION_EVENT: {
            name: 'Success Vaccination Event',
            displayName: 'Success Vaccination Event',
            parent: 'Vaccination Event',
        },
        GET_DETAIL_VACCINATION_EVENT: {
            name: 'Get Detail Vaccination Event',
            displayName: 'Get Detail Vaccination Event',
            parent: 'Vaccination Event',
        },
        GET_ALL_CLASS: {
            name: 'Get All Class',
            displayName: 'Get All Class',
            parent: 'Vaccination Event',
        },
        GET_ALL_VACCINATION_EVENT: {
            name: 'Get All Vaccination Event',
            displayName: 'Get All Vaccination Event',
            parent: 'Vaccination Event',
        },
        GET_ALL_MEDICINE_AND_SUPPLY: {
            name: 'Get All  Medicine and Supply  ',
            displayName: 'Get All  Medicine and Supply ',
            parent: 'Vaccination Event',
        },

        // Medicine
        CREATE_MEDICINE: {
            name: 'Create Medicine',
            displayName: 'Create Medicine',
            parent: 'Medicine',
        },
        UPDATE_MEDICINE: {
            name: 'Update Medicine',
            displayName: 'Update Medicine',
            parent: 'Medicine',
        },
        GET_ALL_MEDICINE_CLASSIFY: {
            name: 'Get All  Medicine Classify ',
            displayName: 'Get All  Medicine Classify',
            parent: 'Medicine',
        },
        GET_DETAIL_MEDICINE_CLASSIFY: {
            name: 'Get Detail  Medicine Classify ',
            displayName: 'Get Detail  Medicine Classify',
            parent: 'Medicine',
        },
        DELETE_MEDICINE_CLASSIFY: {
            name: 'Delete  Medicine Classify ',
            displayName: 'Delete  Medicine Classify',
            parent: 'Medicine',
        },
        DELETE_MEDICINE: {
            name: 'Delete  Medicine  ',
            displayName: 'Delete  Medicine ',
            parent: 'Medicine',
        },
        CREATE_MEDICINE_CLASSIFY: {
            name: 'Create Medicine Classify ',
            displayName: 'Create Medicine Classify',
            parent: 'Medicine',
        },

        // Medicine Supply
        CREATE_MEDICINE_SUPPLY: {
            name: 'Create Medicine Supply ',
            displayName: 'Create Medicine Supply',
            parent: 'Medicine Supply',
        },
        UPDATE_MEDICINE_SUPPLY: {
            name: 'Update Medicine Supply ',
            displayName: 'Update Medicine Supply',
            parent: 'Medicine Supply',
        },
        GET_ALL_MEDICINE_SUPPLY: {
            name: 'Get All  Medicine Supply  ',
            displayName: 'Get All  Medicine Supply ',
            parent: 'Medicine Supply',
        },
        DELETE_MEDICINE_SUPPLY: {
            name: 'Delete  Medicine Supply  ',
            displayName: 'Delete  Medicine Supply ',
            parent: 'Medicine Supply',
        },
        // Request 
        GET_ALL_REQUEST: {
            name: 'Get All  Request',
            displayName: 'Get All  Request',
            parent: 'Request',
        },
        GET_DETAIL_REQUEST: {
            name: 'Get Detail Request',
            displayName: 'Get Detail Request',
            parent: 'Request',
        },
        APPROVED_REQUEST: {
            name: 'Approved Request',
            displayName: 'Approved Request',
            parent: 'Request',
        },
        REJECTED_REQUEST: {
            name: 'Rejected Request',
            displayName: 'Rejected Request',
            parent: 'Request',
        },

    }

    // End Admin
};
