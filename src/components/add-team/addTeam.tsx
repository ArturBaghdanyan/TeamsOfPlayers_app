import { FC } from 'react';
import { useAddTeamMutation, useFetchTeamsQuery } from '../../services/userApi';

interface ITeamOfPlayers {
  teamName: string;
  setTeamName: (value: string) => void;
  playerFirstName: string;
  setPlayerFirstName: (value: string) => void;
  playerLastName: string;
  setPlayerLastName: (value: string) => void;
}

export const AddTeamOfPlayers: FC<ITeamOfPlayers> = ({
  teamName,
  setTeamName,
  playerFirstName,
  setPlayerFirstName,
  playerLastName,
  setPlayerLastName,
}) => {
  const { refetch } = useFetchTeamsQuery();
  const [addTeam] = useAddTeamMutation();

  const handleAddTeam = async () => {

    await addTeam({
      name: teamName,
      createdAt: new Date().toISOString(),
      players: [
        {
          id: Date.now(),
          firstName: playerFirstName,
          lastName: playerLastName,
          createdAt: new Date().toISOString(),
        },
      ],
    });
    refetch();
    setTeamName('');
    setPlayerFirstName('');
    setPlayerLastName('');
  };
  return (
    <div className="form">
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
