import DOMPurify from "isomorphic-dompurify";

export default function HeaderDivs({h1Content}: {h1Content: string}){
    return (
        <div className="w-full flex flex-col mx-auto grid grid-cols-6">
          <div className="border w-full flex flex-col border-black rounded-lg px-5 py-1 m-auto col-start-1 col-span-6">
            <div className="spacer"></div>
              <h1 dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(h1Content)}}></h1>
            <div className="spacer"></div>
          </div>
        </div>
    )
}