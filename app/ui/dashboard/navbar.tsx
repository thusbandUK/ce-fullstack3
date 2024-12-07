import NavLinks from "./nav-links";
import { auth } from '@/auth';
import Image from "next/image";

export default async function Navbar(){
    const session: any = await auth();

    return(  
        <div className="navbar items-start">
          <div>
            <Image 
              src="/site-logo.png" alt="chemistry elephant logo"
              width={100}
              height={76}
            />
          </div>
          <div className="collapse duration-500 justify-end mobile-nav">
            <input type="checkbox" />
            <button className="btn btn-square btn-ghost collapse-title">
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
            <div className="collapse-content">
              <ul className="menu menu-vertical lg:menu-horizontal rounded-box">
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