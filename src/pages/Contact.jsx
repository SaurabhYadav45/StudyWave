import React from 'react'
import ContactDetails from '../components/core/ContactUsPage/ContactDetails'
import ContactForm from '../components/core/ContactUsPage/ContactForm'
import Footer from "../components/core/common/Footer"

const Contact = () => {
  return (
    <div>
      <div className='mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row pb-16'>
        {/* contactDetails */}
        <div className='lg:w-[40%] mt-20'>
          <ContactDetails/>
        </div>

        {/* ContactForm */}
        <div className='lg:w-[45%]'>
          <ContactForm></ContactForm>
        </div>
      </div>

      <Footer></Footer>
    </div>
  )
}

export default Contact