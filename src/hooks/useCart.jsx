//tanStack 
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
const useCart = () =>{
    const {user} = useContext(AuthContext)

    // const { isLoading, isError, data, error } = useQuery({
    const { refetch , data: cart = [] } = useQuery({  // change the data name to cart and set a default value []
        queryKey: ['carts', user?.email],
        queryFn: async ()=>{
            const response = await fetch(`http://localhost:5000/carts?email=${user?.email}`)
            return response.json()
        },
      })
      return [cart, refetch]
}

export default useCart;