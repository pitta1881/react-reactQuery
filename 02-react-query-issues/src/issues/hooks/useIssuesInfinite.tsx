import { useInfiniteQuery } from '@tanstack/react-query';
import { getIssues } from '../actions';
import { State } from '../interfaces';

interface Props {
  state: State;
  selectedLabels: string[];
}

export const useIssuesInfinite = ({ state, selectedLabels }: Props) => {
  const issuesQuery = useInfiniteQuery({
    queryKey: ['issues', 'infinite', { state, selectedLabels }],
    queryFn: ({ pageParam }) => getIssues(state, selectedLabels, pageParam),
    staleTime: 1000 * 60,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      return lastPage.length > 0 ? pages.length + 1 : undefined;
    },
  });

  return {
    issuesQuery,
  };
};
