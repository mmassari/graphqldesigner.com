import React, { Component } from 'react';
import { connect } from 'react-redux';
var download = require("downloadjs")
// Material UI Components
import FlatButton from 'material-ui/FlatButton';
import Loader from './loader.jsx';

const mapStateToProps = store => ({
  tables: store.schema.tables,
  database: store.schema.database,
});

class SaveProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
    };
    this.saveProject = this.saveProject.bind(this);
  }

  toggleLoader() {
    const { showLoader } = this.state;
    this.setState({
      showLoader: !showLoader,
    });
  }

  saveProject() {
    this.toggleLoader();

    // JSON.stringify doesn't work with Sets. Change Sets to arrays for export
    let data = localStorage.getItem('persist:root');
    console.log("data=" + data);
    if (data !== '')
      data = JSON.parse(data);
    setTimeout(() => {
      fetch('/save-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      })
        .then(res => {
          console.log(res); res.blob();
        })
        .then(blob => download(blob, 'test.json'))
        .catch(err => console.log(err))
    }
      , 2500);
  }

  render() {
    return (
      <div>
        <FlatButton label="Save Project" onClick={this.saveProject} />
        {this.state.showLoader && <Loader />}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  null,
)(SaveProject);
