import * as React from 'react';
import PropTypes from 'prop-types';
import AppointmentForm from './AppointmentForm';
import Appointment from './Appointment';

export default class AppointmentEditable extends React.Component {
    static propTypes = {
      id: PropTypes.string.isRequired,
      healthConcern: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      doctor: PropTypes.string.isRequired,
      specialty: PropTypes.string.isRequired,
      onFormSubmit: PropTypes.func.isRequired,
      onRemovePress: PropTypes.func.isRequired,
    };
  
    state = {
      editFormOpen: false,
     newAppointment: [ ]
    };
  
    handleEditPress = () => {
      this.openForm();
    };
  
    handleFormClose = () => {
      this.closeForm();
    };
  
    handleSubmit = newappointer => {
      const { onFormSubmit } = this.props;
  
      onFormSubmit(newappointer);
      this.closeForm();
    };

    closeForm = () => {
      this.setState({ editFormOpen: false });
    };
  
    openForm = () => {
      this.setState({ editFormOpen: true });
    };
  
    render() {
      const {
        id,
        healthConcern,
        gender,
        date, 
        time, 
        doctor, 
        specialty,
        onRemovePress
      } = this.props;

      const { editFormOpen } = this.state;

      if (editFormOpen) {
        return (
          <AppointmentForm
            id={id}
            healthConcern={healthConcern}
            gender={gender}
            date={date}
            time={time} 
            doctor={doctor} 
            specialty={specialty}
            onFormSubmit={this.handleSubmit}
            onFormClose={this.handleFormClose}
          />
        );
      }
  
      return (
        <Appointment
          id={id}
          healthConcern={healthConcern}
          gender={gender}
          date={date}
          time={time} 
          doctor={doctor} 
          specialty={specialty}
          onEditPress={this.handleEditPress}
          onRemovePress={onRemovePress}
        />
      );
    }
  }