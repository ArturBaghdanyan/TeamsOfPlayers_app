import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Team, TeamData } from '../types/Iteam';

export const userApi = createApi({
  reducerPath: 'teamsPlayers',
  tagTypes: ['Teams'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004/' }),
  endpoints: (builder) => ({
    fetchTeams: builder.query<TeamData['teams'], void>({
      query: () => 'teams',
      providesTags: ['Teams'],
    }),
    addTeam: builder.mutation<Team, Partial<Team>>({
      query: (team) => ({
        url: 'teams',
        method: 'POST',
        body: team,
      }),
    }),
    updateTeamById: builder.mutation<Team, Team>({
      query: (team) => ({
        url: `teams/${team.id}`,
        method: 'PUT',
        body: team,
      }),
      invalidatesTags: ['Teams'],
    }),
    removeTeamId: builder.mutation<void, string>({
      query: (id) => ({
        url: `teams/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Teams'],
    }),
  }),
});