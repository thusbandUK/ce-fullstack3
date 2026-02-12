"use client"
import Image from "next/image";
import { DecryptedValues } from "@/app/lib/definitions";

/*
  This conditionally renders either a letter or an image for the account icon

  If there is no session, it renders the account icon

  If there is an image link provided by the third party auth service, it renders the corresponding image

  If there is no image link but a username, it renders the first letter of that (capitalised)

  If there is a session but no image link or username, it renders a capital N
  */

export default function AccountIcon ({session, decryptedValues}: {session: any, decryptedValues: DecryptedValues}) {

    if (!session){
        return (
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="50" height="50">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
            </div>
        )
    }

    if (session.user.image){
        return (
            <>
                <Image
                  src={decryptedValues.imageLink}
                  width={50}
                  height={50}
                  alt={"Account avatar from third party authentication service"}
                  className="rounded-full"
                >
                </Image>
            </>
        )
    }

    if (session.user.username){
        const firstInitial = decryptedValues.username.slice(0, 1).toUpperCase();
        return(
            <div>
                <p className="navlink-account-button">{firstInitial}</p>
            </div>
        )
    }

    return (
        <div>
          <p className="navlink-account-button">N</p>
        </div>
    )
}