import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, it } from 'vitest'
import { vi } from 'vitest'

//import App from './App';
import Home from '../app/page';
import MCQZoom from '../app/ui/dashboard/mcqZoom';
import Navbar from '../app/ui/dashboard/navbar';
import Slider from '../app/ui/dashboard/slider';
import ArrowCommand from '../app/ui/dashboard/arrowCommand';
import DeleteConfirm from '../app/ui/deleteConfirm';
import WasteOfTime from '../app/miscellaneous-code/wasteOfTime';
import AsyncMock from '../app/miscellaneous-code/asyncMock';
import Page from '../app/(overview)/flashcards/[examboard_id]/topic/page';
import RenderPosts from '../app/miscellaneous-code/mockApi';
import { annoyingNonsense } from '../app/miscellaneous-code/wasteOfTime';

const modifyFontSize = (number: number) => console.log(number.toString());

const mockFn = vi.fn().mockImplementation(annoyingNonsense)

const TestOne = mockFn("let's try this")
//const BobsBucket = mockFn(1)

//NelliesBucket === 1 // true
//BobsBucket === 2 // true

mockFn.mock.calls[0][0] === "let's try this" // true
//mockFn.mock.calls[1][0] === 1 // true
// Mock the module
vi.mock('../app/miscellaneous-code/wasteOfTimeFunction', () => ({
  annoyingNonsense: vi.fn(() => console.log('mocked value')),
}));



describe('Waste of Time', () => {
  it('renders Waste of Time', () => {
    render(<WasteOfTime />);
    //mockFn('and now this')
    screen.debug();
    expect(screen.getByText('What is the point?')).toBeInTheDocument();
    expect(screen.getByText('Of this stupid fucking exercise?')).toBeInTheDocument();
    
    expect(screen.getByRole('heading')).toHaveTextContent('What is the point?')
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('paragraph')).toBeInTheDocument();
    //screen.getByRole('');
  });
  
})

describe('Slider', () => {
  it('renders Slider component', () => {
    render(<Slider modifyFontSize={modifyFontSize} />);
    screen.debug()
    screen.getByRole('slider');
    fireEvent.change(screen.getByRole('slider'), {
      target: { value: 48 },
    });
    screen.getByRole('slider');
    screen.debug()
  });  
});

describe('ArrowCommand', () => {
  it('renders ArrowCommand component', () => {
    render(<ArrowCommand command="test-command" borderGray={true} />);
    screen.debug()
    expect(screen.getByRole('paragraph')).toHaveTextContent('test-command');   
  });  
});

//https://www.reddit.com/r/nextjs/comments/17mc9hn/how_do_you_test_async_server_components/
//description of how to call an async function

describe('AsyncMock', () => {
  it('renders async AsyncMock component', async () => {
    render(await AsyncMock() )
    screen.debug();
  })
})
/*
test("should render Navbar", () => {
  render(<Navbar />);
  screen.debug();
});*/

//https://reflect.run/articles/async-waits-in-react-testing-library/

//the above link suggests that you can render a component that makes a server call using code as below, 
//but I call BS, it don't work!

//NEED TO USE THE FULL CODE!! provided via link above, but note that it didn't immediately crash
//when it was a call to a url

test("should render mockApi", async () => {
  render(<RenderPosts />);
  screen.debug();
});


/*


test("should render examboards", () => {
  render(<Page  
           params={paramsProp}
         />);
  //screen.debug();
});
*/

/*
const paramsProp = { examboard_id: "1" };

describe('Post Component', () => {

  it('renders post content, author information, and action buttons', async () => {
  
  const serverComponent = await Page({params: paramsProp});
  
  const { getByRole } = render(serverComponent);
  
  const headingElement = getByRole('heading');
  
  expect(headingElement).toBeInTheDocument();
  
  expect(screen.getByText('App router')).toBeInTheDocument();
  
  });
  
  });
*/
/*
describe('Navbar', () => {
  it('renders async Navbar component', async () => {
    render(await Navbar() )
    screen.debug();
  })
})
*/
/*
https://reflect.run/articles/async-waits-in-react-testing-library/

the above link suggests that you can render a component that makes a server call using code as below, 
but I call BS, it don't work!


describe('Examboards Page', () => {
  it('renders async Exambaords Page component', async () => {
    render(await Page({ params: { examboard_id: "1" }}) );
    screen.debug()
    //expect(screen.getByRole('paragraph')).toHaveTextContent('test-command');   
  });  
});
*/

/*
describe('something truthy and falsy', () => {
    it('true to be true', () => {
      expect(true).toBe(true);
    });
  
    it('false to be false', () => {
      expect(false).toBe(false);
    });
  });

  

*/



  //expect(screen.getByText('What is the point?')).toBeInTheDocument();



/*
<h1>What is the point?</h1>
            <p>Of this stupid fucking exercise?</p>
*/