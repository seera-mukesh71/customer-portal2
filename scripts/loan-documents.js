// This is your enterprise loan policy documentation
// Replace/add your real content here

const loanDocuments = [
  // ─── LOAN ELIGIBILITY ───────────────────────────────────────────
  {
    content: `Loan Eligibility Criteria: 
    - Minimum age: 21 years, Maximum age: 60 years at loan maturity
    - Minimum monthly income: ₹25,000 for salaried employees
    - Minimum monthly income: ₹40,000 for self-employed individuals
    - Minimum CIBIL credit score: 700
    - Minimum employment tenure: 2 years for salaried, 3 years for self-employed
    - Maximum debt-to-income ratio: 50% of monthly income`,
    metadata: { category: "eligibility", topic: "basic requirements" }
  },
  {
    content: `Home Loan Eligibility:
    - Loan amount: ₹5 lakhs to ₹5 crores
    - Maximum LTV ratio: 80% of property value
    - Co-applicant allowed: Yes (spouse, parents, children)
    - Property must be legally approved and clear of disputes
    - Applicant must be Indian resident or NRI with valid documents`,
    metadata: { category: "eligibility", topic: "home loan" }
  },
  {
    content: `Personal Loan Eligibility:
    - Loan amount: ₹50,000 to ₹40 lakhs
    - Salaried employees working in MNC, Government, or reputed private companies
    - Minimum salary: ₹30,000 per month
    - Self-employed professionals with stable 3-year income history
    - No active defaults or write-offs in last 24 months`,
    metadata: { category: "eligibility", topic: "personal loan" }
  },

  // ─── EMI POLICY ────────────────────────────────────────────────
  {
    content: `EMI Calculation Policy:
    EMI Formula: EMI = P × r × (1+r)^n / ((1+r)^n - 1)
    Where: P = Principal loan amount, r = Monthly interest rate, n = Loan tenure in months
    Example: ₹10 lakh loan at 10% annual interest for 5 years = EMI of ₹21,247
    EMI includes both principal and interest components.
    EMI due date is fixed on the 5th of every month by default.
    Grace period: 3 days after due date before late fee applies.`,
    metadata: { category: "emi", topic: "emi calculation" }
  },
  {
    content: `EMI Payment Methods:
    - Auto-debit (NACH mandate) from savings account — recommended
    - Online payment via net banking or UPI
    - Mobile app payment
    - Cheque deposit at branch (allow 3 working days)
    - Late payment fee: 2% per month on overdue EMI amount
    - Bounce charge: ₹500 per bounce for failed auto-debit`,
    metadata: { category: "emi", topic: "payment methods" }
  },
  {
    content: `EMI Prepayment and Foreclosure Policy:
    - Partial prepayment allowed after 6 EMIs without penalty (floating rate loans)
    - Fixed rate loans: 2% prepayment penalty on outstanding principal
    - Full foreclosure allowed anytime after 12 months
    - Foreclosure charges: Nil for floating rate, 4% for fixed rate loans
    - Prepayment reduces either tenure or EMI amount — customer's choice
    - Minimum prepayment amount: 3 months EMI`,
    metadata: { category: "emi", topic: "prepayment foreclosure" }
  },

  // ─── LOAN APPLICATION WORKFLOW ──────────────────────────────────
  {
    content: `Loan Application Process - Step by Step:
    Step 1: Submit online application with basic details
    Step 2: Upload required documents within 48 hours
    Step 3: Credit check and eligibility verification (1-2 working days)
    Step 4: Property/collateral valuation if applicable (2-3 working days)
    Step 5: Loan sanction and offer letter generation
    Step 6: Customer accepts offer and signs loan agreement
    Step 7: Disbursement within 24 hours of agreement signing`,
    metadata: { category: "workflow", topic: "application process" }
  },
  {
    content: `Required Documents for Loan Application:
    Identity Proof (any one): Aadhaar Card, PAN Card, Passport, Voter ID
    Address Proof (any one): Aadhaar Card, Utility Bill, Rental Agreement
    Income Proof for Salaried: Last 3 months salary slips, Form 16, 6 months bank statement
    Income Proof for Self-Employed: Last 2 years ITR, CA certified P&L statement, 12 months bank statement
    Property Documents (for home/mortgage loans): Sale deed, NOC from builder, approved plan`,
    metadata: { category: "workflow", topic: "required documents" }
  },
  {
    content: `Loan Approval Timeline:
    - Personal loans: 24 to 48 hours from complete document submission
    - Home loans: 7 to 10 working days
    - Business loans: 5 to 7 working days
    - Education loans: 3 to 5 working days
    Fast track approval available for pre-approved customers in under 2 hours.
    Application status can be tracked via portal or mobile app using application reference number.`,
    metadata: { category: "workflow", topic: "approval timeline" }
  },

  // ─── LOAN TYPES & INTEREST RATES ───────────────────────────────
  {
    content: `Loan Products and Interest Rates:
    - Home Loan: 8.5% to 9.5% per annum (floating), 9% to 10% (fixed)
    - Personal Loan: 10.5% to 18% per annum depending on credit profile
    - Car Loan: 7.5% to 9% per annum
    - Education Loan: 8% to 11% per annum
    - Business Loan: 11% to 16% per annum
    - Gold Loan: 7% to 9% per annum
    Interest rates are revised quarterly based on RBI repo rate.`,
    metadata: { category: "policy", topic: "interest rates" }
  },
  {
    content: `Loan Tenure Options:
    - Personal Loan: 1 to 5 years
    - Home Loan: 5 to 30 years
    - Car Loan: 1 to 7 years
    - Education Loan: Up to 15 years (with moratorium period)
    - Business Loan: 1 to 10 years
    Longer tenure means lower EMI but higher total interest paid.
    Shorter tenure means higher EMI but significant interest savings.`,
    metadata: { category: "policy", topic: "tenure options" }
  },

  // ─── GRIEVANCE & SUPPORT ────────────────────────────────────────
  {
    content: `Customer Support and Grievance Policy:
    - 24x7 helpline: 1800-XXX-XXXX (toll free)
    - Email support: loans@company.com (response within 24 hours)
    - Branch visit: Monday to Saturday, 9AM to 5PM
    - Grievance redressal: complaints resolved within 7 working days
    - Escalation to Nodal Officer if not resolved in 7 days
    - Banking Ombudsman can be approached if unresolved in 30 days`,
    metadata: { category: "support", topic: "grievance" }
  }
];

module.exports = loanDocuments;