import { h, Component } from 'ink';
import TextInput from 'ink-text-input';

export class User extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    this.props.setView('channels');
  }

  render() {
    return (
      <div>
        Enter a username:
        <TextInput
          value={this.props.user}
          onChange={this.props.setUser}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}
