const authRoot = 'auth';
const user = 'account';
const health = 'health';
const vaccinationEvent = 'vaccinationEvent';
const medicine = 'medicine';
const medicineSupply = 'medicineSupply';
const request = 'request';
const medicalEvent = 'medicalEvent';

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
            updateStudent: `/student/:idStudent`
        },

    },
    client: {
        user: {
            ...baseRoutes(`${user}`),
            profile: `/${user}/profile`
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
        }
    }

}