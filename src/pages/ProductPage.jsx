import React from 'react'
import ButtonPink from '../components/buttons/ButtonPink'
import NavbarUser from '../layout/NavbarUser'

function ProductPage() {
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
   
  console.log(currentUser);
  
  
  return (
    <div>
      <NavbarUser />
      {currentUser.is_admin===true && (
        <div className='text-center mt-4'>
          <h1 className='text-2xl text-pink-600 font-bold'>Welcome Admin {currentUser.firstName}</h1>
        </div>
      )}
      <h2 className='text-9xl text-center text-pink-600 m-auto mt-20'>ProductPage</h2>
      <ButtonPink to="/">Back to Home</ButtonPink>
          
    </div>
  )
}

export default ProductPage
