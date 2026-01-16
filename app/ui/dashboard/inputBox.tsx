export default function InputBox({
    handleResponseChange
}: {
    handleResponseChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => string
}){

    return (
        <>
          <textarea
            id="response"
            onChange={handleResponseChange}
            name="response"
            rows={5} cols={33}
            className="border-2 border-black rounded-lg p-5 md:p-5 w-full h-full"
            placeholder="Write your answer here..."
          />
        </>
    )
}