import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import { Input } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Affix from '../components/Utils/Affix';
import LeftSidebar from '../app/Sidebar/LeftSidebar';
import requiresLogin from '../auth/requiresLogin';
import { getAuthenticatedUserName } from '../reducers';
import FacebookShare from '../components/Button/FacebookShare';
import TwitterShare from '../components/Button/TwitterShare';
import EmailShare from '../components/Button/EmailShare';
import './Adventure.less';

@requiresLogin
@injectIntl
@connect(state => ({
  authenticatedUserName: getAuthenticatedUserName(state),
}))
export default class Invite extends React.Component {
  static propTypes = {
    intl: PropTypes.shape().isRequired,
    authenticatedUserName: PropTypes.string,
  };

  static defaultProps = {
    authenticatedUserName: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      copied: false,
      inviteURL: '',
	  imgageURL: '',
	  title: '',
	  body: '',
	  topics: '',
    };

    this.handleCopyClick = this.handleCopyClick.bind(this);
  }

  componentDidMount() {
    this.createInviteURL();
  }

 createInviteURL() {
    const { authenticatedUserName } = this.props;
    if (typeof window !== 'undefined') {
      const inviteURL = `${window.location.protocol}//${
        window.location.host
      }/i/@${authenticatedUserName}`;
      this.setState({ inviteURL });
    }
  }

  handleCopyClick() {
    this.setState({ copied: true });
  }

  render() {
    const { intl } = this.props;
    return (
      <div className="shifted">
        <Helmet>
          <title>{intl.formatMessage({ id: 'adventure', defaultMessage: 'Start Your Adventure' })} - SteemKitties</title>
        </Helmet>
        <div className="settings-layout container">
          <Affix className="leftContainer" stickPosition={77}>
            <div className="left">
              <LeftSidebar />
            </div>
          </Affix>
          <div className="center">
            <div className="Adventure">
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}