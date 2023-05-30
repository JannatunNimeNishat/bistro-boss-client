//tanStack 
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useAxiosSecure from './useAxiosSecure';
const useCart = () =>{
    const {user} = useContext(AuthContext)

    const [axiosSecure] = useAxiosSecure();

    // normal usages
    //getting the access token from local storage
    // const token = localStorage.getItem('access-token');

    // data fetch using axiosSecure    
    const { refetch , data: cart = [] } = useQuery({  // change the data name to cart and set a default value []
        queryKey: ['carts', user?.email],
        queryFn: async ()=>{
            const response = await axiosSecure(`/carts?email=${user?.email}`)
            console.log('res from axios',response);
            return response.data;
        },
        // normal usages
        /* queryFn: async ()=>{
            const response = await fetch(`http://localhost:5000/carts?email=${user?.email}`,{
                headers:{
                    authorization: `bearer ${token}`
                }
            })
            return response.json()
        }, */
      })
      return [cart, refetch]
}

export default useCart;