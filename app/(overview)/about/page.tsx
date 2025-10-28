import SignOut from "../../ui/dashboard/signOut"
import { SignIn } from '../../ui/login-form';
import { auth } from '@/auth';
import CELogoAnimation from "../../ui/dashboard/cELogoAnimation";
import MovingElephantAnimation from "../../ui/dashboard/movingElephantAnimation";
import Link from "next/link";
import ArrowCommand from "../../ui/dashboard/arrowCommand";
import SignUpNewsletter from "../../ui/signUpNewsletter";
import { redirect } from 'next/navigation';
//import MailTest from "./mailTest";

//import CombinedAnimation2 from "../animation/explosion";

export default async function About(){
  
  const session: any = await auth();
  const mockLocation = ""

    if (!session){
      redirect(`/account/login`);
    }

     return (
      <div>
        <div className="w-full flex flex-col mx-auto grid grid-cols-6">
          <div className="border-2 w-full flex flex-col border-black rounded-lg px-5 py-1 m-auto col-start-1 col-span-6">
            <div className="spacer"></div>
            <h1>Newsletter</h1>
            <div className="spacer"></div>
          </div>
          </div>
      
      <SignUpNewsletter
        email={session.user.email}        
        location={mockLocation}
        receivingNewsletter={session.user.receive_email}
      ></SignUpNewsletter>
    </div>
)
}

