import axios from '@/utils/axios';
import { message } from 'antd';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import errorHandler from '@/utils/errorHandler';
import { useRouter } from 'next/navigation';

/**
 * @description Axio call to create or post data to api
 * @param formData
 * @returns
 * @todo add types
 */
const postFormData = async (url: string, formData: any) => {
  try {
    const { data } = await axios.post(url, formData);
    return data;
  } catch (error: any) {
    return { error: error.response.data, success: false };
  }
};

/**
 * @description react-query hook to update a Certificate
 */
export default (options: {
  url: string;
  key: string;
  queriesToInvalidate?: string[];
  successMessage?: string;
  redirectUrl?: string;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation((data: any) => postFormData(options.url, data), {
    onSuccess: (data: any) => {
      message.success(options.successMessage || 'Data posted successfully');

      options.queriesToInvalidate?.forEach((query: string) => {
        queryClient.invalidateQueries([query]);
      });

      if (options.redirectUrl) {
        router.push(options.redirectUrl);
      }
      return data;
    },
    onError: (error: Error) => {
      errorHandler(error);
    },
  });
};
