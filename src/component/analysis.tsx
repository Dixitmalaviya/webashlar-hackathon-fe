import React, { useState, useMemo } from 'react';
import { LineChart, Line, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, Cell } from 'recharts';
import { Activity, CheckCircle, Info, TrendingUp } from 'lucide-react';
import PatientService from '../service/Patient/PatientService';
import { useLocation } from 'react-router-dom';

// Theme-based color palette
const themeColors = {
    background: 'bg-gray-50', // Tailwind class or use hex: '#f8fafc'
    card: 'bg-white',
    primary: '#141414',
    accent: '#38bdf8', // Tailwind sky-400 or your preferred theme accent
    secondary: '#d9ebfe',
    border: '#e5e7eb',
    shadow: 'shadow-sm',
};


// const actualPatientData = {
//     patientDetails: {
//         name: 'Yash M. Patel',
//         age: '21 Years',
//         sex: 'Male',
//         pid: '555',
//     },
//     doctorDetails: {
//         referredBy: 'Dr. Hiren Shah',
//     },
//     reports: [
//         {
//             testName: 'Complete Blood Count (CBC)',
//             dateReported: '02 Dec, 2X',
//             timeReported: '04:35 PM',
//             abnormalFindings: [
//                 {
//                     investigation: 'HEMOGLOBIN',
//                     result: 12.5,
//                     unit: 'g/dL',
//                     status: 'Low',
//                     referenceValue: '13.0-17.0',
//                 },
//                 {
//                     investigation: 'Packed Cell Volume (PCV)',
//                     result: 57.5,
//                     unit: '%',
//                     status: 'High',
//                     referenceValue: '40-50',
//                 },
//                 {
//                     investigation: 'Platelet Count',
//                     result: 150000,
//                     unit: 'cumm',
//                     status: 'Borderline',
//                     referenceValue: '150000-410000',
//                 },
//             ],
//             interpretation:
//                 'Further confirm for Anemia. Low hemoglobin/hematocrit can indicate anemia.',
//             trends: [],
//         },
//         {
//             testName: 'THYROID PROFILE, TOTAL',
//             dateReported: '02 Dec, 2X',
//             timeReported: '04:35 PM',
//             abnormalFindings: [
//                 {
//                     investigation: 'T3, TOTAL, SERUM',
//                     result: 217.4,
//                     unit: 'ng/dL',
//                     status: 'High',
//                     referenceValue: '80.00-200.00',
//                 },
//                 {
//                     investigation: 'T4, TOTAL, SERUM',
//                     result: 13.6,
//                     unit: 'mcg/dL',
//                     status: 'High',
//                     referenceValue: '4.50-12.50',
//                 },
//                 {
//                     investigation: 'TSH',
//                     result: 10.1,
//                     unit: 'mU/L',
//                     status: 'High',
//                     referenceValue: '0.40-4.00',
//                 },
//             ],
//             interpretation:
//                 'Abnormal thyroid hormone levels (e.g. TSH) can indicate thyroid disorders.',
//             trends: [],
//         },
//         {
//             testName: 'THYROID ANTIBODIES',
//             dateReported: '02 Dec, 2X',
//             timeReported: '04:35 PM',
//             abnormalFindings: [
//                 {
//                     investigation: 'ANTI THYROGLOBULIN ANTIBODY (ANTI - Tg)',
//                     result: 217.4,
//                     unit: 'U/mL',
//                     status: 'High',
//                     referenceValue: '< 60.00',
//                 },
//                 {
//                     investigation: 'ANTI THYROID PEROXIDASE ANTIBODY (ANTI TPO)',
//                     result: 128.0,
//                     unit: 'U/mL',
//                     status: 'High',
//                     referenceValue: '< 60.00',
//                 },
//             ],
//             interpretation:
//                 'Increased levels of these antibodies confirm autoimmune thyroid disease such as Hashimoto thyroiditis or Graves disease. Anti TPO is a more specific method for measuring thyroid antibodies.',
//             trends: [],
//         },
//         {
//             testName: 'DENGUE FEVER PANEL',
//             dateReported: '02 Dec, 2X',
//             timeReported: '04:35 PM',
//             abnormalFindings: [
//                 {
//                     investigation: 'DENGUE FEVER ANTIBODY, IgG, SERUM',
//                     result: 25.0,
//                     unit: 'Index',
//                     status: 'Positive (> 2.20)',
//                     referenceValue: 'Index',
//                 },
//                 {
//                     investigation: 'DENGUE FEVER ANTIBODY, IgM, SERUM',
//                     result: 21.0,
//                     unit: 'Index',
//                     status: 'Positive (> 1.10)',
//                     referenceValue: 'Index',
//                 },
//             ],
//             interpretation:
//                 'IgG antibody detected, indicating presumptive evidence of recent exposure to or current infection with the dengue virus. IgM antibody detected, suggestive of primary or secondary dengue infection.',
//             trends: [],
//         },
//     ],
//     overallAnalysis: {
//         summary:
//             'This is a summary of all lab reports. The CBC results suggest potential anemia, requiring further investigation. The thyroid reports for T3, T4, TSH, and thyroid antibodies indicate a high probability of autoimmune thyroid disease, such as Hashimoto thyroiditis. The Dengue Fever Panel is positive for both IgG and IgM antibodies, suggesting a recent or current dengue infection.',
//         recommendations:
//             'Based on the findings, it is recommended to follow up with the referring doctor, Dr. Hiren Shah, to discuss the results and confirm diagnoses for anemia, thyroid disease, and dengue fever. The AI can highlight these key findings to both the patient and doctor to aid in decision-making.',
//         longTermTrends:
//             'For future analysis, the system will track key values like Hemoglobin, TSH, and antibody levels over time to show trends and evaluate the effectiveness of any treatment plans.',
//     },
// };


