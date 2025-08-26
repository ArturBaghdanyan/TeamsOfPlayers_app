import { userApi } from '../reducer/userSlice';

export const {
  useFetchTeamsQuery,
  useAddTeamMutation,
  useRemoveTeamIdMutation,
  useUpdateTeamByIdMutation,
} = userApi;