/*
 <div className="col-start-1 col-span-6 md:col-span-4 w-full">

                    <textarea 
                      id="response"
                      onChange={handleResponseChange}
                      name="response"
                      rows={5} cols={33}
                      className="border-2 border-black rounded-lg p-5 md:p-5 w-full h-full"
                      placeholder="Write your answer here..."
                    >
                
                    </textarea>
                    </div>
                    <div className="col-start-1 md:col-start-5 col-span-6 md:col-span-2 border-2 border-black rounded-lg flex flex-col justify-end">
                      <button  onClick={submitResponse}>
                    <label htmlFor="response" className="cursor-pointer">
                      <div className="m-5">
                      <ArrowCommand 
                        borderGray={false}
                        command="SUBMIT"
                      />   
                      </div>                   
                    </label>
                    </button>
                    </div>


<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere, tortor et molestie consectetur, mi turpis maximus urna, vel ullamcorper purus metus et massa. In lacinia tellus eget metus egestas elementum vitae eget ante. Mauris vitae purus enim. Aenean suscipit sit amet ante nec feugiat. Morbi at nulla vel sem finibus vestibulum. Maecenas vitae aliquet felis, eu feugiat orci. Aliquam erat volutpat. Aenean convallis consequat risus a pretium. Donec pellentesque pharetra magna, eu blandit tellus. Quisque at lacinia purus.

Quisque ornare, ex id dictum tempus, dui mauris consequat enim, ut molestie augue nisi eget orci. Cras rhoncus quam sed felis euismod hendrerit. Sed rhoncus pellentesque velit ac bibendum. Cras laoreet varius sollicitudin. Morbi sagittis lorem at congue semper. Cras sagittis pulvinar posuere. Duis non nibh nulla. Suspendisse ut sem eros. Ut lorem ligula, mattis sed lectus non, pulvinar porttitor velit. Proin fringilla nec erat vitae consequat. Nullam elementum, felis a dignissim egestas, lectus ex sodales nibh, non consectetur leo sem eu sem. Proin quis lacus at tortor maximus tincidunt ut sit amet quam. Suspendisse cursus tortor nec enim mollis fermentum eget sit amet tortor.

Sed rutrum lobortis tortor, vel ullamcorper dui vulputate vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque pellentesque vestibulum faucibus. Vestibulum ornare porttitor nunc id mattis. Vivamus ut eleifend nunc. Ut mattis faucibus nisl a faucibus. Curabitur nunc sapien, interdum non diam et, aliquam luctus mauris. Duis et vehicula dolor. Cras id orci vitae nulla ultricies pharetra.

Etiam ut vehicula diam, et rhoncus lorem. Integer in dignissim urna. Sed non ipsum aliquam libero aliquam cursus in scelerisque lectus. Morbi sit amet pretium nunc. Nam placerat erat a interdum dignissim. Duis pharetra lorem sapien, at pulvinar eros mollis nec. Quisque interdum lorem augue, et porttitor neque euismod ut. Maecenas leo leo, scelerisque vitae ultrices eget, semper sit amet dolor. Donec hendrerit aliquet lorem. Vivamus sollicitudin nisi sit amet ligula aliquet gravida. Sed eu quam lacus. Aenean ornare odio ac ligula aliquam gravida. Mauris sed libero sit amet lacus varius congue. Fusce pharetra tempor mi quis rutrum. Donec tortor velit, ornare a enim quis, cursus semper velit.</p>


<CombinedAnimation2></CombinedAnimation2>

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere, tortor et molestie consectetur, mi turpis maximus urna, vel ullamcorper purus metus et massa. In lacinia tellus eget metus egestas elementum vitae eget ante. Mauris vitae purus enim. Aenean suscipit sit amet ante nec feugiat. Morbi at nulla vel sem finibus vestibulum. Maecenas vitae aliquet felis, eu feugiat orci. Aliquam erat volutpat. Aenean convallis consequat risus a pretium. Donec pellentesque pharetra magna, eu blandit tellus. Quisque at lacinia purus.

Quisque ornare, ex id dictum tempus, dui mauris consequat enim, ut molestie augue nisi eget orci. Cras rhoncus quam sed felis euismod hendrerit. Sed rhoncus pellentesque velit ac bibendum. Cras laoreet varius sollicitudin. Morbi sagittis lorem at congue semper. Cras sagittis pulvinar posuere. Duis non nibh nulla. Suspendisse ut sem eros. Ut lorem ligula, mattis sed lectus non, pulvinar porttitor velit. Proin fringilla nec erat vitae consequat. Nullam elementum, felis a dignissim egestas, lectus ex sodales nibh, non consectetur leo sem eu sem. Proin quis lacus at tortor maximus tincidunt ut sit amet quam. Suspendisse cursus tortor nec enim mollis fermentum eget sit amet tortor.

Sed rutrum lobortis tortor, vel ullamcorper dui vulputate vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque pellentesque vestibulum faucibus. Vestibulum ornare porttitor nunc id mattis. Vivamus ut eleifend nunc. Ut mattis faucibus nisl a faucibus. Curabitur nunc sapien, interdum non diam et, aliquam luctus mauris. Duis et vehicula dolor. Cras id orci vitae nulla ultricies pharetra.

Etiam ut vehicula diam, et rhoncus lorem. Integer in dignissim urna. Sed non ipsum aliquam libero aliquam cursus in scelerisque lectus. Morbi sit amet pretium nunc. Nam placerat erat a interdum dignissim. Duis pharetra lorem sapien, at pulvinar eros mollis nec. Quisque interdum lorem augue, et porttitor neque euismod ut. Maecenas leo leo, scelerisque vitae ultrices eget, semper sit amet dolor. Donec hendrerit aliquet lorem. Vivamus sollicitudin nisi sit amet ligula aliquet gravida. Sed eu quam lacus. Aenean ornare odio ac ligula aliquam gravida. Mauris sed libero sit amet lacus varius congue. Fusce pharetra tempor mi quis rutrum. Donec tortor velit, ornare a enim quis, cursus semper velit.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere, tortor et molestie consectetur, mi turpis maximus urna, vel ullamcorper purus metus et massa. In lacinia tellus eget metus egestas elementum vitae eget ante. Mauris vitae purus enim. Aenean suscipit sit amet ante nec feugiat. Morbi at nulla vel sem finibus vestibulum. Maecenas vitae aliquet felis, eu feugiat orci. Aliquam erat volutpat. Aenean convallis consequat risus a pretium. Donec pellentesque pharetra magna, eu blandit tellus. Quisque at lacinia purus.

Quisque ornare, ex id dictum tempus, dui mauris consequat enim, ut molestie augue nisi eget orci. Cras rhoncus quam sed felis euismod hendrerit. Sed rhoncus pellentesque velit ac bibendum. Cras laoreet varius sollicitudin. Morbi sagittis lorem at congue semper. Cras sagittis pulvinar posuere. Duis non nibh nulla. Suspendisse ut sem eros. Ut lorem ligula, mattis sed lectus non, pulvinar porttitor velit. Proin fringilla nec erat vitae consequat. Nullam elementum, felis a dignissim egestas, lectus ex sodales nibh, non consectetur leo sem eu sem. Proin quis lacus at tortor maximus tincidunt ut sit amet quam. Suspendisse cursus tortor nec enim mollis fermentum eget sit amet tortor.

Sed rutrum lobortis tortor, vel ullamcorper dui vulputate vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque pellentesque vestibulum faucibus. Vestibulum ornare porttitor nunc id mattis. Vivamus ut eleifend nunc. Ut mattis faucibus nisl a faucibus. Curabitur nunc sapien, interdum non diam et, aliquam luctus mauris. Duis et vehicula dolor. Cras id orci vitae nulla ultricies pharetra.

Etiam ut vehicula diam, et rhoncus lorem. Integer in dignissim urna. Sed non ipsum aliquam libero aliquam cursus in scelerisque lectus. Morbi sit amet pretium nunc. Nam placerat erat a interdum dignissim. Duis pharetra lorem sapien, at pulvinar eros mollis nec. Quisque interdum lorem augue, et porttitor neque euismod ut. Maecenas leo leo, scelerisque vitae ultrices eget, semper sit amet dolor. Donec hendrerit aliquet lorem. Vivamus sollicitudin nisi sit amet ligula aliquet gravida. Sed eu quam lacus. Aenean ornare odio ac ligula aliquam gravida. Mauris sed libero sit amet lacus varius congue. Fusce pharetra tempor mi quis rutrum. Donec tortor velit, ornare a enim quis, cursus semper velit.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere, tortor et molestie consectetur, mi turpis maximus urna, vel ullamcorper purus metus et massa. In lacinia tellus eget metus egestas elementum vitae eget ante. Mauris vitae purus enim. Aenean suscipit sit amet ante nec feugiat. Morbi at nulla vel sem finibus vestibulum. Maecenas vitae aliquet felis, eu feugiat orci. Aliquam erat volutpat. Aenean convallis consequat risus a pretium. Donec pellentesque pharetra magna, eu blandit tellus. Quisque at lacinia purus.

Quisque ornare, ex id dictum tempus, dui mauris consequat enim, ut molestie augue nisi eget orci. Cras rhoncus quam sed felis euismod hendrerit. Sed rhoncus pellentesque velit ac bibendum. Cras laoreet varius sollicitudin. Morbi sagittis lorem at congue semper. Cras sagittis pulvinar posuere. Duis non nibh nulla. Suspendisse ut sem eros. Ut lorem ligula, mattis sed lectus non, pulvinar porttitor velit. Proin fringilla nec erat vitae consequat. Nullam elementum, felis a dignissim egestas, lectus ex sodales nibh, non consectetur leo sem eu sem. Proin quis lacus at tortor maximus tincidunt ut sit amet quam. Suspendisse cursus tortor nec enim mollis fermentum eget sit amet tortor.

Sed rutrum lobortis tortor, vel ullamcorper dui vulputate vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque pellentesque vestibulum faucibus. Vestibulum ornare porttitor nunc id mattis. Vivamus ut eleifend nunc. Ut mattis faucibus nisl a faucibus. Curabitur nunc sapien, interdum non diam et, aliquam luctus mauris. Duis et vehicula dolor. Cras id orci vitae nulla ultricies pharetra.

Etiam ut vehicula diam, et rhoncus lorem. Integer in dignissim urna. Sed non ipsum aliquam libero aliquam cursus in scelerisque lectus. Morbi sit amet pretium nunc. Nam placerat erat a interdum dignissim. Duis pharetra lorem sapien, at pulvinar eros mollis nec. Quisque interdum lorem augue, et porttitor neque euismod ut. Maecenas leo leo, scelerisque vitae ultrices eget, semper sit amet dolor. Donec hendrerit aliquet lorem. Vivamus sollicitudin nisi sit amet ligula aliquet gravida. Sed eu quam lacus. Aenean ornare odio ac ligula aliquam gravida. Mauris sed libero sit amet lacus varius congue. Fusce pharetra tempor mi quis rutrum. Donec tortor velit, ornare a enim quis, cursus semper velit.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere, tortor et molestie consectetur, mi turpis maximus urna, vel ullamcorper purus metus et massa. In lacinia tellus eget metus egestas elementum vitae eget ante. Mauris vitae purus enim. Aenean suscipit sit amet ante nec feugiat. Morbi at nulla vel sem finibus vestibulum. Maecenas vitae aliquet felis, eu feugiat orci. Aliquam erat volutpat. Aenean convallis consequat risus a pretium. Donec pellentesque pharetra magna, eu blandit tellus. Quisque at lacinia purus.

Quisque ornare, ex id dictum tempus, dui mauris consequat enim, ut molestie augue nisi eget orci. Cras rhoncus quam sed felis euismod hendrerit. Sed rhoncus pellentesque velit ac bibendum. Cras laoreet varius sollicitudin. Morbi sagittis lorem at congue semper. Cras sagittis pulvinar posuere. Duis non nibh nulla. Suspendisse ut sem eros. Ut lorem ligula, mattis sed lectus non, pulvinar porttitor velit. Proin fringilla nec erat vitae consequat. Nullam elementum, felis a dignissim egestas, lectus ex sodales nibh, non consectetur leo sem eu sem. Proin quis lacus at tortor maximus tincidunt ut sit amet quam. Suspendisse cursus tortor nec enim mollis fermentum eget sit amet tortor.

Sed rutrum lobortis tortor, vel ullamcorper dui vulputate vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque pellentesque vestibulum faucibus. Vestibulum ornare porttitor nunc id mattis. Vivamus ut eleifend nunc. Ut mattis faucibus nisl a faucibus. Curabitur nunc sapien, interdum non diam et, aliquam luctus mauris. Duis et vehicula dolor. Cras id orci vitae nulla ultricies pharetra.

Etiam ut vehicula diam, et rhoncus lorem. Integer in dignissim urna. Sed non ipsum aliquam libero aliquam cursus in scelerisque lectus. Morbi sit amet pretium nunc. Nam placerat erat a interdum dignissim. Duis pharetra lorem sapien, at pulvinar eros mollis nec. Quisque interdum lorem augue, et porttitor neque euismod ut. Maecenas leo leo, scelerisque vitae ultrices eget, semper sit amet dolor. Donec hendrerit aliquet lorem. Vivamus sollicitudin nisi sit amet ligula aliquet gravida. Sed eu quam lacus. Aenean ornare odio ac ligula aliquam gravida. Mauris sed libero sit amet lacus varius congue. Fusce pharetra tempor mi quis rutrum. Donec tortor velit, ornare a enim quis, cursus semper velit.</p>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras posuere, tortor et molestie consectetur, mi turpis maximus urna, vel ullamcorper purus metus et massa. In lacinia tellus eget metus egestas elementum vitae eget ante. Mauris vitae purus enim. Aenean suscipit sit amet ante nec feugiat. Morbi at nulla vel sem finibus vestibulum. Maecenas vitae aliquet felis, eu feugiat orci. Aliquam erat volutpat. Aenean convallis consequat risus a pretium. Donec pellentesque pharetra magna, eu blandit tellus. Quisque at lacinia purus.

Quisque ornare, ex id dictum tempus, dui mauris consequat enim, ut molestie augue nisi eget orci. Cras rhoncus quam sed felis euismod hendrerit. Sed rhoncus pellentesque velit ac bibendum. Cras laoreet varius sollicitudin. Morbi sagittis lorem at congue semper. Cras sagittis pulvinar posuere. Duis non nibh nulla. Suspendisse ut sem eros. Ut lorem ligula, mattis sed lectus non, pulvinar porttitor velit. Proin fringilla nec erat vitae consequat. Nullam elementum, felis a dignissim egestas, lectus ex sodales nibh, non consectetur leo sem eu sem. Proin quis lacus at tortor maximus tincidunt ut sit amet quam. Suspendisse cursus tortor nec enim mollis fermentum eget sit amet tortor.

Sed rutrum lobortis tortor, vel ullamcorper dui vulputate vel. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque pellentesque vestibulum faucibus. Vestibulum ornare porttitor nunc id mattis. Vivamus ut eleifend nunc. Ut mattis faucibus nisl a faucibus. Curabitur nunc sapien, interdum non diam et, aliquam luctus mauris. Duis et vehicula dolor. Cras id orci vitae nulla ultricies pharetra.

Etiam ut vehicula diam, et rhoncus lorem. Integer in dignissim urna. Sed non ipsum aliquam libero aliquam cursus in scelerisque lectus. Morbi sit amet pretium nunc. Nam placerat erat a interdum dignissim. Duis pharetra lorem sapien, at pulvinar eros mollis nec. Quisque interdum lorem augue, et porttitor neque euismod ut. Maecenas leo leo, scelerisque vitae ultrices eget, semper sit amet dolor. Donec hendrerit aliquet lorem. Vivamus sollicitudin nisi sit amet ligula aliquet gravida. Sed eu quam lacus. Aenean ornare odio ac ligula aliquam gravida. Mauris sed libero sit amet lacus varius congue. Fusce pharetra tempor mi quis rutrum. Donec tortor velit, ornare a enim quis, cursus semper velit.</p>

*/