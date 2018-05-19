import * as React from 'react';
import {ILeaderboardEntry} from '../data/Store'

/**
 * Properties expected by Leaderboard component.
 */
interface ILeaderboardProps {
	ranking: ILeaderboardEntry[];
}

/**
 * Component renders a leaderboard with all clubs ranked in a table.
 */
class Leaderboard extends React.Component<ILeaderboardProps, object> {
	public render() {
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
				<table>
					<thead>
						<tr>
							<th>Rank</th>
							<th>Name</th>
							<th>Played</th>
							<th>Won</th>
							<th>Draw</th>
							<th>Lost</th>
							<th>Goals scored</th>
							<th>Goals received</th>
							<th>Goal difference</th>
							<th>Points</th>
							<th>Trend</th>
						</tr>
					</thead>
					<tbody>
						{items}
					</tbody>
				</table>
			</div>
		)
	}
}

export default Leaderboard