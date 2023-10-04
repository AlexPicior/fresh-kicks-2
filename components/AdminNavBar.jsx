import React from 'react'
import Link from 'next/link';


const AdminNavBar = () => {
  return (
    <div className='flex h-24 justify-center content-center flex-wrap bg-black shadow-xl'>
        <Link href='/administrate/products'><button className='mr-20 text-white font-sans font-medium w-28 h-16 bg-black hover:bg-zinc-700 transition-all duration-500' >Products</button></Link>
        <Link href='/administrate/accounts'><button className='mr-20 text-white font-sans font-medium w-28 h-16 bg-black hover:bg-zinc-700 transition-all duration-500' >Accounts</button></Link>
        <Link href='/administrate/profiles'><button className='text-white font-sans font-medium w-28 h-16 bg-black hover:bg-zinc-700 transition-all duration-500' >Profiles</button></Link>
    </div>
  )
}

export default AdminNavBar