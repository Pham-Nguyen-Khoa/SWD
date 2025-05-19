

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
            parent: 'User',
        },
        GET_ALL_USERS: {
            name: 'Get All User',
            displayName: 'Get All User',
            parent: 'User',
        },
        IMPORT_STUDENT: {
            name: 'Import Student',
            displayName: 'Import Student',
            parent: 'User',
        },

    }

    // End Admin
};
