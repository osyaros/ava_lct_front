import axios from "axios"
import baseUrl from "../../config"

export default class SendServer{

    //* Функция для получения всех шаблонов
    static async getAllTemplates() {
        const token = localStorage.getItem('jwt_authorization');
        return await axios.get(baseUrl + '/general/report', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
                .then(response => response.data)
                .catch(error => console.error(error));
    } 

    //* Функция для получения всех отчетов
    static async getAllReports() {
        const token = localStorage.getItem('jwt_authorization');
        return await axios.get(baseUrl + '/general/doc', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
                .then(response => response.data)
                .catch(error => console.error(error));
    }

    //* Функция для получения юзера
    static async getUser() {
        const token = localStorage.getItem('jwt_authorization');
        return await axios.get(baseUrl + '/users/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
                .then(response => response.data)
                .catch(error => console.error(error));
    }

    //* Функция изменения юзера
    static async updateUser(first_name, last_name, login, password){
        const token = localStorage.getItem('jwt_authorization');
        return await axios.patch(baseUrl + '/users/me', {
            'first_name': first_name,
            'last_name': last_name,
            'login': login,
            'password': password,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/json'
            }
        })
                .then(response => response.data)
                .catch(error => console.error(error))
    }
}

