import { useQuery } from '@tanstack/react-query';
import { getIssues } from '../actions';
import { State } from '../interfaces';
import { useEffect, useState } from 'react';

interface Props {
  state: State;
  selectedLabels: string[];
}

export const useIssues = ({ state, selectedLabels }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const issuesQuery = useQuery({
    queryKey: ['issues', { state, selectedLabels, currentPage }],
    queryFn: () => getIssues(state, selectedLabels, currentPage),
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [state, selectedLabels]);

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage <= 1) return;
    setCurrentPage(currentPage - 1);
  };

  return {
    issuesQuery,
    currentPage,
    nextPage,
    prevPage,
  };
};
