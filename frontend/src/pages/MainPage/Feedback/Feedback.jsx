import React, { useState } from 'react';
import './Feedback.css';

const FeedBack = () => {
    const [text, setText] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        secondName: '',
        email: '',
        job: ''
    });
    
    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', { ...formData, message: text });
    };

    return (
        <div className="feedback-background">
            <div className="feedback-second-background">
                <div className="feedback-title">
                    Ваши предложения и пожелания
                </div>
                <form className="input-container" onSubmit={handleSubmit}>
                    <div className="info-input">
                        <input
                            className="input name"
                            name="name"
                            placeholder="Имя"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                        <input
                            className="input second-name"
                            name="secondName"
                            placeholder="Фамилия"
                            type="text"
                            value={formData.secondName}
                            onChange={handleInputChange}
                        />
                        <input
                            className="input email"
                            name="email"
                            placeholder="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <input
                            className="input job"
                            name="job"
                            placeholder="Должность"
                            type="text"
                            value={formData.job}
                            onChange={handleInputChange}
                        />
                    </div>
                    <textarea
                        className="feedback-textarea"
                        value={text}
                        onChange={handleTextChange}
                        placeholder="Введите текст..."
                        rows={8}
                    />
                </form>
                <button type="submit" className="submit-button" onClick={handleSubmit}>
                    Отправить
                </button>
            </div>
        </div>
    );
};

export default FeedBack;