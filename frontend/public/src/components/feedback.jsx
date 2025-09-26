import React, { useState } from 'react';
import './feedback.css';

const FeedBack = () => {
    const [text, setText] = useState('');

    // Лимиты символов для каждой строки
    const lineLimits = {
        1: 41,  // Первая строка: 10 символов
        2: 44,
        default: 47
    };

    const handleTextChange = (e) => {
        const inputText = e.target.value;
        const lines = inputText.split('\n');

        let processedLines = [];
        let currentLineIndex = 1;

        const processText = (textToProcess) => {
            let currentLine = '';
            const words = textToProcess.split(' ');

            words.forEach((word) => {
                const limit = lineLimits[currentLineIndex] || lineLimits.default;

                // Если слово само по себе длиннее лимита
                if (word.length > limit) {
                    if (currentLine) {
                        processedLines.push(currentLine);
                        currentLineIndex++;
                        currentLine = '';
                    }
                    // Разбиваем длинное слово на части
                    while (word.length > 0) {
                        const chunk = word.substring(0, limit);
                        processedLines.push(chunk);
                        currentLineIndex++;
                        word = word.substring(limit);
                    }
                } else {
                    const potentialLine = currentLine ? currentLine + ' ' + word : word;

                    if (potentialLine.length <= limit) {
                        currentLine = potentialLine;
                    } else {
                        if (currentLine) {
                            processedLines.push(currentLine);
                            currentLineIndex++;
                        }
                        currentLine = word;
                    }
                }
            });

            if (currentLine) {
                processedLines.push(currentLine);
                currentLineIndex++;
            }
        };

        // Обрабатываем каждую строку
        lines.forEach((line, index) => {
            if (index > 0 && processedLines.length > 0) {
                currentLineIndex = processedLines.length + 1;
            }
            processText(line);
        });

        const maxLines = 7;
        if (processedLines.length > maxLines) {
            processedLines = processedLines.slice(0, maxLines);
        }

        setText(processedLines.join('\n'));
    };


    return (
        <div className={"feedback-background"}>
            <div className={"feedback-second-background"}>
                <div className={"feedback-title"}>
                    Ваши предложения и пожелания
                </div>
                <form className={"input-container"}>
                    <div className={"info-input"}>
                        <input className={"input name"}
                        placeholder="Имя" type={"text"}/>
                        <input className={"input second-name"}
                        placeholder="Фамилия " type={"text"}/>
                        <input className={"input email"}
                        placeholder="email" type={"email"}/>
                        <input className={"input job"}
                        placeholder="Должность"  type={"text"}/>
                    </div>
                    <textarea
                        className={"feedback-textarea"}
                        value={text}
                        onChange={handleTextChange}
                        placeholder="Введите текст... "
                        rows={4}
                    />
                </form>
            </div>
        </div>
    );
};

export default FeedBack;