// @flow
import React from 'react';
// $FlowFixMe
import pure from 'recompose/pure';
// $FlowFixMe
import compose from 'recompose/compose';
// $FlowFixMe
import { Link } from 'react-router-dom';
// $FlowFixMe
import { connect } from 'react-redux';
import { openModal } from '../../actions/modals';
import {
  StyledThreadFeedCard,
  CardContent,
  CardLink,
  Title,
  Meta,
  MetaRow,
  Participant,
  Creator,
  ParticipantHeads,
  Location,
} from './style';

const ThreadFeedCardPure = (props: Object): React$Element<any> => {
  const formatLocation = () => {
    switch (props.viewContext) {
      case 'dashboard':
      case 'profile':
        return (
          <Location>
            <Link to={`/${props.data.community.slug}`}>
              {props.data.community.name}
            </Link>
            {' '}/{' '}
            <Link
              to={`/${props.data.community.slug}/${props.data.channel.slug}`}
            >
              {props.data.channel.name}
            </Link>
          </Location>
        );
      case 'community':
        return (
          <Location>
            {`~${props.data.channel.name}`}
          </Location>
        );
      case 'channel':
      default:
        return;
    }
  };

  const openUserProfileModal = (user: Object) => {
    return props.dispatch(openModal('USER_PROFILE_MODAL', { user }));
  };

  const participantList = props.data.participants;

  const messageAvatars = list => {
    return list.map(participant => (
      <Link key={participant.id} to={`/users/${participant.username}`}>
        <Participant src={participant.profilePhoto} role="presentation" />
      </Link>
    ));
  };

  return (
    <StyledThreadFeedCard hoverable>
      <CardLink to={`/thread/${props.data.id}`} />
      <CardContent>
        {formatLocation()}
        <Link to={`/thread/${props.data.id}`}>
          <Title>
            {props.data.content.title}
          </Title>
        </Link>
        <MetaRow>
          <ParticipantHeads>
            <Creator role="presentation">
              <Participant
                onClick={() => openUserProfileModal(props.data.creator)}
                src={props.data.creator.profilePhoto}
              />
            </Creator>
            {messageAvatars(participantList)}
          </ParticipantHeads>
          {/* <Meta>{props.data.messageCount} messages</Meta> */}
        </MetaRow>
      </CardContent>
    </StyledThreadFeedCard>
  );
};

const ThreadFeedCard = compose(pure)(ThreadFeedCardPure);
export default connect()(ThreadFeedCard);