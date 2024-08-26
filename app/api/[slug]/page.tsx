import { Prisma, PrismaClient } from '@prisma/client'
import React from 'react'

const prisma = new PrismaClient()

const Post = async ({params} : any) => {
    const post = await prisma.post.findUnique({
        where: {
            slug: params.slug,
        },
    })
  return (
    <div className='text-center flex flex-col p-6 pt-20'>
        <h1 className='text-3xl'>{post?.title}</h1>
        <h3 className='pt-4'>{post?.content}</h3>
    </div>
  )
}

export default Post