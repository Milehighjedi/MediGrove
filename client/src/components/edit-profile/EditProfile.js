import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      username: '',
      company: '',
      website: '',
      phone: '',
      location: '',
      notes: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.phone = !isEmpty(profile.phone) ? profile.phone : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.notes = !isEmpty(profile.notes) ? profile.notes : '';

      // Set component fields state
      this.setState({
        username: profile.username,
        company: profile.company,
        website: profile.website,
        phone: profile.phone,
        location: profile.location,
        notes: profile.notes
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      username: this.state.username,
      company: this.state.company,
      website: this.state.website,
      phone: this.state.phone,
      location: this.state.location,
      notes: this.state.notes
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto ">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <div className="card bg-dark text-white">
                <h1 className="display-4 text-center">Edit Profile</h1>
                <small className="d-block pb-3">* = required fields</small>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    placeholder="* Profile Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    error={errors.username}
                    info="A unique username for your profile URL. Your full name, company name, nickname"
                  />
                  <TextFieldGroup
                    placeholder="Company"
                    name="company"
                    value={this.state.company}
                    onChange={this.onChange}
                    error={errors.company}
                    info="The company you are associated with"
                  />
                  <TextFieldGroup
                    placeholder="Website"
                    name="website"
                    value={this.state.website}
                    onChange={this.onChange}
                    error={errors.website}
                    info="Could be your own website or a company one"
                  />
                  <TextFieldGroup
                    placeholder="Phone Number"
                    name="phone"
                    value={this.state.phone}
                    onChange={this.onChange}
                    error={errors.phone}
                    info="The best number to contact you at"
                  />
                  <TextFieldGroup
                    placeholder="Location"
                    name="location"
                    value={this.state.location}
                    onChange={this.onChange}
                    error={errors.location}
                    info="City or city & state suggested (eg. Denver, CO)"
                  />
                  <TextAreaFieldGroup
                    placeholder="Notes"
                    name="notes"
                    value={this.state.notes}
                    onChange={this.onChange}
                    error={errors.notes}
                    info="Any additional information (eg. Cell or Company Customer Service phone number"
                  />
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
