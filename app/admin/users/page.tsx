import MainUsers from '@/components/admin/users/MainUsers'

async function users() {
  return (
    <div className='mt-5 grid place-content-center min-w-full w-fit'>
      <h1>Users</h1>
      <MainUsers />
    </div>
  )
}

export default users
