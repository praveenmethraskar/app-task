import React from "react";

interface SidebarLinkProps {
  label: string;
  iconPath: string;
  active?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  label,
  iconPath,
  active = false,
}) => {
  return (
    <a
      href="#"
      className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group ${
        active
          ? "bg-gray-800 text-white"
          : "text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      <svg
        className="h-5 w-5 mr-3"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
      </svg>
      {label}
    </a>
  );
};

export default SidebarLink;
