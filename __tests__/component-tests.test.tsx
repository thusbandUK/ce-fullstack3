import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, it } from 'vitest'
import { vi } from 'vitest'

import Slider from '../app/ui/dashboard/slider';
import ArrowCommand from '../app/ui/dashboard/arrowCommand';

const modifyFontSize = (number: number) => console.log(number.toString());

describe('Slider', () => {
  it('renders Slider component', () => {
    render(<Slider modifyFontSize={modifyFontSize} />);    
    const slider = screen.getByRole('slider');
    expect(slider).not.toHaveValue("48")
    fireEvent.change(slider, {
      target: { value: 48 },
    });
    expect(slider).toHaveValue("48")
  });  
});

describe('ArrowCommand', () => {
  it('renders ArrowCommand component', () => {
    render(<ArrowCommand command="test-command" borderGray={true} />);    
    expect(screen.getByRole('paragraph')).toHaveTextContent('test-command');   
  });  
});

//https://www.reddit.com/r/nextjs/comments/17mc9hn/how_do_you_test_async_server_components/
//description of how to call an async function

//describe('AsyncMock', () => {
  //it('renders async AsyncMock component', async () => {
    //render(await AsyncMock() )
    //screen.debug();
  //})
//})
