const PATIENT_API_ENDPOINTS = {
    GET_PATIENT: "/identity/patient",
    CREATE_PATIENT: "/auth/register",
    UPDATE_PATIENT: "/patients/",
    DELETE_PATIENT: "/patients/",
    FETCH_REPORTS: "/reports/patient",
    PATIENT_REPORT_CREATE: "/reports/upload",
    PATIENT_REPORT_DELETE: "/reports",
    FETCH_CHAT: "/chat",
    SENT_NEW_MESSAGE: "/auth/chat",
    FETCH_CONVERSATION: "/auth/chat-history",
    FETCH_ANALYSIS: "/auth/analyse-report"
};

export default PATIENT_API_ENDPOINTS;
