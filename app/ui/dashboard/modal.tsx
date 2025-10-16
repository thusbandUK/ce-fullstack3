import Link from "next/link";
import { ModalContent } from "@/app/lib/definitions";

//from DaisyUi
//docs: https://daisyui.com/components/modal/#dialog-modal

/*
Modifications:

In the interests of minimising code, this has been adapted to be used two different ways.

1st way:

If remoteCheck prop is false, the input is checked and unchecked by the first label, which is not
in this component, but included directly above wherever it is called.

2nd way: 

If remoteCheck is true, the input box below renders differently, and is checked or unchecked according
to the isChecked prop, which can be managed via state of the parent element
In order for clicking anywhere in the background to close the dialogue box, the label included at the 
bottom of the code below is managed by the same state, which it can toggle via the toggleModal prop.
The only downside is that it requires an empty function () => {} to be passed as a prop to toggleModal 
in any of the parent components that use the Modal the first way
*/

export default function Modal(
  {
    identifier,
    modalContent,
    remoteCheck,
    isChecked,
    toggleModal
  }: {
    identifier: number | null, 
    modalContent: null | ModalContent,
    remoteCheck: boolean,
    isChecked: boolean,
    toggleModal: () => void
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

          {
            remoteCheck ?
            <input type="checkbox" id={`my_modal_${identifier}`} className="modal-toggle" defaultChecked={false} checked={isChecked}/>
            :
            <input type="checkbox" id={`my_modal_${identifier}`} className="modal-toggle"/>
          }
          
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
            <label className="modal-backdrop" onClick={toggleModal} htmlFor={`my_modal_${identifier}`}>Close</label>
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