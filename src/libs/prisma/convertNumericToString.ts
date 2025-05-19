import { Prisma } from '@prisma/client';

/**
 * Recursively convert all number and bigint values in the result to strings
 */
function convertNumericToString(value: any): any {
    if (typeof value === 'number' || typeof value === 'bigint') {
        return value.toString();
    }

    if (Array.isArray(value)) {
        return value.map(convertNumericToString);
    }

    if (value !== null && typeof value === 'object') {
        const result = {};
        for (const key in value) {
            result[key] = convertNumericToString(value[key]);
        }
        return result;
    }

    return value;
}

// export const convertNumericToStringMiddleware: Prisma.Middleware = async (params, next) => {
//     const result = await next(params);
//     return convertNumericToString(result);
// };