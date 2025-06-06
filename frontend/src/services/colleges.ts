import api from './api';


interface CollegeData {
    id: number,
    name: string,
    initials: string,
    uf: string,
    createdAt: string,
    updatedAt: string
}
export async function getColleges() {
    try {
        const response = await api.get('/colleges');
        const sortedData = response.data.sort((a: CollegeData, b: CollegeData) => {
            return a.name.localeCompare(b.name);
        });
        return sortedData;
    } catch (err) {
        return err;
    }
}

export async function getCollegeById(id: string) {
    try {
        const response = await api.get(`/college/${Number(id)}`);

        return response.data;
    } catch (err) {
        return err;
    }
}