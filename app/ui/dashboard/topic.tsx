"use client"
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function Topic(){
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const params = new URLSearchParams(searchParams);

    console.log(params);

    return (
        <div>
            <p>Topic selector</p>
        </div>
    )

}