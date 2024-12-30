/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { DialogHeader } from "./ui/dialog";
import { Settings } from "lucide-react";
import { RESET } from "jotai/utils";
import { appDataAtom } from "@/stores/app";
import { useSetAtom } from "jotai";
import { Dispatch, SetStateAction, useState } from "react";

export default function SettingsOption() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" onClick={() => setSettingsOpen(true)}>
        <Settings />
      </Button>
      <SettingsDialog isOpen={settingsOpen} setIsOpen={setSettingsOpen} />
    </>
  );
}

interface SettingsDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function SettingsDialog({ isOpen, setIsOpen }: SettingsDialogProps) {
  const setAppData = useSetAtom(appDataAtom);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage your settings and preferences
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-row justify-between">
            <p>Reset data</p>
            <Button
              onClick={() => {
                setAppData(RESET);
                setIsOpen(false);
              }}
              variant="destructive"
            >
              Reset all data
            </Button>
          </div>
        </div>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
