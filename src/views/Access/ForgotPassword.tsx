import { useSearchParams } from "react-router-dom";
import ForgotPasswordForm from "../../components/ForgotPassword/ForgotPasswordForm";
import ChangePassword from "../../components/ChangePasswordForm/ChangePassword";
import { useEffect, useState } from "react";
import { validateToken } from "../../services/auth.service";
import { useAppDispatch } from "../../hooks/useDispatch.hook";
import { setLoader } from "../../redux/slices/ui.slice";
import MessageComponent from "../../components/MessageComponent/MessageComponent";

const ForgotPassword = () => {
  const [params] = useSearchParams();
  const dispatch = useAppDispatch();
  const token = params.get("token");
  const [tokenValid, setTokenValid] = useState<boolean>(false);
  

  useEffect(() => {
    const validateTokenFetch = async () => {
      if (token) {
        dispatch(setLoader(true));
        try {
          await validateToken(token);
          setTokenValid(true);
        } catch (error) {
          console.log('error :>> ', error);
          setTokenValid(false);
        }
        dispatch(setLoader(false));
      }
    };

    validateTokenFetch();
  }, []);

  return <>{!token ? <ForgotPasswordForm /> : tokenValid ? <ChangePassword token={token} /> : <MessageComponent type="error" title="Algo está mal" description="El Token Es invalido o ya venció"/>}</>;
};

export default ForgotPassword;
