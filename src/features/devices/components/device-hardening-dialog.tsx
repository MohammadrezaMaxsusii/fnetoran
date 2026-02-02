import { z as zod } from "zod";
import { Link, useNavigate } from "react-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ErrorMessage, Field } from "@/components/headless/fieldset";
import { Dialog, DialogBody, DialogTitle } from "@/components/headless/dialog";
import {
  Listbox,
  ListboxLabel,
  ListboxOption,
} from "@/components/headless/listbox";
import { useCisQuery, useHistoryQuery } from "../hooks";

// import { useCisQuery, useHistoryQuery } from "@/actions/device";

// ----------------------------------------------------------------------

const cisIdSchema = zod.object({
  cisId: zod.number().min(1, "Select a CIS"),
});

// ----------------------------------------------------------------------

export const DeviceHardeningDialog = ({ open, onClose }) => {
  const navigate = useNavigate();

  const { cis, cisLoading } = useCisQuery();
  const { history, historyLoading } = useHistoryQuery();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cisIdSchema),
    defaultValues: {
      cisId: 0,
    },
  });

  const onSubmit = handleSubmit(() => navigate(`cis/${getValues("cisId")}`));

  // if (cisLoading || historyLoading) return "Loading...";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="text-white!">Device Hardening</DialogTitle>

      <DialogBody>
        <form className="flex items-start gap-x-3" onSubmit={onSubmit}>
          <Field className="flex-1">
            <Controller
              name="cisId"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <Listbox
                  placeholder="Select a CIS"
                  value={value}
                  onChange={onChange}
                  className="before:bg-[#171717]! before:border before:border-default"
                >
                  {cis.map((cis) => (
                    <ListboxOption key={cis.id} value={cis.id}>
                      <ListboxLabel className="text-white">
                        {cis.name}
                      </ListboxLabel>
                    </ListboxOption>
                  ))}
                </Listbox>
              )}
            />

            {errors.cisId && (
              <ErrorMessage>{errors.cisId.message}</ErrorMessage>
            )}
          </Field>

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500"
          >
            Hardening
          </button>
        </form>

        <div className="mt-6 max-h-96 overflow-y-auto">
          <ul className="mt-2 space-y-4">
            {history?.map((cis) => (
              <li key={cis.id}>
                <span className="text-sm font-bold text-white">{cis.name}</span>

                <ul className="mt-2 space-y-2">
                  {cis.versions.map((version) => (
                    <li
                      key={version.checkedAt}
                      className="flex items-center justify-between rounded-xl bg-gray-items p-4"
                    >
                      <div className="flex flex-col gap-y-1">
                        <span className="text-sm text-white">
                          History Report
                        </span>

                        <span className="text-sm text-white">
                          {version.checkedAt}
                        </span>
                      </div>

                      {/* <Link
                        to={`cis/${cis.id}/version/${version.version}`}
                        className="rounded-xl bg-orange-100 px-3.5 py-2.5 text-sm font-semibold text-orange-600 hover:bg-orange-200"
                      >
                        مشاهده
                      </Link> */}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </DialogBody>
    </Dialog>
  );
};
