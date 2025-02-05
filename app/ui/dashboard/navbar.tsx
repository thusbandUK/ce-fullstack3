import NavLinks from "./nav-links";
import { auth } from '@/auth';
import Image from "next/image";

export default async function Navbar(){
    const session: any = await auth();
//pe-6
    return(  
        <div className="navbar items-start">
          <div>
            <Image 
              src="/site-logo.png" alt="chemistry elephant logo"
              width={100}
              height={76}
              priority={true}
            />
          </div>
          <div className="collapse duration-500 justify-end mobile-nav">
            <input type="checkbox" id="menu-checkbox" aria-labelledby="menu-button"/>
            <button 
              className="btn btn-square btn-ghost collapse-title flex justify-end pe-0"
              id="menu-button"
              aria-expanded="false" aria-haspopup="true" aria-controls="menu-links-container" aria-label="menu button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16">
                </path>
              </svg>
            </button>
            <div className="collapse-content pe-0">
              <ul id="menu-links-container" className="menu menu-vertical lg:menu-horizontal rounded-box pe-0">
                <NavLinks 
                  session={session}
                />
              </ul>
            </div>
          </div>
          <div className="flex navbar-links-container my-auto desktop-nav">
            <NavLinks 
              session={session}
            />
          </div>
        </div>
    )
}