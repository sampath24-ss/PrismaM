import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const intialPost: Prisma.PostCreateInput[] = [
    {
    title: "My Project1",
    slug: "my_Project_1",
    content: "This is my first project",
    author: {
        connectOrCreate:{
            where: {
                email: "xyz@gmail.com",
            },
            create:{
                email: "xyz@gmail.com",
                hashedPassword: "jv9wiovklckv"
            }
        }
    }
    }
]

async function main(){
    console.log("Starting")
    for(const post of intialPost){
        const newPost = await prisma.post.create({
            data: post,
        }) 
        console.log(`created post with id ${newPost.id}`)
    }
    console.log("Finished")

}

main().then(async() => {
    await prisma.$disconnect();

}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})