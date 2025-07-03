

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
    ASK_AI: {
        name: 'Ask AI',
        displayName: 'Ask AI',
        parent: 'AI',
    },
    GET_ALL_CHAT: {
        name: 'Get all chat',
        displayName: 'Get all chat',
        parent: 'AI',
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
        },
        CHANGE_PASSWORD: {
            name: 'Change Password',
            displayName: 'Change Password',
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
        GET_TOTAL_STUDENT: {
            name: 'Get Total Student',
            displayName: 'Get Total Student',
            parent: 'Student',
        },
        GET_DETAIL_STUDENT: {
            name: 'Get Detail Student',
            displayName: 'Get Detail Student',
            parent: 'Student',
        },
        // AI 
        UPDATE_AI_PROMPT: {
            name: 'Update AI PROMPT',
            displayName: 'Update AI PROMPT',
            parent: 'AI',
        },
        GET_AI_PROMPT: {
            name: 'Get AI PROMPT',
            displayName: 'Get AI PROMPT',
            parent: 'AI',
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
        UPDATE_PROFILE_PARENT: {
            name: 'Update Profile Parent',
            displayName: 'Update Profile Parent',
            parent: 'Profile',
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

        // CHECK_UP
        GET_ALL_CHECK_UP: {
            name: 'Get All Check Up',
            displayName: 'Get All Check Up',
            parent: 'Check Up',
        },
        GET_ALL_RESULT_CHECK_UP: {
            name: 'Get All Result Check Up',
            displayName: 'Get All Result Check Up',
            parent: 'Check Up',
        },
        GET_DETAIL_CHECK_UP: {
            name: 'Get Detail Check Up',
            displayName: 'Get Detail  Check Up',
            parent: 'Check Up',
        },
        GET_RESULT_CHECK_UP: {
            name: 'Get Result Check Up',
            displayName: 'Get  Result Check Up',
            parent: 'Check Up',
        },
        ACCEPTED_CHECK_UP: {
            name: 'Accepted Check Up',
            displayName: 'Accepted Check Up',
            parent: 'Check Up',
        },
        DECLIEND_CHECK_UP: {
            name: 'Declined Check Up',
            displayName: 'Declined Check Up',
            parent: 'Check Up',
        },

        // Medicine Request
        CREATE_MEDICINE_REQUEST: {
            name: 'Create Medicine Request',
            displayName: 'Create Medicine Request',
            parent: 'Medicine Request',
        },
        STOP_MEDICINE_REQUEST: {
            name: 'Stop Medicine Request',
            displayName: 'Stop Medicine Request',
            parent: 'Medicine Request',
        },
        ACCEPT_BENEFIT_MEDICINE_REQUEST: {
            name: 'Accept Benefit Medicine Request',
            displayName: 'Accept Benefit Medicine Request',
            parent: 'Medicine Request',
        },
        REJECT_BENEFIT_MEDICINE_REQUEST: {
            name: 'Reject Benefit Medicine Request',
            displayName: 'Reject Benefit Medicine Request',
            parent: 'Medicine Request',
        },
        GET_ALL_MEDICINE_REQUEST: {
            name: 'Get All Medicine Request',
            displayName: 'Get All Medicine Request',
            parent: 'Medicine Request',
        },
        GET_DETAIL_MEDICINE_REQUEST: {
            name: 'Get Detail Medicine Request',
            displayName: 'Get Detail Medicine Request',
            parent: 'Medicine Request',
        },
        DELETE_MEDICINE_REQUEST: {
            name: 'Delete Medicine Request',
            displayName: 'Delete Medicine Request',
            parent: 'Medicine Request',
        },
        // Meeting
        GET_ALL_MEETING: {
            name: 'Get All Meeting',
            displayName: 'Get All Meeting',
            parent: 'Meeting',
        },
        ACCEPT_MEETING: {
            name: 'Accept Meeting',
            displayName: 'Accept Meeting',
            parent: 'Meeting',
        },
        DECLINE_MEETING: {
            name: 'Decline Meeting',
            displayName: 'Decline Meeting',
            parent: 'Meeting',
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
        // Check Up
        GET_ALL_CHECK_UP: {
            name: 'Get All Check Up',
            displayName: 'Get All Check Up',
            parent: 'Check Up',
        },
        GET_STUDENT_IS_MEETING_CHECK_UP: {
            name: 'Get All Student Is Meeting Check Up',
            displayName: 'Get All Student Is Meeting Check Up',
            parent: 'Check Up',
        },
        GET_IS_MEETING_CHECK_UP: {
            name: 'Get Is Meeting Check Up',
            displayName: 'Get Is Meeting Check Up',
            parent: 'Check Up',
        },
        DELETE_STUDENT_IS_MEETING_CHECK_UP: {
            name: 'Delete Student Is Meeting Check Up',
            displayName: 'Delete Student Is Meeting Check Up',
            parent: 'Check Up',
        },
        DELETE_IS_MEETING_CHECK_UP: {
            name: 'Delete Is Meeting Check Up',
            displayName: 'Delete Is Meeting Check Up',
            parent: 'Check Up',
        },
        COMPLETE_IS_MEETING_CHECK_UP: {
            name: 'Complete Is Meeting Check Up',
            displayName: 'Complete Is Meeting Check Up',
            parent: 'Check Up',
        },
        CREAT_IS_MEETING_CHECK_UP: {
            name: 'Create Is Meeting Check Up',
            displayName: 'Create Is Meeting Check Up',
            parent: 'Check Up',
        },
        CHECK_MEETING_CHECK_UP: {
            name: 'Check Meeting Check Up',
            displayName: 'Check Meeting Check Up',
            parent: 'Check Up',
        },
        GET_RESULTS_CHECK_UP: {
            name: 'Get Results Check Up',
            displayName: 'Get Results Check Up',
            parent: 'Check Up',
        },
        GET_DETAIL_RESULT_CHECK_UP: {
            name: 'Get Detail Result Check Up',
            displayName: 'Get Detail Result Check Up',
            parent: 'Check Up',
        },
        STUDENT_RESULT_STATUS_CHECK_UP: {
            name: 'Student Result Status Check Up',
            displayName: 'Student Result Status Check Up',
            parent: 'Check Up',
        },
        GET_CONTENTS_CHECK_UP: {
            name: 'Get Contents  Check Up',
            displayName: 'Get Contents  Check Up',
            parent: 'Check Up',
        },
        GET_DETAIL_CHECK_UP: {
            name: 'Get Detail Check Up',
            displayName: 'Get Detail Check Up',
            parent: 'Check Up',
        },
        RESULT_CHECK_UP: {
            name: 'Result Check Up',
            displayName: 'Result Check Up',
            parent: 'Check Up',
        },
        SEND_NOTIFICATION_RESULT_CHECK_UP: {
            name: 'Send Notification Result Check Up',
            displayName: 'Send Notification Result Check Up',
            parent: 'Check Up',
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
        CREATE_TREATMENT: {
            name: 'Create Treatment',
            displayName: 'Create Treatment',
            parent: 'Medical Event',
        },
        UPDATE_STATUS_MEDICAL_EVENT: {
            name: 'Update Status Medical Event',
            displayName: 'Update Status Medical Event',
            parent: 'Medical Event',
        },
        UPDATE_MEDICAL_EVENT: {
            name: 'Update  Medical Event',
            displayName: 'Update  Medical Event',
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
        DELETE_MEDICAL_EVENT: {
            name: 'Delete Medical Event',
            displayName: 'Delete Medical Event',
            parent: 'Medical Event',
        },
        SEND_NOTIFICATION_MEDICAL_EVENT: {
            name: 'Send Notification Medical Event',
            displayName: 'Send Notification Medical Event',
            parent: 'Medical Event',
        },
        // Medicine  Request
        SCHEDULE_TODAY_MEDICINE_REQUEST: {
            name: 'Schedule Today Medicine Request',
            displayName: 'Schedule Today Medicine Request',
            parent: 'Medicine Request',
        },
        GET_ALL_MEDICINE_REQUEST: {
            name: 'Get All Medicine Request',
            displayName: 'Get All Medicine Request',
            parent: 'Medicine Request',
        },
        GET_ALL_LOW_STOCK: {
            name: 'Get All Low Stock',
            displayName: 'Get All Low Stock',
            parent: 'Medicine Request',
        },
        GET_DETAIl_MEDICINE_REQUEST: {
            name: 'Get Detail Medicine Request',
            displayName: 'Get Detail Medicine Request',
            parent: 'Medicine Request',
        },
        ACCEPT_MEDICINE_REQUEST: {
            name: 'Accept Medicine Request',
            displayName: 'Accept Medicine Request',
            parent: 'Medicine Request',
        },
        CREATE_MEDICINE_LOG: {
            name: 'Create Medicine Log',
            displayName: 'Create Medicine Log',
            parent: 'Medicine Request',
        },
        REJECT_MEDICINE_REQUEST: {
            name: 'Reject Medicine Request',
            displayName: 'Reject Medicine Request',
            parent: 'Medicine Request',
        },
        RECIEVED_MEDICINE_REQUEST: {
            name: 'Recieved Medicine Request',
            displayName: 'Recieved Medicine Request',
            parent: 'Medicine Request',
        },
        UPDATE_QUANTITY_MEDICINE_REQUEST: {
            name: 'Update Quantity Medicine Request',
            displayName: 'Update Quantity Medicine Request',
            parent: 'Medicine Request',
        },
        BENEFIT_MEDICINE_REQUEST: {
            name: 'Benefit Medicine Request',
            displayName: 'Benefit Medicine Request',
            parent: 'Medicine Request',
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
        // Medical Event 
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

        // Check Up
        CREATE_CHECK_UP: {
            name: 'Create CheckUp',
            displayName: 'Create CheckUp',
            parent: 'Check Up',
        },
        GET_ALL_CHECK_UP: {
            name: 'Get All CheckUp',
            displayName: 'Get All CheckUp',
            parent: 'Check Up',
        },
        CONFIRM_CHECK_UP: {
            name: 'Confirm Check Up',
            displayName: 'Confirm Check Up',
            parent: 'Check Up',
        },
        GET_DETAIL_CHECK_UP: {
            name: 'Get Detail Check Up',
            displayName: 'Get Detail Check Up',
            parent: 'Check Up',
        },
        DELETE_CHECK_UP: {
            name: 'Delete Check Up',
            displayName: 'Delete Check Up',
            parent: 'Check Up',
        },
        DETAIL_CHECK_UP: {
            name: 'Detail Check Up',
            displayName: 'Detail Check Up',
            parent: 'Check Up',
        },
        UPDATE_CHECK_UP: {
            name: 'Update Check Up',
            displayName: 'Update Check Up',
            parent: 'Check Up',
        },
        SUCCESS_CHECK_UP: {
            name: 'Success Check Up',
            displayName: 'Success Check Up',
            parent: 'Check Up',
        },

    }

    // End Admin
};
