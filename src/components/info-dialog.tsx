import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";

export default function InfoOption() {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" onClick={() => setInfoOpen(true)}>
        <Info />
      </Button>
      <InfoDialog isOpen={infoOpen} setIsOpen={setInfoOpen} />
    </>
  );
}

interface InfoDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function InfoDialog({ isOpen, setIsOpen }: InfoDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className=" border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">
            How to use Income Split
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium text-foreground">
              1. Enter Monthly Income
            </h3>
            <p className="text-sm text-muted-foreground">
              Start by entering your total monthly income in the input field at
              the top.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-foreground">2. Add Allocations</h3>
            <p className="text-sm text-muted-foreground">
              Click the "Add Allocation" button to create new budget categories.
              You can create multiple categories like Savings, Checking, or
              custom ones.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-foreground">
              3. Adjust Percentages
            </h3>
            <p className="text-sm text-muted-foreground">
              Use the sliders to adjust how much of your income goes to each
              category. The donut chart will update automatically to show your
              allocation breakdown.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-foreground">
              4. Monitor Allocations
            </h3>
            <p className="text-sm text-muted-foreground">
              Track your allocated and remaining percentages in the summary
              cards. The total allocated amount shows your distributed income
              across all categories.
            </p>
          </div>

          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              Tip: Keep an eye on the "Remaining" percentage to ensure you've
              allocated your entire budget effectively.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
