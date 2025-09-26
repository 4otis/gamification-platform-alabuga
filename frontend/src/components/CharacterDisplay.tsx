import React from 'react';
import styled, { keyframes } from 'styled-components';
import { getCharacterImagePaths, CharacterParts } from '../utils/characterGenerator';

// Импорты спрайтов
const monsterImage = '/src/sprite/монстр.png';

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-200%);
    opacity: 0;
  }
  to {
    transform: translateX(-37%);
    opacity: 1;
  }
`;

const slideOutToRight = keyframes`
  from {
    transform: translateX(-50%);
    opacity: 1;
  }
  to {
    transform: translateX(200%);
    opacity: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const CharacterContainer = styled.div<{
  isVisible: boolean;
  isLeaving: boolean;
  isRevealed: boolean;
  position: 'left' | 'center' | 'right';
  hasEntered: boolean;
}>`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1200px;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  cursor: pointer;
  transition: all 0.5s ease;
  z-index: 5;
  
      animation: ${props => {
        if (props.isLeaving) return slideOutToRight;
        if (props.isVisible && !props.hasEntered) return slideInFromLeft;
        return 'none';
      }} 1.5s cubic-bezier(0.4, 0.0, 0.2, 1);
  
  &:hover {
    transform: translateX(-50%);
  }
  
  @media (max-width: 768px) {
    width: 1000px;
    height: 100vh;
  }
  
  @media (max-width: 480px) {
    width: 800px;
    height: 100vh;
  }
`;

const CharacterSprite = styled.div<{ 
  characterParts: CharacterParts; 
  isRevealed: boolean;
  imagePaths: any;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 100vh;
  background-image: url(${props => props.isRevealed ? monsterImage : props.imagePaths.body});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom center;
  transition: all 0.5s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.imagePaths.mouth || ''});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom center;
    z-index: 1;
    opacity: ${props => props.isRevealed ? 0 : (props.imagePaths.mouth ? 1 : 0)};
    transition: opacity 0.3s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${props => props.imagePaths.nose || ''});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: bottom center;
    z-index: 2;
    opacity: ${props => props.isRevealed ? 0 : (props.imagePaths.nose ? 1 : 0)};
    transition: opacity 0.3s ease;
  }
`;

const EyesLayer = styled.div<{ imagePaths: any; isRevealed: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imagePaths.eyes || ''});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom center;
  z-index: 3;
  opacity: ${props => props.isRevealed ? 0 : (props.imagePaths.eyes ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const EyebrowsLayer = styled.div<{ imagePaths: any; isRevealed: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imagePaths.eyebrows || ''});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom center;
  z-index: 4;
  opacity: ${props => props.isRevealed ? 0 : (props.imagePaths.eyebrows ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const HairLayer = styled.div<{ imagePaths: any; isRevealed: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imagePaths.hair || ''});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom center;
  z-index: 5;
  opacity: ${props => props.isRevealed ? 0 : (props.imagePaths.hair ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const RevealEffect = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 800px;
  background: radial-gradient(circle, rgba(255,0,0,0.3) 0%, transparent 70%);
  border-radius: 50%;
  animation: ${props => props.isVisible ? fadeIn : 'none'} 0.5s ease-in-out;
  z-index: 6;
  pointer-events: none;
  
  @media (max-width: 768px) {
    width: 600px;
    height: 600px;
  }
  
  @media (max-width: 480px) {
    width: 400px;
    height: 400px;
  }
`;

interface CharacterDisplayProps {
  characterParts: CharacterParts;
  isVisible: boolean;
  isLeaving: boolean;
  isRevealed: boolean;
  position: 'left' | 'center' | 'right';
  onClick?: () => void;
  hasEntered?: boolean;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({
  characterParts,
  isVisible,
  isLeaving,
  isRevealed,
  position,
  onClick,
  hasEntered = false
}) => {
  const imagePaths = getCharacterImagePaths(characterParts);

  return (
    <CharacterContainer
      isVisible={isVisible}
      isLeaving={isLeaving}
      isRevealed={isRevealed}
      position={position}
      hasEntered={hasEntered}
      onClick={onClick || undefined}
    >
      <CharacterSprite
        characterParts={characterParts}
        isRevealed={isRevealed}
        imagePaths={imagePaths}
      >
        <EyesLayer imagePaths={imagePaths} isRevealed={isRevealed} />
        <EyebrowsLayer imagePaths={imagePaths} isRevealed={isRevealed} />
        <HairLayer imagePaths={imagePaths} isRevealed={isRevealed} />
      </CharacterSprite>
      
      {isRevealed && <RevealEffect isVisible={isRevealed} />}
    </CharacterContainer>
  );
};

export default CharacterDisplay;
