"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import StoreModal from "@/components/modals/store-modal";
import ModalProvider from "@/providers/modal-provider";
import { Store } from "@prisma/client";
import { cn } from "@/lib/utils";

type PopoverTriggerPropsWithoutRef = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;
interface StoreSwitcherProps extends PopoverTriggerPropsWithoutRef {
  stores: Store[];
}

export default function StoreSwitcher({
  className,
  stores,
}: StoreSwitcherProps) {
  const params = useParams();
  const router = useRouter();

  const currentStore = stores.find((store) => store.id === params.storeId);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function onStoreSelect(store: Store) {
    setIsOpen(false);
    router.push(`/${store.id}`);
  }

  function onCreateStore() {
    setIsOpen(false);
    setModalIsOpen(true);
  }

  function onModalClose() {
    setModalIsOpen(false);
  }

  return (
    <>
      <ModalProvider>
        <StoreModal isOpen={modalIsOpen} onClose={onModalClose} />
      </ModalProvider>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            role="combobox"
            aria-expanded={isOpen}
            aria-label="Select a store"
            className={cn("w-[200px] justify-between p-0", className)}
          >
            <StoreIcon className="mr-2 h-4 w-4" />
            {currentStore?.name}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search store..." />
            <CommandList>
              <CommandEmpty>No store found.</CommandEmpty>
              <CommandGroup heading="Stores">
                {stores.map((store) => (
                  <CommandItem
                    key={store.id}
                    onSelect={() => onStoreSelect(store)}
                    className="text-sm"
                  >
                    {store.name}
                    <Check
                      className={cn(
                        "h-4 w-4 ml-auto",
                        store.id === currentStore?.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <Button
                variant="secondary"
                className="w-full justify-start font-normal"
                type="button"
                onClick={onCreateStore}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Create Store
              </Button>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
