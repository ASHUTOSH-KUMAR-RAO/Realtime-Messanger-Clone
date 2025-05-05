"use client";

import useConversation from "@/app/hooks/useConversation";
import axios from "axios";
import React, { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { HiPhoto, HiPaperAirplane } from "react-icons/hi2";
import { CgSpinner } from "react-icons/cg";
import MessageInput from "./MessageInput";
import { CldUploadButton } from "next-cloudinary";

const Form = () => {
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  // Handler for text message submission
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data.message.trim()) return;

    setIsLoading(true);
    try {
      await axios.post("/api/messages", {
        message: data.message,
        conversationId,
      });
      setValue("message", "", { shouldValidate: true });
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Improved handler for image uploads
  const handleUpload = async (result: any) => {
    if (result?.info?.secure_url) {
      setIsImageUploading(true);
      try {
        // Make sure we're sending the image URL explicitly
        await axios.post("/api/messages", {
          image: result.info.secure_url,
          message: "", // Send empty message when uploading image
          conversationId,
        });
        console.log("Image sent successfully:", result.info.secure_url);
      } catch (error) {
        console.error("Failed to send image:", error);
      } finally {
        setIsImageUploading(false);
      }
    }
  };

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      {/* Cloudinary Upload Button */}
      <CldUploadButton
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="whsl9h9y"
        className="rounded-full p-2 hover:bg-sky-100 transition cursor-pointer"
      >
        {isImageUploading ? (
          <CgSpinner size={25} className="text-sky-500 animate-spin" />
        ) : (
          <HiPhoto size={25} className="text-sky-500" />
        )}
      </CldUploadButton>

      {/* Message Input Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput
          id="message"
          register={register}
          errors={errors}
          required
          placeholder="Type a message..."
          // disabled={isLoading}
        />

        {/* Send Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="
            rounded-full 
            p-2 
            bg-sky-500 
            text-white
            hover:bg-sky-600
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {isLoading ? (
            <CgSpinner size={20} className="animate-spin" />
          ) : (
            <HiPaperAirplane size={20} />
          )}
        </button>
      </form>
    </div>
  );
};

export default Form;

//! Aur haan kabhi kabhi ye bhi hota hai id kaam to sahi se kaar raha hai but cors issues ki client se api ko block kar raha hai jiske wajah se mere Image id Db mein show nhi ho raha hai but neywork URL mein show ho raha hai,aur bahut baar to ye bhi hota hai log sochte hai ki unke code mein issues hai lekin aisa nhi hai ,code mein issues hoga to syntax ya refrence error aata hai lekin yedi block ho raha hai to wo CORS(cross origin resource sharing) ki wajah se ata hai 
