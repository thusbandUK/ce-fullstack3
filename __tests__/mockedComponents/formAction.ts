export default function formAction(_prevState: any, formData: FormData) {
    const message = formData.get('message');
    // Do something with message
    return { success: true, message: "hello!", errors: {username: ["no errors, woop!"] }};
  }
  