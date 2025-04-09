import React from "react";
import Button from "./button";
import { useNavigate } from "react-router-dom";

interface buttonItem {
  title?: string;
  icon?: React.ReactNode;
  url?: string;
}
interface sideBarGroupProps {
  title: string;
  button: buttonItem[];
}
interface sideBarHeaderProps {
  name: string;
  username: string;
  image?: React.ReactNode;
}
interface sideBarProps {
  name: string;
  username: string;
  image?: React.ReactNode;
  children?: React.ReactNode;
  groups: sideBarGroupProps[];
}

const SideBarGroup: React.FC<sideBarGroupProps> = ({ title, button }) => {
  const navigate = useNavigate();
  return (
    <div className="mt-4">
      <h3 className="text-muted-foreground text-xs font-semibold mb-2 px-3 uppercase tracking-wider">
        {title}
      </h3>
      <div className="flex flex-col gap-1 px-2">
        {button.map((i, idx) => (
          <Button
            key={idx}
            size="sm"
            variant="ghost"
            className="justify-start gap-2 px-3 py-2 rounded-lg hover:bg-muted transition"
            onClick={() => i.url && navigate(i.url)}
          >
            {i.icon}
            {i.title}
          </Button>
        ))}
      </div>
    </div>
  );
};

function SideBarHeader({ name, username, image }: sideBarHeaderProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-6 border-b border-muted">
      {image && <div className="w-10 h-10 rounded-full overflow-hidden">{image}</div>}
      <div className="flex flex-col">
        <span className="font-medium">{name}</span>
        <span className="text-xs text-muted-foreground">@{username}</span>
      </div>
    </div>
  );
}

function SideBarFooter() {
  return (
    <div className="mt-auto px-4 pb-4">
      <Button className="w-full" variant="secondary">
        Log Out
      </Button>
    </div>
  );
}

function SideBar({ name, username, image, children, groups }: sideBarProps) {
  return (
    <div className="h-screen w-64 bg-grey-900 border-r flex flex-col">
      {children}
      <SideBarHeader name={name} username={username} image={image} />
      <div className="flex-1 overflow-y-auto px-1 py-2">
        {groups.map((group, index) => (
          <SideBarGroup key={index} title={group.title} button={group.button} />
        ))}
      </div>
      <SideBarFooter />
    </div>
  );
}

export { SideBar };
