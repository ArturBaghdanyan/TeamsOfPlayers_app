import { useState } from 'react';
import {
  useAddTeamMutation,
  useFetchTeamsQuery,
  useRemoveTeamIdMutation,
} from '../../services/userApi';

import { UpdateTeamPlayer } from '../update-team/updateTeam';
import { AddTeamOfPlayers } from '../add-team/addTeam';

import style from './style.module.scss';

const Teams = () => {
  const { data: teams = [], isLoading, error } = useFetchTeamsQuery();
  const [addTeam] = useAddTeamMutation();
  const [removeItem] = useRemoveTeamIdMutation();
  const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
  const [playerFirstName, setPlayerFirstName] = useState('');
  const [playerLastName, setPlayerLastName] = useState('');
  const [teamName, setTeamName] = useState('');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading teams</div>;

  const handleAddTeam = async () => {
    await addTeam({
      id: Date.now().toString(),
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
    setTeamName('');
    setPlayerFirstName('');
    setPlayerLastName('');
  };

  const handleRemoveTeamId = async (id: string) => {
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
        handleAddTeam={handleAddTeam}
      />
      <div className={style.container_column}>
        <div className={style.container_column_list}>
          {teams.map((team) => (
            <div key={team.id} className={style.container_column_list_item}>
              <span>{team.id}</span>
              <span>{team.name}</span>
              <div className={style.container_column_list_item_text}>
                {team.players.map((p) => (
                  <p
                    key={p.id}
                    style={{ margin: 0 }}
                  >{`Player: ${p.firstName} ${p.lastName}`}</p>
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