interface AnalysisProps {
    patientData?: any;
}

const Analysis: React.FC<AnalysisProps> = ({ patientData: propPatientData }) => {
    const [selectedFilter, _setSelectedFilter] = useState('All Tests');
    const [patientData, setPatientData] = useState<any>(null);
    const location = useLocation();
    const state = location.state;

    const fetchAnalysisData = async () => {
        const reqObj = {
            patientId: localStorage.getItem('patientId'),
            "fromDate": state?.startDate || "2021-07-01",
            "toDate": state?.endDate || "2030-08-30"
        }
        const response = await PatientService.fetchPatientAnalysisData(reqObj);
        debugger
        if (response?.status === 200) {
            console.log("response", response)
            setPatientData(response.data?.data);
        } else {
            setPatientData(null);
        }
    }

    React.useEffect(() => {
 
            fetchAnalysisData();
    }, []);

    const processPatientData = useMemo(() => {
        if (!patientData) return null;

        const allFindings: any[] = [];
        const categoryMap = new Map();
        const statusCounts = { High: 0, Low: 0, Borderline: 0, Normal: 0, Positive: 0, Negative: 0 };
        const severityCounts: any = { high: 0, moderate: 0, low: 0 };

        patientData.reports?.forEach((report: any, reportIndex: number) => {
            const detectCategory = (testName: string) => {
                const name = testName.toLowerCase();
                if (name.includes('blood') || name.includes('cbc') || name.includes('hemoglobin')) return 'Hematology';
                if (name.includes('thyroid') || name.includes('tsh') || name.includes('t3') || name.includes('t4')) return 'Endocrinology';
                if (name.includes('liver') || name.includes('sgpt') || name.includes('sgot')) return 'Biochemistry';
                if (name.includes('dengue') || name.includes('antibody') || name.includes('igg') || name.includes('igm')) return 'Infectious Disease';
                if (name.includes('cardiac') || name.includes('heart') || name.includes('troponin')) return 'Cardiology';
                if (name.includes('kidney') || name.includes('creatinine') || name.includes('urea')) return 'Nephrology';
                return report.category || 'General';
            };

            const category = detectCategory(report.testName || 'Unknown Test');
            if (!categoryMap.has(category)) {
                categoryMap.set(category, {
                    name: category,
                    count: 0,
                    findings: [],
                    reports: [],
                });
            }
            const categoryData = categoryMap.get(category);
            categoryData.reports.push(report);

            report.abnormalFindings?.forEach((finding: any, findingIndex: number) => {
                const parseReferenceRange = (refValue: string) => {
                    if (!refValue || typeof refValue !== 'string') return { min: 0, max: 100 };
                    if (refValue.toLowerCase().includes('index')) {
                        return { min: 0, max: 50 };
                    }
                    if (refValue.includes('-')) {
                        const range = refValue.split('-').map(v => parseFloat(v.replace(/[<>]/g, '').trim()));
                        return { min: range[0] || 0, max: range[1] || 100 };
                    } else if (refValue.includes('<')) {
                        const max = parseFloat(refValue.replace('<', '').trim()) || 100;
                        return { min: 0, max };
                    } else if (refValue.includes('>')) {
                        const min = parseFloat(refValue.replace('>', '').trim()) || 0;
                        return { min, max: Math.max(min * 2, 100) };
                    }
                    const singleValue = parseFloat(refValue.trim());
                    if (!isNaN(singleValue)) {
                        return { min: 0, max: singleValue * 1.5 };
                    }
                    return { min: 0, max: 100 };
                };

                const detectSeverity = (status: string, result: number, range: { min: number; max: number }) => {
                    if (finding.severity) return finding.severity;
                    const statusLower = status?.toLowerCase() || '';
                    if (statusLower.includes('positive')) return 'high';
                    if (statusLower.includes('high')) {
                        const deviation = result / range.max;
                        if (deviation > 2) return 'high';
                        if (deviation > 1.5) return 'moderate';
                        return 'low';
                    }
                    if (statusLower.includes('low')) {
                        const deviation = range.min / result;
                        if (deviation > 2) return 'high';
                        if (deviation > 1.5) return 'moderate';
                        return 'low';
                    }
                    return 'low';
                };

                const range = parseReferenceRange(finding.referenceValue);
                const severity = detectSeverity(finding.status, finding.result, range);

                const processedFinding = {
                    id: `${reportIndex}-${findingIndex}`,
                    investigation: finding.investigation || 'Unknown Test',
                    shortName: (finding.investigation || 'Test').substring(0, 10).replace(/[^a-zA-Z0-9]/g, ''),
                    result: finding.result || 0,
                    unit: finding.unit || '',
                    status: finding.status || 'Normal',
                    severity: severity,
                    referenceValue: finding.referenceValue || '',
                    minRef: range.min,
                    maxRef: range.max,
                    category: category,
                    reportIndex: reportIndex,
                    testName: report.testName,
                    date: report.dateReported || '',
                    time: report.timeReported || '',
                    interpretation: report.interpretation || '',
                };

                allFindings.push(processedFinding);
                categoryData.findings.push(processedFinding);
                categoryData.count++;

                const status = finding.status || 'Normal';
                if (status.toLowerCase().includes('high')) statusCounts.High++;
                else if (status.toLowerCase().includes('low')) statusCounts.Low++;
                else if (status.toLowerCase().includes('borderline')) statusCounts.Borderline++;
                else if (status.toLowerCase().includes('positive')) statusCounts.Positive++;
                else if (status.toLowerCase().includes('negative')) statusCounts.Negative++;
                else statusCounts.Normal++;

                if (severityCounts.hasOwnProperty(severity)) {
                    severityCounts[severity]++;
                }
            });
        });

        return {
            allFindings,
            categories: Array.from(categoryMap.values()),
            statusCounts,
            severityCounts,
            totalReports: patientData.reports?.length || 0,
            totalFindings: allFindings.length,
        };
    }, [patientData]);

    if (!patientData || !processPatientData) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#f8fafc' }}>
                <div className="text-center">
                    <Activity className="w-12 h-12 mx-auto mb-4" style={{ color: '#141414' }} />
                    <p className="text-lg" style={{ color: '#141414' }}>Loading patient data...</p>
                </div>
            </div>
        );
    }

    const { allFindings, categories, statusCounts, totalReports, totalFindings } = processPatientData;

    // function getIconForCategory(categoryName: string) {
    //     const name = categoryName.toLowerCase();
    //     if (name.includes('blood') || name.includes('hematology') || name.includes('cbc') || name.includes('hemoglobin')) return Droplets;
    //     if (name.includes('thyroid') || name.includes('endocrin') || name.includes('tsh')) return Thermometer;
    //     if (name.includes('liver') || name.includes('biochem') || name.includes('sgpt')) return Activity;
    //     if (name.includes('cardiac') || name.includes('heart') || name.includes('troponin')) return Heart;
    //     if (name.includes('infectious') || name.includes('dengue') || name.includes('antibody')) return AlertTriangle;
    //     if (name.includes('kidney') || name.includes('nephro') || name.includes('creatinine')) return Droplets;
    //     return Activity;
    // }

    const filteredFindings = selectedFilter === 'All Tests'
        ? allFindings
        : allFindings.filter(finding => finding.category === selectedFilter);

    const prepareChartData = (findings: any[]) => {
        return findings.map(finding => ({
            name: finding.shortName,
            fullName: finding.investigation,
            value: finding.result,
            status: finding.status,
            severity: finding.severity,
            unit: finding.unit,
        }));
    };

    const statusDistribution = Object.entries(statusCounts)
        .filter(([_, count]) => count > 0)
        .map(([status, count]) => ({
            name: status,
            value: count,
            color: getStatusColor(status),
        }));

    function getStatusColor(status: string) {
        const statusLower = status.toLowerCase();
        if (statusLower.includes('high') || statusLower.includes('positive')) return themeColors.accent;
        if (statusLower.includes('low')) return themeColors.secondary;
        if (statusLower.includes('borderline')) return themeColors.accent;
        return themeColors.secondary;
    }

    const getChartForCategory = (categoryData: any, index: number) => {
        const chartData = prepareChartData(categoryData.findings.slice(0, 6));
        const chartTypes = ['line', 'bar', 'area'];
        const chartType = chartTypes[index % chartTypes.length];
        const chartHeight = 150;
        const commonProps = { data: chartData };
        switch (chartType) {
            case 'line':
                return (
                    <ResponsiveContainer width="100%" height={chartHeight}>
                        <LineChart {...commonProps}>
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#141414"
                                strokeWidth={2}
                                dot={{ fill: themeColors.accent, r: 3 }}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload[0]) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="bg-white p-2 border rounded shadow-lg">
                                                <p className="font-semibold">{data.fullName}</p>
                                                <p>{data.value} {data.unit}</p>
                                                <p className="text-sm text-gray-600">{data.status}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                );
            case 'bar':
                return (
                    <ResponsiveContainer width="100%" height={chartHeight}>
                        <BarChart {...commonProps} barCategoryGap="20%">
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                {chartData.map((entry, i) => (
                                    <Cell key={`cell-${i}`} fill={getStatusColor(entry.status)} />
                                ))}
                            </Bar>
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload[0]) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="bg-white p-2 border rounded shadow-lg">
                                                <p className="font-semibold">{data.fullName}</p>
                                                <p>{data.value} {data.unit}</p>
                                                <p className="text-sm text-gray-600">{data.status}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                );
            case 'area':
                return (
                    <ResponsiveContainer width="100%" height={chartHeight}>
                        <AreaChart {...commonProps}>
                            <defs>
                                <linearGradient id={`colorArea-${index}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#d9ebfe" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#d9ebfe" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#d9ebfe"
                                fillOpacity={1}
                                fill={`url(#colorArea-${index})`}
                                strokeWidth={2}
                            />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload[0]) {
                                        const data = payload[0].payload;
                                        return (
                                            <div className="bg-white p-2 border rounded shadow-lg">
                                                <p className="font-semibold">{data.fullName}</p>
                                                <p>{data.value} {data.unit}</p>
                                                <p className="text-sm text-gray-600">{data.status}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                );
            default:
                return <div className="h-32 flex items-center justify-center text-gray-500">No data</div>;
        }
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="mt-8 bg-white rounded-3xl p-6 shadow-sm">
                    <div className="grid grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4" style={{ color: '#141414' }}>
                                Patient: {patientData.patientDetails?.name || 'Unknown'}
                            </h3>
                            <div className="space-y-2 text-sm" style={{ color: '#141414' }}>
                                <p>Age: {patientData.patientDetails?.age || 'N/A'}</p>
                                <p>Gender: {patientData.patientDetails?.sex || 'N/A'}</p>
                                <p>Patient ID: {patientData.patientDetails?.pid || 'N/A'}</p>
                                <p>Referred by: {patientData.doctorDetails?.referredBy || 'N/A'}</p>
                                <p>Total Reports: {totalReports}</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4" style={{ color: '#141414' }}>Clinical Summary</h3>
                            <p className="text-sm leading-relaxed" style={{ color: '#141414' }}>
                                {patientData.overallAnalysis?.summary || 'No summary available'}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4" style={{ color: '#141414' }}>Critical Findings</h3>
                            <div className="space-y-2">
                                {categories.slice(0, 4).map((category, index) => {
                                    const criticalCount = category.findings.filter((finding: any) =>
                                        finding.status === 'High' || finding.status.includes('Positive') || finding.severity === 'high'
                                    ).length;
                                    return (
                                        <div key={index} className="flex items-center justify-between p-2 rounded-lg" style={{ backgroundColor: '#d9ebfe' }}>
                                            <span className="text-sm font-medium" style={{ color: '#141414' }}>
                                                {category.name}
                                            </span>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs font-semibold px-2 py-1 rounded-full"
                                                    style={{
                                                        backgroundColor: criticalCount > 0 ? themeColors.accent : themeColors.secondary,
                                                        color: '#141414',
                                                    }}>
                                                    {criticalCount} critical
                                                </span>
                                                {criticalCount > 0 ? (
                                                    <TrendingUp className="w-4 h-4" style={{ color: themeColors.accent }} />
                                                ) : (
                                                    <CheckCircle className="w-4 h-4" style={{ color: '#d9ebfe' }} />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-6 mt-5">
                    {categories.slice(0, 4).map((category, index) => (
                        <div key={index} className="col-span-4 bg-white rounded-3xl p-6 shadow-sm">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2" style={{ color: '#141414' }}>
                                    {category.name}
                                </h3>
                                <p className="text-sm text-gray-600">{category.count} findings</p>
                            </div>
                            <div className="mb-6">
                                {getChartForCategory(category, index)}
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-center">
                                {category.findings.slice(0, 2).map((finding: any, fIndex: number) => (
                                    <div key={fIndex}>
                                        <p className="text-xs mb-1" style={{ color: '#141414' }}>
                                            {finding.shortName}
                                        </p>
                                        <p className="text-lg font-bold" style={{ color: '#141414' }}>
                                            {finding.result}
                                        </p>
                                        <p className="text-xs" style={{ color: getStatusColor(finding.status) }}>
                                            {finding.status}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div className="col-span-8 rounded-3xl p-6 text-white" style={{ backgroundColor: '#141414' }}>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold">
                                {selectedFilter === 'All Tests' ? 'All Test Results' : `${selectedFilter} Results`}
                            </h3>
                            <div className="flex space-x-4 text-sm">
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#d9ebfe' }}></div>
                                    <span className="text-gray-400">Normal</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: themeColors.accent }}></div>
                                    <span className="text-gray-400">Borderline</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: themeColors.accent }}></div>
                                    <span className="text-gray-400">Abnormal</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-end justify-between h-32 mb-4">
                            {filteredFindings.slice(0, 12).map((finding, index) => (
                                <div key={index} className="flex flex-col items-center group relative">
                                    <div
                                        className="rounded-xl flex items-center justify-center text-white font-semibold mb-2 text-xs transition-all group-hover:scale-110 cursor-pointer"
                                        style={{
                                            backgroundColor: getStatusColor(finding.status),
                                            width: '32px',
                                            height: `${Math.min(Math.max((finding.result / (finding.maxRef || 100)) * 80, 20), 100)}px`,
                                            minHeight: '24px',
                                        }}
                                        title={`${finding.investigation}: ${finding.result} ${finding.unit}`}
                                    >
                                        <span className="transform rotate-90 text-xs">
                                            {Math.round(finding.result)}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-400 transform -rotate-45 origin-left">
                                        {finding.shortName}
                                    </div>
                                    <div className="absolute bottom-full mb-2 hidden group-hover:block text-white p-2 rounded text-xs whitespace-nowrap z-10" style={{ backgroundColor: '#141414' }}>
                                        <div className="font-semibold">{finding.investigation}</div>
                                        <div>{finding.result} {finding.unit}</div>
                                        <div className="text-gray-300">{finding.status}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-4 bg-white rounded-3xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold" style={{ color: '#141414' }}>Status Overview</h3>
                            <div className="text-sm" style={{ color: '#141414' }}>
                                Total: {totalFindings}
                            </div>
                        </div>
                        {statusDistribution.length > 0 ? (
                            <div className="space-y-4">
                                {statusDistribution.map((status, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3 flex-1">
                                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: status.color }}></div>
                                            <span className="text-sm font-medium" style={{ color: '#141414' }}>{status.name}</span>
                                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all duration-500"
                                                    style={{
                                                        backgroundColor: status.color,
                                                        width: `${(status.value / totalFindings) * 100}%`,
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                        <span className="text-lg font-bold ml-4" style={{ color: '#141414' }}>
                                            {status.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 py-8">
                                <Info className="w-8 h-8 mx-auto mb-2" />
                                <p>No abnormal findings</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analysis;
