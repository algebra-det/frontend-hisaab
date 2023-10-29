import Link from "next/link";

async function admin() {
  return (
    <div className='mt-5 grid place-content-center min-w-full w-25'>
      <h1>Admin</h1>
      <Link href='/admin/users'>Checkout Users</Link>
    </div>
  );
}

export default admin;
