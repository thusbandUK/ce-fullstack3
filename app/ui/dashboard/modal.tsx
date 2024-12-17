import Link from "next/link";
import { ModalContent } from "@/app/lib/definitions";

export default function Modal(
  {
    identifier,
    modalContent
  }: {
    identifier: number | null, 
    modalContent: null | ModalContent,
  }){

    let renderLink = {
      render: false,
      text: '',
      url: ''
    };

    if (modalContent){
      if (modalContent.link){
        renderLink = {
          render: true,
          text: modalContent.link.text,
          url: modalContent.link.url
        };
      }
    }    

    return (
        <>
        {/* Put this part before </body> tag */}

          <input type="checkbox" id={`my_modal_${identifier}`} className="modal-toggle" />
          <div className="modal text-black bg-white" role="dialog">
            <div className="modal-box">
              <h3 className="text-lg font-bold">{modalContent ? modalContent.heading : null}</h3>
              <p className="py-4">{modalContent ? modalContent.content : null}
                </p>
                { renderLink.render ? 
                  <Link
                    href={renderLink.url}
                    className="border-2 border-black rounded-md w-fit p-2 bg-black text-white hover:bg-white hover:text-black"
                >
                  { renderLink.text }
                </Link>
                
                :
                null
                }
                
                <p className="text-xs mt-5">
                Click anywhere outside the box to close it.
              </p>
              
            </div>
            <label className="modal-backdrop" htmlFor={`my_modal_${identifier}`}>Close</label>
          </div>
        </>
    )
}
/*
<Link
                    href={modalContent.link ? modalContent.link.url : ''}
                    className="border-2 border-black rounded-md w-fit p-2 bg-black text-white hover:bg-white hover:text-black"
                >
                  { modalContent.link ? modalContent.link.text : null}
                </Link>*/