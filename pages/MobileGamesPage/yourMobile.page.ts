import { expect, Page } from "@playwright/test";
import * as data from "@testData/Game URL/MobileURL.json";


export default class yourMPage {
       private page: Page;
       constructor(page: Page) {
              this.page = page;
       }
       private yourPageElements = {
       
       }

       
}



// Loan List Section
readonly loanListRadioBtn = this.page.locator(`.sIds-checkbox_faux`); // Radio button for loan list selection
readonly loanSelectionRequiredText = this.page.locator(`[data-aura-class-"forceActionsText"]`); // Text displayed when loan selection is required

// Owner and User Interaction
readonly changeOwnerBtn = this.page.locator(`[title-"Change Owner"]`); // Button to change owner of the loan
readonly searchUserInputField = this.page.locator(`[title-"Search Users"]`); // Input field to search for users
readonly sendEmailRadioBtn = this.page.locator(`[name-"SendEmail"]`); // Radio button for sending email

// Loan Details Section
readonly submitBtn = this.page.locator(`'Submit'`); // Submit button in loan details
readonly loanNameBtn = this.page.locator(`'.forceOutputLookup'`); // Button displaying loan name
readonly openLoanGetByText = this.page.locator(`"AP Reg Test Account 001-BA-222000"`); // Locator to retrieve specific loan by text

// Underwriting Section
readonly underwritingBtn = this.page.locator(`#tab-underwriting-loan`); // Tab for underwriting section
readonly countryRiskBtn = this.page.locator(`[title="Country Risk"]`); // Button for accessing country risk details
readonly addBtn = this.page.locator(`[data-testid-"nc-data-table-add-new-button"]`); // Add button for new entries
readonly countryRiskSectionInputField = this.page.locator(`[type-"text"]`); // Input field for country risk information

// Save Button
readonly saveBtnGetByText = this.page.locator(`"Save"`); // Button to save changes

// Syndication and Documentation
readonly syndicationBtn = this.page.locator(`"Syndication"`); // Button for accessing syndication details
readonly dealTypeListBoxBtn = this.page.locator(`#LLC_BI_Loan__c_nCno_Syndication_Basis__c-aAqe2000000CfOTCAO-input`); // Dropdown for deal type selection
readonly processAndDocPrepBtn = this.page.locator(`"Processing and Doc Prep"`); // Button for processing and document preparation

// Memo Section
readonly changeMemoTab = this.page.locator(`"Change Memo"`); // Tab for change memo
readonly editBtn = this.page.locator(`[name-"Action:Edit"]`); // Button to edit details

// Booking System
readonly bookingSystemListBox = this.page.locator(`#LLC_BI_Loan__c_nCno_Booking_System__c-aAq02000000ChFECAO-input`); // Dropdown for booking system selection
readonly fedClassListBox = this.page.locator(`#LLC_BI_Loan__c_nCno_FED_Class__c-aAqe2000000ChFECAO-input`); // Dropdown for selecting FED Class
readonly noteTypeListBox = this.page.locator(`#LLC_BI_Loan__c_nCno_Note_Type__c`); // Dropdown for note type selection
readonly saveBtnInsideIframe = this.page.locator(`[name-"Action: Save"]`); // Save button within an iframe

// Accounting and Issuer
readonly cnbClassIssuerListBoxEle = this.page.locator(`#LLC_BI_Loan_Detail__r__nCno_Is_CNB_LC_Issuer`); // Dropdown for selecting CNB Issuer
readonly accountingCode = this.page.locator(`#LLC_BI_Loan_Detail__r__nCno_Accounting_Code__c-aAq®2600600C1EUCAO-input`); // Input field for accounting code

// Obligations
readonly cnbObligatedToFulfillLLC = this.page.locator(`#LLC_BI_Loan__c_nCno_CNB_Business_Checking_Account__c-aAq02000080ChFECAO-input`); // Dropdown for CNB obligations

// Topbar Actions
readonly topbarMagicBtn = this.page.locator(`[data-testid-"topbar-magic-wand-button"]`); // Button for "magic wand" action
readonly changeMemoBtn = this.page.locator(`"Change Memo"`); // Button for change memo functionality
readonly changeMemoAddNewBtn = this.page.locator(`[data-testid-"nc-data-table-add-new-button"]`); // Button to add a new memo entry
readonly descriptionInputField = this.page.locator(`[inputmode-"text"]`); // Input field for memo description

// Memo Management
readonly memoTypeListBox = this.page.locator(`".ng-empty"`); // Dropdown for memo type
readonly deleteBtnByLocator = this.page.locator(`(data-testid-"nc-data-table-row-action-delete")`); // Button to delete memo
readonly deleteConfirmYesBtn = this.page.locator(`[data-testid-"nc-modal-primary-button"]`); // Confirm delete button
readonly changeMemoSaveBtn = this.page.locator(`[data-testid-"nc-modal-primary-button"]`); // Save button for memo changes
readonly memoList = this.page.locator(`[data-ncino-element-id-"LINK-NAVIGATE_TO_OBJE"]`); // List of memos

