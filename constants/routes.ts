const routes = {
    home: '/',
    admin: '/?admin=true',
    login: '/login',
    register: '/patients/:userId/register',
    newAppointment: '/patients/:userId/new-appointment',
    newAppointmentSuccess: '/patients/:userId/new-appointment/success?appointmentId=:appointmentId',
}

export default routes;