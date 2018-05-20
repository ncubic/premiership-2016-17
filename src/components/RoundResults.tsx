import * as React from 'react';
import {IDataMatch} from '../data/Store'

/**
 * Properties expected by RoundResults component.
 */
interface IRoundResultsProps {
	games: IDataMatch[];
}

/**
 * Properties expected by function ClubScore.
 */
interface IClubScoreProps {
	club  : string;
	score : number;
	won   ?: boolean;
}

/**
 * Renders result of a single club within a match.
 */
function ClubScore(props: IClubScoreProps) {
	let divClass = 'row';
	if (props.won) {
		divClass += ' highlight';
	}
	return (
		<div className={divClass}>
			<div className="col-10">
				{props.club}
			</div>
			<div className="col-2 score">
				{props.score}
			</div>
		</div>
	);
}

/**
 * Renders all matches played in a round with every club rendered
 * within its own column with a result.
 */
class RoundResults extends React.Component<IRoundResultsProps, object> {
	
	public render() {

		if (this.props.games === undefined) {
			throw Error("Missing games parameter.");
		}

		const items : any[] = [];

		for (const match of this.props.games) {
			const clubs  : string[] = [];
			const scores : number[] = [];
			for (const club of Object.keys(match)) {
				clubs.push(club);
				scores.push(match[club]);
			}
			if (clubs.length !== 2 || scores.length !== 2) {
				throw new Error("Invalid match result");
			}

			let firstWon = false;
			let secondWon = false;
			if (scores[0] > scores[1]) {
				firstWon = true;
			}
			else if (scores[0] < scores[1]) {
				secondWon = true;
			}

			items.push(
				<div key={items.length} className="col-lg-12 match">
					<ClubScore club={clubs[0]} score={scores[0]} won={firstWon} />
					<ClubScore club={clubs[1]} score={scores[1]} won={secondWon} />
				</div>
			);
		}

		return (
			<div>
				<h2>Match results</h2>
				<div className="match-list">
					{items}
				</div>
			</div>
		)
	}
}

export default RoundResults