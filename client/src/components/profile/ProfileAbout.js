import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from '../../validation/is-empty';

class ProfileAbout extends Component {
  render() {
    const { profile } = this.props;

    // Get first name
    const firstName = profile.user.name.trim().split(' ')[0];

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Notes</h3>
            <p className="lead">
              {isEmpty(profile.notes) ? (
                <span>{firstName} hasn't added extra information</span>
              ) : (
                <span>{profile.notes}</span>
              )}
            </p>
            <hr />
          </div>
          <div className="card card-body bg-light mb-3">
            <h3 className="text-center text-info">{firstName}'s Phone</h3>
            <p className="lead">
              {isEmpty(profile.phone) ? (
                <span>{firstName} hasn't added a phone number</span>
              ) : (
                <span>{profile.phone}</span>
              )}
            </p>
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
