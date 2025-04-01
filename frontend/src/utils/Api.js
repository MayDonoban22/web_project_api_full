import { getToken } from "./token";

export default class Api {
    constructor(baseUrl, headers) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    _handleResponse(response) {
        console.log(response)
        return response.ok
            ? response.json().then((data) => data.data || data) // Extrae data si existe
            : Promise.reject("Error en la solicitud");
    }
    getUsers() {
        return fetch(`${this.baseUrl}users/me`, {
            method: "GET",
            headers: {
                ...this.headers,
                authorization: getToken(),
            },
        }).then(this._handleResponse);
    }
    getCards() {
        return fetch(`${this.baseUrl}cards`, {
            method: "GET",
            headers: {
                ...this.headers,
                authorization: getToken(),
            },
        }).then(this._handleResponse);
    }
    editUser(name, about) {
        return fetch(`${this.baseUrl}users/me`, {
            method: "PATCH",
            headers: {
                ...this.headers,
                authorization: getToken(),
            },
            body: JSON.stringify({
                name,
                about,
            }),
        }).then(this._handleResponse);
    }
    createCard(card) {
        return fetch(`${this.baseUrl}cards`, {
            method: "POST",
            headers: {
                ...this.headers,
                authorization: getToken(),
            },
            body: JSON.stringify({
                name: card.name,
                link: card.link,
            }),
        }).then(this._handleResponse);
    }

    changeLikeCardStatus(cardId, isLiked) {
        const method = isLiked ? "DELETE" : "PUT";
        return fetch(`${this.baseUrl}cards/${cardId}/likes`, {
            method: method,
            headers: {
                ...this.headers,
                authorization: getToken(),
            },
        })
            .then(this._handleResponse);
    }

    deleteCard(cardId) {
        return fetch(`${this.baseUrl}cards/${cardId}`, {
            method: "DELETE",
            headers: {
                ...this.headers,
                authorization: getToken(),
            },
        }).then(this._handleResponse);
    }
    editAvatar(data) {
        return fetch(`${this.baseUrl}users/me/avatar`, {
            method: "PATCH",
            headers: {
                ...this.headers,
                authorization: getToken(),
            },
            body: JSON.stringify({
                avatar: data.avatar,
            }),
        }).then(this._handleResponse);
    }
}
export const api = new Api("http://localhost:3000/", {
    "Content-Type": "application/json",
});


