import { useGetPostsQuery } from '../redux/api/apiSlice'

const PostList = () => {
  const { data: posts, isLoading, isError } = useGetPostsQuery()

  if (isLoading) return <p>Loading ...</p>
  if (isError) return <p>Error fetching posts</p>
  return (
    <ul>
      {posts?.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

export default PostList
