import { h, Component } from 'ink';
import { Discovery } from 'udp-discovery';

export class Channels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [{
        type: 'channel',
        name: props.user,
        users: [props.user],
      }],
      data: [],
    };
  }

  componentDidMount() {
    this.createDiscovery();
  }

  createDiscovery() {
    this.discovery = new Discovery();
    const self = this.state.channels.find(c => c.name === this.props.user);
    this.discovery.announce(this.props.user, { ...self, port: 0, ip: '0.0.0.0' }, 10000)
    this.discovery.on('available', (name, data, reason) => {
      this.registerChannel(data);
    });
  }

  registerChannel(channel) {
    this.setState({
      channels: this.state.channels.filter(c => c !== channel.name).concat(channel),
    });
  }

  broadcastChannel() {
    if (self) {
      this.broadcastJson(self);
    }
  }

  broadcastJson(json) {
    const buffer = new Buffer(JSON.stringify(json));
    this.server.send(buffer, buffer.length, 0, 42069, '255.255.255.255');
  }

  render() {
    return (
      <div>
        Messages ({this.state.data.length}):
        <div>
          {this.state.data.map((d, index) => <div key={index}>{JSON.stringify(d)}</div>)}
        </div>
      </div>
    )
  }
}
