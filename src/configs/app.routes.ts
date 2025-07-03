
const authRoot = 'auth';
const user = 'account';
const ai = 'ai_prompt';
const health = 'health';
const vaccinationEvent = 'vaccinationEvent';
const medicine = 'medicine';
const medicineSupply = 'medicineSupply';
const request = 'request';
const medicalEvent = 'medicalEvent';
const checkUp = 'check-up';
const profile = 'profile';
const medicineRequest = 'medicineRequest';

const baseRoutes = (root: string) => {
    return {
        root,
        getOne: `/${root}/:id`,
        update: `/${root}/:id`,
        delete: `/${root}/:id`,
    };
};



// Api Versions
const v1Client = 'api/v1';
const v1Admin = 'api/admin/v1';
const v1Parent = 'api/parent/v1';
const v1Nurse = 'api/nurse/v1';
const v1Manager = 'api/manager/v1';


export const routesV1 = {
    versionAdmin: v1Admin,
    versionClient: v1Client,
    versionParent: v1Parent,
    versionNurse: v1Nurse,
    versionManager: v1Manager,
    //#region Category
    auth: {
        root: authRoot,
        login: `/${authRoot}/login`,
        register: `/${authRoot}/register`,
        logout: `/${authRoot}/logout`,
        changePassword: `/${authRoot}/change-password`,
        refreshToken: `/${authRoot}/refresh-token`,
    },

    admin: {
        user: {
            ...baseRoutes(`${user}`),
            changeStatus: `/${user}/change-status/:id/:status`,
            importStudent: `/import-student`,
            createStudent: `/student`,
            updateStudent: `/student/:idStudent`,
            totalStudent: `/student/total`
        },
        ai: {
            ...baseRoutes(`${ai}`),
        }

    },
    client: {
        user: {
            ...baseRoutes(`${user}`),
            profile: `/${user}/profile`,
            changePassword: `/${user}/change-password`
        }
    },
    common: {
        ai: {
            ...baseRoutes(`${ai}`),
        }
    },
    parent: {
        health: {
            ...baseRoutes(`${health}`),
            formData: `/${health}/formData`,
            student: `/student`
        },
        vaccinationEvent: {
            ...baseRoutes(`${vaccinationEvent}`),
            accepted: `/:id/:studentID/accepted`,
            declined: `/:id/:studentID/declined`,
            resultVaccinationEvent: `/${vaccinationEvent}/result`
        },
        checkUp: {
            ...baseRoutes(`${checkUp}`),
            detailResult: `${checkUp}/:id/result/:studentID`,
            accepted: `${checkUp}/:id/:studentID/accepted`,
            declined: `${checkUp}/:id/:studentID/declined`,
            resultVaccinationEvent: `/${checkUp}/result`,
            meeting: `${checkUp}/meeting`,
            acceptedMeeting: `${checkUp}/meeting/accept/:id`,
            declinedMeeting: `${checkUp}/meeting/decline/:id`,
        },
        medicineRequest: {
            ...baseRoutes(`${medicineRequest}`),
            accepted: `${medicineRequest}/accepted/:id`,
            rejected: `${medicineRequest}/rejected/:id`,
        },
        profile: {
            ...baseRoutes(`${profile}`),
        }

    },
    nurse: {
        health: {
            ...baseRoutes(`${health}`),
            // formData: `/${health}/formData`
        },
        vaccinationEvent: {
            ...baseRoutes(`${vaccinationEvent}`),
            result: `/:id/result`,
            sendResult: `/:id/notification/send-result`
        },
        checkUp: {
            ...baseRoutes(`${checkUp}`),
            isMeeting: `${checkUp}/meeting`,
            studentIsMeeting: `${checkUp}/meeting/students`,
            checkMeeting: `${checkUp}/meeting/check`,
            deleteStudentIsMeeting: `${checkUp}/meeting/students/:id`,
            deleteIsMeeting: `${checkUp}/meeting/:id`,
            result: `${checkUp}/:id/result`,
            detailResult: `${checkUp}/:id/result/:studentID`,
            studentResultStatus: `${checkUp}/:id/students-result-status`,
            contents: `${checkUp}/:id/contents`,
            sendResult: `${checkUp}/:id/notification/send-result`

        },
        medicine: {
            ...baseRoutes(`${medicine}`),
            medicineClassify: '/medicine-classify',
            medicineSupply: '/medicine-supply',
            sendRequest: `/${medicine}/send-request`,
            getDetailSendRequest: `/${medicine}/send-request/:id`
        },
        medicalEvent: {
            ...baseRoutes(`${medicalEvent}`),
            sendMedicalEvent: `/${medicalEvent}/send-medicalEvent/:id`,
            updateStatus: `/${medicalEvent}/change-status/:id`,
            createTreatment: `/${medicalEvent}/treatment/:id`,
        },
        medicineRequest: {
            ...baseRoutes(`${medicineRequest}`),
            accepted: `/${medicineRequest}/accepted/:id`,
            rejected: `/${medicineRequest}/rejected/:id`,
            received: `/${medicineRequest}/received/:id`,
            benefit: `/${medicineRequest}/benefit/:id`,
            schedule: `/${medicineRequest}/schedule`,
            lowStock: `/${medicineRequest}/low-stock`,
            updateQuantity: `/${medicineRequest}/medicine-item/:id/update-quantity`,
        }
    },
    manager: {
        vaccinationEvent: {
            ...baseRoutes(`${vaccinationEvent}`),
            allClass: '/class',
            success: '/:id/success',
            medicines: 'medicines'
        },
        medicine: {
            ...baseRoutes(`${medicine}`),
            medicineClassify: '/medicine-classify',
            detailMedicineClassify: '/medicine-classify/:id',
        },
        medicineSupply: {
            ...baseRoutes(`${medicineSupply}`),
        },
        request: {
            ...baseRoutes(`${request}`),
            approved: `/:id/approved`,
            rejected: `/:id/rejected`,
        },
        medicalEvent: {
            ...baseRoutes(`${medicalEvent}`)
        },
        checkUp: {
            ...baseRoutes(`${checkUp}`),
            success: `${checkUp}/:id/success`,

        }
    }

}