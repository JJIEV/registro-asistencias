import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Cookies from "universal-cookie";
export const ProtectedRoutes = ({children}) => {
  const {logged}=useSelector((state)=>{return state.auth})
  // const logged=useSelector((state)=>state.auth.logged);
  const cookies=new Cookies();
  return (logged==true?children:<Navigate to='/'/>)
  // return (logged)?children:<Navigate to="/"/>;
}
