import * as React from 'react';
import * as Enzyme from 'enzyme';
import Leaderboard from './Leaderboard';
import Store from '../data/Store';

test('Without parameters component should throw an error', () => {
	expect(() => {
    Enzyme.shallow(<Leaderboard />);
  }).toThrow("Missing ranking data.");
});

test('With empty parameters component should render', () => {
	Enzyme.shallow(<Leaderboard ranking={[]} />);
});


test('With set parameters component should render', () => {
	const store = new Store();
	Enzyme.shallow(<Leaderboard ranking={store.getRanking(38)} />);
});