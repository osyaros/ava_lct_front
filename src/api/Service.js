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
}

