const PatientCard = ({ patientData, logo }: any) => {
  return (
    <div className="relative max-w-sm w-full rounded-2xl shadow-lg font-sans text-white bg-gradient-to-br from-secondary to-secondary p-6 overflow-hidden min-h-[220px] flex flex-col justify-between">
      {/* Background Logo (Subtle watermark) */}
      <img
        src={logo}
        alt="Logo"
        className="absolute inset-0 w-full h-full object-contain opacity-10 z-0"
      />

      {/* Top Row */}
      <div className="relative z-10 flex justify-between items-start mb-6">
        <div>
          <p className="text-sm font-light text-black">Virtual Wellness Card</p>
        </div>
        <div>
          <img
            src={"/logo-without-name.png"}
            alt="Logo"
            // className="absolute inset-0 w-full h-full object-contain opacity-100 z-0"
            className="w-10 h-10 object-contain"
          />
        </div>
      </div>

      {/* Middle Info */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-start gap-2">
        <div>
          <p className="text-lg font-bold text-black">
            {patientData.uniqueNumber}
          </p>
        </div>

        <div className="mt-2">
          <p className="text-lg font-bold text-black">
            Name: {patientData.name}
          </p>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="relative z-10 flex justify-between items-end mt-6 text-sm">
        <div>
          <p>
            <span className="font-light text-black">
              Blood Group: {patientData.bloodGroup}
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="font-light text-black">DOB</p>
          <p className="font-semibold text-black">{patientData.dob}</p>
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
