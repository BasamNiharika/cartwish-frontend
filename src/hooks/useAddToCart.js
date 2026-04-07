import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../utils/api-client";
import { toast } from "react-toastify";

const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, quantity }) =>
      apiClient.post(`/cart/${id}`, { quantity }).then((res) => res.data),
    onSuccess: (res) => {
      // Invalidate current data
      toast.success(`${res.message}`);
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};

export default useAddToCart;
