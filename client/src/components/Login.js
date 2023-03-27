import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';
import styles from '../styles/Username.module.css';
import { loginUser, verifyPassword } from '../helper/helper';

export default function Login({ setToken }) {
  // const [token, setToken] = useState();
  const navigate = useNavigate();
  // const setUsername = useAuthStore((state) => state.setUsername);

  const formik = useFormik({
    initialValues: {
      username: 'example123',
      password: 'admin@123',
    },
    validate: passwordValidate,

    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginPromise = verifyPassword({
        username: values.username,
        password: values.password,
      });
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success: <b>Login Successfully...!</b>,
        error: <b>Password Not Match!</b>,
      });
      loginPromise.then((res) => {
        console.log(res.data);
        let { token } = res.data;
        // localStorage.setItem('token', token);
        sessionStorage.setItem('token', JSON.stringify(token));

        navigate('/dashboard');
      });
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Welcome!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Explore More by connecting with us.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            {/* <div className="profile flex justify-center py-4">
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div> */}

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps('username')}
                className={styles.textbox}
                type="text"
                placeholder="Username"
              />
              <input
                {...formik.getFieldProps('password')}
                className={styles.textbox}
                type="text"
                placeholder="Password"
              />

              <button className={styles.btn} type="submit">
                Let's Go
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a Member{' '}
                <Link className="text-red-500" to="/register">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };
