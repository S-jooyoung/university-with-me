import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

// ** Types Imports
import { CompetitionData, GetCompetitionResponse } from "src/@core/layouts/types";

const usePost = (keyword: string): GetCompetitionResponse => {
  const [datas, setDatas] = useState<CompetitionData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);
    const getPosts = async () => {
      try {
        const response: AxiosResponse<any> = await axios.get<GetCompetitionResponse>(
          "http://ec2-54-180-120-176.ap-northeast-2.compute.amazonaws.com:8080/api/department/v2",
          {
            params: { keyword },
          }
        );
        setDatas(response.data);
        setLoading(false);
      } catch (e: any) {
        setError(e);
        setLoading(false);
      }
    };
    getPosts();
  }, [keyword]);

  return { datas, loading, error };
};

export default usePost;
