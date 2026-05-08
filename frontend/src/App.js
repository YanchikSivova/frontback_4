import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import UserForm from './components/UserForm'
import UserTable from './components/UserTable';
import Message from './components/Message';
import { getUsers, createUser, updateUser, deleteUser } from './services/api';

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });

    const loadUsers = useCallback(async () => {
    try {
        setLoading(true);
        const data = await getUsers();
        setUsers(data);
    } catch (error) {
        showMessage('Ошибка загрузки: ' + error.message, 'error');
    } finally {
        setLoading(false);
    }
}, []); // пустые зависимости, т.к. getUsers и showMessage стабильны

useEffect(() => {
    loadUsers();
}, [loadUsers]);

    const showMessage = (text, type) => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    };

    const handleCreateUser = async (userData) => {
        try {
            const newUser = await createUser(userData);
            setUsers([...users, newUser]);
            showMessage(`Пользователь ${newUser.first_name} ${newUser.last_name} добавлен!`, 'success');
        } catch (error) {
            showMessage('Ошибка добавления: ' + error.message, 'error');
        }
    };

    const handleUpdateUser = async (id, userData) => {
        try {
            const updatedUser = await updateUser(id, userData);
            setUsers(users.map(u => u.users_id === id ? updatedUser : u));
            setEditingUser(null);
            showMessage(`Пользователь ${updatedUser.first_name} ${updatedUser.last_name} обновлен!`, 'success');
        } catch (error) {
            showMessage('Ошибка обновления: ' + error.message, 'error');
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Вы уверены, что хотите удалить этого пользователя?')) return;
        
        try {
            await deleteUser(id);
            setUsers(users.filter(u => u.users_id !== id));
            showMessage('Пользователь удален!', 'success');
        } catch (error) {
            showMessage('Ошибка удаления: ' + error.message, 'error');
        }
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancelEdit = () => {
        setEditingUser(null);
    };

    return (
        <div className="container">
            <div className="header">
                <h1>📋 Управление пользователями</h1>
                <p>CRUD операции с базой данных PostgreSQL</p>
            </div>

            <div className="content">
                {message.text && <Message text={message.text} type={message.type} />}
                
                <UserForm
                    editingUser={editingUser}
                    onCreate={handleCreateUser}
                    onUpdate={handleUpdateUser}
                    onCancel={handleCancelEdit}
                />

                <div className="users-list">
                    <h2>👥 Список пользователей</h2>
                    {loading ? (
                        <div className="loading">Загрузка...</div>
                    ) : (
                        <UserTable
                            users={users}
                            onEdit={handleEditUser}
                            onDelete={handleDeleteUser}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;