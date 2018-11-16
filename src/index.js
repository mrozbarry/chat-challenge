import { h, render, Component } from 'ink';
import { User } from './views/user.js';
import { Channels } from './views/channels.js';

const defaultUserName = `Anonymous${Math.random().toString(36).slice(2)}`;

class Application extends Component {
  constructor() {
    super();

    this.state = {
      view: 'user',
      user: defaultUserName,
    };

    this.setView = this.setView.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setView(view) {
    this.setState({ view });
  }

  setUser(user) {
    this.setState({ user });
  }

  render() {
    const { view, user } = this.state;

    if (view === 'user') {
      return (
        <User
          user={user}
          setUser={this.setUser}
          setView={this.setView}
        />
      );
    }

    return (
      <Channels
        user={user}
        setView={this.setView}
      />
    );
  }
}

render(<Application />);
