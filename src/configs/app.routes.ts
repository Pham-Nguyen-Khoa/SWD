const authRoot = 'auth';
const user = 'user';

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


export const routesV1 = {
    versionAdmin: v1Admin,
    versionClient: v1Client,
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
            importStudent: `/import-student`
        },

    },
    client: {
        user: {
            ...baseRoutes(`${user}`),
            profile: `/${user}/profile`
        }
    }

}