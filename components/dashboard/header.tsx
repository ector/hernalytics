import React, { useEffect, useState } from "react";
import AppLogo from "@/components/shared/app-logo";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoMdArrowDropdown } from "react-icons/io";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { fetchCurrentUser, User } from "@/store/slices/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RoleIndicator from "./role-indicator";

const LogoutModal: React.FC<{
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}> = ({ onConfirm, onCancel, loading }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4 text-black">
          Confirm Logout
        </h3>
        <p className="mb-6 text-black">Are you sure you want to log out?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onConfirm}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="w-5 h-5 mr-2 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Yes, Logout"
            )}
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default function DashboardHeader(): React.JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<User>();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchCurrentUser())
      .unwrap()
      .then((curUser) => {
        setUser(curUser);
      })
      .catch(() => {
        // Handle errors
      });
  }, [dispatch]);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem("auth_token");

      router.push("/");
    }, 3000);
  };

  return (
    <header className="bg-white text-white h-[60px] sm:h-20 px-8 lg:px-20 border-b">
      <div className="flex items-center justify-between w-full h-full">
        <AppLogo />

        <div className="flex items-center gap-5">
          <div className="flex items-center rounded-[40px] p-2 gap-2 bg-primary-cLightF1">
            <Image
              src="/flags/nigeria.svg"
              alt="nigeria flag"
              width={20}
              height={20}
            />
            <p className="text-primary-cDark65">NG</p>
          </div>
          <Menu as="div" className="relative">
            <MenuButton className="flex items-center gap-2 cursor-pointer bg-transparent py-1.5 px-3 text-[16px] font-normal text-primary-cDark65 focus:outline-none">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CJ</AvatarFallback>
              </Avatar>
              <ChevronDown className="size-4 fill-primary-cDark65" />
            </MenuButton>

            <MenuItems
              as="div"
              className="absolute right-0 mt-2 w-52 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="w-full flex items-center px-4 py-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CJ</AvatarFallback>
                </Avatar>
                <div className="flex flex-col justify-between ml-3">
                  <span className="text-black">
                    {user?.firstname + " " + user?.lastname}
                  </span>
                  <div className="w-fit bg-primary-cBlue6F px-2 py-1 text-white text-[10px] leading-tight rounded uppercase">
                    <span>{user?.role}</span>
                  </div>
                </div>
              </div>

              <MenuItem>
                {({ active }) => (
                  <Link href="">
                    <button
                      className={`w-full px-4 py-2 text-left text-sm text-black`}
                    >
                      Dashboard
                    </button>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <Link href="/observer/survey">
                    <button
                      className={`w-full px-4 py-2 text-left text-sm text-black`}
                    >
                      Survey
                    </button>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <Link href="/observer/settings">
                    <button
                      className={`w-full px-4 py-2 text-left text-sm text-black`}
                    >
                      Account Settings
                    </button>
                  </Link>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => setShowModal(true)}
                    className={`w-full px-4 py-2 text-left text-sm text-black`}
                  >
                    Logout
                  </button>
                )}
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </div>
      {showModal && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowModal(false)}
          loading={loading}
        />
      )}
    </header>
  );
}
