import { createGlobalStyle } from 'styled-components'
import { Theme } from './theme'

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: ${({ theme }) => theme.fonts.secondary};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Космический фон */
  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%),
      linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
    z-index: -1;
    animation: spaceFloat 20s ease-in-out infinite;
  }

  @keyframes spaceFloat {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(1deg); }
  }

  /* Звезды */
  body::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(2px 2px at 20px 30px, #eee, transparent),
      radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
      radial-gradient(1px 1px at 90px 40px, #fff, transparent),
      radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
      radial-gradient(2px 2px at 160px 30px, #ddd, transparent);
    background-repeat: repeat;
    background-size: 200px 100px;
    z-index: -1;
    animation: twinkle 3s ease-in-out infinite alternate;
  }

  @keyframes twinkle {
    0% { opacity: 0.3; }
    100% { opacity: 1; }
  }

  /* Скроллбар */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.primary};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.highlight};
  }

  /* Выделение текста */
  ::selection {
    background: ${({ theme }) => theme.colors.highlight};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  /* Фокус */
  *:focus {
    outline: 2px solid ${({ theme }) => theme.colors.highlight};
    outline-offset: 2px;
  }

  /* Кнопки */
  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  /* Ссылки */
  a {
    color: inherit;
    text-decoration: none;
  }

  /* Списки */
  ul, ol {
    list-style: none;
  }

  /* Изображения */
  img {
    max-width: 100%;
    height: auto;
  }

  /* Анимации */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }

  @keyframes glow {
    0%, 100% { box-shadow: 0 0 5px ${({ theme }) => theme.colors.highlight}; }
    50% { box-shadow: 0 0 20px ${({ theme }) => theme.colors.highlight}, 0 0 30px ${({ theme }) => theme.colors.highlight}; }
  }

  /* Утилиты */
  .fade-in {
    animation: fadeIn 0.6s ease-out;
  }

  .slide-in {
    animation: slideIn 0.4s ease-out;
  }

  .glow {
    animation: glow 2s ease-in-out infinite;
  }

  /* Адаптивность */
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    html {
      font-size: 14px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    html {
      font-size: 12px;
    }
  }
`
