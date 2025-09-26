export interface Candidate {
  id: string;
  name: string;
  age: number;
  birthPlanet: string;
  birthDate: string;
  position: string;
  previousWorkplace: string;
  responsibilities: string;
  hobbies: string;
  contact: string;
  appearance: 'normal' | 'disguised';
  anomalies: Anomaly[];
  isMimic: boolean;
  characterParts?: {
    body: string;
    mouth: string;
    nose: string;
    eyes: string;
    eyebrows: string;
    hair: string;
  };
}

export interface Anomaly {
  type: 'appearance' | 'name' | 'age' | 'birthDate' | 'position' | 'responsibilities' | 'hobbies' | 'contact';
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface GameState {
  currentCandidate: Candidate | null;
  score: number;
  correctDecisions: number;
  wrongDecisions: number;
  totalCandidates: number;
  gamePhase: 'characterEntering' | 'characterWaiting' | 'tabletOpen' | 'decision' | 'tabletClosing' | 'characterReveal' | 'result' | 'characterLeaving' | 'gameOver';
  revealedMimic: boolean;
  showTablet: boolean;
  characterLeaving: boolean;
  lastDecision: 'hire' | 'reject' | null;
  characterEntered: boolean;
}

export interface GameStats {
  totalScore: number;
  accuracy: number;
  mimicsCaught: number;
  humansHired: number;
  humansRejected: number;
}

