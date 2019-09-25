import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import Doneitem from './Doneitem.js';

jest.mock('../assets/Checkmark.js',
  () =>
    () => <div id="mock-Checkmark">Checkmark</div>
)
jest.mock('../assets/Xmark.js',
  () =>
    () => <div id="mock-Xmark">Xmark</div>
)

describe('Doneitem', () => {
  const data = {
    id: 1234,
    item: "test value",
  };
  const del = jest.fn();
  const uncompleteItem = jest.fn();
  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test('it renders "Doneitem"', () => {
    const component = Renderer.create(
      <Doneitem data={ data } />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    render(<Doneitem data={ data } />, container);
  });

  it('creates an item with "test value"', () => {
    render(<Doneitem data={ data } />, container);
    const el = container.getElementsByClassName('message text-box')[0];
    expect(el.textContent).toEqual(data.item);
  });

  describe('the <Checkmark />', () => {
    it('renders <Checkmark />', () => {
      render(<Doneitem data={ data } />, container);
      expect(document.getElementById('mock-Checkmark')).toBeTruthy();
    });

    it('calls uncompleteItem on click', () => {
      render(<Doneitem data={ data } uncompleteItem={ uncompleteItem }/>, container);
      const el = document.getElementById('mock-Checkmark');
      el.parentNode.parentNode.click();
      expect(uncompleteItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('the <Xmark />', () => {
    it('renders <Xmark />', () => {
      render(<Doneitem data={ data } />, container);
      expect(document.getElementById('mock-Xmark')).toBeTruthy();
    });

    it('calls delete on click', () => {
      render(<Doneitem data={ data } delete={ del }/>, container);
      const el = document.getElementById('mock-Xmark');
      el.parentNode.click();
      expect(del).toHaveBeenCalledTimes(1);
    });
  });
});
