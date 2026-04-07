import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiClient from "../utils/api-client";
import { toast } from "react-toastify";

const useUpdateCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id,type}) => apiClient.patch(`/cart/${type}/${id}`).then(res => res.data),
        onSuccess: (res) => {
            toast.success(`${res.message}`);
            queryClient.invalidateQueries({
                queryKey: ["cart"]
            })
        }
    })
}

export default useUpdateCart;