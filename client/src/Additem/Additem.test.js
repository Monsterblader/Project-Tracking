import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import Additem from './Additem.js';

jest.mock('../assets/Plus.js',
  () =>
    () => <div id="mock-Plus">Plus</div>
);

describe('Additem', () => {
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

  test('it renders "Additem"', () => {
    const component = Renderer.create(
      <Additem />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    render(<Additem />, container);
  });

  describe('the <Plus />', () => {
    it('renders <Plus />', () => {
      render(<Additem />, container);
      expect(document.getElementById('mock-Plus')).toBeTruthy();
    });

    it('calls updateItem on click', () => {
      const handleSubmit = Additem.prototype.handleSubmit;
      const testSubmit = jest.fn();
      Additem.prototype.handleSubmit = testSubmit;
      render(<Additem />, container);
      const plus = document.getElementById('mock-Plus');

      plus.parentNode.click();
      expect(testSubmit).toHaveBeenCalledTimes(1);

      Additem.prototype.handleSubmit = handleSubmit;
    });
  });

  describe('handleSubmit', () => {
    it('should call updateItem and cancel', () => {
      const activateAdditem = jest.fn();
      const context = {
        props: { activateAdditem },
        input: { current: { value: 'new value' } },
      }
      const e = { preventDefault: jest.fn() };
      const handleSubmit = Additem.prototype.handleSubmit.bind(context);

      handleSubmit(e);
      expect(activateAdditem).toHaveBeenCalledWith('new value');
    });

    it('handles submit', () => {
      const handleSubmit = Additem.prototype.handleSubmit;
      const testSubmit = jest.fn();
      Additem.prototype.handleSubmit = testSubmit;

      render(<Additem />, container);
      const el = document.getElementsByTagName('input')[0];
      // const form = document.getElementsByTagName('form')[0];

      // ReactTestUtils.Simulate.change(el);
      // ReactTestUtils.Simulate.keyDown(form, { key: 'Enter', keyCode: 13, which: 13 });
      ReactTestUtils.Simulate.submit(el);
      expect(testSubmit).toHaveBeenCalledTimes(1);

      Additem.prototype.handleSubmit = handleSubmit;
    });
  });
});
