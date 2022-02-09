import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, LogoutIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import React, { HTMLProps } from "react";
import { useAuthContext } from "../../core/context/AuthContext";
import Logo from "./Logo";

const HeaderLogo = () => (
  // <div className="flex-shrink-0">
  <Logo className="w-8 h-8 fill-slate-200" />
  // </div>
);

type HeaderLinkProps = HTMLProps<HTMLAnchorElement> & { active?: boolean };

const HeaderLink: React.FC<HeaderLinkProps> = ({
  active,
  className,
  ...rest
}) => (
  <a
    className={clsx(
      "px-3 py-2 text-sm font-medium rounded-md",
      active && "text-white bg-gray-900",
      !active && "text-gray-300 hover:bg-gray-700 hover:text-white",
      className
    )}
    aria-current={active ? "page" : undefined}
    {...rest}
  />
);

const ProfileDropdown: React.FC = () => {
  const { user, logout } = useAuthContext();

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {user.UserAttributes.find(({ Name }) => Name === "name")?.Value}
            <Transition
              className="ml-2 -mr-1"
              enter="transform rotate-180 duration-100"
              enterFrom="transform rotate-0"
              enterTo="transform rotate-180"
              leave="transform rotate-180 duration-100"
              leaveFrom="transform rotate-180"
              leaveTo="transform rotate-0"
            >
              <ChevronDownIcon
                className={clsx(
                  "w-5 h-5 text-indigo-200 hover:text-indigo-100"
                )}
                aria-hidden="true"
              />
            </Transition>
          </Menu.Button>
        </div>

        <Transition
          as={React.Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item as="div" className="p-1">
              {({ active }) => (
                <button
                  className={clsx(
                    "flex items-center w-full p-2 text-sm rounded-md group transition",
                    active ? "bg-gray-100" : "text-gray-900"
                  )}
                  onClick={() => logout()}
                >
                  <LogoutIcon className="w-5 h-5 mr-2" />
                  Log out
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

const Header = () => {
  // const [isExpanded, setIsExpanded] = useState(false);
  const { isAuthenticated } = useAuthContext();

  return (
    <nav className="bg-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <HeaderLogo />
            {isAuthenticated && (
              <div className="hidden md:block">
                <div className="flex items-baseline ml-10 space-x-4">
                  <HeaderLink href="#" active>
                    Retrospectives
                  </HeaderLink>
                  <HeaderLink href="#">Team</HeaderLink>
                  <HeaderLink href="#">Projects</HeaderLink>
                  <HeaderLink href="#">Calendar</HeaderLink>
                  <HeaderLink href="#">Reports</HeaderLink>
                </div>
              </div>
            )}
          </div>
          {isAuthenticated ? (
            <ProfileDropdown />
          ) : (
            <HeaderLink href="/login" className="bg-blue-700">
              Login
            </HeaderLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
