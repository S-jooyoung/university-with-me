import axios, { AxiosResponse } from "axios";
import { useInfiniteQuery } from "react-query";

const usePost = (queryKey: string, universityKeyword: string, departmentKeyword: string, universityDegree: string, universityArea: string, sort: string, target: string) => {
  const getPosts = async (pageParam: number) => {
    console.log(universityKeyword, departmentKeyword, universityDegree, universityArea, sort);
    const response: AxiosResponse<any> = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}${target}`, {
      headers: { "Content-Type": "application/json" },
      params: { universityKeyword, departmentKeyword, size: 30, sort, universityDegree, universityArea, page: pageParam },
    });

    let isLast: boolean;

    response.data.list.length > 1 ? (isLast = false) : (isLast = true);

    return {
      result: response.data,
      pageParam: pageParam + 1,
      isLast,
    };
  };

  const { data, fetchNextPage, isFetchingNextPage, status, error, refetch, hasNextPage } = useInfiniteQuery(queryKey, ({ pageParam = 0 }) => getPosts(pageParam), {
    getNextPageParam: (lastPage) => {
      if (lastPage && !lastPage.isLast) {
        return Number(lastPage.pageParam);
      }
      return undefined;
    },
  });

  return { data, fetchNextPage, isFetchingNextPage, status, error, refetch, hasNextPage };
};

export default usePost;
