import React from 'react'
import ContactUsForm from '../ContactUsPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='mx-auto'>
        <h1 className='text-4xl font-semibold mx-auto text-center'>Get In Touch</h1>
        <p className='text-richblack-300 text-center mt-3'>We'd love to here for you, Please fill out this form.</p>
        <div className="mt-12 mx-auto">
            <ContactUsForm></ContactUsForm>
        </div>
    </div>
  )
}

export default ContactFormSection