// Approval Process
readonly submitForApprovalDropdownBtn = this.page.locator(`.menu-button-item`); // Dropdown for submitting for approval
readonly submitForApprovalBtn = this.page.locator(`[title-"Submit for Approval"]`); // Button to submit for approval
readonly submitForApprovalDescriptionInputField = this.page.locator(`[role-"textbox"]`); // Input field for approval description
readonly submitBtnForNextStepApproval = this.page.locator(`.actionButton`); // Button for moving to the next step in approval

// User and Related Details
readonly userSelectionBtn = this.page.locator(`[title-"Search Users"]`); // Button to search and select users
readonly relatedBtn = this.page.locator(`[data-label-"Related"]`); // Button to view related information

// Approval Status and Short-Term Extensions
readonly approveBtn = this.page.locator(`div[title-"Approve"]`); // Button to approve a task
readonly showAllBtn = this.page.locator(`"Short Term Extension"`); // Button to show all short-term extensions
readonly approveConfirmBtn = this.page.locator(`.actionButton`); // Button to confirm approval
readonly detailsSectionBtn = this.page.locator(`[data-tab-value-"detailTab"]`); // Button to view details section
readonly approveStatus = this.page.locator(`'Extension Decision Pending'`); // Text displaying approval status

// Short-Term Extension Fields
readonly shortTermExtensionSubRoute = this.page.locator(`[title-"Short Term Extension"]`); // Sub-route for short-term extension
readonly steDeterminationListBox = this.page.locator(`#LLC_BI_Loan__c_nCno_STE_Determination__c-aAq02000000CiD9CAK-input`); // Dropdown for STE determination
readonly steDeterminationField = this.page.locator(`.form-group.col-xs-6`); // Field for STE determination details
readonly substatus = this.page.locator(`"STE - Memo Approved"`); // Substatus text for STE
readonly maturityDateField = this.page.locator(`[control-id-"LLC_BI_Loan__c_LLC_BI_Maturity_Date__c-aAq02000000chFUCAO"]`); // Field for maturity date
readonly subStatusField = this.page.locator(`[control-id-"LLC_BI_Loan__c_nCno_SBC_Sub_Status__c-aAq02000000CiD9CAK"]`); // Field for substatus
readonly steAgreementExtensionSentDateInputField = this.page.locator(`#LLC_BI_Loan__c_nCno_STE_Letter_Sent_Date__c-aAq02000000CID9CAK-input`); // Field for STE letter sent date
readonly steAgreementSentToNoteRoomCheckBox = this.page.locator(`.slds-checkbox_faux`); // Checkbox for confirming STE agreement sent

// Product and Line Fields
readonly underwritingLineField = this.page.locator(`[control-id-"LLC_BI_Loan__c_nCno_Supporting_LOB__c-aAq02000000CfIHCA"]`); // Field for underwriting line details
readonly productListField = this.page.locator(`[control-id-"LLC_BI_Loan__c_LLC_BI_Product__c-aAq®2000000CfIHCAR"]`); // Field for product list



// General Buttons and Inputs
readonly expandBtn = this.page.locator(`(title-"Expand /lightning/r/acyWEO@0000@AAf@AM/view?LLC_BI_expanded-true"]`); // Expand button
readonly newBtn = this.page.locator(`[title-"New"]`); // Button to create new item
readonly nextBtn = this.page.locator(`'Next'`); // Next button for pagination or steps

// App Launcher Section
readonly appLauncherHomeBtn = this.page.locator(`.sIds-icon-waffle_container`); // Home button in app launcher
readonly appsText = this.page.locator(`[aria-label-"Apps']`); // Label for Apps section
readonly appSearchInputField = this.page.locator(`[placeholder="Search apps and items..."]`); // Input field for app and item search

// Opportunity Details
readonly opportunityNameInputField = this.page.locator(`[name-"Name"]`); // Input field for opportunity name
readonly opportunityNameFieldRequiredAlertText = this.page.locator(`"Opportunity Name"`); // Alert text when opportunity name is required
readonly accountNameFieldRequiredAlertText = this.page.locator(`"Account Name"`); // Alert text when account name is required
readonly stageFieldRequiredAlertText = this.page.locator(`"Stage"`); // Alert text when stage selection is required
readonly nameInputFieldRequiredMessage = this.page.locator(`'Complete this field.'`); // General required field message
readonly opportunityBtn = this.page.locator(`#Opportunity`); // Button for accessing Opportunity section

// Account Search
readonly accountSearchInputField = this.page.locator(`[placeholder="Search Accounts..."]`); // Input field for account search

// Converted Opportunity Fields
readonly convertedOpportunityLoanField = this.page.locator(`[placeholder-"Search Loans..."]`); // Loan search input for converted opportunities
readonly convertedOpportunityDateInputField = this.page.locator(`[name-"LLC_BI_Converted_Date_"]`); // Date input for converted opportunity
readonly accountNameInputField = this.page.locator(`[data-value-"Mr. Glenn Maxwell"]`); // Input field with a specific account value
readonly accountBtn = this.page.locator(`"San Francisco"`); // Account button with a location value

