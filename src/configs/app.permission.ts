

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

    }

    // End Admin
};
