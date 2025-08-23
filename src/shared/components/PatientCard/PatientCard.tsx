
const cardNumberFont = {
  fontFamily: '"OCR A Extended", "Consolas", "Menlo", "Monaco", monospace',
  letterSpacing: '0.18em',
};

const PatientCard = ({ patientData, logo }: any) => {
  return (
    <div
      className="relative max-w-md w-full rounded-3xl p-5 min-h-[150px] flex flex-col justify-between border border-blue-700/30 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a1836 60%, #1e3a8a 100%)',
        boxShadow: '0 8px 32px 0 #1e3a8a44, 0 1.5px 8px 0 #1e3a8a22, 0 0 0 2px #2563eb33',
      }}
    >
      {/* Neon/Glass Glow */}
      <div className="absolute inset-0 bg-blue-200/5 backdrop-blur-[8px] rounded-3xl z-0" />
      <div className="absolute -top-8 -left-8 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl z-0" />
      <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl z-0" />
      {/* Top Row */}
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <p className="text-base font-semibold tracking-widest text-blue-200 uppercase drop-shadow-sm">Virtual Wellness Card</p>
        </div>
        <img
          src={"/logo-without-name.png"}
          alt="Logo"
          className="w-10 h-10 object-contain drop-shadow-md"
        />
      </div>
      {/* Center Logo Watermark */}
      <img
        src={logo}
        alt="Logo"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 object-contain opacity-10 z-0 pointer-events-none select-none"
        draggable="false"
      />
      {/* Card Number & Name - card style */}
      <div className="relative z-10 flex flex-col items-start mt-2 mb-2 w-full">
        {/* Chip SVG */}
        <div className="mb-3 ml-1">
          <svg width="40" height="28" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="4" width="36" height="20" rx="6" fill="#FFD700" fillOpacity="0.7" stroke="#FFD700" strokeWidth="2"/>
            <rect x="10" y="10" width="20" height="8" rx="2" fill="#fff2b2" fillOpacity="0.5" />
            <rect x="16" y="12" width="8" height="4" rx="1" fill="#FFD700" fillOpacity="0.7" />
          </svg>
        </div>
        {/* Card Number */}
        <div className="text-[1.7rem] font-bold text-yellow-300 mb-2 select-text" style={cardNumberFont}>
          {String(patientData.uniqueNumber).replace(/(.{4})/g, '$1 ').trim()}
        </div>
        {/* Cardholder Name */}
        <div className="text-xs text-blue-200 tracking-widest mt-2 ml-1">CARDHOLDER NAME</div>
        <div className="text-lg font-semibold text-blue-100 tracking-wide ml-1">{patientData.name}</div>
      </div>
      {/* Divider */}
      <div className="relative z-10 my-3 w-full h-[1.5px] bg-gradient-to-r from-blue-400/40 via-blue-700/40 to-blue-900/0 rounded-full" />
      {/* Bottom Row */}
      <div className="relative z-10 flex justify-between items-end text-base mt-1">
        <span className="text-blue-300 font-semibold">Blood Group: <span className="font-bold text-blue-100">{patientData.bloodGroup}</span></span>
        <span className="text-blue-300 font-semibold">DOB <span className="font-bold text-blue-100">{patientData.dob}</span></span>
      </div>
    </div>
  );
};

export default PatientCard;
