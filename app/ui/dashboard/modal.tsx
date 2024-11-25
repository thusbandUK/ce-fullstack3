import Link from "next/link"

export default function Modal({identifier}: {identifier: number}){

    return (
        <>
        {/* Put this part before </body> tag */}

          <input type="checkbox" id={`my_modal_${identifier}`} className="modal-toggle" />
          <div className="modal" role="dialog">
            <div className="modal-box">
              <h3 className="text-lg font-bold">Hello!</h3>
              <p className="py-4">I am evil Homer!</p>
              <Link
                href="/login?location=/flashcards"
              >
                login
              </Link>
              <Link
                href="/flashcards"
              >
                Go back
              </Link>
            </div>
            <label className="modal-backdrop" htmlFor={`my_modal_${identifier}`}>Close</label>
          </div>
        </>
    )
}