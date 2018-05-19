import * as React from 'react';
import Store from '../data/Store';
import Leaderboard from './Leaderboard';
import RoundResults from './RoundResults';
import RoundSelect from './RoundSelect';

/**
 * State variables expected by Premiership component.
 */
interface IPremierShipState { 
	round :  number 
}

/**
 * Renders all components related to a chosen premiership round.
 * Round state if lifted from RoundSelect component and applied to
 * both Leaderboard and RoundResults components.
 */
class Premiership extends React.Component<object, IPremierShipState> {

	private store: Store
	private rounds: number[]

	constructor(props: any) {
		super(props)
		// Initialize data store and prepare selectable rounds with selected one
		this.store = new Store();
		this.rounds = this.store.getRounds().sort((a: number, b:number) => a - b);
		const selectedRound = this.rounds[this.rounds.length - 1];

		this.state = {round: selectedRound};
		this.handleRoundChange = this.handleRoundChange.bind(this);
	}

	public handleRoundChange(round: number) {
		this.setState({ round })
	}

	public render() {
		return (
			<div>
				<h1>Premiership 2016/17</h1>
				<RoundSelect rounds={this.rounds} selected={this.state.round} handler={this.handleRoundChange} />
				<RoundResults games={this.store.getGames(this.state.round)}/>
				<Leaderboard ranking={this.store.getRanking(this.state.round)}/>
			</div>
		);
	}
}

export default Premiership