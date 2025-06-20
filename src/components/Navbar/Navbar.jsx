import React, { useState } from 'react';


function Navbar() {
  return (
    <div className=" w-full sticky top-0 z-50 bg-white shadow ">
      <nav className="max-w-screen-xl mx-auto flex items-center justify-between px-4 lg:px-6 py-2">
        {/* Logo */}
        <div className="flex items-center   ">
           <img src="/src/image/Tawalio.jpg" 
           alt="My Image" 
            className="h-15 "
          />
        </div>
      </nav>
    </div>
  );
}
export default Navbar;
