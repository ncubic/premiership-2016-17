import Store from './Store';

// Test related to rounds (getRounds method)
test('Round count is 38', () => {
	const store = new Store();
	const rounds = store.getRounds();
	const count = rounds.length;
	expect(count).toEqual(38);
});

// Test related to matches (getGames method)
test('Expected games for round 30', () => {
	const store = new Store();
	const games = store.getGames(30);

	const expected = [
	    {
	        "Arsenal":2,
	        "Manchester City":2
	    },
	    {
	        "Burnley":0,
	        "Tottenham Hotspur":2
	    },
	    {
	        "Chelsea":1,
	        "Crystal Palace":2
	    },
	    {
	        "Hull City":2,
	        "West Ham United":1
	    },
	    {
	        "Leicester City":2,
	        "Stoke City":0
	    },
	    {
	        "Liverpool":3,
	        "Everton":1
	    },
	    {
	        "Manchester United":0,
	        "West Bromwich Albion":0
	    },
	    {
	        "Southampton":0,
	        "Bournemouth":0
	    },
	    {
	        "Swansea":0,
	        "Middlesbrough":0
	    },
	    {
	        "Watford":1,
	        "Sunderland":0
	    }
	];

	expect(games).toEqual(expected);
});

// Tests related to leaderboards (getRanking method)
test('Sending negative round to getRanking throws an error', () => {
	const store = new Store();
	expect(() => store.getRanking(-1)).toThrow("Invalid round number");
});

test('Sending round zero to getRanking throws an error', () => {
	const store = new Store();
	expect(() => store.getRanking(0)).toThrow("Invalid round number");
});

test('Sending too high round number to getRanking throw an error', () => {
	const store = new Store();
	const count = store.getRounds().length;
	expect(() => store.getRanking(count + 1)).toThrow("Invalid round number");
});

test('Expected results in round 1 for Arsenal', () => {
	const store = new Store();
	const results = store.getRanking(1);
	// Extract results for Arsenal and ensure they are the same as expected
	const arselan = results.filter((a: any) => a.name === 'Arsenal')[0];
	const expected = {
		name: "Arsenal",
		scored: 3,
		received: 4,
		goals_diff: -1,
		won: 0,
		lost: 1,
		draw: 0,
		points: 0,
		played: 1,
		order: 6,
		trend: ['L']
	}
	expect(arselan).toEqual(expected);
});

test('Expected results in round 38 for Everton', () => {
	const store = new Store();
	const results = store.getRanking(38);
	// Extract results for Everton and ensure they are the same as expected
	// Using data from wikipedia https://en.wikipedia.org/wiki/2016%E2%80%9317_Premier_League
	const everton = results.filter((a: any) => a.name === 'Everton')[0];
	const expected = {
		name: "Everton",
		scored: 62,
		received: 44,
		goals_diff: 18,
		won: 17,
		lost: 11,
		draw: 10,
		points: 61,
		played: 38,
		order: 7,
		trend: ['D', 'L', 'L', 'W', 'L']
	}
	expect(everton).toEqual(expected);
});