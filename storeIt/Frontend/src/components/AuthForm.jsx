import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useSignIn, useSignUp, useAuth, useUser } from "@clerk/clerk-react";

const AuthForm = ({ formType }) => {
    const { register, handleSubmit, setError, watch, formState: { errors, isSubmitting } } = useForm();
    const { signIn } = useSignIn();
    const { signUp, setActive } = useSignUp();

    const [pendingVerification, setPendingVerification] = useState(false);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [sessionId, setSessionId] = useState("");
    const { isSignedIn, isSignedUp, signOut } = useAuth();
    const { user, isLoaded } = useUser();
    const [checking, setChecking] = useState(false);

    const onSubmit = async (data) => {
        if (isSignedIn) {
            alert("Already signed in");
            window.location.href = '/';
            return;
        }
        const { email, password } = data;
        try {
            await signUp.create({ emailAddress: email, password });  //creating signup for user in clerk
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            setEmail(email);
            setPendingVerification(true);
        } catch (error) {
            console.log(`Signup error : ${error.message}`);
            alert(error.message);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({ code });

            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId });
                alert("Email verified! You can now sign in.");
                // Optionally redirect or clear form
            } else {
                alert("Verification not complete. Please try again.");
            }
        } catch (err) {
            alert(err?.errors?.[0]?.message || "Invalid code");
        }
    };

    const handleVerificationBlock = () => {
        setPendingVerification(false);
    };

    if (pendingVerification) {
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
                <button type="submit" onClick={handleVerificationBlock}>Verify</button>
            </form>
        )
    }

    const onSubmitSignin = async (data) => {
        if (isSignedIn) {
            alert("Already signed in")
            window.location.href = "/";
            return;
        }
        try {
            const { email, password } = data;
            const result = await signIn.create({  //creating signin for user in clerk
                identifier: email,
                password,
            });
            await setActive({ session: result.createdSessionId });
            //needed to setActive session just after signIn.create is being called so that our signin form submit button when as per us signs in user, is also known by <SignedIn /> component of clerk and hence both are now in sync.
            setSessionId(result.createdSessionId);

            setChecking(true);
        } catch (error) {
            console.error("Sign-in failed:", error);
            alert(error.message);
        }
    }

    useEffect(() => {
        const verifyEmailAndSessionId = async () => {
            if (checking && isLoaded && user?.id) {
                const res1 = await fetch("http://localhost:5000/api/v1/clerk-verification", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: user.id, // Send user.id here
                    },
                    body: JSON.stringify({ userId: user.id }),
                });

                const check = await res1.json();

                if (!check.success) {
                    alert("Email not verified!");
                    return;
                }

                // Step 2: Get sessionId and verify it on backend
                const SessionId = sessionId;
                //   await setActive({ session: sessionId });

                const res2 = await fetch("http://localhost:5000/api/v1/check-session", {
                    method: "GET",
                    headers: {
                        Authorization: SessionId,
                    },
                });

                const sessionCheck = await res2.json();
                if (sessionCheck.success) {
                    // Redirect to dashboard
                    window.location.href = "/";
                } else {
                    alert("Session invalid!");
                }
            }
        }

        verifyEmailAndSessionId();
        //calling this function here under useEffect is because so that user after signin has been loaded and so is his/her session, so that user.id can be accessed and is not undefined.
    }, [checking, isLoaded, user]);

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
                <form className='flex flex-col space-y-4 justify-center' action="" onSubmit={handleSubmit(onSubmitSignin)} >
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
