import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { TextField, Button } from '@material-ui/core';
import styles from './login.page.scss';
import { LoginAction } from '../../../common/state/auth/auth.actions';

class LoginPage extends Component {
  constructor (props) {
    super(props);
    this.state = { username: '', password: '' };
  }

  onSubmit (e, username, password) {
    e.preventDefault();
    this.props.login(username, password);
  }

  render () {
    const { t } = this.props;
    const { username, password } = this.state;

    return (
      <div className={styles.container}>
        <form onSubmit={e => this.onSubmit(e, username, password)}>

          <TextField
            placeholder={t('USERNAME_HINT')}
            value={this.state.username}
            label={t('USERNAME')}
            onChange={e => this.setState({ username: e.target.value })}
          />

          <TextField
            placeholder={t('PASSWORD_HINT')}
            value={this.state.password}
            label={t('PASSWORD')}
            type="password"
            onChange={e => this.setState({ password: e.target.value })}
          />

          <Button
            type="submit"
            onClick={e => this.onSubmit(e, username, password)}
            variant="outlined"
          >
              submit
          </Button>

        </form>
      </div>
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

function mapDispatchToProps (dispatch) {
  return {
    login: (username, password) => dispatch(new LoginAction(username, password))
  };
}

export default connect(null, mapDispatchToProps)(translate()(LoginPage));
