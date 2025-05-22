// helper/studentCode.ts
export async function generateStudentCode(prismaInstance) {
  const lastStudent = await prismaInstance.student.findFirst({
    orderBy: { student_code: 'desc' },
    take: 1,
    where: { student_code: { startsWith: "ST" } },
    select: { student_code: true }
  });
  
  let newNumber = 1;

  if (lastStudent && lastStudent.student_code) {
    const numberPart = lastStudent.student_code.slice(2);
    const lastNumber = parseInt(numberPart, 10);
    if (!isNaN(lastNumber)) newNumber = lastNumber + 1;
  }

  return `ST${newNumber.toString().padStart(4, '0')}`;
}
