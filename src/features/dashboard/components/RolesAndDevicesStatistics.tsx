export const RolesAndDevicesStatistics = () => {
  return (
    <section className="relative col-start-3 col-span-1 p-6 rounded-2xl space-y-2 bg-linear-to-r from-60% from-gray-darker/5 to-gray-darker/75">
      {/* Header */}
      <span className="text-sm font-semibold">
        Statistics of roles and devices
      </span>

      {/* Rolles section */}
      <div className="flex items-center justify-between border-b border-b-default">
        <div className="flex items-center">
          <img
            src="/icons/identityCard.svg"
            alt="identity card icon"
            className="size-18 mt-4"
          />
          <p className="max-w-25 text-sm">
            <span className="font-bold">Roles</span> in the entire system
          </p>
        </div>
        <span className="text-6xl text-orange font-bold">154</span>
      </div>

      {/* Devices section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/icons/server.svg"
            alt="identity card icon"
            className="size-18 mt-4"
          />
          <p className="max-w-25 text-sm">
            <span className="font-bold">Roles</span> in the entire system
          </p>
        </div>
        <span className="text-6xl text-primary font-bold">31</span>
      </div>

      <img
        src="/images/rolesAndDevices.png"
        alt="roles and devices image"
        className="absolute inset-0 opacity-50"
      />
    </section>
  );
};
