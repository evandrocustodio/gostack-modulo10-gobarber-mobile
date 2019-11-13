import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, Title, List} from './styles';
import Background from '../../components/Background';
import Appointment from '../../components/Appointment';
import Api from '../../services/api';

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    async function load() {
      const response = await Api.get('appointments');
      setAppointments(response.data);
    }
    load();
  }, []);

  async function handleCancel(id) {
    const response = await Api.delete(`appointments/${id}`);

    setAppointments(
      appointments.map(appointment =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment,
      ),
    );
  }

  return (
    <Background>
      <Container>
        <Title>Agendamentos</Title>
        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Appointment data={item} onCancel={() => handleCancel(item.id)} />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Agendamentos',
  tabBarIcon: ({tintColor}) => (
    <Icon name="event" size={20} color={tintColor} />
  ),
};
