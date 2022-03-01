import React from "react";
import { MdNotifications, MdOutlineComment, MdPostAdd } from "react-icons/md";
import { RiUserFollowFill } from "react-icons/ri";

import { NotificationType } from "types/notification.type";

interface AtomNotificationIconProps {
  type: keyof typeof NotificationType;
}

const AtomNotificationIcon: React.FC<AtomNotificationIconProps> = ({
  type,
}) => {
  switch (type) {
    case "post":
      return <MdPostAdd size="20px" />;
    case "comment":
      return <MdOutlineComment size="20px" />;
    case "follow":
      return <RiUserFollowFill size="20px" />;
    default:
      return <MdNotifications size="20px" />;
  }
};

export default AtomNotificationIcon;
