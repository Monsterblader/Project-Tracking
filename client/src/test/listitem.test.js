import React from 'react';
import Listitem from '../listitem.js';
import renderer from 'react-test-renderer';

test('it renders "Listitem"', () => {
  const component = renderer.create(
    <Listitem data={ data } />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
