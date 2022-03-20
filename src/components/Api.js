class Api {
    constructor({
        baseUrl,
        headers
    }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getProfile() {
        return fetch(`${this._baseUrl}/users/me`, {
                headers: this._headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
                headers: this._headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    editProfile(name, about) {
        renderLoadingProfile(true)
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name,
                    about
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                renderLoadingProfile(false)
            })
    }

    updateAvatar(avatar) {
        renderLoadingAvatar(true)
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                renderLoadingAvatar(false)
            })
    }

    addCard(name, link) {
        renderLoadingNewCard(true)
        return fetch(`${this._baseUrl}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name,
                    link
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                renderLoadingNewCard(false)
            })
    }

    getLikes() {
        return fetch(`${this._baseUrl}/cards`, {
                headers: this._headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    likeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'PUT',
                headers: this._headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    removeLike(id) {
        return fetch(`${this._baseUrl}/cards/${id}/likes`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .catch((err) => {
                console.log(err)
            })            
    }

    deleteCard(id) {
        renderLoadingDeleteCard(true)
        return fetch(`${this._baseUrl}/cards/${id}`, {
                method: 'DELETE',
                headers: this._headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                renderLoadingDeleteCard(false)
            })
    }

}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
    headers: {
        authorization: '5dd49ee8-1050-4485-8aeb-9854c9f75df1',
        // authorization: '9e805e1a-4ae4-4e34-b6d0-ba7f164bd419',
        'Content-Type': 'application/json'
    }
});

import {
    renderLoadingProfile,
    renderLoadingAvatar,
    renderLoadingNewCard,
    renderLoadingDeleteCard
} from '../utils/constants.js'