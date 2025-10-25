export interface Player {
  id: number;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export interface Team {
  id: number;
  name: string;
  createdAt: string;
  players: Player[];
}

export interface TeamData {
  teams: Team[];
}
