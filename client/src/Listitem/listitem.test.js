// https://gist.github.com/wahengchang/108ca55981f6600c252ad0cb9d4c518f
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Listitem from './Listitem.js';
import Renderer from 'react-test-renderer';

jest.mock('./Edititem/Edititem.js', () => ()=> <div id="mockUserCom">mockUserCom</div>)

describe('Listitem', () => {
  const data = {
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

  test('it renders "Listitem"', () => {
    const component = Renderer.create(
      <Listitem data={ data } />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    render(<Listitem data={ data }/>, container);
  });

  xit('creates an item with "test value"', () => {
    expect(false).toBe(true);
  });

  xdescribe('the <Checkmark />', () => {
    it('renders <Checkmark />', () => {
      expect(false).toBe(true);
    });

    it('calls updateItem on click', () => {
      expect(false).toBe(true);
    });
  });

  xdescribe('the <Xmark />', () => {
    it('renders <Xmark />', () => {
      expect(false).toBe(true);
    });

    it('calls delete on click', () => {
      expect(false).toBe(true);
    });
  });


  it('renders <Edititem> when clicked', () => {
    const renderedInstance = Renderer.create(<Listitem data={ data } />).root;
    expect(renderedInstance.findAllByProps({ children: data.item }).length).toBeGreaterThan(0);
  });

});
