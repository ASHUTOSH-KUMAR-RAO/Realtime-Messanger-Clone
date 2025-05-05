"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "../Modal";
import Input from "../inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";

interface SettingsModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: any; // Replace with actual type
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentUser,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
   
    },
  });

  const image = watch("image");
  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit :SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => {
        setIsLoading(false);
      });

  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="space-y-4">
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">Edit your profile information.</p>
                <div className="mt-10 flex flex-col gap-y-6 ">
                    <Input
                        label="Name"
                        id="name"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <div>
                        <label
                            className="block text-sm font-medium leading-6 text-gray-900" 
                        >Photo</label>
                        <div className="mt-2 flex items-center gap-x-3">
                            <Image
                                width={48}
                                height={48}
                                className="rounded-full"
                                src={image || currentUser?.image || "/images/placeholder.jpg"}
                                alt="Avatar"
                            />
                            <CldUploadButton
                                options={{ maxFiles: 1 }}
                                onUpload={handleUpload}
                                uploadPreset="whsl9h9y" 
                            >
                              <Button
                                type="button"
                                disabled={isLoading}
                                secondary
                                fullWidth
                              >
                                Change
                              </Button>
                            </CldUploadButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
                <Button
                    type="button"
                    disabled={isLoading}
                    secondary
                    onClick={onClose}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isLoading}
                >
                    Save
                </Button>
            </div>
        </div>
    </form>
    </Modal>
  );
};

export default SettingsModal;
