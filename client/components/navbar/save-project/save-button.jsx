import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    const data = localStorage.getItem;

    setTimeout(() => {
      fetch('/save-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(res => res.blob())
        .then(blob => URL.createObjectURL(blob))
        .then((file) => {
          const element = document.createElement('a');
          document.body.appendChild(element);
          element.href = file;
          element.download = 'graphql.json';
          element.click();
          this.toggleLoader();
        })
        .catch((err) => {
          this.toggleLoader();
          console.log(err);
        });
    }, 2500);
  }

  render() {
    return (
      <div>
        <FlatButton style={{ color: '#FF4280' }} label="Save Project" onClick={this.saveProject} />
        {this.state.showLoader && <Loader/>}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  null,
)(SaveProject);
