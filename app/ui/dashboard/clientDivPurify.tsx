"use client"
import DOMPurify from "isomorphic-dompurify";

/*
This is for use server components that need to use domPurify, which has to be used in "use client"
components
*/

export default function ClientDivPurify({content}: {content: string}){
    return (
        <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(content)}}>
        </div>
    )
}