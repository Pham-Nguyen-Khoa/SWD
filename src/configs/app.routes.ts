const authRoot = 'auth';
const user = 'account';
const health = 'health';
const vaccinationEvent = 'vaccinationEvent';

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
        }
    },
    nurse: {
        health: {
            ...baseRoutes(`${health}`),
            // formData: `/${health}/formData`
        }
    },
    manager: {
        vaccinationEvent: {
            ...baseRoutes(`${vaccinationEvent}`),
            allClass: '/class'
        }
    }

}