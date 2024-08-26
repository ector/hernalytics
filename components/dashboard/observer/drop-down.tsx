"use client";

import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { ChevronDown } from "lucide-react";

import { useVEOContext } from "@/providers/veo-context";

export default function Dropdown({
  options,
}: {
  options: string[];
}): React.ReactNode {
  const { selectValue, setSelectValue } = useVEOContext();

  return (
    <Menu>
      <MenuButton className="inline-flex items-center gap-2 bg-transparent py-1.5 px-3 text-[16px] font-normal text-primary-cDark1D focus:outline-none">
        {selectValue ? selectValue : options[0]}
        <ChevronDown className="size-4 fill-white/60" />
      </MenuButton>

      <MenuItems
        transition
        anchor="bottom end"
        className="w-52 origin-top-right rounded-[3px] bg-white p-1 text-[16px] text-primary-cGreen4D shadow-[0_11px_22px_0px_rgba(0,0,0,0.1)] transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {options?.map((item, index) => (
          <MenuItem key={index}>
            <button
              className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
              onClick={() => setSelectValue(item)}
            >
              {item}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
