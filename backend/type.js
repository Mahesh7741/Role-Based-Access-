const z = require('zod');

const userSchema = z.object({
    username: z.string(),
    password: z.string(),
    purchasedCourses: z.array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format")).optional() ,
    role:z.string().optional(),
});

const courseSchema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
    imageLink: z.string(),
    published: z.boolean(),
});

module.exports = {
    VaildUser: userSchema,
    VaildCourse: courseSchema
};
