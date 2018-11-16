import { h, Component } from 'ink';
import dgram from 'dgram';

export class Channels extends Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [{
        type: 'channel',
        name: props.user,
        users: [props.user],
      }]
    };
  }

  componentDidMount() {
    this.createDgramServer();
    this.interval = setInterval(() => {
      this.pingServers();
    }, 10000);
    this.pingServers();
  }

  createDgramServer() {
    this.server = dgram.createSocket('udp4');
    this.server.bind({ port: 42069, exclusive: false });
    this.server.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        switch (data.type) {
          case 'ping':
            this.broadcastChannel();
            break;

          case 'channel':
            this.registerChannel(data);
            break;

          default:
            // What do?
            break;

        }
      } catch (err) {
        // What do?
      }
    });
  }

  pingServers() {
    this.broadcastJson({ type: 'ping' });
  }

  registerChannel(channel) {
    this.setState({
      channels: this.state.channels.filter(c => c !== channel.name).concat(channel),
    });
  }

  broadcastChannel() {
    const self = this.state.channels.find(c => c.name === this.props.user);
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
        {this.state.channels.map(channel => <div key={channel.name}>{channel.name}</div>)}
      </div>
    )
  }
}
