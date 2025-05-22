

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


    }

    // End Admin
};
