export default function PostDetail({params}: { params: { postId: string } }) {
  return (
    <div>Post Ke {params.postId[0]}</div>
  )
}
