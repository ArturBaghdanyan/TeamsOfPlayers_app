import { useState } from 'react';
import {
  useAddTeamMutation,
  useFetchTeamsQuery,
  useRemoveTeamIdMutation,
} from '../../services/userApi';

import { UpdateTeamPlayer } from '../update-team/updateTeam';
import { AddTeamOfPlayers } from '../add-team/addTeam';

import style from './style.module.scss';
import { Team } from '../../types/Iteam';

const Teams = () => {
  const { data: teams = [], isLoading, error } = useFetchTeamsQuery();
  const [removeItem] = useRemoveTeamIdMutation();

  const [editingTeamId, setEditingTeamId] = useState<number | null>(null);
  const [playerFirstName, setPlayerFirstName] = useState('');
  const [playerLastName, setPlayerLastName] = useState('');
  const [teamName, setTeamName] = useState('');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading teams</div>;

  const handleRemoveTeamId = async (id: number) => {
    await removeItem(id);
  };

  return (
    <div className={style.container}>
      <AddTeamOfPlayers
        teamName={teamName}
        setTeamName={setTeamName}
        playerFirstName={playerFirstName}
        setPlayerFirstName={setPlayerFirstName}
        playerLastName={playerLastName}
        setPlayerLastName={setPlayerLastName}
      />
      <div className={style.container_column}>
        <div className={style.container_column_list}>
          {teams.map((team: Team) => (
            <div key={team.id} className={style.container_column_list_item}>
              <h2>{team.name}</h2>
              <div className={style.container_column_list_item_text}>
                {team.players.map((p) => (
                  <p
                    key={p.id}
                    className={style.container_column_list_item_text}
                  >{`Player ${p.id}: ${p.firstName} ${p.lastName}`}</p>
                ))}
              </div>
              <div className={style.container_column_list_buttons}>
                <button onClick={() => setEditingTeamId(team.id)}>
                  Edit Player
                </button>
                <button onClick={() => handleRemoveTeamId(team.id)}>
                  Remove Player
                </button>
              </div>

              {editingTeamId === team.id && (
                <UpdateTeamPlayer
                  team={team}
                  setTeam={(updatedTeam) => {
                    console.log('Updated team', updatedTeam);
                  }}
                  onCancel={() => setEditingTeamId(null)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Teams;
