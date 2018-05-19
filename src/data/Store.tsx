/**
 * Interface defining a leaderboard entry object.
 */
export interface ILeaderboardEntry {
	draw: number,
	goals_diff: number,
	lost: number,
	name: string,
	order: number,
	played: number,
	points: number,
	received: number,
	scored: number,
	trend: string[],
	won: number,
}

/**
 * Interface defining a leaderboard object with entries for every club.
 */
export interface ILeaderboad {
	[key: string]: ILeaderboardEntry;
}

/**
 * Interface defining rounds in data store
 */
export interface IDataRounds {
	round: number,
	matches: IDataMatch[],
}

/**
 * Interface defining match in data store
 */
export interface IDataMatch {
	[key: string]: number,
}

/**
 * This class acts as a model for retrieving data from a JSON file.
 * It implements queries for retrieving rounds, games and leaderboards.
 *
 */
class Store {

	private data: IDataRounds[]

	/**
	 * Setup access to data.json file with needed premiership data.
	 */
	constructor() {
		this.data = require('./data.json');
	}

	/**
	 * Get all available rounds for premiership matches.
	 * @returns all available rounds.
	 */
	public getRounds() {
		const rounds = this.data.map((row: IDataRounds) => row.round);
		return rounds;
	}

	/**
	 * Method retrieves all games played in the requested round.
	 * @param round Number of the selected round
	 * @returns all matched played in the requested round.
	 */
	public getGames(round: number) {
		let games : any [] = [];
		for (const row of this.data) {
			if (row.round === round) {
				games = row.matches;
				break;
			}
		}
		return games;
	}

	/**
	 * Method recalculates statistics on every call and generates
	 * a ranked leaderboard. It treats data.json like a database
	 * always pulling the latest numbers.
	 * @param round Number of the selected round
	 * @returns leaderboard as a sorted array of hashes with all statistics
	 */
	public getRanking(round: number) {
		// Create an initial leaderboard which will keep statistics for every club
		const leaderboard = {}
		// Sort all rounds to ensure they are in ascending order and discard non relevant
		let rounds = this.data.sort((a: IDataRounds,b: IDataRounds) => a.round - b.round)
		if (round <= 0 || round > rounds.length) {
			throw new Error("Invalid round number");
		}
		rounds = rounds.slice(0, round);
		// Go through all rounds and save results into our leaderboard
		for (const currentRound of rounds) {
			for (const match of currentRound.matches) {
				const clubs = Object.keys(match);
				if (clubs.length !== 2) {
					throw new Error("Invalid match");
				}
				// Initiate clubs in the leaderboard
				if (!leaderboard.hasOwnProperty(clubs[0])) {
					leaderboard[clubs[0]] = this.initLeaderboardClub(clubs[0]);
				}
				if (!leaderboard.hasOwnProperty(clubs[1])) {
					leaderboard[clubs[1]] = this.initLeaderboardClub(clubs[1]);
				}
				// Get their results
				leaderboard[clubs[0]].played += 1;
				leaderboard[clubs[0]].scored += match[clubs[0]];
				leaderboard[clubs[0]].received += match[clubs[1]];

				leaderboard[clubs[1]].played += 1;
				leaderboard[clubs[1]].scored += match[clubs[1]];
				leaderboard[clubs[1]].received += match[clubs[0]];

				if (match[clubs[0]] > match[clubs[1]]) {
					leaderboard[clubs[0]].won += 1;
					leaderboard[clubs[1]].lost += 1;
					leaderboard[clubs[0]].trend.push('W');
					leaderboard[clubs[1]].trend.push('L');
				}
				else if (match[clubs[0]] === match[clubs[1]]) {
					leaderboard[clubs[0]].draw += 1;
					leaderboard[clubs[1]].draw += 1;
					leaderboard[clubs[0]].trend.push('D');
					leaderboard[clubs[1]].trend.push('D');
				}
				else {
					leaderboard[clubs[0]].lost += 1;
					leaderboard[clubs[1]].won += 1;
					leaderboard[clubs[0]].trend.push('L');
					leaderboard[clubs[1]].trend.push('W');
				}
			}
		}		
		const sortedLeaderboard = this.getSortedLeaderboardWithStatistics(leaderboard);

		return sortedLeaderboard;
	}

	/**
	 * Method receives a leaderboard with calculated results and sums totals,
	 * extracts trends, assigns ranks and transforms leaderboard into a
	 * sorted array.
	 * @param leaderboard contains calculated results per club
	 * @returns sorted leaderboard with calculated statistics and trends
	 */
	private getSortedLeaderboardWithStatistics(leaderboard: ILeaderboad) {
		// Prepare leaderboard in array format
		let sortedLeaderboard = [];
		for (const club of Object.keys(leaderboard)) {
			// Calculate all totals from gathered statistics
			leaderboard[club].points = leaderboard[club].won * 3 + leaderboard[club].draw
			leaderboard[club].goals_diff = leaderboard[club].scored - leaderboard[club].received
			// Reduce trend to last five matches
			leaderboard[club].trend = leaderboard[club].trend.slice(-5);
			sortedLeaderboard.push(leaderboard[club]);
		}

		// Sort leaderboards by soccer rules and assign rankings
		sortedLeaderboard = sortedLeaderboard.sort((a: ILeaderboardEntry, b: ILeaderboardEntry) => this.sortLeaderboard(a, b));
		this.setRanks(sortedLeaderboard);

		return sortedLeaderboard;
	}

	/**
	 * Initiate a leaderboard entry for a given club
	 * @param club club name
	 * @returns leaderboard club entry
	 */
	private initLeaderboardClub(club: string) {
		return {
			draw: 0,
			goals_diff: 0,
			lost: 0,
			name: club,
			order: 0,
			played: 0,
			points: 0,
			received: 0,
			scored: 0,
			trend: [],
			won: 0,
		}
	}

	/**
	 * Sort leaderboard by soccer rules. Sorting rules are that points take
	 * precedence , then goal difference and then number of goals scored.
	 * If all three criteria are the same then clubs share the same rank.
	 * @param firstClub first club being compared
	 * @param secondClub second club being compared
	 * @returns sort result
	 */
	private sortLeaderboard(firstClub: ILeaderboardEntry, secondClub: ILeaderboardEntry) {
		if (firstClub.points > secondClub.points) {
			return -1;
		}
		if (firstClub.points < secondClub.points) {
			return 1;
		}
		if (firstClub.goals_diff > secondClub.goals_diff) {
			return -1;
		}
		if (firstClub.goals_diff < secondClub.goals_diff) {
			return 1;
		}
		if (firstClub.scored > secondClub.scored) {
			return -1;
		}
		if (firstClub.scored < secondClub.scored) {
			return 1;
		}
		return 0;
	}

	/**
	 * Take sorted leaderboard and based on points, goal difference
	 * and goals scored assign ranks to clubs. If all three criteria
	 * are the same clubs will share a rank.
	 * @param leaderboard array of leaderboard clubs that will be changed
	 */
	private setRanks(leaderboard: ILeaderboardEntry[]) {
		// Clubs with same points will share a rank
		let lastPoints = leaderboard[0].points;
		let lastDiff = leaderboard[0].goals_diff;
		let lastScored = leaderboard[0].scored;
		let currentRank = 1;
		for (const club of leaderboard) {
			if (club.points !== lastPoints || club.goals_diff !== lastDiff || club.scored !== lastScored) {
				currentRank++;
				lastPoints = club.points;
				lastDiff = club.goals_diff;
				lastScored = club.scored;
			}
			club.order = currentRank;
		}
	}
}

export default Store