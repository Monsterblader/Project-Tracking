// https://gist.github.com/wahengchang/108ca55981f6600c252ad0cb9d4c518f
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Renderer from 'react-test-renderer';
import ReactTestUtils from 'react-dom/test-utils';
import Listitem from './Listitem.js';

jest.mock('./Edititem/Edititem.js',
  () =>
    () => <div id="mock-Edititem">Mock Edititem</div>
)
jest.mock('../assets/Checkmark.js',
  () =>
    () => <div id="mock-Checkmark">Checkmark</div>
)
jest.mock('../assets/Xmark.js',
  () =>
    () => <div id="mock-Xmark">Xmark</div>
)

describe('Listitem', () => {
  const data = {
    id: 1234,
    item: "test value",
  };
  const del = jest.fn();
  const updateItem = jest.fn();
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

  test('it renders "Listitem"', () => {
    const component = Renderer.create(
      <Listitem data={ data } />
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    render(<Listitem data={ data } />, container);
  });

  it('creates an item with "test value"', () => {
    render(<Listitem data={ data } />, container);
    const el = container.getElementsByClassName('message text-box')[0];
    expect(el.textContent).toEqual(data.item);
  });

  describe('the <Checkmark />', () => {
    it('renders <Checkmark />', () => {
      render(<Listitem data={ data } />, container);
      expect(document.getElementById('mock-Checkmark')).toBeTruthy();
    });

    it('calls updateItem on click', () => {
      render(<Listitem data={ data } updateItem={ updateItem }/>, container);
      const el = document.getElementById('mock-Checkmark');
      el.parentNode.click();
      expect(updateItem).toHaveBeenCalledTimes(1);
    });
  });

  describe('the <Xmark />', () => {
    it('renders <Xmark />', () => {
      render(<Listitem data={ data } />, container);
      expect(document.getElementById('mock-Xmark')).toBeTruthy();
    });

    it('calls delete on click', () => {
      render(<Listitem data={ data } delete={ del }/>, container);
      const el = document.getElementById('mock-Xmark');
      el.parentNode.click();
      expect(del).toHaveBeenCalledWith(1234);
    });
  });

  it('renders <Listitem> when clicked', () => {
    render(<Listitem data={ data } />, container);
    const el = document.getElementsByClassName('message text-box')[0];
    el.click();
    expect(document.getElementById('mock-Edititem')).toBeTruthy();
  });
});
