import React from 'react'
import { Footer } from "flowbite-react";
const RFooter = ({logo}) => {
  return (
    <>
      <Footer container>
        <div className="w-full text-center">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <Footer.Brand
              href="/"
              src={logo}
              alt="SustainableFDP Logo"
              name="SustainableFDP"
            />
            <Footer.LinkGroup>
              <Footer.Link href="#">About</Footer.Link>
              <Footer.Link href="#">Privacy Policy</Footer.Link>
              <Footer.Link href="#">Licensing</Footer.Link>
              <Footer.Link href="#">Contact</Footer.Link>
            </Footer.LinkGroup>
          </div>
          <Footer.Divider />
          <Footer.Copyright href="#" by="SustainableFDP™" year={2024} />
        </div>
      </Footer>
    </>
  )
}

export default RFooter
