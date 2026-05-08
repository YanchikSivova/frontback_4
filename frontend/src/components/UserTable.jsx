import React from 'react';
import './UserTable.css';

function UserTable({ users, onEdit, onDelete }) {
    if (users.length === 0) {
        return <div className="no-users">Нет пользователей</div>;
    }

    return (
        <div className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Возраст</th>
                        <th>Создан</th>
                        <th>Обновлен</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.users_id}>
                            <td>{user.users_id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.age}</td>
                            <td>{new Date(user.created_at).toLocaleString()}</td>
                            <td>{new Date(user.updated_at).toLocaleString()}</td>
                            <td className="actions">
                                <button onClick={() => onEdit(user)} className="edit-btn">
                                    ✏️ Редакт
                                </button>
                                <button onClick={() => onDelete(user.users_id)} className="delete-btn">
                                    🗑️ Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;