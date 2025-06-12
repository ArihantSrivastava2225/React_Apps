import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useSignUp } from "@clerk/clerk-react";

const AuthForm = ({ formType }) => {
    const { register, handleSubmit, setError, watch, formState: { errors, isSubmitting } } = useForm();
    const { signUp } = useSignUp();

    const [pendingVerification, setPendingVerification] = useState(false);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");

    const onSubmit = async (data) => {
        //I am not passing any data when calling onSubmit function or providing onSubmit to handleSubmit function from react-hook-form, thus handleSubmit might just provide onSubmit the data entered by us in the form.
        try {
            
        } catch (err) {
            
        }
    };

    const handleVerify = async() => {

    }

    if(pendingVerification){
        return (
            <form onSubmit={handleVerify} className="flex flex-col space-y-4">
                <h2 className='text-lg font-semibold'>Verify your email: {email}</h2>
                <input
                    className='w-96'
                    type="text"
                    placeholder="Enter verification code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <button type="submit">Verify</button>
            </form>
        )
    }

    return (
        <div className=''>
            {formType === 'signup' ? (
                <form className='flex flex-col space-y-4 justify-center' action="" onSubmit={handleSubmit(onSubmit)}>
                    <input className='w-96' {...register("FullName", { required: { value: true, message: "This field is required" }, minLength: { value: 3, message: "Minlength is 3" }, maxLength: { value: 24, message: "Maxlength is 24" } })} placeholder='Full Name' />
                    {errors.FullName && <div className='text-red-700'>{errors.FullName.message}</div>}

                    <input className='w-96'
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Enter a valid email address"
                            }
                        })}
                    />
                    {errors.email && <div className='text-red-700'>{errors.email.message}</div>}

                    <input className='w-96' {...register("password", {
                        required: { value: true, message: "This field is required" }, minLength: { value: 7, message: "MinLength is 7" },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
                            message: "Must include uppercase, lowercase, number, and special character"
                        },
                        maxLength: { value: 20, message: "Maxlength is 20" }
                    })} type='password' placeholder='Password'
                    />
                    {errors.password && <div className='text-red-700'>{errors.password.message}</div>}

                    <button type='submit'>Submit</button>
                </form>
            ) : (
                <form className='flex flex-col space-y-4 justify-center' action="" onSubmit={handleSubmit(onSubmit)} >
                    <input
                        className='w-96'
                        type="email"
                        placeholder="Email"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email is required"
                            },
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Enter a valid email address"
                            }
                        })}
                    />
                    {errors.email && <div className='text-red-700'>{errors.email.message}</div>}

                    <input className='w-96' {...register("password", {
                        required: { value: true, message: "This field is required" }, minLength: { value: 7, message: "MinLength is 7" },
                        pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/,
                            message: "Must include uppercase, lowercase, number, and special character"
                        },
                        maxLength: { value: 20, message: "Maxlength is 20" }
                    })} type='password' placeholder='Password'
                    />
                    {errors.password && <div className='text-red-700'>{errors.password.message}</div>}

                    <button type='submit'>Submit</button>
                </form>
            )}

            <p>

            </p>
        </div>
    )
}

export default AuthForm
