import Link from "next/link"

export default function Modal({identifier}: {identifier: number}){

    return (
        <>
        {/* Put this part before </body> tag */}

          <input type="checkbox" id={`my_modal_${identifier}`} className="modal-toggle" />
          <div className="modal text-black" role="dialog">
            <div className="modal-box">
              <h3 className="text-lg font-bold">Coming soon!</h3>
              <p className="py-4">Sorry, flashcards for this examboard are not available yet, but don&#39;t worry, your interest has been logged.
                </p>
                <p className="text-xs">
                Click anywhere outside the box to close it.
              </p>
              
            </div>
            <label className="modal-backdrop" htmlFor={`my_modal_${identifier}`}>Close</label>
          </div>
        </>
    )
}

/*
{/* 
              <Link
                href="/login?location=/flashcards"
              >
                login
              </Link>
              <Link
                href="/flashcards"
              >
                Go back
              </Link>*//*}
*/