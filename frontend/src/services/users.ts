import api from './api';

export async function getUsers() {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (err) {
        return err;
    }
}

export async function getProfessors() {
    try {
        const response = await api.get('/users/all/professors');
        return response.data;
    } catch (err) {
        return err;
    }
}

export async function getUserById(id: string) {
    try {
        const response = await api.get(`/users/${id}`);

        return response.data;
    } catch (err) {
        return err;
    }
}

interface CollegeData {
    id: number,
    name: string,
    initials: string,
    uf: string,
    createdAt: string,
    updatedAt: string
}

export interface UpdatedData {
    email?: string;
    password?: string; // pode não ser citado
    college?: CollegeData;
    name?: string;

}
export interface UpdatedDataResponse {
    id: string;
    name: string;
    college: CollegeData;
    role: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}
export async function updateUserById(id: string, updatedData: UpdatedData) {
    try {
        const response = await api.patch(`/users/${id}`, updatedData); //testar 'put' se não pegar patch
        return response.data; // retorna usuario atualizado sem password
    } catch (err) {
        return err;
    }

}
export async function getUsersList() {
    try {
        const response = await api.get('/users/list'); // pega user apenas id e nomes
        return response.data;
    } catch (err) {
        return err;
    }
}

