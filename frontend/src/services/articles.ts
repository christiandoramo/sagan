import api from './api';

export async function getArticles() {
    try {
        const response = await api.get('/articles');
        return response.data;
    } catch (err) {
        return err;
    }
}

export async function getArticleById(id: string) {
    try {
        const response = await api.get(`/articles/${id}`);

        return response.data;
    } catch (err) {
        return err;
    }
}

export async function createArticleReview({ articleId, usersIds, rating, roles, status }:
    { articleId: string, usersIds: string[], rating: string, roles: string[], status: string }) {
    try {
        const response = await api.patch(`/articles/add-user/${articleId}`, { usersIds, rating, roles, status });
        return response.data;
    } catch (err) {
        return err;
    }
}

export async function createArticleReviewer({ articleId, usersIds, roles, status }:
    { articleId: string, usersIds: string[], roles: string[], status: string }) {
    try {
        const response = await api.patch(`/articles/add-user/${articleId}`, { usersIds, roles, status });
        return response.data;
    } catch (err) {
        return err;
    }
}