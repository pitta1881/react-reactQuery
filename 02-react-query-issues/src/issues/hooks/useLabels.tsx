import { useQuery } from '@tanstack/react-query';
import { getLabels } from '../actions';

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    staleTime: 1000 * 60 * 60, // 1 hour
    // placeholderData: [
    //   {
    //     id: 1205087127,
    //     node_id: 'MDU6TGFiZWwxMjA1MDg3MTI3',
    //     url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Concurrent%20Features',
    //     name: 'Component: Concurrent Features',
    //     color: 'ffccd3',
    //     default: false,
    //   },
    //   {
    //     id: 739777675,
    //     node_id: 'MDU6TGFiZWw3Mzk3Nzc2NzU=',
    //     url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Component%20API',
    //     name: 'Component: Component API',
    //     color: 'd4c5f9',
    //     default: false,
    //   },
    // ],
    // initialData: [
    //   {
    //     id: 1205087127,
    //     node_id: 'MDU6TGFiZWwxMjA1MDg3MTI3',
    //     url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Concurrent%20Features',
    //     name: 'Component: Concurrent Features',
    //     color: 'ffccd3',
    //     default: false,
    //   },
    //   {
    //     id: 739777675,
    //     node_id: 'MDU6TGFiZWw3Mzk3Nzc2NzU=',
    //     url: 'https://api.github.com/repos/facebook/react/labels/Component:%20Component%20API',
    //     name: 'Component: Component API',
    //     color: 'd4c5f9',
    //     default: false,
    //   },
    // ],
  });

  return { labelsQuery };
};
