import { useEffect } from 'react';
import { Slide, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToasterMessages = ({
  message,
  className,
  variant = 'success',
  position = 'top-center',
  ...props
}) => {
  useEffect(() => {
    message && toast[variant](message);
  }, [message]);
  return (
    <ToastContainer
      autoClose={3000}
      // autoClose={false}
      position={position}
      hideProgressBar={false}
      className={className}
      closeOnClick={true}
      pauseOnHover={true}
      draggable={true}
      transition={Slide}
      // theme="colored"
      toastClassName={'!min-h-0'}
      limit={1}
      icon={false}
      {...props}
    />
  );
};

export default ToasterMessages;
