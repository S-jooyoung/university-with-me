import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

// ** Types Imports
import { CompetitionData, GetCompetitionResponse } from "src/@core/layouts/types";

const usePost = (keyword: string, target: string, sort: string): GetCompetitionResponse => {
  const [datas, setDatas] = useState<CompetitionData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);
    const getPosts = async () => {
      try {
        const response: AxiosResponse<any> = await axios.get<GetCompetitionResponse>(`${process.env.NEXT_PUBLIC_API_URL}/${target}/v4`, {
          params: { keyword, sort },
        });
        setDatas(response.data);
        setLoading(false);
      } catch (e: any) {
        setError(e);
        setLoading(false);
      }
    };
    getPosts();
  }, [keyword, sort]);

  return { datas, loading, error };
};

export default usePost;
