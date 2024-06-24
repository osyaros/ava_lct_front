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
                .catch(error => console.log(error));
    } 

    static async getAllReports() {
        const token = localStorage.getItem('jwt_authorization');
        return await axios.get(baseUrl + '/general/doc', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
                .then(response => response.data)
                .catch(error => console.log(error));
    }
}

