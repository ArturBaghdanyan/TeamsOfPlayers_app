import { FC } from "react";


interface ITeamOfPlayers {
  teamName: string;
  setTeamName: (value: string) => void;
  playerFirstName: string;
  setPlayerFirstName: (value: string) => void;
  playerLastName: string;
  setPlayerLastName: (value: string) => void;
  handleAddTeam: () => void;
}

export const AddTeamOfPlayers: FC<ITeamOfPlayers> = ({
  teamName,
  setTeamName,
  playerFirstName,
  setPlayerFirstName,
  playerLastName,
  setPlayerLastName,
  handleAddTeam
}) => {
  return (
    <div className='form'>
      <input
        type="text"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        placeholder="Team Name"
      />
      <input
        type="text"
        value={playerFirstName}
        onChange={(e) => setPlayerFirstName(e.target.value)}
        placeholder="Player First Name"
      />
      <input
        type="text"
        value={playerLastName}
        onChange={(e) => setPlayerLastName(e.target.value)}
        placeholder="Player Last Name"
      />
      <button onClick={handleAddTeam}>Add Team</button>
    </div>
  );
};
