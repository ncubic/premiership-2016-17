import * as React from 'react';
import * as Enzyme from 'enzyme';
import RoundSelect from './RoundSelect';

test('Without parameters RoundSelect should throw an error', () => {
	expect(() => {
    Enzyme.shallow(<RoundSelect />);
  }).toThrow("Missing rounds.");
});

test('With parameters RoundSelect renders without issues', () => {
	Enzyme.shallow(<RoundSelect rounds={[0,1,2,3,4,5]}>);
})