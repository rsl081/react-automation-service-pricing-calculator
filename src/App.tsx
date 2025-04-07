// App.tsx
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Select, { MultiValue } from "react-select";
import "./App.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type ExperienceLevel = "Beginner" | "Intermediate" | "Advanced" | "Expert";
type MarketLocation =
  | "North America"
  | "Europe"
  | "Asia"
  | "Australia/NZ"
  | "South America"
  | "Africa"
  | "Global";
type TabType = "basic" | "advanced" | "market";

type OptionType = {
  value: string;
  label: string;
};

const serviceOptions: OptionType[] = [
  { value: "Email Automation", label: "Email Automation" },
  { value: "Social Media Automation", label: "Social Media Automation" },
  { value: "Data Processing", label: "Data Processing" },
  { value: "Workflow Automation", label: "Workflow Automation" },
  { value: "ChatBot Creation", label: "ChatBot Creation" },
  { value: "Document Automation", label: "Document Automation" },
  { value: "Lead Generation Automation", label: "Lead Generation Automation" },
  {
    value: "Customer Service Automation",
    label: "Customer Service Automation",
  },
];

const toolOptions: OptionType[] = [
  { value: "Zapier", label: "Zapier" },
  { value: "Make (Integromat)", label: "Make (Integromat)" },
  { value: "IFTTT", label: "IFTTT" },
  { value: "n8n", label: "n8n" },
  { value: "Microsoft Power Automate", label: "Microsoft Power Automate" },
  { value: "UiPath", label: "UiPath" },
  { value: "Python", label: "Python" },
  { value: "JavaScript", label: "JavaScript" },
  { value: "ChatGPT/Claude AI", label: "ChatGPT/Claude AI" },
  { value: "Custom Development", label: "Custom Development" },
];

