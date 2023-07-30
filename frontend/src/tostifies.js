import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const successTestCreate = () => {
    toast.success(`Тест успешно создан!\nЧтобы изменить его перейдите во вкладку "Мои тесты"`)
}