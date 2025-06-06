import api from './api';

export async function getEvents() {
    try {
        const response = await api.get('/events');
        console.log(response)
        return response.data;
    } catch (err) {
        return err;
    }
}

export async function getEventById(id: string) {
    try {
        const response = await api.get(`/events/${id}`);

        return response.data;
    } catch (err) {
        return err;
    }
}


interface EventUpdataData {
    usersIds: string;

}

export async function RegisterEventById(id: string, updatedData: EventUpdataData) {
    try {
        const response = await api.patch(`/event/add/${id}`, updatedData); //testar 'put' se não pegar patch
        return response.data; 
    } catch (err) {
        return err;
    }
}
