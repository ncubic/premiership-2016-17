import * as React from 'react';
import * as Enzyme from 'enzyme';
import RoundResults from './RoundResults';
import Store from '../data/Store';

test('Without parameters the component should not render', () => {
	expect( () => {
		const wrapper = Enzyme.shallow(<RoundResults />);
	}).toThrowError("Missing games parameter.")
});

test('With empty parameters the component should render without errors', () => {
	const wrapper = Enzyme.shallow(<RoundResults games={[]}/>);
});

test('With set parameters the component should render without errors', () => {
	const store = new Store;
	const wrapper = Enzyme.shallow(<RoundResults games={store.getGames(38)}/>);
});