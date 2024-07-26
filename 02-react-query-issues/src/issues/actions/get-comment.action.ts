import { githubApi } from '../../api/github.api';
import { sleep } from '../../helpers/sleep';
import { GithubIssues } from '../interfaces';

export const getIssueComment = async (
  issueNumber: number
): Promise<GithubIssues[]> => {
  await sleep(1000);
  const { data } = await githubApi.get<GithubIssues[]>(
    `/issues/${issueNumber}/comments`
  );
  return data;
};
