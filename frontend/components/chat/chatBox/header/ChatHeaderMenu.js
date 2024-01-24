'use client';

import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react';

const ChatHeaderMenu = () => {
  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <Button variant="text" className="p-3 rounded-full">
          <EllipsisHorizontalIcon className="w-5 h-5" />
        </Button>
      </MenuHandler>

      <MenuList>
        <MenuItem>Block Contact</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ChatHeaderMenu;
