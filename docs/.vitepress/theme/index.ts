import './index.css'
import '../../components/WebPages/editorial.css'
import './editorial-doc.css'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'
import { resetSharedState } from '../../components/Composables/useSharedState.ts'
import { resetSelectedVersion } from '../../components/Composables/useSelectedVersion.ts'

// Pages
import HomePage from '../../components/WebPages/HomePage.vue'
import NewsPage from '../../components/WebPages/NewsPage.vue'
import LiveEcosystemPage from '../../components/WebPages/LiveEcosystemPage.vue'
import OpenFinanceDashboard from '../../components/WebPages/OpenFinanceDashboard.vue'
import KnowledgeBasePage from '../../components/WebPages/KnowledgeBasePage.vue'
import DocumentRepoPage from '../../components/WebPages/DocumentRepoPage.vue'
import PolicyPage from '../../components/WebPages/PolicyPage.vue'
import SupportServiceDeskPage from '../../components/WebPages/SupportServiceDeskPage.vue'
import PricingPage from '../../components/WebPages/PricingPage.vue'
import LFIRatesPage from '../../components/WebPages/LFIRatesPage.vue'
import EndpointPricingPage from '../../components/WebPages/EndpointPricingPage.vue'
import LfiGuidePage from '../../components/WebPages/LfiGuidePage.vue'
import TppStandardsPage from '../../components/WebPages/TppStandardsPage.vue'
import TechIndexPage from '../../components/WebPages/TechIndexPage.vue'
import ApiSpecsPage from '../../components/WebPages/ApiSpecsPage.vue'
import ReleaseNotesPage from '../../components/WebPages/ReleaseNotesPage.vue'
import APIHubReleaseNotesPage from '../../components/WebPages/APIHubReleaseNotesPage.vue'
import TrustFrameworkReleaseNotesPage from '../../components/WebPages/TrustFrameworkReleaseNotesPage.vue'
import ErratasPage from '../../components/WebPages/ErratasPage.vue'

//components
import ImageViewer from '../../components/ImageViewer.vue'
import APIFlowViewer from '../../components/APIFlowViewer.vue'
import AccountEditor from '../../components/AccountEditor.vue'
import ConsentConnectionsEditor from '../../components/ConsentConnectionsEditor.vue'
import RedocWrapper from '../../components/RedocWrapper.vue'
import Carousel from '../../components/Carousel.vue'
import ProtectedPageWrapper from '../../components/ProtectedPageWrapper.vue'
import EditableJson from '../../components/EditableJson.vue'
import ErrataNotice from '../../components/ErrataNotice.vue'
import ConsentAuthLayout from '../../components/ConsentAuthLayout.vue'
import DocumentRepoDisplay from '../../components/DocumentRepoDisplay.vue'
import GitHubRepoCard from '../../components/GitHubRepoCard.vue'


// Forms
import TPPPostmanScriptBuilder from '../../components/Form/TPPPostmanScriptBuilder.vue'
import OnboardingOrganisationForm from '../../components/Form/OnboardingOrganisationForm.vue'
import OnboardingAdminForm from '../../components/Form/OnboardingAdminForm.vue'


// API Flows
import APIFlowsRegistration from '../../components/APIFlows/TPPRegistration.vue'
import APIFlowsBankDataSharing from '../../components/APIFlows/BankDataSharing.vue'
import APIFlowsSingleInstantPayment from '../../components/APIFlows/SingleInstantPayment.vue'
import APIFlowsOnDemand from '../../components/APIFlows/OnDemand.vue'
import APIFlowsPeriodicSchedule from '../../components/APIFlows/PeriodicSchedule.vue'
import APIFlowsDefinedSchedule from '../../components/APIFlows/DefinedSchedule.vue'
import APIFlowsDelegatedSCA from '../../components/APIFlows/DelegatedSCA.vue'
import APIFlowPaymentStatusEvent from '../../components/APIFlows/PaymentStatusEvent.vue'
import APIFlowConsentEvent from '../../components/APIFlows/ConsentEvent.vue'
import APIFlowsConsentFlow from '../../components/APIFlows/ConsentFlow.vue'
import APIFlowsConfirmationOfPayee from '../../components/APIFlows/ConfirmationOfPayee.vue'
import APIFlowsMultiAuthorization from '../../components/APIFlows/MultiAuthorization.vue'
import APIFlowsRefunds from '../../components/APIFlows/Refunds.vue'
import APIFlowsATMs from '../../components/APIFlows/ATMs.vue'
import APIFlowsTrustFramework from '../../components/APIFlows/TrustFramework.vue'
import APIFlowsProductsLeads from '../../components/APIFlows/ProductsLeads.vue'
import APIFlowsAPIHubArchitecture from '../../components/APIFlows/APIHubArchitecture.vue'
import APIFlowsConsentValidate from '../../components/APIFlows/ConsentValidate.vue'
import APIFlowsConsentEventLFI from '../../components/APIFlows/ConsentEventLFI.vue'
import APIFlowsConnectivityCertificates from '../../components/APIFlows/ConnectivityCertificates.vue'
import APIFlowsConnectivityEncryption from '../../components/APIFlows/ConnectivityEncryption.vue'
import APIFlowsMultiSegmentApiHubs from '../../components/APIFlows/MultiSegmentApiHubs.vue'


