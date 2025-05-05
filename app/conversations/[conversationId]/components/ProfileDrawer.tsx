"use client";

import { Conversation, User } from "@/app/generated/prisma";
import useOtherUser from "@/app/hooks/useOtherUser";
import { format } from "date-fns";
import { Fragment, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose, IoTrash } from "react-icons/io5";
import { FiUser, FiCalendar, FiMail, FiMessageCircle } from "react-icons/fi";
import Avatar from "@/app/components/Avatar";
import ConfirmModal from "./ConfirmModal";
import AvatarGroup from "@/app/components/AvatarGroup";
import useActiveList from "@/app/hooks/useActiveList";

interface ProfileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & {
    users: User[];
  };
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const otherUser = useOtherUser(data);
  const [confirmOpen, setIsConfirmOpen] = useState(false);

  const { members } = useActiveList();

  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
    return isActive ? "Active" : "offline";
  }, [data]);

  return (
    <>
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setIsConfirmOpen(false)}
      />

      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          {/* Enhanced overlay with smoother blur effect */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-md transition-opacity"></div>
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-out duration-500"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in duration-500"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-gradient-to-br from-white to-gray-50 py-6 shadow-2xl rounded-l-3xl">
                      {/* Header with improved spacing and styling */}
                      <div className="px-6 sm:px-8">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600">
                            Profile
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-full bg-white p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 shadow-sm"
                              onClick={onClose}
                            >
                              <span className="sr-only">Close panel</span>
                              <IoClose size={20} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="relative mt-8 flex-1 px-6 sm:px-8">
                        <div className="flex flex-col items-center">
                          {/* Avatar with enhanced styling and animation */}
                          <div className="mb-6 relative">
                            <div className="p-3 bg-white rounded-full shadow-lg ring-2 ring-sky-100 hover:ring-sky-200 transition-all duration-300">
                              {data.isGroup ? (
                                <AvatarGroup users={data.users} />
                              ) : (
                                <Avatar
                                  user={otherUser}
                                  showStatus={false}
                                  size="lg"
                                />
                              )}
                            </div>
                            {/* Status indicator with improved animation */}
                            {!data.isGroup && (
                              <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-md animate-pulse"></div>
                            )}
                          </div>

                          {/* User name with gradient text */}
                          <div className="text-2xl font-bold mb-2 text-gray-800 hover:text-gray-900 transition-colors duration-300">
                            {title}
                          </div>

                          {/* Status with improved styling */}
                          <div className="px-5 py-2 text-sm bg-gradient-to-r from-sky-100 to-indigo-100 text-sky-800 rounded-full font-medium shadow-md flex items-center space-x-1">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                data.isGroup ? "bg-indigo-500" : "bg-green-500"
                              }`}
                            ></span>
                            <span>{statusText}</span>
                          </div>

                          {/* Action buttons in a better styled card */}
                          <div className="flex gap-4 my-8 w-full max-w-xs bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div
                              onClick={() => setIsConfirmOpen(true)}
                              className="flex flex-1 flex-col gap-2 items-center cursor-pointer transition-all duration-300 py-3 rounded-xl hover:bg-red-50"
                            >
                              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-300 shadow-md group">
                                <IoTrash
                                  size={24}
                                  className="transform group-hover:scale-110 transition-transform duration-300"
                                />
                              </div>
                              <div className="text-sm font-medium text-gray-700 group-hover:text-red-700 mt-2">
                                Delete
                              </div>
                            </div>

                            {!data.isGroup && (
                              <div className="flex flex-1 flex-col gap-2 items-center cursor-pointer transition-all duration-300 py-3 rounded-xl hover:bg-sky-50">
                                <div className="w-14 h-14 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 hover:bg-sky-100 transition-colors duration-300 shadow-md group">
                                  <FiMessageCircle
                                    size={24}
                                    className="transform group-hover:scale-110 transition-transform duration-300"
                                  />
                                </div>
                                <div className="text-sm font-medium text-gray-700 mt-2">
                                  Message
                                </div>
                              </div>
                            )}
                          </div>

                          {/* User details section with glass-morphism styling */}
                          <div className="w-full pt-5 mt-3 border-t border-gray-200">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
                              <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center pb-2 border-b border-gray-100">
                                <FiUser className="mr-2 text-sky-600" />
                                User Information
                              </h3>
                              <dl className="space-y-6">
                                {data.isGroup && (
                                  <div className="transform hover:translate-x-1 transition-transform duration-300">
                                    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0 flex items-center">
                                      <FiMail className="mr-2 text-indigo-500" />{" "}
                                      Emails
                                    </dt>
                                    <dd className="mt-1 text-sm text-gray-800 sm:col-span-2 font-medium pl-6">
                                      {data.users
                                        .map((user) => user.email)
                                        .join(", ")}
                                    </dd>
                                  </div>
                                )}
                                {!data.isGroup && (
                                  <div className="flex items-start transform hover:translate-x-1 transition-transform duration-300">
                                    <div className="flex-shrink-0 mt-1">
                                      <div className="p-2 bg-blue-50 rounded-full shadow-sm">
                                        <FiMail
                                          className="text-blue-600"
                                          size={18}
                                        />
                                      </div>
                                    </div>
                                    <div className="ml-4">
                                      <dt className="text-sm font-medium text-gray-500">
                                        Email
                                      </dt>
                                      <dd className="mt-1 text-sm text-gray-900 break-all font-medium">
                                        {otherUser.email}
                                      </dd>
                                    </div>
                                  </div>
                                )}

                                {!data.isGroup && (
                                  <div className="flex items-start transform hover:translate-x-1 transition-transform duration-300">
                                    <div className="flex-shrink-0 mt-1">
                                      <div className="p-2 bg-green-50 rounded-full shadow-sm">
                                        <FiCalendar
                                          className="text-green-600"
                                          size={18}
                                        />
                                      </div>
                                    </div>
                                    <div className="ml-4">
                                      <dt className="text-sm font-medium text-gray-500">
                                        Joined
                                      </dt>
                                      <dd className="mt-1 text-sm text-gray-900 font-medium">
                                        <time dateTime={joinedDate}>
                                          {joinedDate}
                                        </time>
                                      </dd>
                                    </div>
                                  </div>
                                )}
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProfileDrawer;
