import * as React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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

		if (this.props.rounds === undefined) {
			throw Error("Missing rounds.");
		}
		this.rounds = this.props.rounds.reverse();
	}

	public render() {
		const selectItems = this.rounds.map((n) => 
			({value: n, label: n.toString()})
		);

		return (
			<div>
				<Select className="round-select" value={this.props.selected} onChange={this.handleSelect} options={selectItems} />
			</div>
		);
	}

	/**
	 * Select handler that calls a bound function from Premiership component.
	 * @param e event triggered on select
	 */
	private handleSelect(selectedOption: any) {
		if (selectedOption !== null) {
			const value : string = selectedOption.value;
			const iValue : number = Number(value);
			this.props.handler(iValue);
		}
	}
}

export default RoundSelect