// UIs
import ConsentBankDataSharing from '../../components/ConsentPages/ConsentBankDataSharing.vue'
import ConsentSingleInstantPayment from '../../components/ConsentPages/ConsentSingleInstantPayment.vue'
import ConsentOnDemand from '../../components/ConsentPages/ConsentOnDemand.vue'
import ConsentPeriodicSchedule from '../../components/ConsentPages/ConsentPeriodicSchedule.vue'
import ConsentDefinedSchedule from '../../components/ConsentPages/ConsentDefinedSchedule.vue'
import ConsentDelegatedSCA from '../../components/ConsentPages/ConsentDelegatedSCA.vue'
import ConsentSIPCOP from '../../components/ConsentPages/ConsentSIPCOP.vue'
import ConsentManagementConnections from '../../components/ConsentPages/ConsentManagementConnections.vue'
import ConsentManagementDetail from '../../components/ConsentPages/ConsentManagementDetail.vue'
import ConsentDataSharingPermissions from '../../components/ConsentPages/ConsentDataSharingPermissions.vue'
import ConsentPaymentPermissions from '../../components/ConsentPages/ConsentPaymentPermissions.vue'

// Certification Docs
import FunctionalEvidenceDownload from '../../components/CertificationDocuments/FunctionalEvidenceDownload.vue'

import AuthorizationBankDataSharing from '../../components/AuthorizationPages/AuthorizationBankDataSharing.vue'
import AuthorizationSingleInstantPayment from '../../components/AuthorizationPages/AuthorizationSingleInstantPayment.vue'
import AuthorizationOnDemand from '../../components/AuthorizationPages/AuthorizationOnDemand.vue'
import AuthorizationPeriodicSchedule from '../../components/AuthorizationPages/AuthorizationPeriodicSchedule.vue'
import AuthorizationDefinedSchedule from '../../components/AuthorizationPages/AuthorizationDefinedSchedule.vue'
import AuthorizationDelegatedSCA from '../../components/AuthorizationPages/AuthorizationDelegatedSCA.vue'
import AuthorizationSIPCOP from '../../components/AuthorizationPages/AuthorizationSIPCOP.vue'


import PermissionsReference from '../../components/PermissionsReference.vue'
import ServiceInitiationPermissionText from '../../components/ServiceInitiationPermissionText.vue'
import PaymentConsentPermissionsText from '../../components/ConsentPages/PaymentConsentPermissionsText.vue'
import COPPiiBlock from '../../components/COPPiiBlock.vue'



