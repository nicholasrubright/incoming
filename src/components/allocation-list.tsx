import { Plus, Trash, X } from "lucide-react";
import AllocationCard from "./allocation-card";
import { Button } from "./ui/button";
import { PrimitiveAtom, useAtom, useAtomValue } from "jotai";
import { allocationAtomsAtom, monthlyIncomeAtom } from "@/stores/app";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { Allocation } from "@/types";

export default function AllocationList() {
  const [editOn, isEditOn] = useState<boolean>(false);

  const monthlyIncome = useAtomValue(monthlyIncomeAtom);
  const [allocationAtoms, dispatch] = useAtom(allocationAtomsAtom);

  const handleOnDelete = (atom: PrimitiveAtom<Allocation>) => {
    dispatch({
      type: "remove",
      atom,
    });

    if (allocationAtoms.length === 0) {
      isEditOn(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-row gap-3">
        <Button
          className="w-full md:w-auto"
          disabled={!(monthlyIncome > 0)}
          onClick={() =>
            dispatch({
              type: "insert",
              value: { id: uuidv4(), name: "", percentage: 0 },
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Allocation
        </Button>
        <Button
          onClick={() => isEditOn(!editOn)}
          variant="secondary"
          className="w-full md:w-auto"
        >
          {editOn ? (
            <>
              <X />
              Editing{" "}
            </>
          ) : (
            <>
              <Trash /> Edit
            </>
          )}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {allocationAtoms.map((all, index) => {
          return (
            <AllocationCard
              handleOnDelete={handleOnDelete}
              canDelete={editOn}
              key={index}
              allocationAtom={all}
            />
          );
        })}
      </div>
    </div>
  );
}
