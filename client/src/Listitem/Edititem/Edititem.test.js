import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import Edititem from './Edititem.js';

jest.mock('../../assets/Plus.js',
  () =>
    () => <div id="mock-Plus">Plus</div>
);

describe('Edititem', () => {
  const data = {
    id: 1234,
    item: "test value",
  };
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

  test('it renders "Edititem"', () => {
    const component = Renderer.create(
      <Edititem data={ data } />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    render(<Edititem item={ data.item } />, container);
  });

  it('creates an item with "test value"', () => {
    render(<Edititem item={ data.item } />, container);
    const el = container.getElementsByClassName('text-box')[0];
    expect(el.value).toEqual(data.item);
  });

  describe('the <Plus />', () => {
    it('renders <Plus />', () => {
      render(<Edititem item={ data.item } />, container);
      expect(document.getElementById('mock-Plus')).toBeTruthy();
    });

    it('calls updateItem on click', () => {
      const handleSubmit = Edititem.prototype.handleSubmit;
      const testSubmit = jest.fn();
      Edititem.prototype.handleSubmit = testSubmit;
      render(<Edititem item={ data.item } />, container);
      const plus = document.getElementById('mock-Plus');

      plus.parentNode.click();
      expect(testSubmit).toHaveBeenCalledTimes(1);

      Edititem.prototype.handleSubmit = handleSubmit;
    });
  });

  describe('onBlur', () => {
    it('resets the input value and calls cancel', () => {
      const cancel = jest.fn();
      render(<Edititem item={ data.item } cancel={ cancel } />, container);
      const el = document.getElementsByTagName('input')[0];

      el.value = 'new value';
      ReactTestUtils.Simulate.blur(el);
      expect(el.value).toBe('test value');
      expect(cancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleSubmit', () => {
    it('should call updateItem and cancel', () => {
      const updateItem = jest.fn();
      const cancel = jest.fn();
      const context = {
        props: { cancel, updateItem },
        input: { current: { value: 'new value' } },
      }
      const e = { preventDefault: jest.fn() };
      const handleSubmit = Edititem.prototype.handleSubmit.bind(context);

      handleSubmit(e);
      expect(updateItem).toHaveBeenCalledWith('new value');
      expect(cancel).toHaveBeenCalledTimes(1);
    });

    it('handles submit', () => {
      const handleSubmit = Edititem.prototype.handleSubmit;
      const testSubmit = jest.fn();
      Edititem.prototype.handleSubmit = testSubmit;

      render(<Edititem item={ data.item } />, container);
      const el = document.getElementsByTagName('input')[0];
      // const form = document.getElementsByTagName('form')[0];

      // ReactTestUtils.Simulate.change(el);
      // ReactTestUtils.Simulate.keyDown(form, { key: 'Enter', keyCode: 13, which: 13 });
      ReactTestUtils.Simulate.submit(el);
      expect(testSubmit).toHaveBeenCalledTimes(1);

      Edititem.prototype.handleSubmit = handleSubmit;
    });
  });
});
