import { useQuery } from '@tanstack/react-query';
import { getIssueComment, getIssue } from '../actions';

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ['issues', issueNumber],
    queryFn: () => getIssue(issueNumber),
    staleTime: 1000 * 60,
  });

  // const commentsQuery = useQuery({
  //   queryKey: ['issues', issueNumber, 'comments'],
  //   queryFn: () => getIssueComment(issueNumber),
  //   staleTime: 1000 * 60,
  // });
  const commentsQuery = useQuery({
    queryKey: ['issues', issueQuery.data?.number, 'comments'],
    queryFn: () => getIssueComment(issueQuery.data!.number),
    staleTime: 1000 * 60,
    enabled: !!issueQuery.data,
  });

  return {
    issueQuery,
    commentsQuery,
  };
};
