import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export const AdminRoutes = ({children}) => {
    const {roles,logged}=useSelector((state)=>{return state.auth})

    let data=roles?.filter((val) => val.includes('admin'))
  return (data[0]==='admin' && logged===true?children:<Navigate to='/home'/>)
}