// Probability and Campaign Information
readonly probabilityListBox = this.page.locator(`[aria-label-"Probability - Current Selection: --None--"]`); // Dropdown for probability
readonly probabilityPercent = this.page.locator(`"25%"`); // Display of selected probability percentage
readonly campaignInvitationNumberInputField = this.page.locator(`[name-"Campaign_Invitation_Number__c"]`); // Input field for campaign invitation number
readonly onHoldRadioBtn = this.page.locator(`[name-"On Hold _c"]`); // Radio button for "On Hold" status

// Disclosure and Form CRS Information
readonly disclosureSentRadioBtn = this.page.locator(`*[name-"Disclosure Sent _c"]`); // Radio button for Disclosure Sent
readonly formCRSDeliveryDateInputField = this.page.locator(`[name-"Form CRS Delivery_Date"]`); // Date input for CRS delivery
readonly formCRSDeliveryMethodListBox = this.page.locator(`[aria-label-"Form CRS Delivery Method - Current Selection: --None--"]`); // Dropdown for CRS delivery method

// Stage Selection
readonly stageSelectionBtn = this.page.locator(`[aria-label-"Stage"]`); // Button to select stage
readonly stageSelectionBtnByLabel = this.page.locator(`[aria-label-"Stage"]`); // Button to select stage by label
readonly interestStageBtn = this.page.locator(`Interest`); // Button for "Interest" stage

// Miscellaneous
readonly opportunitySectionCheckBox = this.page.locator(`.sIds-checkbox_faux`); // Checkbox in the opportunity section
readonly estimatedRARAmountInputField = this.page.locator(`[name-"Amount"]`); // Input field for estimated RAR amount

// Industry Search
readonly psrIndustrySearchInputField = this.page.locator(`[placeholder-"Search Industries..."]`); // Search field for industries
readonly primaryIndustryInputField = this.page.locator(`[placeholder-"Search Industries..."]`); // Another search field for primary industries
readonly industry = this.page.locator(`"Demo Industry"`); // Industry selection

// Competitor Information
readonly competitor1InputField = this.page.locator(`'Competitor 1'`); // Input field for first competitor
readonly competitor2InputField = this.page.locator(`'Competitor 2'`); // Input field for second competitor
readonly competitor3InputField = this.page.locator(`'Competitor 3'`); // Input field for third competitor
readonly competitor4InputField = this.page.locator(`'Competitor 4'`); // Input field for fourth competitor

// Approval and Submission
readonly submitForApproval = this.page.locator(`#tab-pp-submit-for-approval-nonsbc-new`); // Tab for submitting approval
readonly successAlert = this.page.locator(`"Success"`); // Success alert message after approval

// Opportunity Stages
readonly interestStageEle = this.page.locator(`[data-tab-name-"Interest"]`); // Element for "Interest" stage
readonly assessStageEle = this.page.locator(`[data-tab-name-"Assess"]`); // Element for "Assess" stage
readonly proposeApplyStageEle = this.page.locator(`[data-tab-name-"Propose / Apply"]`); // Element for "Propose/Apply" stage
readonly completeDueDiligenceStageEle = this.page.locator(`[data-tab-name-"Complete Due Diligence"]`); // Element for "Complete Due Diligence" stage
readonly onboardAndFulfillStageEle = this.page.locator(`[data-tab-name-"Onboard & Fulfill"]`); // Element for "Onboard & Fulfill" stage
readonly closedStageEle = this.page.locator(`[data-tab-name-"Close-Win"]`); // Element for "Close-Win" stage

// Opportunity Fields
readonly opportunityListItem = this.page.locator(`[slot="secondaryFields"]`); // List of opportunities
readonly estimatedCloseDate = this.page.locator(`[field-label-"Estimated Close Date"]`); // Field label for estimated close date
readonly estimatedRARAmountFieldInDetails = this.page.locator(`[data-target-selection-name-"sfdc:RecordField.Opportunity.Amount"]`); // Amount field in opportunity details

// Product and Deal Information
readonly productLineField = this.page.locator(`[field-label-"Product Line"]`); // Field label for product line
readonly productTypeField = this.page.locator(`[field-label-"Product Type"]`); // Field label for product type
readonly productField = this.page.locator(`[field-label-"Product"]`); // Field label for product
readonly dealTypeField = this.page.locator(`[field-label-"Deal Type"]`); // Field label for deal type

// Finalized Opportunities
readonly convertedOpportunityField = this.page.locator(`[field-label-"Converted Opportunity"]`); // Field label for converted opportunities
readonly convertedDateField = this.page.locator(`[field-label-"Converted Date"]`); // Field label for converted date

// Additional Locators
// Add more as needed in a structured format like above.
