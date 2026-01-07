import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test, describe, it } from 'vitest'
import { vi } from 'vitest'
import Slider from '../app/ui/dashboard/slider';

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