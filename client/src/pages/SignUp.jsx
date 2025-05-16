import {Link} from 'react-router-dom'

export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-5'>Sign Up</h1>
      <form className='flex flex-col gap-2 '>
        <label htmlFor="username" className='text-sm text-gray-500'>Username :</label>
      <input type="text" placeholder='eg. aditya07' id='username' className='bg-slate-100 p-3 rouned-lg' />
      <label htmlFor="email" className='text-sm text-gray-500'>Email :</label>
      <input type="email" placeholder='eg. abc@yahoo.com' id='email' className='bg-slate-100 p-3 rouned-lg' />
      <label htmlFor="password" className='text-sm text-gray-500'>Password :</label>
      <input type="password" placeholder='Create a secure password' id='password' className='bg-slate-100 p-3 rouned-lg' />
      <label htmlFor="fname" className='text-sm text-gray-500'>Full Name :</label>
      <input type="text" placeholder='eg. Aditya Prakash' id='fname' className='bg-slate-100 p-3 rouned-lg' />
      <label htmlFor="dob" className='text-sm text-gray-500'>Date of Birth :</label>
      <input type="date" placeholder='Date Of Birth' id='dob' className='bg-slate-100 text-gray-500 p-3 rouned-lg' />
      <button className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-75 disabled:opacity-55 '>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
        <span className='text-blue-500'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}
