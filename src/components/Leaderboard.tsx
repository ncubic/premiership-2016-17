import * as React from 'react';
import * as FontAwesome from 'react-fontawesome';
import * as ReactTooltip from 'react-tooltip'
import {ILeaderboardEntry} from '../data/Store'

/**
 * Properties expected by Leaderboard component.
 */
interface ILeaderboardProps {
	ranking: ILeaderboardEntry[];
}

/**
 * Renders a header for Leaderboard table.
 *
 */
function LeaderboardHeader() {
	return (
		<tr>
			<th>Rank</th>
			<th>Name</th>
			<th>Played</th>
			<th>Won</th>
			<th>Draw</th>
			<th>Lost</th>
			<th>GF<FontAwesome data-tip="Goals for" name="question" /></th>
			<th>GA<FontAwesome data-tip="Goals against" name="question" /></th>
			<th>GD<FontAwesome data-tip="Goal difference" name="question" /></th>
			<th>Points</th>
			<th>Trend</th>
		</tr>
	)
}

/**
 * Component renders a leaderboard with all clubs ranked in a table.
 */
class Leaderboard extends React.Component<ILeaderboardProps, object> {
	public render() {
		if (this.props.ranking === undefined) {
			throw Error("Missing ranking data.");
		}

		const items = this.props.ranking.map((club) =>
			<tr key={club.name}>
				<td>{club.order}</td>
				<td>{club.name}</td>
				<td>{club.played}</td>
				<td>{club.won}</td>
				<td>{club.draw}</td>
				<td>{club.lost}</td>
				<td>{club.scored}</td>
				<td>{club.received}</td>
				<td>{club.goals_diff}</td>
				<td>{club.points}</td>
				<td>{club.trend}</td>
			</tr>
		);

		return (
			<div>
				<h2>Leaderboard</h2>
				<div className="table-responsive">
					<table className="table table-hover table-sm">
						<thead>
							<LeaderboardHeader />
						</thead>
						<tbody>
							{items}
						</tbody>
					</table>
				</div>
				<ReactTooltip />
			</div>
		)
	}
}

export default Leaderboard