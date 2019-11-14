import React, {Component} from "react";

let moment = require("moment-timezone");
moment.locale("th");

export default class TimeUpdate extends Component {

  constructor(props) {
    super(props);
    this.data = this.props.data;

    this.classUpdate = "text-primary";
    this.state = {
      classUpdate: "text-primary",
      lastUpdate: moment(this.data.d.timestamp).fromNow()
    };
    this.nextMillis = this.data.d.millis;
  }

  componentWillReceiveProps(nextProps) {
    this.nextMillis = nextProps.data.d.millis;
  }

  componentDidMount() {
    // console.log('didmount ', this.data.d.myName)

    this.timer = setInterval(() => {
      // console.log('old : ', this.data.d.millis, ' new : ', this.nextMillis, ' device : ', this.data.d.myName)
      // console.log(this.data)
      console.log(`my interval`);
      if (this.nextMillis !== this.data.d.millis) {
        this.data.d.millis = this.nextMillis;
        this.setState({
          classUpdate: "text-danger",
          lastUpdate: moment(moment.now()).fromNow()
        });
      } else {
        this.setState({ classUpdate: "text-primary" });
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <p className={this.state.classUpdate}>
        <i className='fa fa-clock-o'/>&ensp;
        {this.state.lastUpdate}
      </p>
    );
  }

}

