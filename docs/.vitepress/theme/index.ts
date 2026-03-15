import './index.css'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'

// Pages
import HomePage from '../../components/WebPages/HomePage.vue'
import NewsPage from '../../components/WebPages/NewsPage.vue'
import OpenFinanceDashboard from '../../components/WebPages/OpenFinanceDashboard.vue'
import KnowledgeBasePage from '../../components/WebPages/KnowledgeBasePage.vue'

//components
import ImageViewer from '../../components/ImageViewer.vue'
import APIFlowViewer from '../../components/APIFlowViewer.vue'
import AccountEditor from '../../components/AccountEditor.vue'
import ConsentConnectionsEditor from '../../components/ConsentConnectionsEditor.vue'
import RedocWrapper from '../../components/RedocWrapper.vue'
import Carousel from '../../components/Carousel.vue'
import ProtectedPageWrapper from '../../components/ProtectedPageWrapper.vue'
import LiveAPIs from '../../components/LiveAPIs.vue'
import EditableJson from '../../components/EditableJson.vue'
import ErrataNotice from '../../components/ErrataNotice.vue'
import ConsentAuthLayout from '../../components/ConsentAuthLayout.vue'

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
import APIFlowsConsentFlow from '../../components/APIFlows/ConsentFlow.vue'
import APIFlowsConfirmationOfPayee from '../../components/APIFlows/ConfirmationOfPayee.vue'
import APIFlowsMultiAuthorization from '../../components/APIFlows/MultiAuthorization.vue'


// UIs
import ConsentBankDataSharing from '../../components/ConsentPages/ConsentBankDataSharing.vue'
import ConsentSingleInstantPayment from '../../components/ConsentPages/ConsentSingleInstantPayment.vue'
import ConsentOnDemand from '../../components/ConsentPages/ConsentOnDemand.vue'
import ConsentPeriodicSchedule from '../../components/ConsentPages/ConsentPeriodicSchedule.vue'
import ConsentDefinedSchedule from '../../components/ConsentPages/ConsentDefinedSchedule.vue'
import ConsentDelegatedSCA from '../../components/ConsentPages/ConsentDelegatedSCA.vue'
import ConsentSIPCOP from '../../components/ConsentPages/ConsentSIPCOP.vue'
import ConsentManagementConnections from '../../components/ConsentPages/ConsentManagementConnections.vue'

// Certification Docs
import ReadinessChecklistDownload from '../../components/CertificationDocuments/ReadinessChecklistDownload.vue'
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
  enhanceApp({ app }) {
    //pages
    app.component('HomePage', HomePage)
    app.component('NewsPage', NewsPage)
    app.component('KnowledgeBasePage', KnowledgeBasePage)
    app.component('OpenFinanceDashboard', OpenFinanceDashboard)

    //components
    app.component('ImageViewer', ImageViewer)
    app.component('APIFlowViewer', APIFlowViewer)
    app.component('AccountEditor', AccountEditor)
    app.component('ConsentConnectionsEditor', ConsentConnectionsEditor)
    app.component('RedocWrapper', RedocWrapper)
    app.component('Carousel', Carousel)
    app.component('ProtectedPageWrapper', ProtectedPageWrapper)
    app.component('LiveAPIs', LiveAPIs)
    app.component('EditableJson', EditableJson)
    app.component('ErrataNotice', ErrataNotice)
    app.component('TPPPostmanScriptBuilder', TPPPostmanScriptBuilder)
    app.component('ConsentAuthLayout', ConsentAuthLayout)
    app.component('OnboardingOrganisationForm', OnboardingOrganisationForm)
    app.component('OnboardingAdminForm', OnboardingAdminForm)

    // API Flows
    app.component('APIFlowsRegistration', APIFlowsRegistration)
    app.component('APIFlowsBankDataSharing', APIFlowsBankDataSharing)
    app.component('APIFlowsSingleInstantPayment', APIFlowsSingleInstantPayment)
    app.component('APIFlowsOnDemand', APIFlowsOnDemand)
    app.component('APIFlowsPeriodicSchedule', APIFlowsPeriodicSchedule)
    app.component('APIFlowsDefinedSchedule', APIFlowsDefinedSchedule)
    app.component('APIFlowsDelegatedSCA', APIFlowsDelegatedSCA)
    app.component('APIFlowsConsentFlow', APIFlowsConsentFlow)
    app.component('APIFlowsConfirmationOfPayee', APIFlowsConfirmationOfPayee)
    app.component('APIFlowsMultiAuthorization', APIFlowsMultiAuthorization)

    // UI
    app.component('ConsentBankDataSharing', ConsentBankDataSharing)
    app.component('ConsentSingleInstantPayment', ConsentSingleInstantPayment)
    app.component('ConsentOnDemand', ConsentOnDemand)
    app.component('ConsentPeriodicSchedule', ConsentPeriodicSchedule)
    app.component('ConsentDefinedSchedule', ConsentDefinedSchedule)
    app.component('ConsentDelegatedSCA', ConsentDelegatedSCA)
    app.component('ConsentManagementConnections', ConsentManagementConnections)

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
    app.component('ReadinessChecklistDownload', ReadinessChecklistDownload)
    app.component('FunctionalEvidenceDownload', FunctionalEvidenceDownload)

  }
}



