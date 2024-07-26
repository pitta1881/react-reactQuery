import { githubApi } from '../../api/github.api';
import { sleep } from '../../helpers/sleep';
import { GithubIssues } from '../interfaces';

export const getIssue = async (issueNumber: number): Promise<GithubIssues> => {
  await sleep(1000);
  const { data } = await githubApi.get<GithubIssues>(`/issues/${issueNumber}`);
  return data;
};
