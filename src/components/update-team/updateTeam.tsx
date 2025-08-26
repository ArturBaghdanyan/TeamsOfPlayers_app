import { ChangeEvent, useState } from 'react';
import { useUpdateTeamByIdMutation } from '../../services/userApi';
import { Team } from '../../types/Iteam';

import style from './style.module.scss';

interface UpdateTeamProps {
  team: Team;
  setTeam: (team: Team) => void;
  onCancel?: () => void;
}

export const UpdateTeamPlayer = ({
  team,
  setTeam,
  onCancel,
}: UpdateTeamProps) => {
  const [updateItem] = useUpdateTeamByIdMutation();
  const [teamName, setTeamName] = useState(team.name);
  const [players, setPlayers] = useState(team.players);

  const handlePlayerChange = (
    index: number,
    field: 'firstName' | 'lastName',
    value: string
  ) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = { ...updatedPlayers[index], [field]: value };
    setPlayers(updatedPlayers);
  };

  const handleUpdate = async () => {
    const updatedTeam = { ...team, name: teamName, players };
    await updateItem(updatedTeam);
    setTeam(updatedTeam);
    onCancel?.();
  };

  return (
    <div className={style.edit}>
      <div className="form">
          <input
            type="text"
            name={teamName}
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Team Name"
          />

          {players.map((player, idx) => (
            <div key={player.id} className={style.edit_input}>
              <input
                type="text"
                name={player.firstName}
                value={player.firstName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handlePlayerChange(idx, 'firstName', e.target.value)
                }
                placeholder="First Name"
              />
              <input
                type="text"
                name={player.lastName}
                value={player.lastName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handlePlayerChange(idx, 'lastName', e.target.value)
                }
                placeholder="Last Name"
              />
            </div>
          ))}

          <button onClick={handleUpdate}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
    </div>
  );
};
