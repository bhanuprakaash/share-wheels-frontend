import React, {useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import Icon from "../../../../shared/components/basic/Icon.tsx";
import Title from "../../../../shared/components/basic/Title.tsx";
import InputField from "../../../../shared/components/forms/InputField.tsx";
import {selectUserId} from "../../selectors/userSelectors.ts";
import userValidation from "../../../../shared/utils/validation/userValidation.ts";
import type {UpdateUserPasswordPayload} from "../../types/user.ts";
import {useDeleteUser, useUpdatePassword} from "../../hooks/useUser.ts";
import Button from "../../../../shared/components/forms/Button.tsx";
import ConfirmationModal from "../../../../shared/components/modals/ConfirmationModal.tsx";

const PrivacyAndSecuritySettings = () => {
    const [resetPasswordPayload, setResetPasswordPayload] = useState<UpdateUserPasswordPayload>({
        currentPassword: "",
        newPassword: "",
    });
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const userId = useSelector(selectUserId);
    const {validatePassword} = userValidation;

    const updatePasswordMutation = useUpdatePassword({
        onSuccess: () => {
            setResetPasswordPayload({
                currentPassword: "",
                newPassword: "",
            });
            navigate(-1);
        },
        onError: (_error, errorData) => {
            console.log(errorData?.message);
        }
    });

    const deleteUserMutation = useDeleteUser({
        onSuccess: () => {
            navigate("/login");
        },
        onError: (_error, errorData) => {
            console.log(errorData?.message);
        }
    });

    const handleNavigateBack = () => {
        navigate(-1);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setResetPasswordPayload({
            ...resetPasswordPayload,
            [name]: value,
        })
    }

    const handleResetPassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (userId && validatePassword(resetPasswordPayload.newPassword) && validatePassword(resetPasswordPayload.currentPassword)) {
            updatePasswordMutation.mutate({id: userId, payload: resetPasswordPayload});
        }
    }

    const handleDeleteUser = () => {
        if (userId) {
            deleteUserMutation.mutate({id: userId});
        }
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center p-2">
                <Icon icon="arrow_back_ios" customClassNames="cursor-pointer" onClick={handleNavigateBack}/>
                <Title title="Privacy and Security Settings"/>
            </div>
            <div className="border-1 border-[#E8F2E8] w-full p-4 rounded-lg">
                <Title title="Reset Password" customClassName="mb-2"/>
                <form onSubmit={handleResetPassword}>
                    <div className="flex gap-2">
                        <InputField
                            label={"Current Password"}
                            type={"password"}
                            value={resetPasswordPayload.currentPassword}
                            placeholder={"Dwight123@"}
                            id={"currentPassword"}
                            name={"currentPassword"}
                            onChange={handleChange}
                            required={true}
                            containerClassNames="flex-1"
                        />
                        <InputField
                            label={"New Password"}
                            type={"password"}
                            value={resetPasswordPayload.newPassword}
                            placeholder={"Dwight123@"}
                            id={"newPassword"}
                            name={"newPassword"}
                            onChange={handleChange}
                            required={true}
                            containerClassNames="flex-1"
                        />
                    </div>
                    <Button
                        type="submit"
                        variant={"primary"}
                        customClasses={"text-base mt-3 font-semibold flex items-center w-[200px]"}
                        disabled={updatePasswordMutation.isPending}
                    >
                        {updatePasswordMutation.isPending ? "Resetting..." : "Reset Password"}
                    </Button>
                </form>
            </div>
            <div
                className="text-red-600 bg-red-50 cursor-pointer w-full p-4 rounded-lg mt-4"
                onClick={() => setIsModalOpen(true)}
            >
                Delete Your Account
            </div>
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDeleteUser}
                type="danger"
                title="Account Delete Confirmaton!"
                message="Are you sure you want to Stop Sharing Wheels?"
                confirmText="Yes, I want to Stop"
                cancelText="Cancel"
            />
        </div>
    )
};

export default PrivacyAndSecuritySettings;