import React from "react";
//import { render, cleanup } from "react-testing-library";
import { render, screen, cleanup } from '@testing-library/react';
import { expect, test, describe, it, afterEach } from 'vitest'


/*
see: https://github.com/testing-library/react-testing-library/issues/371 
for explanation of why debug isn't logging

working from this blog, which has been good and bad
https://www.robinwieruch.de/vitest-react-testing-library/
*/

export const Parent = ({ children }) => {
  return <div>{children}</div>;
};

describe("<Parent />", () => {
  const childElement = <div>Child</div>;
  const { debug } = render(<Parent>{childElement}</Parent>);

  describe("<Parent /> Rendering", () => {
    afterEach(cleanup);

    it("should return HTML Snapshot", () => {
      debug();
    });

    it("should have its child rendered", () => {
      debug();
    });
  });

  // Other Irrelevant Tests
});