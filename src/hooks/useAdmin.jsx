// import { useContext } from "react";
// import { AuthContext } from "../providers/AuthProvider";
// import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
// import useAxiosSecure from "./useAxiosSecure";


const useAdmin = ()=>{
    //normal
    // const {user} = useContext(AuthContext);
    //const token = localStorage.getItem('access-token');

    const {user} = useAuth()

   const [axiosSecure] = useAxiosSecure()


    const {  data: isAdmin, isLoading: isAdminLoading } = useQuery({  
        queryKey: ['isAdmin', user?.email],
        queryFn: async ()=>{
            const response = await axiosSecure.get(`/users/admin/${user?.email}`)
            console.log('is admin response', response);
            return response.data.admin;
        },
        
      })
     return [isAdmin,isAdminLoading]
    }

    //normal with out axios
/*     const {  data: isAdmin, isLoading: isAdminLoading } = useQuery({  
        queryKey: ['isAdmin', user?.email],
        queryFn: async ()=>{
            const response = await fetch(`http://localhost:5000/users/admin/${user?.email}`,{
                headers:{
                    authorization: `bearer ${token}`
                }
            })
            console.log('is admin response', response);
            return response.json()
        },
        
      })
     return [isAdmin,isAdminLoading]
    } */


    /* useEffect(()=>{
        fetch(`http://localhost:5000//users/admin/${user?.email}`,{
            headers:{
                authorization: `bearer ${token}`
            }
        })
        .then(res=>res.json())
        .then(data => console.log(data))
    },[]) */
// }
export default useAdmin;