const customStylesForSelect = {
  control: (base: any) => ({
    ...base,
    backgroundColor: "#1E1F26",
    borderColor: "#444",
    minHeight: "38px",
    boxShadow: "none",
    color: "#FAFAFA",
    "&:hover": {
      borderColor: "#666",
    },
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: "#2a2b30",
    zIndex: 99,
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#343540"
      : state.isFocused
      ? "#3a3b45"
      : "transparent",
    color: "#FAFAFA",
    cursor: "pointer",
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: "#EB144C",
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: "#fff",
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: "#fff",
    ":hover": {
      backgroundColor: "#C8102E",
      color: "#fff",
    },
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "#AAA",
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    color: "#AAA",
    ":hover": {
      color: "#FAFAFA",
    },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};

const App: React.FC = () => {
  // Replace the dropdown for Experience Level with a slider.
  // Use a numeric value (1: Beginner, 2: Intermediate, 3: Advanced, 4: Expert)
  const [experienceValue, setExperienceValue] = useState<number>(2);
  const getExperienceLabel = (val: number): ExperienceLevel => {
    if (val === 1) return "Beginner";
    if (val === 2) return "Intermediate";
    if (val === 3) return "Advanced";
    return "Expert";
  };
  const experienceLevel = getExperienceLabel(experienceValue);

  // Basic Calculator States
  const [serviceType, setServiceType] = useState<OptionType[]>([
    { value: "Email Automation", label: "Email Automation" },
  ]);
  const [complexity, setComplexity] = useState<number>(5);
  const [timeRequired, setTimeRequired] = useState<number>(20);
  const [ongoingMaintenance, setOngoingMaintenance] = useState<boolean>(false);
  const [maintenanceHours, setMaintenanceHours] = useState<number>(5);
  const [location, setLocation] = useState<MarketLocation>("North America");
  // Change toolsUsed to OptionType[]
  const [toolsUsed, setToolsUsed] = useState<OptionType[]>([
    { value: "Zapier", label: "Zapier" },
  ]);

  // Advanced Calculator States
  const [revenueImpact, setRevenueImpact] = useState<number>(10000);
  const [timeSavings, setTimeSavings] = useState<number>(20);
  const [clientHourlyValue, setClientHourlyValue] = useState<number>(50);
  const [integrationCount, setIntegrationCount] = useState<number>(2);
  const [customCoding, setCustomCoding] = useState<boolean>(false);
  const [trainingRequired, setTrainingRequired] = useState<boolean>(false);
  const [monthlyActiveUsers, setMonthlyActiveUsers] = useState<number>(10);

  // Tab state: "basic", "advanced", or "market"
  const [activeTab, setActiveTab] = useState<TabType>("basic");

  // Calculation logic
  const hourlyRates: Record<ExperienceLevel, number> = {
    Beginner: 25,
    Intermediate: 50,
    Advanced: 85,
    Expert: 150,
  };

  const locationModifier: Record<MarketLocation, number> = {
    "North America": 1.0,
    Europe: 0.9,
    Asia: 0.7,
    "Australia/NZ": 0.95,
    "South America": 0.65,
    Africa: 0.6,
    Global: 0.85,
  };

  const complexityModifier = 0.8 + complexity * 0.04;
  const baseRate =
    hourlyRates[experienceLevel] *
    locationModifier[location] *
    complexityModifier;
  const toolsPremium =
    toolsUsed.length > 1 ? 1.0 + 0.05 * (toolsUsed.length - 1) : 1.0;
  const adjustedHourlyRate = baseRate * toolsPremium;
  const projectTotal = adjustedHourlyRate * timeRequired;
  const monthlyMaintenanceFee = ongoingMaintenance
    ? adjustedHourlyRate * maintenanceHours
    : 0;

  // Advanced calculations
  const annualTimeSavingsValue = timeSavings * 12 * clientHourlyValue;
  const totalValue = revenueImpact + annualTimeSavingsValue;
  const baseProjectCost = projectTotal;
  const integrationCost = 200 * integrationCount;
  const customCodeCost = customCoding ? 2000 : 0;
  const trainingCost = trainingRequired ? 500 : 0;
  const userScaleCost = 10 * monthlyActiveUsers;
  const enhancedProjectCost =
    baseProjectCost +
    integrationCost +
    customCodeCost +
    trainingCost +
    userScaleCost;
  const conservativeValuePrice = enhancedProjectCost + totalValue * 0.05;
  const moderateValuePrice = enhancedProjectCost + totalValue * 0.1;
  const aggressiveValuePrice = enhancedProjectCost + totalValue * 0.2;
  const monthlySubscription =
    enhancedProjectCost * 0.1 + monthlyMaintenanceFee * 1.2;

  // Market Data for chart and table
  const marketLabels = [
    "Email Automation",
    "Social Media Automation",
    "Data Processing",
    "Workflow Automation",
    "ChatBot Creation",
    "Document Automation",
    "Lead Generation",
    "Customer Service Automation",
  ];
  const marketData = {
    labels: marketLabels,
    datasets: [
      {
        label: "Entry Level",
        data: [25, 30, 20, 35, 40, 25, 30, 35],
        backgroundColor: "rgba(75,192,192,0.4)",
      },
      {
        label: "Mid Level",
        data: [50, 60, 45, 70, 80, 55, 65, 75],
        backgroundColor: "rgba(153,102,255,0.4)",
      },
      {
        label: "Expert Level",
        data: [90, 100, 85, 120, 150, 95, 110, 130],
        backgroundColor: "rgba(255,159,64,0.4)",
      },
    ],
  };

  const marketOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Automation Service Rates by Type and Experience Level",
      },
    },
  };

  // Generate HTML report and trigger download
  const generatePricingHTML = (): string => {
    return `
      <html>
      <head><title>Pricing Report</title></head>
      <body>
        <h1>Automation Service Pricing Report</h1>
        <p><strong>Experience Level:</strong> ${experienceLevel}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Hours Required:</strong> ${timeRequired}</p>
        <p><strong>Complexity:</strong> ${complexity}</p>
        <p><strong>Ongoing Maintenance:</strong> ${
          ongoingMaintenance ? "Yes" : "No"
        }</p>
        <p><strong>Maintenance Hours:</strong> ${maintenanceHours}</p>
        <p><strong>Type of Automation Services:</strong> ${serviceType
          .map((opt) => opt.value)
          .join(", ")}</p>
        <p><strong>Hourly Rate:</strong> $${adjustedHourlyRate.toFixed(2)}</p>
        <p><strong>Project Total:</strong> $${projectTotal.toFixed(2)}</p>
        <p><strong>Monthly Maintenance Fee:</strong> $${monthlyMaintenanceFee.toFixed(
          2
        )}</p>
      </body>
      </html>
    `;
  };

  const downloadReport = (): void => {
    const element = document.createElement("a");
    const file = new Blob([generatePricingHTML()], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = "automation_pricing_report.html";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🤖 Automation Service Pricing Calculator</h1>
        <p>
          This calculator helps freelancers, VAs, and automation specialists
          determine optimal pricing for their services.
        </p>
      </header>

      <div className="tabs">
        <button
          onClick={() => setActiveTab("basic")}
          className={activeTab === "basic" ? "active" : ""}
        >
          Basic Calculator
        </button>
        <button
          onClick={() => setActiveTab("advanced")}
          className={activeTab === "advanced" ? "active" : ""}
        >
          Advanced Calculator
        </button>
        <button
          onClick={() => setActiveTab("market")}
          className={activeTab === "market" ? "active" : ""}
        >
          Market Insights
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "basic" && (
          <div className="basic-container">
            <div className="inputs">
              <h3>Your Inputs</h3>
              <div>
                <label>Experience Level:</label>
                {/* Replaced dropdown with slider for Experience Level */}
                <div className="slider-label">{experienceLevel}</div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  value={experienceValue}
                  onChange={(e) => setExperienceValue(Number(e.target.value))}
                  className="experience-slider"
                />
                <div className="slider-legend">
                  <span>Beginner</span>
                  <span>Expert</span>
                </div>
              </div>
              <div>
                <label>Type of Automation Services:</label>
                <Select
                  isMulti
                  value={serviceType}
                  onChange={(selectedOptions: MultiValue<OptionType>) =>
                    setServiceType(selectedOptions as OptionType[])
                  }
                  options={serviceOptions}
                  styles={customStylesForSelect}
                  placeholder="Select services..."
                  menuPlacement="auto"
                />
              </div>
              <div>
                <label>Project Complexity: {complexity}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={complexity}
                  onChange={(e) => setComplexity(parseInt(e.target.value))}
                />
              </div>
              <div>
                <label>Estimated Hours Required:</label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={timeRequired}
                  onChange={(e) => setTimeRequired(parseInt(e.target.value))}
                />
              </div>
              <div>
                <label>Includes Ongoing Maintenance:</label>
                <input
                  type="checkbox"
                  checked={ongoingMaintenance}
                  onChange={(e) => setOngoingMaintenance(e.target.checked)}
                />
              </div>
              {ongoingMaintenance && (
                <div>
                  <label>Monthly Maintenance Hours:</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={maintenanceHours}
                    onChange={(e) =>
                      setMaintenanceHours(parseInt(e.target.value))
                    }
                  />
                </div>
              )}
              <div>
                <label>Your Primary Market:</label>
                <select
                  value={location}
                  onChange={(e) =>
                    setLocation(e.target.value as MarketLocation)
                  }
                >
                  <option value="North America">North America</option>
                  <option value="Europe">Europe</option>
                  <option value="Asia">Asia</option>
                  <option value="Australia/NZ">Australia/NZ</option>
                  <option value="South America">South America</option>
                  <option value="Africa">Africa</option>
                  <option value="Global">Global</option>
                </select>
              </div>
              <div>
                <label>Tools & Technologies Used:</label>
                {/* Replaced native multi-select with react-select for Tools */}
                <Select
                  isMulti
                  value={toolsUsed}
                  onChange={(selectedOptions: MultiValue<OptionType>) =>
                    setToolsUsed(selectedOptions as OptionType[])
                  }
                  options={toolOptions}
                  styles={customStylesForSelect}
                  placeholder="Select tools..."
                  menuPlacement="auto"
                />
              </div>
            </div>
            <div className="results">
              <h3>Recommended Pricing</h3>
              <div className="metrics">
                <div>
                  <strong>Hourly Rate:</strong> ${adjustedHourlyRate.toFixed(2)}
                  {toolsUsed.length > 1 && (
                    <span>
                      {" "}
                      (+{((toolsPremium - 1) * 100).toFixed(0)}% tool premium)
                    </span>
                  )}
                </div>
                <div>
                  <strong>Project Total:</strong> ${projectTotal.toFixed(2)}
                </div>
                <div>
                  {ongoingMaintenance ? (
                    <div>
                      <strong>Monthly Maintenance:</strong> $
                      {monthlyMaintenanceFee.toFixed(2)}
                    </div>
                  ) : (
                    <div>No ongoing maintenance</div>
                  )}
                </div>
              </div>
              <hr />
              <h3>Pricing Structure Options</h3>
              <div className="pricing-box">
                <h4>Package Pricing</h4>
                <ul>
                  <li>
                    <strong>Basic Package:</strong> $
                    {(projectTotal * 0.8).toFixed(2)}
                  </li>
                  <li>
                    <strong>Standard Package:</strong> $
                    {projectTotal.toFixed(2)}
                  </li>
                  <li>
                    <strong>Premium Package:</strong>{" "}
                    {(projectTotal * 1.2).toFixed(2)} (includes priority
                    support)
                  </li>
                </ul>
              </div>
              <div className="pricing-box">
                <h4>Value-Based Pricing Option</h4>
                <ul>
                  <li>
                    <strong>Value-Based Price:</strong> $
                    {(projectTotal * 1.5).toFixed(2)} - $
                    {(projectTotal * 3).toFixed(2)}
                  </li>
                  <li>
                    <strong>ROI-Based Price:</strong> ${projectTotal.toFixed(2)}{" "}
                    + 5-10% of demonstrated savings or revenue generated
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {activeTab === "advanced" && (
          <div className="advanced-container">
            <div className="inputs">
              <h3>Business Impact Factors</h3>
              <div>
                <label>Expected Revenue Impact for Client:</label>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={revenueImpact}
                  onChange={(e) => setRevenueImpact(parseInt(e.target.value))}
                />
                <span>{revenueImpact}</span>
              </div>
              <div>
                <label>Monthly Time Savings (hours):</label>
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={timeSavings}
                  onChange={(e) => setTimeSavings(parseInt(e.target.value))}
                />
                <span>{timeSavings}</span>
              </div>
              <div>
                <label>Client's Hourly Value ($):</label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={clientHourlyValue}
                  onChange={(e) =>
                    setClientHourlyValue(parseInt(e.target.value))
                  }
                />
              </div>
              <div>
                <label>Number of System Integrations:</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={integrationCount}
                  onChange={(e) =>
                    setIntegrationCount(parseInt(e.target.value))
                  }
                />
                <span>{integrationCount}</span>
              </div>
              <div>
                <label>Requires Custom Coding:</label>
                <input
                  type="checkbox"
                  checked={customCoding}
                  onChange={(e) => setCustomCoding(e.target.checked)}
                />
              </div>
              <div>
                <label>Includes Client Training:</label>
                <input
                  type="checkbox"
                  checked={trainingRequired}
                  onChange={(e) => setTrainingRequired(e.target.checked)}
                />
              </div>
              <div>
                <label>Expected Monthly Active Users:</label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={monthlyActiveUsers}
                  onChange={(e) =>
                    setMonthlyActiveUsers(parseInt(e.target.value))
                  }
                />
              </div>
            </div>
            <div className="results">
              <h3>Advanced Pricing Recommendations</h3>
              <div className="pricing-box">
                <h4>Project Value Analysis</h4>
                <ul>
                  <li>
                    <strong>Annual Time Savings Value:</strong> $
                    {annualTimeSavingsValue.toFixed(2)}
                  </li>
                  <li>
                    <strong>Revenue Impact:</strong> ${revenueImpact.toFixed(2)}
                  </li>
                  <li>
                    <strong>Total Value to Client:</strong> $
                    {totalValue.toFixed(2)}
                  </li>
                </ul>
              </div>
              <div className="pricing-box">
                <h4>Enhanced Project Cost</h4>
                <ul>
                  <li>Base Development Cost: ${baseProjectCost.toFixed(2)}</li>
                  <li>Integration Complexity: ${integrationCost.toFixed(2)}</li>
                  <li>Custom Coding: ${customCodeCost.toFixed(2)}</li>
                  <li>Training Component: ${trainingCost.toFixed(2)}</li>
                  <li>User Scale Factor: ${userScaleCost.toFixed(2)}</li>
                  <li>
                    <strong>Total Enhanced Cost:</strong> $
                    {enhancedProjectCost.toFixed(2)}
                  </li>
                </ul>
              </div>
              <div className="pricing-box">
                <h4>Value-Based Pricing Options</h4>
                <ul>
                  <li>
                    <strong>Conservative (5% of value):</strong> $
                    {conservativeValuePrice.toFixed(2)}
                  </li>
                  <li>
                    <strong>Moderate (10% of value):</strong> $
                    {moderateValuePrice.toFixed(2)}
                  </li>
                  <li>
                    <strong>Aggressive (20% of value):</strong> $
                    {aggressiveValuePrice.toFixed(2)}
                  </li>
                </ul>
              </div>
              <div className="pricing-box">
                <h4>Subscription Model Option</h4>
                <p>
                  <strong>Monthly Subscription:</strong> $
                  {monthlySubscription.toFixed(2)}/month
                </p>
                <p>This includes ongoing maintenance, updates, and support.</p>
              </div>
            </div>
          </div>
        )}
        {activeTab === "market" && (
          <div className="market-container">
            <h3>Market Rates by Service Type (hourly rates in USD)</h3>

            {/* Top row: Table and Chart */}
            <div className="market-top-row">
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Service Type</th>
                      <th>Entry Level</th>
                      <th>Mid Level</th>
                      <th>Expert Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketLabels.map((service, index) => (
                      <tr key={index}>
                        <td style={{ textAlign: "left" }}>{service}</td>
                        <td style={{ textAlign: "center" }}>
                          {marketData.datasets[0].data[index]}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {marketData.datasets[1].data[index]}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {marketData.datasets[2].data[index]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="chart-wrapper">
                <h3>Visualization</h3>
                <Bar data={marketData} options={marketOptions} />
              </div>
            </div>

            {/* Bottom row: Two Highlight Boxes */}
            <div className="market-bottom-row">
              <div className="highlight">
                <h4>Current Market Trends (2025)</h4>
                <ul>
                  <li>
                    <strong>Highest Growth Areas:</strong> AI-powered
                    automation, document processing, and customer service
                    automation
                  </li>
                  <li>
                    <strong>Premium Skills:</strong> LLM integration,
                    multi-system workflows, and security-focused automations
                  </li>
                  <li>
                    <strong>Pricing Models Shift:</strong> Moving from hourly to
                    value-based and subscription models
                  </li>
                </ul>
              </div>
              <div className="highlight">
                <h4>How to Stand Out</h4>
                <ul>
                  <li>Develop a specialty in high-demand automation niches</li>
                  <li>
                    Create case studies that demonstrate ROI of your automation
                    services
                  </li>
                  <li>Offer tiered service packages with clear deliverables</li>
                  <li>
                    Provide educational content to attract potential clients
                  </li>
                  <li>
                    Build a portfolio of automation templates that showcase your
                    capabilities
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer>
        <hr />
        <div style={{ textAlign: "center", color: "#666", fontSize: "0.8em" }}>
          <p>
            Disclaimer: This calculator provides estimates based on market
            averages and the information you provide. Actual rates may vary
            based on specific client needs, industry, and geographic location.
          </p>
          <p>© 2025 MM Digital. All rights reserved.</p>
        </div>
        <button onClick={downloadReport}>
          📄 Download Full Pricing Report (HTML)
        </button>
      </footer>
    </div>
  );
};

export default App;
