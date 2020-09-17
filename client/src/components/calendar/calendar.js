import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { Row, Col, Container, Jumbotron, Button } from 'reactstrap';
import './calendar.css';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import UserNavbar from '../dashboard/UserNavbar';
import { getCsrfToken } from '../../actions/authActions';
import { createMeeting } from '../../actions/appointmentActions';

class Calendar extends React.Component {
  state = {
    weekendsVisible: true,
    email: this.props.auth.user.email,
    currentEvents: [],
    //change to therapist information
    therapist: this.props.auth.user.email,
  };

  //   componentDidMount() {
  //   this.setState({ currentEvents: this.props.auth.events });
  // }

  onSubmit = (e) => {
    const { csrfToken } = this.props.auth;
    e.preventDefault();
    console.log('Submit Function Works');
    const appointment = {
      eventlist: this.state.currentEvents,
      email: this.state.email,
      _csrf: csrfToken,
      time: this.state.uPersonalRating,
      uGender: this.state.uGender,
    };

    this.props.createMeeting(appointment, this.props.history);
  };

  render() {
    return (
      <Container>
        <UserNavbar />
        <div className='demo-app'>
          {this.renderSidebar()}
          <div className='demo-app-main'>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay',
              }}
              initialView='dayGridMonth'
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              weekends={this.state.weekendsVisible}
              initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
              select={this.handleDateSelect}
              eventContent={renderEventContent} // custom render function
              eventClick={this.handleEventClick}
              eventsSet={this.handleEvents}
              eventAdd={this.onSubmit}
              // called after events are initialized/added/changed/removed
              /* you can update a remote database when these fire:
                    eventAdd={function(){}}
                    eventChange={function(){}}
                    eventRemove={function(){}}
                    */
            />
          </div>
        </div>
      </Container>
    );
  }

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <Row>
          <div className='demo-app-sidebar-section'>
            <label>
              <input
                type='checkbox'
                checked={this.state.weekendsVisible}
                onChange={this.handleWeekendsToggle}
              ></input>
              toggle weekends
            </label>
          </div>
          <div className='demo-app-sidebar-section'>
            <h2>All Events ({this.state.currentEvents.length})</h2>
            <ul>{this.state.currentEvents.map(renderSidebarEvent)}</ul>
          </div>
          <div className='demo-app-sidebar-section'>
            <h2>Instructions</h2>
            <ul>
              <li>
                Select dates and you will be prompted to create a new event
              </li>
              <li>Drag, drop, and resize events</li>
              <li>Click an event to delete it</li>
            </ul>
          </div>
        </Row>
      </div>
    );
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible,
    });
  };

  handleDateSelect = (selectInfo) => {
    let title = prompt('Confirm ');
    this.onSubmit();
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title: this.state.therapist,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  handleEventClick = (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  handleEvents = (events) => {
    this.setState({
      currentEvents: events,
    });
  };
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}

Calendar.propTypes = {
  getCsrfToken: PropTypes.func.isRequired,
  createMeeting: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  createMeeting: state.createMeeting,
});

export default connect(mapStateToProps, {
  createMeeting,
  getCsrfToken,
  logoutUser,
})(withRouter(Calendar));
