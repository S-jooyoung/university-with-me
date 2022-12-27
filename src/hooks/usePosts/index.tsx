import axios, { AxiosResponse } from "axios";
import { useInfiniteQuery } from "react-query";

const usePost = (queryKey: string, keyword: string, target: string, sort: string, degree: string, area: string) => {
  const getPosts = async (pageParam: number) => {
    const response: AxiosResponse<any> = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${target}`, {
      headers: { "Content-Type": "application/json" },
      params: { keyword, size: 30 },
    });

    let isLast: boolean;

    response.data.list.length > 1 ? (isLast = false) : (isLast = true);

    return {
      result: response.data,
      pageParam: pageParam + 1,
      isLast,
    };
  };

  const { data, fetchNextPage, isFetchingNextPage, status, error, refetch } = useInfiniteQuery(queryKey, ({ pageParam = 0 }) => getPosts(pageParam), {
    getNextPageParam: (lastPage) => {
      if (lastPage && !lastPage.isLast) {
        return Number(lastPage.pageParam);
      }
      return undefined;
    },
  });

  return { data, fetchNextPage, isFetchingNextPage, status, error, refetch };
};

export default usePost;
