import { auth } from '@/auth';
import Image from 'next/image'

export default async function Page() {
    //const session = await auth()
   //console.log('below should appear session...')
    //console.log(session);

    //let image: string = '';
    //if (session){
    //  if (session.user){
     //   if (session.user.image){
     //     image = session.user.image;
     //   }
     // }      
    //}

    return (
      <main>
        <p>Welcome!</p>
        {/** 
        { image ? 
        <Image
          src={image}
          alt="user image"
          width={500}
          height={500}
        ></Image>
        :
        null
      }
        */}
      </main>
    );
  }