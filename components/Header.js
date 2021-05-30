import React from "react";
import Link from "next/link";
const Header = () => {
  return (
    <div>
      <Link href="/">
        <a style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
          <img src="/soup.png" alt="" width={50}/>
          <h1 className="logo">
            Vietnamese Cuisines</h1>
        </a>
      </Link>
    </div>
  );
};

export default Header;
