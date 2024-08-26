
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import React from 'react'
import { createPost } from '../actions/actions';

const prisma = new PrismaClient()

const Posts = async() => {
    // const posts = await prisma.post.findMany({
    //   where : {
    //     title: {
    //       startsWith: 'My' 
    //     }
    //   },
    //   orderBy: {
    //     createdAt: 'asc'
    //   },
    //   select: {
    //     id: true,
    //     title: true,
    //     slug: true
    //   },
    
    // });
    // const postsCount = await prisma.post.count(); 
    const user = await prisma.user.findUnique({
        where: {
          email: 'xyz@gmail.com'
        },
        include:{
          post: true
        }
    });
    
  return (
    <main className='flex flex-col text-center p-20'>
         <div>Your posts</div>
         <h1 className='text-3xl'>Posts {`(${user?.post.length})`}</h1>
         <ul className='border-t border-b leading-8'>
            {user?.post.map((posts) => (<li className='flex flex-col' key={posts.id}>
                {`Hello click ${posts.title}`}
                
            <Link href={`/api/${posts.slug}`}>{posts.title}</Link></li>
        ))}
         </ul>
         <br></br>
         <form action={createPost} className='flex flex-col items-center gap-y-2 w-[300px] '>
          <input type='text' placeholder='Enter the title' name='title' className='px-2 py-1 rounded-md text-black'>
          </input>
          <textarea  placeholder='Enter the description' rows={5} name='content' className='px-2 py-1 rounded-md text-black'>
          </textarea>
          <button type='submit'>Create Post</button>

         </form>
    </main>
   
  )
}

export default Posts