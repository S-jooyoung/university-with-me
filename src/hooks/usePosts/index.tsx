import axios, { AxiosResponse } from "axios";
import { useInfiniteQuery } from "react-query";

const usePost = (keyword: string, target: string, sort: string) => {
  const getPosts = async ({ pageParam = 0 }) => {
    const response: AxiosResponse<any> = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${target}/v4`, {
      params: { keyword, sort, size: 30, page: pageParam },
    });

    let isLast: boolean;
    response.data.length > 1 ? (isLast = false) : (isLast = true);

    return {
      result: response.data,
      nextPage: pageParam + 1,
      isLast,
    };
  };

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery("[universityList]", ({ pageParam = 1 }) => getPosts(pageParam), {
    getNextPageParam: (lastPage) => {
      if (lastPage && !lastPage.isLast) return lastPage.nextPage;
      return undefined;
    },
  });

  return { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status };
};

export default usePost;
