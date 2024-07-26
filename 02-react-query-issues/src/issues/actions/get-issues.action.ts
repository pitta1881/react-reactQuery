import { githubApi } from '../../api/github.api';
import { sleep } from '../../helpers/sleep';
import { GithubIssues, State } from '../interfaces';

export const getIssues = async (
  state: State,
  selectedLabels: string[]
): Promise<GithubIssues[]> => {
  await sleep(1000);
  const params = new URLSearchParams();
  if (state !== State.All) {
    params.append('state', state);
  }

  if (selectedLabels.length > 0) {
    params.append('labels', selectedLabels.join(','));
  }

  const { data } = await githubApi.get<GithubIssues[]>('/issues', {
    params,
  });
  return data;
};
