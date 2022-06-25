import React from 'react'
import { useRouter } from 'next/router'

import PostDetail from '../../components/PostDetail'
import Author from '../../components/Author'
import { getPosts, getPostDetails } from '../../services'
// import { AdjacentPosts } from '../../sections'

const PostDetails = ({ post }) => {
  const router = useRouter()

  return (
    <>
      <div className="container mx-auto mb-8 px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author} />
          </div>
          <div className="col-span-1 lg:col-span-4"></div>
        </div>
      </div>
    </>
  )
}
export default PostDetails

export async function getStaticProps({ params }) {
  const data = await getPostDetails(params.slug)
  return {
    props: {
      post: data,
    },
  }
}

export async function getStaticPaths() {
  const posts = await getPosts()
  return {
    paths: posts.map(({ node: { slug } }) => ({ params: { slug } })),
    fallback: true,
  }
}
