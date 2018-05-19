import * as React from 'react';

/**
 * Properties expected by RoundSelect component.
 */
interface IRoundSelectProps {
  rounds: number[];
  selected: number;
  handler: (round: number) => void;
}

/**
 * Renders a select control with all available rounds. Chosen round is
 * lifted up to Premiership component.
 */
class RoundSelect extends React.Component<IRoundSelectProps, object> {

	private rounds: number[]

	constructor(props: IRoundSelectProps) {
		super(props);
		this.handleSelect = this.handleSelect.bind(this);

		this.rounds = this.props.rounds.reverse();
	}

	public render() {
		const selectItems = this.rounds.map((n) =>
			<option value={n} key={n.toString()}>{n}</option>
		);

		return (
			<div>
				<label>Select round</label>
				<select value={this.props.selected} onChange={this.handleSelect}>
					{selectItems}
				</select>
			</div>
		);
	}

	/**
	 * Select handler that calls a bound function from Premiership component.
	 * @param e event triggered on select
	 */
	private handleSelect(e: React.FormEvent<HTMLSelectElement>) {
		const value : string = e.currentTarget.value;
		const iValue : number = Number(value);
		this.props.handler(iValue);
	}
}

export default RoundSelect