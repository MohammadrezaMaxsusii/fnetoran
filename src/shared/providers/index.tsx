import type { ReactNode } from "react";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import { QueryProvider } from "./QueryProvider";

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <BrowserRouter>
      <QueryProvider>
        {children}

        {/* Toast section */}
        <Toaster
          position="top-center"
          toastOptions={{
            className:
              "bg-gray-darker! border-default! flex! items-center! gap-20! px-4! py-0! w-70! h-17! overflow-hidden! rounded-lg!",
          }}
          icons={{
            success: (
              <div className="bg-[#09200F] p-5 rounded-full">
                <img
                  src="/icons/success.svg"
                  alt="success icon"
                  className="size-10!"
                />
              </div>
            ),
            error: (
              <div className="bg-[#2C0D11] p-5 rounded-full">
                <img
                  src="/icons/fail.svg"
                  alt="error icon"
                  className="size-10!"
                />
              </div>
            ),
          }}
        />
      </QueryProvider>
    </BrowserRouter>
  );
};
