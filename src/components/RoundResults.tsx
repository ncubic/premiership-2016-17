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
}

/**
 * Renders result of a single club within a match.
 */
function ClubScore(props: IClubScoreProps) {
	return (
		<div className="row">
			<div className="col">
				{props.club}
			</div>
			<div className="col">
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

			items.push(
				<li key={items.length}>
					<ClubScore club={clubs[0]} score={scores[0]} />
					<ClubScore club={clubs[1]} score={scores[1]} />
				</li>
			);
		}

		return (
			<div>
				<h2>Played games</h2>
				<ul>
					{items}
				</ul>
			</div>
		)
	}
}

export default RoundResults