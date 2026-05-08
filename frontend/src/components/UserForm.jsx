import React, { useState, useEffect } from 'react';
import './UserForm.css';

function UserForm({ editingUser, onCreate, onUpdate, onCancel }) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        age: ''
    });

    useEffect(() => {
        if (editingUser) {
            setFormData({
                first_name: editingUser.first_name,
                last_name: editingUser.last_name,
                age: editingUser.age
            });
        } else {
            setFormData({
                first_name: '',
                last_name: '',
                age: ''
            });
        }
    }, [editingUser]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const userData = {
            first_name: formData.first_name,
            last_name: formData.last_name,
            age: parseInt(formData.age)
        };

        if (editingUser) {
            onUpdate(editingUser.users_id, userData);
        } else {
            onCreate(userData);
        }
        
        setFormData({ first_name: '', last_name: '', age: '' });
    };

    return (
        <div className="form-section">
            <h2>{editingUser ? '✏️ Редактировать пользователя' : '➕ Добавить пользователя'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="first_name">Имя:</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last_name">Фамилия:</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Возраст:</label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                            min="0"
                        />
                    </div>
                </div>
                <button type="submit">
                    {editingUser ? '💾 Сохранить' : '➕ Добавить'}
                </button>
                {editingUser && (
                    <button type="button" onClick={onCancel} className="cancel-btn">
                        ❌ Отмена
                    </button>
                )}
            </form>
        </div>
    );
}

export default UserForm;