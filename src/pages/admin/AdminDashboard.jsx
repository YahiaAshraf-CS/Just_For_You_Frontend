import React from 'react'
import ButtonPink from '../../components/buttons/ButtonPink'

function AdminDashboard() {
  return (
      <div>
          <h1 className="text-4xl text-center text-pink-600">I am admin</h1>


          <ButtonPink to="/"> Back to Home</ButtonPink>
      
    </div>
  )
}

export default AdminDashboard
