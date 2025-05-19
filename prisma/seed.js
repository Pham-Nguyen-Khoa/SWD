"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const roles = [
        { id: 1, name: 'Admin' },
        { id: 2, name: 'Manager' },
        { id: 3, name: 'Nurse' },
        { id: 4, name: 'Parent' },
        { id: 5, name: 'Student' },
    ];
    for (const role of roles) {
        await prisma.role.upsert({
            where: { id: role.id },
            update: {},
            create: role,
        });
    }
    console.log('Seed roles done!');
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map