export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router }) {
    if (router) {
      router.onBeforeRouteChange = (to: string) => {
        const from = router.route?.path ?? ''
        if (from.startsWith('/tech/') && !to.startsWith('/tech/')) {
          resetSelectedVersion()
        }
        resetSharedState()
      }
    }

    //pages
    app.component('HomePage', HomePage)
    app.component('NewsPage', NewsPage)
    app.component('LiveEcosystemPage', LiveEcosystemPage)
    app.component('KnowledgeBasePage', KnowledgeBasePage)
    app.component('OpenFinanceDashboard', OpenFinanceDashboard)
    app.component('DocumentRepoPage', DocumentRepoPage)
    app.component('PolicyPage', PolicyPage)
    app.component('SupportServiceDeskPage', SupportServiceDeskPage)
    app.component('PricingPage', PricingPage)
    app.component('LFIRatesPage', LFIRatesPage)
    app.component('EndpointPricingPage', EndpointPricingPage)
    app.component('LfiGuidePage', LfiGuidePage)
    app.component('TppStandardsPage', TppStandardsPage)
    app.component('TechIndexPage', TechIndexPage)
    app.component('ApiSpecsPage', ApiSpecsPage)
    app.component('ReleaseNotesPage', ReleaseNotesPage)
    app.component('APIHubReleaseNotesPage', APIHubReleaseNotesPage)
    app.component('TrustFrameworkReleaseNotesPage', TrustFrameworkReleaseNotesPage)
    app.component('ErratasPage', ErratasPage)

    //components
    app.component('ImageViewer', ImageViewer)
    app.component('APIFlowViewer', APIFlowViewer)
    app.component('AccountEditor', AccountEditor)
    app.component('ConsentConnectionsEditor', ConsentConnectionsEditor)
    app.component('RedocWrapper', RedocWrapper)
    app.component('Carousel', Carousel)
    app.component('ProtectedPageWrapper', ProtectedPageWrapper)
    app.component('EditableJson', EditableJson)
    app.component('ErrataNotice', ErrataNotice)
    app.component('TPPPostmanScriptBuilder', TPPPostmanScriptBuilder)
    app.component('ConsentAuthLayout', ConsentAuthLayout)
    app.component('OnboardingOrganisationForm', OnboardingOrganisationForm)
    app.component('OnboardingAdminForm', OnboardingAdminForm)
    app.component('DocumentRepoDisplay', DocumentRepoDisplay)
    app.component('GitHubRepoCard', GitHubRepoCard)

    // API Flows
    app.component('APIFlowsRegistration', APIFlowsRegistration)
    app.component('APIFlowsBankDataSharing', APIFlowsBankDataSharing)
    app.component('APIFlowsSingleInstantPayment', APIFlowsSingleInstantPayment)
    app.component('APIFlowsOnDemand', APIFlowsOnDemand)
    app.component('APIFlowsPeriodicSchedule', APIFlowsPeriodicSchedule)
    app.component('APIFlowsDefinedSchedule', APIFlowsDefinedSchedule)
    app.component('APIFlowsDelegatedSCA', APIFlowsDelegatedSCA)
    app.component('APIFlowPaymentStatusEvent', APIFlowPaymentStatusEvent)
    app.component('APIFlowConsentEvent', APIFlowConsentEvent)
    app.component('APIFlowsConsentFlow', APIFlowsConsentFlow)
    app.component('APIFlowsConfirmationOfPayee', APIFlowsConfirmationOfPayee)
    app.component('APIFlowsMultiAuthorization', APIFlowsMultiAuthorization)
    app.component('APIFlowsRefunds', APIFlowsRefunds)
    app.component('APIFlowsATMs', APIFlowsATMs)
    app.component('APIFlowsTrustFramework', APIFlowsTrustFramework)
    app.component('APIFlowsProductsLeads', APIFlowsProductsLeads)
    app.component('APIFlowsAPIHubArchitecture', APIFlowsAPIHubArchitecture)
    app.component('APIFlowsConsentValidate', APIFlowsConsentValidate)
    app.component('APIFlowsConsentEventLFI', APIFlowsConsentEventLFI)
    app.component('APIFlowsConnectivityCertificates', APIFlowsConnectivityCertificates)
    app.component('APIFlowsConnectivityEncryption', APIFlowsConnectivityEncryption)
    app.component('APIFlowsMultiSegmentApiHubs', APIFlowsMultiSegmentApiHubs)

    // UI
    app.component('ConsentBankDataSharing', ConsentBankDataSharing)
    app.component('ConsentSingleInstantPayment', ConsentSingleInstantPayment)
    app.component('ConsentOnDemand', ConsentOnDemand)
    app.component('ConsentPeriodicSchedule', ConsentPeriodicSchedule)
    app.component('ConsentDefinedSchedule', ConsentDefinedSchedule)
    app.component('ConsentDelegatedSCA', ConsentDelegatedSCA)
    app.component('ConsentManagementConnections', ConsentManagementConnections)
    app.component('ConsentManagementDetail', ConsentManagementDetail)
    app.component('ConsentDataSharingPermissions', ConsentDataSharingPermissions)
    app.component('ConsentPaymentPermissions', ConsentPaymentPermissions)

    app.component('AuthorizationBankDataSharing', AuthorizationBankDataSharing)
    app.component('AuthorizationSingleInstantPayment', AuthorizationSingleInstantPayment)
    app.component('AuthorizationOnDemand', AuthorizationOnDemand)
    app.component('AuthorizationPeriodicSchedule', AuthorizationPeriodicSchedule)
    app.component('AuthorizationDefinedSchedule', AuthorizationDefinedSchedule)
    app.component('AuthorizationDelegatedSCA', AuthorizationDelegatedSCA)
    
    app.component('PermissionsReference', PermissionsReference)
    app.component('ServiceInitiationPermissionText', ServiceInitiationPermissionText)
    app.component('PaymentConsentPermissionsText', PaymentConsentPermissionsText)
    app.component('COPPiiBlock', COPPiiBlock)
    app.component('ConsentSIPCOP', ConsentSIPCOP)
    app.component('AuthorizationSIPCOP', AuthorizationSIPCOP)
    app.component('FunctionalEvidenceDownload', FunctionalEvidenceDownload)

  }
}



