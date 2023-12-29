'use client'

import { useCallback, useEffect, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './CustomModal';
import Heading from '../../utils/Heading';
import Input from '../../utils/Input';
import toast from 'react-hot-toast';
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import { useRouter } from 'next/navigation';

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const [registerUser, { error, isError, isSuccess }] = useRegisterMutation() as any;

    const {
        register,
        handleSubmit,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true);
        await registerUser(data);
        setIsLoading(false);
        registerModal.onClose();
        loginModal.onOpen();
    }

    useEffect(() => {
        isSuccess && toast.success("New user created");
        isError && toast.error(error?.data?.message);
    }, [isSuccess, isError, error])

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Heading
                title="Welcome to NoteNest"
                subtitle="Create an account"
            />
            <Input
                id="email"
                label="Email"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                type="password"
                label="Password"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
            <hr />
            <div
                className='
                    text-neutral-500
                    text-center
                    mt-4
                    font-light
                '
            >
                <div
                    className='flex flex-row items-center justify-center gap-2'
                >
                    <div>
                        Already have an account
                    </div>
                    <div
                        onClick={toggle}
                        className='
                            text-neutral-800
                            cursor-pointer
                            hover-underline
                        '
                    >
                        Log In
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Register'
            actionLabel='Continue'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal;